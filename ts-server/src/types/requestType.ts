import { Request as ExpressRequest } from 'express'
import { IJwtPayloadAuth } from './jwtPayload'

export interface Request extends  ExpressRequest {
  user?: IJwtPayloadAuth,
  tokens?: {
    auth?: string;
    changePassword?: string;
    verifyEmail?: string;
  }
}
