import { Response, NextFunction } from 'express';
import { Request } from '../types/requestType';
import jwt from 'jsonwebtoken';
import config from '../utils/config';
import { IJwtPayload } from '../types/jwtPayload';
import userModel from '../models/userModel';

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.tokens?.auth) throw new Error("Unauthorized");

    const verified = jwt.verify(req.tokens.auth, config.JWT_SECRET) as IJwtPayload;
    const user = await userModel.findById(verified.id);

    if (!user) {
      // TODO: THIS SHOULD BE REPORTED
      // Propaply case would be that the removed user try to use non-expired token
      throw new Error("Unauthorized");
    }

    // inject the user in the Request
    req.user = user;

    // if (!req.user.emailVerified) {
    //   const user = await userModel.findOne({ id: verified.id })
    //   const link = user?.generateEmailVerificationLink()
    //   console.log("LINK:", link)
    // }

    next();
  } catch (error) {
    console.error("Err(authMiddleware)", error)
    res.status(401).json({ errorMessage: "Unauthorized" });
  }
}

export default authMiddleware;
