import EvaluationModel from '../../models/evaluatuionModel';
import { Request } from '../../types/requestType';
import { fetchDegree, mapCriteria, responseWithError } from './helper';
import { Response } from 'express';


const getById = async (req: Request, res: Response) => {
  try {
    const evaluation = await EvaluationModel.findById(req.params.id)
      .populate('customerId', 'firstName lastName')
      .populate('teacherId', 'firstName lastName')
      .populate('supervisorIds', 'firstName lastName')
      .populate('workplaceId');

    if (!evaluation) {
      return res.status(404).send({ message: 'Evaluation not found.' });
    }

    const degree = await fetchDegree(evaluation.degreeId);
    evaluation.toObject().units = evaluation.units.map((unit: any) => mapCriteria(unit, degree));

    res.status(200).send(evaluation);
  } catch (error) {
    responseWithError(res, 500, error);
  }
};

export default getById;
