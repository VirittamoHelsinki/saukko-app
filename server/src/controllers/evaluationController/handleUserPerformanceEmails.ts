import userModel from '../../models/userModel';
import { IUser, User } from '../../models/userModel';
import EvaluationModel, { IUnit } from '../../models/evaluationModel';
import { Response } from 'express';
import { Request } from '../../types/requestType';
import {
  sendEvaluationFormCustomerReadyMessageSupervisor,
  sendEvaluationFormCustomerReadyMessageTeacher,
  sendEvaluationFormCustomerRequestContact,
  sendEvaluationFormSupervisorReadyMessageCustomer,
  sendEvaluationFormSupervisorReadyMessageTeacher,
  sendEvaluationFormSupervisorRequestContact,
  sendEvaluationFormTeacherReadyMessageCustomer,
  sendEvaluationFormTeacherReadyMessageSupervisor,
  sendEvaluationFormTeacherRequestContactMessageCustomer,
  sendEvaluationFormTeacherRequestContactMessageSupervisor,
  sendRequireEvaluationMessageToCustomer,
  sendRequireEvaluationMessageToSupervisor,
} from '../../mailer/templates/EvaluationForm';
import { AssessmentStatus, EvaluationStatus, ISendEvaluationFormRequestContact, ISelectedValues, IEmails, UserRole } from '../../mailer/types';
import { getUserRole } from '../../mailer/utils';

const fetchEvaluationWithDetails = async (evaluationId: string) => {
  return await EvaluationModel.findById(evaluationId)
    .populate({ path: 'degreeId', select: 'name.fi' })
    .populate('customerId')
    .populate('teacherId')
    .populate('supervisorIds')
    .populate('units');
};

export const sendRequireEvaluationEmails = (
  userRole: string,
  customer: IUser,
  supervisor: IUser,
  evaluationId: string,
  unitId: string,
  unitName: string,
) => {

  switch (userRole) {
    case 'supervisor':
      sendRequireEvaluationMessageToSupervisor(
        'Arviointi vaatii toimenpiteitä',
        supervisor.email,
        supervisor,
        evaluationId,
        unitId,
        unitName,
      );
      break;
    case 'customer':
      sendRequireEvaluationMessageToCustomer(
        'Arviointi vaatii toimenpiteitä',
        customer.email,
        customer,
        evaluationId,
        unitId,
        unitName,
      );
      break;
    default:
      console.error(`Unknown role: ${userRole}`);
  }
};

export const sendReadyEmails = (
  userRole: string,
  formIsReadyParams: any,
  emails: IEmails,

  customerId: string,
  teacherId: string,
  supervisorId: string,

  evaluationId: string,
  unitId: string
): Array<String> => {
  const emailsSendTo: Array<string> = []

  switch (userRole) {
    case 'supervisor':
      sendEvaluationFormSupervisorReadyMessageCustomer(
        { ...formIsReadyParams, customerAssessment: AssessmentStatus.READY, supervisorAssessment: AssessmentStatus.READY },
        'TPO:n valmis lomake',
        emails.customerEmail,
        customerId,
        customerId,
        evaluationId,
        unitId
      );
      sendEvaluationFormSupervisorReadyMessageTeacher(
        { ...formIsReadyParams, customerAssessment: AssessmentStatus.READY, supervisorAssessment: AssessmentStatus.READY },
        'TPO:n valmis lomake',
        emails.teacherEmail,
        customerId,
        teacherId,
        evaluationId,
        unitId
      );

      emailsSendTo.push(emails.customerEmail)
      emailsSendTo.push(emails.teacherEmail)
      break;
    case 'customer':
      sendEvaluationFormCustomerReadyMessageSupervisor(
        { ...formIsReadyParams, customerAssessment: AssessmentStatus.READY, supervisorAssessment: AssessmentStatus.READY },
        'Asiakkaan valmis lomake',
        emails.supervisorEmail,
        customerId,
        supervisorId,
        evaluationId,
        unitId
      );
      sendEvaluationFormCustomerReadyMessageTeacher(
        { ...formIsReadyParams, customerAssessment: AssessmentStatus.READY, supervisorAssessment: AssessmentStatus.READY },
        'Asiakkaan valmis lomake',
        emails.teacherEmail,
        customerId,
        teacherId,
        evaluationId,
        unitId
      );
      emailsSendTo.push(emails.supervisorEmail)
      emailsSendTo.push(emails.teacherEmail)
      break;
    case 'teacher':
      sendEvaluationFormTeacherReadyMessageSupervisor(
        { ...formIsReadyParams, evaluationAccepted: EvaluationStatus.ACCEPTED },
        'Opettajan valmis lomake',
        emails.supervisorEmail,
        customerId,
        supervisorId,
        evaluationId,
        unitId
      );
      sendEvaluationFormTeacherReadyMessageCustomer(
        { ...formIsReadyParams, evaluationAccepted: EvaluationStatus.ACCEPTED },
        'Opettajan valmis lomake',
        emails.customerEmail,
        customerId,
        customerId,
        evaluationId,
        unitId
      );
      emailsSendTo.push(emails.supervisorEmail)
      emailsSendTo.push(emails.customerEmail)
      break;
    default:
      console.error(`Unknown role: ${userRole}`);
  }
  return emailsSendTo
};


