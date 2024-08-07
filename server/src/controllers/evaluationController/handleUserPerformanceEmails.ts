import { User } from '../../models/userModel';
import EvaluationModel from '../../models/evaluatuionModel';
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

export const sendReadyEmails = (userRole: string, formIsReadyParams: any, emails: IEmails, userId: string): Array<String> => {

  const emailsSendTo: Array<string> = []

  switch (userRole) {
    case 'supervisor':
      sendEvaluationFormSupervisorReadyMessageCustomer(
        { ...formIsReadyParams, customerAssessment: AssessmentStatus.READY, supervisorAssessment: AssessmentStatus.READY },
        'TPO:n valmis lomake',
        emails.customerEmail,
        userId
      );
      sendEvaluationFormSupervisorReadyMessageTeacher(
        { ...formIsReadyParams, customerAssessment: AssessmentStatus.READY, supervisorAssessment: AssessmentStatus.READY },
        'TPO:n valmis lomake',
        emails.teacherEmail,
        userId
      );

      emailsSendTo.push(emails.customerEmail)
      emailsSendTo.push(emails.teacherEmail)
      break;
    case 'customer':
      sendEvaluationFormCustomerReadyMessageSupervisor(
        { ...formIsReadyParams, customerAssessment: AssessmentStatus.READY, supervisorAssessment: AssessmentStatus.READY },
        'Asiakkaan valmis lomake',
        emails.supervisorEmail,
        userId
      );
      sendEvaluationFormCustomerReadyMessageTeacher(
        { ...formIsReadyParams, customerAssessment: AssessmentStatus.READY, supervisorAssessment: AssessmentStatus.READY },
        'Asiakkaan valmis lomake',
        emails.teacherEmail,
        userId
      );
      emailsSendTo.push(emails.supervisorEmail)
      emailsSendTo.push(emails.teacherEmail)
      break;
    case 'teacher':
      sendEvaluationFormTeacherReadyMessageSupervisor(
        { ...formIsReadyParams, evaluationAccepted: EvaluationStatus.ACCEPTED },
        'Opettajan valmis lomake',
        emails.supervisorEmail,
        userId
      );
      sendEvaluationFormTeacherReadyMessageCustomer(
        { ...formIsReadyParams, evaluationAccepted: EvaluationStatus.ACCEPTED },
        'Opettajan valmis lomake',
        emails.customerEmail,
        userId
      );
      emailsSendTo.push(emails.supervisorEmail)
      emailsSendTo.push(emails.customerEmail)
      break;
    default:
      console.error(`Unknown role: ${userRole}`);
  }
  return emailsSendTo
};

const updateUnitStatus = (units: any) => {
  return units.map((unit: any) => {
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


    if (unit.teacherReady) {
      unit.status = 3;
      console.log('set status to 3')
    } else if ((allAssessmentsCompleted && unit.customerReady) || unit.customerReady) {
      console.log('set status to 2')
      unit.status = 2;
    } else if (anyAssessmentInProgress) {
      console.log('set status to 1')
      unit.status = 1;
    }

    return unit;
  });
};

export const evaluationCompleted = (evaluation: any): boolean => {
  return (evaluation.units?.length > 0 ? evaluation.units.every((unit: any) => unit.teacherReady === true) : false)
}

export const sendContactRequestEmails = (selectedValues: ISelectedValues, userRole: UserRole, requestContactParams: ISendEvaluationFormRequestContact, emails: IEmails, userId: string) => {

  const emailsSendTo: Array<string> = []

  if (selectedValues.pyydetaanYhteydenottoaOpettajalta && userRole === 'customer') {
    sendEvaluationFormCustomerRequestContact(requestContactParams, emails.teacherEmail, userId);
    emailsSendTo.push(emails.teacherEmail)
  }
  if (selectedValues.pyydetaanYhteydenottoaOpettajalta && userRole === 'supervisor') {
    sendEvaluationFormSupervisorRequestContact(requestContactParams, emails.teacherEmail, userId);
    emailsSendTo.push(emails.teacherEmail)
  }
  if (selectedValues.pyydetaanYhteydenottoaAsiakkaalta && userRole === 'teacher') {
    sendEvaluationFormTeacherRequestContactMessageCustomer(requestContactParams, emails.customerEmail, userId);
    emailsSendTo.push(emails.customerEmail)
  }
  if (selectedValues.pyydetaanYhteydenottoaOhjaajalta && userRole === 'teacher') {
    sendEvaluationFormTeacherRequestContactMessageSupervisor({
      ...requestContactParams,
      vocationalCompetenceName: requestContactParams.unitName,
    }, emails.supervisorEmail, userId);
    emailsSendTo.push(emails.supervisorEmail)
  }
  return emailsSendTo
};

const handleUserPerformanceEmails = async (req: Request, res: Response) => {
  try {
    const evaluation = await fetchEvaluationWithDetails(req.params.id);

    if (!evaluation) {
      return res.status(404).send({ message: 'Evaluation not found' });
    }

    const user = req.user as User;

    const formIsReadyParams = {
      degreeName: evaluation.degreeId?.name?.fi || 'Unknown Degree',
      unitName: req.body.units?.[0]?.name?.fi || 'Unknown Unit',
      supervisorName: evaluation.supervisorIds?.[0]?.firstName + ' ' + evaluation.supervisorIds?.[0]?.lastName || 'Unknown Supervisor',
      customerName: evaluation.customerId?.firstName + ' ' + evaluation.customerId?.lastName || 'Unknown Customer',
      additionalInfo: req.body.additionalInfo,
      supervisorFirstName: evaluation.supervisorIds?.[0]?.firstName,
      customerFirstName: evaluation.customerId?.firstName,
      teacherFirstName: evaluation.teacherId?.firstName
    };

    const emails: IEmails = {
      customerEmail: evaluation.customerId?.email || 'Unknown Customer Email',
      teacherEmail: evaluation.teacherId?.email || 'Unknown Teacher Email',
      supervisorEmail: evaluation.supervisorIds?.[0]?.email || 'Unknown Supervisor Email',
    };

    const selectedValues = req.body.selectedValues;

    if (selectedValues.suoritusValmis || selectedValues.valmisLahetettavaksi) {
      sendReadyEmails(user.role, formIsReadyParams, emails, user._id);
    }

    const requestContactParams: ISendEvaluationFormRequestContact = {
      degreeName: evaluation.degreeId?.name?.fi || 'Unknown Degree',
      unitName: req.body.units?.[0]?.name?.fi || 'Unknown Unit',
      teacherName: evaluation.teacherId?.firstName + ' ' + evaluation.teacherId?.lastName,
      customerName: evaluation.customerId?.firstName + ' ' + evaluation.customerId?.lastName || 'Unknown Customer',
      supervisorName: evaluation.supervisorIds?.[0]?.firstName + ' ' + evaluation.supervisorIds?.[0]?.lastName || 'Unknown Supervisor',
    };


    const userRole: UserRole = getUserRole(user.role)

    sendContactRequestEmails(selectedValues, userRole, requestContactParams, emails, user._id);

    evaluation.units = updateUnitStatus(req.body.units);

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
