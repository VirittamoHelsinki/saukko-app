/*
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

enum EvaluationStatus {
  ACCEPTED = 'Kyllä',
  REJECTED = 'Ei'
}

enum AssessmentStatus {
  READY = 'Valmis',
  IN_PROGRESS = 'Kesken'
}

const handeUserPerformanceEmails = async (req: Request, res: Response) => {
  console.log('request body: ', req.body)
  try {
    const evaluation = await EvaluationModel.findById(req.params.id)
      .populate({
        path: 'degreeId',
        select: 'name.fi',
      })
      .populate('customerId')
      .populate('teacherId')
      .populate('supervisorIds');
    if (!evaluation) {
      return res.status(404).send({ message: 'Evaluation not found' });
    }

    const params = {
      degreeName: evaluation.degreeId?.name?.fi || 'Unknown Degree',
      unitName: req.body.units?.[0]?.name?.fi || 'Unknown Unit',
      supervisorName: evaluation.supervisorIds?.[0]?.firstName + ' ' + evaluation.supervisorIds?.[0]?.lastName || 'Unknown Supervisor',
      customerName: evaluation.customerId?.firstName + ' ' + evaluation.customerId?.lastName || 'Unknown Customer',
      additionalInfo: req.body.units?.[0]?.assessments?.[0]?.feedback || 'No additional info',
      userEmail: req.user?.email || 'Unknown Email',
    };

    // suoritus valmis
    switch (req.user.role) {
      case 'supervisor':
        sendEvaluationFormTeacherReady(
          {
            ...params,
            customerFirstName: evaluation.customerId?.firstName || 'Unknown Customer First Name',
            evaluationAccepted: EvaluationStatus.ACCEPTED,
          },
          'subject');
        sendEvaluationFormCustomerOrSupervisorReady(
          {
            ...params,
            userFirstName: req.user.firstName,
            customerAssessment: AssessmentStatus.READY,
            supervisorAssessment: AssessmentStatus.READY,
          },
          'subject');
        break;
      case 'customer':
        sendEvaluationFormTeacherReady({
          ...params,
          customerFirstName: '',
          evaluationAccepted: EvaluationStatus.ACCEPTED,
        }, 'subject');
        sendEvaluationFormCustomerOrSupervisorReady({
          ...params,
          userFirstName: '',
          customerAssessment: AssessmentStatus.READY,
          supervisorAssessment: AssessmentStatus.READY,

        }, 'subject');
        break;
      case 'teacher':
        sendEvaluationFormCustomerOrSupervisorReady({
          ...params,
          userFirstName: '',
          customerAssessment: AssessmentStatus.READY,
          supervisorAssessment: AssessmentStatus.READY,

        }, 'subject');
        sendEvaluationFormCustomerOrSupervisorReady({
          ...params,
          userFirstName: '',
          customerAssessment: AssessmentStatus.READY,
          supervisorAssessment: AssessmentStatus.READY,

        }, 'subject');
        break;
    }
    const params2 = {
      userName: req.body.user.firstName + ' ' + req.body.user.lastName,
      userEmail: req.user?.email || 'Unknown Email',
      degreeName: evaluation.degreeId?.name?.fi || 'Unknown Degree',
      unitName: req.body.units?.[0]?.name?.fi || 'Unknown Unit',
    };

    // yhteydenottopyynnöt

    if (req.body.contactRequests && req.body.contactRequests.length > 0) {
      // If contact requests exist, choose one or more recipients from the list
      req.body.contactRequests.forEach(recipient => {
        if (recipient === 'supervisor') {
          sendEvaluationFormTeacherRequestContactMessageSupervisor({
            ...params2,
            customerName: evaluation.customerId?.firstName + ' ' + evaluation.customerId?.lastName || 'Unknown Customer',
            teacherName: evaluation.teacherId?.firstName + ' ' + evaluation.teacherId?.lastName,
            vocationalCompetenceName: '',
          });
        } else if (recipient === 'customer' && req.user.role === 'teacher') {
          sendEvaluationFormTeacherRequestContactMessageCustomer({
            ...params2,
            supervisorName: evaluation.supervisorIds?.[0]?.firstName + ' ' + evaluation.supervisorIds?.[0]?.lastName || 'Unknown Supervisor',
            teacherName: evaluation.teacherId?.firstName + ' ' + evaluation.teacherId?.lastName,
          });
        } else if (recipient === 'teacher' && req.user.role === 'supervisor') {
          sendEvaluationFormSupervisorRequestContact({
            ...params2,
            supervisorName: evaluation.supervisorIds?.[0]?.firstName + ' ' + evaluation.supervisorIds?.[0]?.lastName || 'Unknown Supervisor',
            customerName: evaluation.customerId?.firstName + ' ' + evaluation.customerId?.lastName || 'Unknown Customer',
          });
        } else if (recipient === 'teacher' && req.user.role === 'customer') {
          sendEvaluationFormCustomerRequestContact(
            {
              ...params2,
              supervisorName: evaluation.supervisorIds?.[0]?.firstName + ' ' + evaluation.supervisorIds?.[0]?.lastName || 'Unknown Supervisor',
            },
          );
        }
      });
    }
  } catch (error) {
    console.error('performanceController error: ', error);
  }
};

export default { handeUserPerformanceEmails };
*/