interface IrequiresActionObj {
  role: string;
  customer: IUser;
  supervisor: IUser;
  evaluationId: string;
  unitId: string;
}


const updateUnitStatus = (unit: IUnit, requiresActionObj: IrequiresActionObj) => {
  let allAssessmentsCompleted = true;
  let anyAssessmentInProgress = false;

  unit.assessments.forEach((assessment: any) => {
    const { answer, answerTeacher, answerSupervisor } = assessment;
    if ([answer, answerTeacher, answerSupervisor].some(ans => ans === 1 || ans === 2)) {
      anyAssessmentInProgress = true;
    }
    if ([answer, answerTeacher, answerSupervisor].some(ans => ans === 0)) {
      allAssessmentsCompleted = false;
    }
  });

  if (unit.customerReady && !unit.supervisorReady && unit.teacherReady
    || unit.customerReady && !unit.teacherReady && !unit.supervisorReady
    || !unit.customerReady && unit.supervisorReady
    || !unit.customerReady && unit.teacherReady) {
    console.log('set status to 4');
    unit.status = 4;

    if (unit.customerReady && !unit.supervisorReady) {
      sendRequireEvaluationEmails(
        'supervisor',
        requiresActionObj.customer,
        requiresActionObj.supervisor,
        requiresActionObj.evaluationId,
        requiresActionObj.unitId,
        unit.name.fi
      )
    } else {
      sendRequireEvaluationEmails(
        'customer',
        requiresActionObj.customer,
        requiresActionObj.supervisor,
        requiresActionObj.evaluationId,
        requiresActionObj.unitId,
        unit.name.fi
      )
    }



  } else if (unit.customerReady && unit.supervisorReady && !unit.teacherReady) {
    console.log('set status to 2');
    unit.status = 2;
  } else if (unit.teacherReady) {
    unit.status = 3;
    console.log('set status to 3');
  } else if ((allAssessmentsCompleted && unit.customerReady) || unit.customerReady) {
    console.log('set status to 2');
    unit.status = 2;
  } else if (anyAssessmentInProgress) {
    console.log('set status to 1');
    unit.status = 1;
  }

  return unit;
};

export const evaluationCompleted = (evaluation: any): boolean => {
  return (evaluation.units?.length > 0 ? evaluation.units.every((unit: any) => unit.teacherReady === true) : false)
}

export const sendContactRequestEmails = (
  selectedValues: ISelectedValues,
  userRole: UserRole,
  requestContactParams: ISendEvaluationFormRequestContact,
  emails: IEmails,

  customerId: string,
  teacherId: string,
  supervisorId: string,

  evaluationId: string,
  unitId: string
) => {

  const emailsSendTo: Array<string> = []

  if (selectedValues.pyydetaanYhteydenottoaOpettajalta && userRole === 'customer') {
    sendEvaluationFormCustomerRequestContact(
      requestContactParams,
      emails.teacherEmail,
      customerId,
      teacherId,
      evaluationId,
      unitId
    );
    emailsSendTo.push(emails.teacherEmail)
  }
  if (selectedValues.pyydetaanYhteydenottoaOpettajalta && userRole === 'supervisor') {
    sendEvaluationFormSupervisorRequestContact(
      requestContactParams,
      emails.teacherEmail,
      customerId,
      teacherId,
      evaluationId,
      unitId
    );
    emailsSendTo.push(emails.teacherEmail)
  }
  if (selectedValues.pyydetaanYhteydenottoaAsiakkaalta && userRole === 'teacher') {
    sendEvaluationFormTeacherRequestContactMessageCustomer(
      requestContactParams,
      emails.customerEmail,
      customerId,
      customerId,
      evaluationId,
      unitId
    );
    emailsSendTo.push(emails.customerEmail)
  }
  if (selectedValues.pyydetaanYhteydenottoaOhjaajalta && userRole === 'teacher') {
    sendEvaluationFormTeacherRequestContactMessageSupervisor(
      {
        ...requestContactParams,
        vocationalCompetenceName: requestContactParams.unitName,
      },
      emails.supervisorEmail,
      customerId,
      supervisorId,
      evaluationId,
      unitId
    );
    emailsSendTo.push(emails.supervisorEmail)
  }
  return emailsSendTo
};

