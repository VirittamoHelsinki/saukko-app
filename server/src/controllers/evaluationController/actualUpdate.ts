import { Response } from 'express';
import { Request } from '../../types/requestType';
import EvaluationModel from '../../models/evaluationModel';

const updateEvaluation = async (req: Request, res: Response) => {
  try {
    const evaluationId = req.params.id;
    const updatedData = req.body;

    const updatedEvaluation = await EvaluationModel.findByIdAndUpdate(evaluationId, updatedData, { new: true })

    res.status(200).send(updatedEvaluation);
  } catch (error) {
    res.status(500).json({
      message: 'Error updating user', error
    })
  }
}

export default updateEvaluation;