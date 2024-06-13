import UserModel, { User } from '../../models/userModel';
import { Request } from '../../types/requestType';
import { Response } from 'express';
import EvaluationModel from '../../models/evaluatuionModel';
import { responseWithError } from './helper';

const getAllForCurrentUser = async (req: Request, res: Response) => {
  try {
    const user = req.user as User;

    const getFilter = () => {
      switch (user.role) {
        case 'customer':
          return { customerId: user.id };
        case 'teacher':
          return { teacherId: user.id };
        case 'supervisor':
          return { supervisorIds: { '$in': [user.id] } };
        default:
          throw new Error('Unknown role');
      }
    };

    const evaluations = await EvaluationModel.find(getFilter())
      .populate('customerId', 'firstName lastName email')
      .populate('teacherId', 'firstName lastName')
      .populate('supervisorIds', 'firstName lastName email')
      .populate('workplaceId');

    res.send(evaluations);
  } catch (error) {
    responseWithError(res, 500, error, 'Failed to fetch evaluations');
  }
}

export default getAllForCurrentUser;
