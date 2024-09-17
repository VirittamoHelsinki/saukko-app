import EvaluationModel from '../../models/evaluationModel';
import { Response } from 'express';
import { Request } from '../../types/requestType';
import UserModel from '../../models/userModel';
import { generateVerificationLink, responseWithError } from './helper';
import {
  ISendNewCustomerAddedEmail,
  ISendNewSupervisorAddedEmail,
  ISendOldSupervisorAddedEmail,
  sendNewCustomerAddedEmail,
  sendNewSupervisorAddedEmail,
  sendOldSupervisorAddedEmail,
} from '../../mailer/templates/addingUserToAgreement';
import { sendVerificationEmail } from '../../mailer/templates/newUserVerification';

// TODO: This does way more than just updates the evaluation
// should be its own thing instead of "update".
const update = async (req: Request, res: Response) => {
  try {
    const evaluation = await EvaluationModel.findById(req.params.id)
      .populate('degreeId')
      .populate('customerId')
      .populate('teacherId')
      .populate('supervisorIds');

    if (!evaluation) {
      return res.status(404).send({ message: 'Evaluation not found' });
    }

    const updatedSupervisorIds = new Set(req.body.supervisorIds || []);
    const existingSupervisorIds = new Set(evaluation.supervisorIds.map((id: any) => id.toString()));

    const newSupervisors = [...updatedSupervisorIds].filter(id => !existingSupervisorIds.has(id));

    if (req.body.supervisorIds) {
      evaluation.supervisorIds = req.body.supervisorIds;
    }

    if (newSupervisors.length > 0) {
      const newSupervisorDetails = await UserModel.find({ _id: { $in: newSupervisors } });

      for (const supervisor of newSupervisorDetails) {
        const verificationLink = generateVerificationLink(supervisor);
        sendVerificationEmail({ userEmail: supervisor.email, verificationLink, recipentUserId: supervisor._id });
      }

      const usersToNotifyIds = [...existingSupervisorIds, evaluation.customerId];
      if (evaluation.teacherId) {
        usersToNotifyIds.push(evaluation.teacherId);
      }

      const usersToNotify = await UserModel.find({ _id: { $in: usersToNotifyIds } });

      const customerParams: ISendNewCustomerAddedEmail = {
        degreeName: 'degreeName',
        supervisorName: 'supervisorName',
        teacherName: 'teacherName',
        verificationLink: 'verificationLink',
        userEmail: 'userEmail',
      };

      const newSupervisorParams: ISendNewSupervisorAddedEmail = {
        userEmail: 'userEmail',
        customerName: 'customerName',
        degreeName: 'degreeName',
        supervisorName: 'supervisorName',
        verificationLink: 'verificationLink'
      };

      const oldSupervisorParams: ISendOldSupervisorAddedEmail = {
        userFirstName: 'userFirstName',
        userEmail: 'userEmail',
        customerName: 'customerName',
        degreeName: 'degreeName',
        teacherName: 'teacherName',
      };

      usersToNotify.forEach(user => {
        switch (user.role) {
          case 'customer':
            sendNewCustomerAddedEmail(customerParams);
            break;
          case 'supervisor':
            sendNewSupervisorAddedEmail(newSupervisorParams);
            break;
          case 'teacher':
            sendOldSupervisorAddedEmail(oldSupervisorParams);
            break;
          default:
            console.error(`Unknown role: ${user.role}`);
        }
      });
    }

    evaluation.set(req.body);
    const savedEvaluation = await evaluation.save();
    res.send(savedEvaluation);
  } catch (error) {
    responseWithError(res, 500, error);
  }
};

export default update;
