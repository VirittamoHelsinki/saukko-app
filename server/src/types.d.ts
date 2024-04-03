import express from 'express';
import { IJwtPayload } from './models/userModel';

declare global {
  namespace Express {
    export interface Request {
      user?: IJwtPayload,
    }
  }
}
