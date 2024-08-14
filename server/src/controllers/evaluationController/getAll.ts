import EvaluationModel from '../../models/evaluationModel';
import { Response } from 'express';
import { responseWithError } from './helper';

const getAll = async (req: Request, res: Response) => {
  try {
    const evaluations = await EvaluationModel.find()
      .populate('customerId', 'firstName lastName email')
      .populate('teacherId', 'firstName lastName')
      .populate('supervisorIds', 'firstName lastName email')
      .populate("degreeId")
      .populate('workplaceId');

    res.send(evaluations);
  } catch (error) {
    responseWithError(res, 500, error, 'Failed to fetch evaluations');
  }
}

export default getAll;
