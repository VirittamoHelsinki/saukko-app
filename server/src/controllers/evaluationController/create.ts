import UserModel from '../../models/userModel';
import EvaluationModel from '../../models/evaluationModel'; // TODO: Typo in filename
import { Response } from 'express';
import { Request } from '../../types/requestType';
import { sendVerificationEmail } from '../../mailer/templates/newUserVerification';
import { fetchDegree, generateVerificationLink, mapCriteria, responseWithError } from './helper';

const create = async (req: Request, res: Response) => {
  const evaluationData = req.body;
  console.log('evaluationData:', evaluationData)
  return;

  //TODO: add email to teacher

  try {
    if (req.body.supervisorId) {
      req.body.supervisorIds = [req.body.supervisorId];
      delete req.body.supervisorId;
    }

    evaluationData.units = evaluationData.units || [];

    const degree = await fetchDegree(evaluationData.degreeId);

    evaluationData.units = evaluationData.units.map((unit: any) => mapCriteria(unit, degree));

    const evaluation = new EvaluationModel(evaluationData);
    await evaluation.save();

    if (evaluation.supervisorIds && evaluation.supervisorIds.length > 0) {
      evaluation.supervisorIds.forEach(async (supervisorId) => {
        try {
          const supervisor = await UserModel.findById(supervisorId);
          if (supervisor) {
            const verificationLink = generateVerificationLink(supervisor);
            sendVerificationEmail({ userEmail: supervisor.email, verificationLink, recipentUserId: supervisor._id });
          }
        } catch (userError) {
          console.error('Error fetching supervisor for notification: ', userError);
        }
      });
    }

    res.status(201).send(evaluation);
  } catch (error) {
    responseWithError(res, 400, error);
  }
};

export default create;