const handleUserPerformanceEmails = async (req: Request, res: Response) => {
  try {
    const evaluation = await fetchEvaluationWithDetails(req.params.id);

    console.log("____", req.body)

    const {
      updatedUnit,
      selectedValues,
      additionalInfo,
      evaluationId,
      unitId
    } = req.body;

    console.log('evaluationId', evaluationId)
    console.log('unitId', unitId)


    if (!evaluation) {
      return res.status(404).send({ message: 'Evaluation not found' });
    }

    const user = req.user as User;

    const formIsReadyParams = {
      degreeName: evaluation.degreeId?.name?.fi || 'Unknown Degree',
      unitName: updatedUnit?.name?.fi || 'Unknown Unit',
      supervisorName: evaluation.supervisorIds?.[0]?.firstName + ' ' + evaluation.supervisorIds?.[0]?.lastName || 'Unknown Supervisor',
      customerName: evaluation.customerId?.firstName + ' ' + evaluation.customerId?.lastName || 'Unknown Customer',
      additionalInfo: additionalInfo,
      supervisorFirstName: evaluation.supervisorIds?.[0]?.firstName,
      customerFirstName: evaluation.customerId?.firstName,
      teacherFirstName: evaluation.teacherId?.firstName
    };

    console.log("FORM IS READY PARAMS", formIsReadyParams);

    const emails: IEmails = {
      customerEmail: evaluation.customerId?.email || 'Unknown Customer Email',
      teacherEmail: evaluation.teacherId?.email || 'Unknown Teacher Email',
      supervisorEmail: evaluation.supervisorIds?.[0]?.email || 'Unknown Supervisor Email',
    };

    const customerId = (evaluation.customerId as IUser)._id
    const teacherId = (evaluation.teacherId as IUser)._id
    const supervisorId = (evaluation.supervisorIds?.[0] as IUser)._id

    if (selectedValues.suoritusValmis || selectedValues.valmisLahetettavaksi) {
      sendReadyEmails(
        user.role,
        formIsReadyParams,
        emails,

        customerId,
        teacherId,
        supervisorId,

        evaluationId,
        unitId
      );
    }

    const requestContactParams: ISendEvaluationFormRequestContact = {
      degreeName: evaluation.degreeId?.name?.fi || 'Unknown Degree',
      unitName: updatedUnit?.name?.fi || 'Unknown Unit',
      teacherName: evaluation.teacherId?.firstName + ' ' + evaluation.teacherId?.lastName,
      customerName: evaluation.customerId?.firstName + ' ' + evaluation.customerId?.lastName || 'Unknown Customer',
      supervisorName: evaluation.supervisorIds?.[0]?.firstName + ' ' + evaluation.supervisorIds?.[0]?.lastName || 'Unknown Supervisor',
    };

    const userRole: UserRole = getUserRole(user.role)!

    sendContactRequestEmails(
      selectedValues,
      userRole,
      requestContactParams,
      emails,

      customerId,
      teacherId,
      supervisorId,

      evaluationId,
      unitId
    );

    const existingUnits = updatedUnit && evaluation.units.filter((unit: any) => {
      return (unit._id) !== (updatedUnit._id)
    })

    const customer = await userModel.findById(customerId)
    const supervisor = await userModel.findById(supervisorId)

    const requiresActionObj: IrequiresActionObj = {
      role: userRole,
      customer: customer!,
      supervisor: supervisor!,
      evaluationId: evaluationId,
      unitId: unitId,

    }

    evaluation.units = updatedUnit && [
      ...existingUnits,
      updateUnitStatus(updatedUnit, requiresActionObj),
    ];

    evaluation.set({
      workTasks: req.body.workTasks || evaluation.workTasks,
      workGoals: req.body.workGoals || evaluation.workGoals,
      completed: evaluationCompleted(evaluation),
      startDate: req.body.startDate || evaluation.startDate,
      endDate: req.body.endDate || evaluation.endDate,
      units: req.body.units || evaluation.units,
    });

    await evaluation.save();
    res.send(evaluation);
  } catch
  (error) {
    console.log(error);
    res.status(500).send({ message: 'Internal server error' });
  }
};

export default handleUserPerformanceEmails;
