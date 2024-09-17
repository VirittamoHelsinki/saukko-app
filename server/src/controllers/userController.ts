import { Response } from 'express';
import { Request } from '../types/requestType';
import userModel from '../models/userModel';

const getAllUsers = async (req: Request, res: Response) => {
  try {
      const query = req.query;
      const users = await userModel.find(query);
      res.status(200).json(users);

  } catch (error) {
      res.status(500).json({ message: 'Error fetching users', error });
  }
};

export default { getAllUsers };