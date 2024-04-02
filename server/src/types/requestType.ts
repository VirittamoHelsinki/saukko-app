import { Request as ExpressRequest } from 'express'
import { User } from '../models/userModel';

export interface Request extends  ExpressRequest {
  user?: User,
  tokens?: {
    auth?: string;
    changePassword?: string;
    verifyEmail?: string;
  }
}
