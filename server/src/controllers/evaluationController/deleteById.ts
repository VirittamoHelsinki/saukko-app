import EvaluationModel from '../../models/evaluationModel';
import { Response } from 'express';
import { Request } from '../../types/requestType';
import { responseWithError } from './helper';

const deleteById = async (req: Request, res: Response) => {
  try {
    const evaluation = await EvaluationModel.findById(req.params.id);
    if (!evaluation) {
      return res.status(404).send({ message: 'Evaluation not found.' });
    }

    await EvaluationModel.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    responseWithError(res, 500, error, 'Failed to delete evaluation');
  }
};

export default deleteById;
