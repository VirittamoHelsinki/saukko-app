import { Request, Response } from 'express';
import {
  sendEvaluationFormCustomerRequestContact,
  sendEvaluationFormSupervisorRequestContact,
  sendEvaluationFormTeacherRequestContactMessageCustomer,
  sendEvaluationFormTeacherRequestContactMessageSupervisor,
  sendEvaluationFormCustomerOrSupervisorReady,
  sendEvaluationFormTeacherReady,
} from '../mailer/templates/EvaluationForm';
import EvaluationModel from '../models/evaluatuionModel';

enum role {
  customer = 'customer',
  teacher = 'teacher',
  supervisor = 'supervisor',
}

interface RequestWithContact {
  id: number;
  role: role;
  supervisor: { email: string };
  customer: { email: string };
  teacher: { email: string };
  contactRequests?: ('customer' | 'teacher' | 'supervisor')[];
}

interface Evaluation {
  degreeName: string,
  unitName: string,
  supervisorName: string,
  userFirstName: string,
  userLastName: string,
  customerName: string,
  vocationalCompetenceName: '',
  additionalInfo: '',
}

enum EvaluationStatus {
  ACCEPTED = 'Kyllä',
  REJECTED = 'Ei'
}

enum AssessmentStatus {
  READY = 'Valmis',
  IN_PROGRESS = 'Kesken'
}

const saveUserPerformance = async (req: Request, res: Response) => {
  // const { request } = req.body as { request: RequestWithContact, evaluation: Evaluation };
  // TODO: error handling
  const evaluation = await EvaluationModel.findById(req.params.id);

  switch (req.user.role) {
    case 'supervisor':
      sendEvaluationFormTeacherReady(
        {
          customerFirstName: '', //evaluation.customerId.firstName
          customerName: '', //evaluation.customerId.firstName + evaluation.customerId.lastName
          supervisorName: '',
          degreeName: '',
          unitName: '',
          evaluationAccepted: EvaluationStatus.ACCEPTED,
          additionalInfo: '',
          userEmail: '',
        },
        'subject');
      sendEvaluationFormCustomerOrSupervisorReady(
        {
          userFirstName: '',
          customerName: '',
          supervisorName: '',
          degreeName: '',
          unitName: '',
          customerAssessment: AssessmentStatus.READY,
          supervisorAssessment: AssessmentStatus.READY,
          additionalInfo: '',
          userEmail: '',
        },
        'subject');
      break;
    case 'customer':
      sendEvaluationFormTeacherReady({
        customerFirstName: '',
        customerName: '',
        supervisorName: '',
        degreeName: '',
        unitName: '',
        evaluationAccepted: EvaluationStatus.ACCEPTED,
        additionalInfo: '',
        userEmail: ''
      },"subject");
      sendEvaluationFormCustomerOrSupervisorReady({
        userFirstName: '',
        customerName: '',
        supervisorName: '',
        degreeName: '',
        unitName: '',
        customerAssessment: AssessmentStatus.READY,
        supervisorAssessment: AssessmentStatus.READY,
        additionalInfo: '',
        userEmail: '',
      },"subject");
      break;
    case 'teacher':
      sendEvaluationFormCustomerOrSupervisorReady({
        userFirstName: '',
        customerName: '',
        supervisorName: '',
        degreeName: '',
        unitName: '',
        customerAssessment: AssessmentStatus.READY,
        supervisorAssessment: AssessmentStatus.READY,
        additionalInfo: '',
        userEmail: '',
      },"subject");
      sendEvaluationFormCustomerOrSupervisorReady({
        userFirstName: '',
        customerName: '',
        supervisorName: '',
        degreeName: '',
        unitName: '',
        customerAssessment: AssessmentStatus.READY,
        supervisorAssessment: AssessmentStatus.READY,
        additionalInfo: '',
        userEmail: '',
      }, "subject");
      break;
  }

  if (request.contactRequests && request.contactRequests.length > 0) {
    // If contact requests exist, choose one or more recipients from the list
    request.contactRequests.forEach(recipient => {
      if (recipient === 'supervisor') {
        sendEvaluationFormTeacherRequestContactMessageSupervisor({
          userName: '',
          userEmail: '',
          customerName: '',
          degreeName: '',
          unitName: '',
          teacherName: '',
          vocationalCompetenceName: ''
        });
      } else if (recipient === 'customer' && request.role === 'teacher') {
        sendEvaluationFormTeacherRequestContactMessageCustomer({
          userName: '',
          userEmail: '',
          degreeName: '',
          unitName: '',
          supervisorName: '',
          teacherName: ''
        });
      } else if (recipient === 'teacher' && request.role === 'supervisor') {
        sendEvaluationFormSupervisorRequestContact({
          userName: '',
          userEmail: '',
          degreeName: '',
          unitName: '',
          supervisorName: '',
          customerName: '',
        });
      } else if (recipient === 'teacher' && request.role === 'customer') {
        sendEvaluationFormCustomerRequestContact(
          {
            userName: '',
            userEmail: '',
            degreeName: '',
            unitName: '',
            supervisorName: '',
          }
        );
      }
    });
  }

};

export { saveUserPerformance };
