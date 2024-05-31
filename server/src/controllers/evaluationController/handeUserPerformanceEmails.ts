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
import { AssessmentStatus, EvaluationStatus, ISendEvaluationFormRequestContact } from '../../mailer/types';

const fetchEvaluationWithDetails = async (evaluationId: string) => {
  return await EvaluationModel.findById(evaluationId)
    .populate({ path: 'degreeId', select: 'name.fi' })
    .populate('customerId')
    .populate('teacherId')
    .populate('supervisorIds')
    .populate('units');
};

const sendReadyEmails = (userRole: string, formIsReadyParams: any, emails: any) => {
  switch (userRole) {
    case 'supervisor':
      sendEvaluationFormSupervisorReadyMessageCustomer(
        { ...formIsReadyParams, customerAssessment: AssessmentStatus.READY, supervisorAssessment: AssessmentStatus.READY },
        'TPO:n valmis lomake',
        emails.customerEmail
      );
      sendEvaluationFormSupervisorReadyMessageTeacher(
        { ...formIsReadyParams, customerAssessment: AssessmentStatus.READY, supervisorAssessment: AssessmentStatus.READY },
        'TPO:n valmis lomake',
        emails.teacherEmail
      );
      break;
    case 'customer':
      sendEvaluationFormCustomerReadyMessageSupervisor(
        { ...formIsReadyParams, customerAssessment: AssessmentStatus.READY, supervisorAssessment: AssessmentStatus.READY },
        'Asiakkaan valmis lomake',
        emails.supervisorEmail
      );
      sendEvaluationFormCustomerReadyMessageTeacher(
        { ...formIsReadyParams, customerAssessment: AssessmentStatus.READY, supervisorAssessment: AssessmentStatus.READY },
        'Asiakkaan valmis lomake',
        emails.teacherEmail
      );
      break;
    case 'teacher':
      sendEvaluationFormTeacherReadyMessageSupervisor(
        { ...formIsReadyParams, evaluationAccepted: EvaluationStatus.ACCEPTED },
        'Opettajan valmis lomake',
        emails.supervisorEmail
      );
      sendEvaluationFormTeacherReadyMessageCustomer(
        { ...formIsReadyParams, evaluationAccepted: EvaluationStatus.ACCEPTED },
        'Opettajan valmis lomake',
        emails.customerEmail
      );
      break;
    default:
      console.error(`Unknown role: ${userRole}`);
  }
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

    if ((allAssessmentsCompleted && unit.ready) || unit.ready) {
      unit.status = 2;
    } else if (anyAssessmentInProgress) {
      unit.status = 1;
    }

    return unit;
  });
};

const sendContactRequestEmails = (selectedValues: any, userRole: string, requestContactParams: ISendEvaluationFormRequestContact, emails: any) => {
  if (selectedValues.pyydetaanYhteydenottoaOpettajalta && userRole === 'customer') {
    sendEvaluationFormCustomerRequestContact(requestContactParams, emails.teacherEmail);
  }
  if (selectedValues.pyydetaanYhteydenottoaOpettajalta && userRole === 'supervisor') {
    sendEvaluationFormSupervisorRequestContact(requestContactParams, emails.teacherEmail);
  }
  if (selectedValues.pyydetaanYhteydenottoaAsiakkaalta && userRole === 'teacher') {
    sendEvaluationFormTeacherRequestContactMessageCustomer(requestContactParams, emails.customerEmail);
  }
  if (selectedValues.pyydetaanYhteydenottoaOhjaajalta && userRole === 'teacher') {
    sendEvaluationFormTeacherRequestContactMessageSupervisor({
      ...requestContactParams,
      vocationalCompetenceName: requestContactParams.unitName,
    }, emails.supervisorEmail);
  }
};

const handeUserPerformanceEmails = async (req: Request, res: Response) => {
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
    };

    const emails = {
      customerEmail: evaluation.customerId?.email || 'Unknown Customer Email',
      teacherEmail: evaluation.teacherId?.email || 'Unknown Teacher Email',
      supervisorEmail: evaluation.supervisorIds?.[0]?.email || 'Unknown Supervisor Email',
    };

    const selectedValues = req.body.selectedValues;

    if (selectedValues.suoritusValmis) {
      sendReadyEmails(user.role, formIsReadyParams, emails);
    }

    const requestContactParams: ISendEvaluationFormRequestContact = {
      degreeName: evaluation.degreeId?.name?.fi || 'Unknown Degree',
      unitName: req.body.units?.[0]?.name?.fi || 'Unknown Unit',
      teacherName: evaluation.teacherId?.firstName + ' ' + evaluation.teacherId?.lastName,
      customerName: evaluation.customerId?.firstName + ' ' + evaluation.customerId?.lastName || 'Unknown Customer',
      supervisorName: evaluation.supervisorIds?.[0]?.firstName + ' ' + evaluation.supervisorIds?.[0]?.lastName || 'Unknown Supervisor',
    };

    sendContactRequestEmails(selectedValues, user.role, requestContactParams, emails);

    evaluation.units = updateUnitStatus(req.body.units);

    evaluation.set({
      workTasks: req.body.workTasks || evaluation.workTasks,
      workGoals: req.body.workGoals || evaluation.workGoals,
      completed: req.body.completed !== undefined ? req.body.completed : evaluation.completed,
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

export default handeUserPerformanceEmails;
