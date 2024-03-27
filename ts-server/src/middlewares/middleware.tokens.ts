import { Response, NextFunction } from 'express';
import { Request } from '../types/requestType';

const tokensMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log("Cookies", req.cookies)
    const auth: string|undefined = req.cookies.token;
    const changePassword: string|undefined = req.cookies["change-token"];
    const verifyEmail = req.headers["verification-token"] as string|undefined;

    req.tokens = {
      auth,
      changePassword,
      verifyEmail
    }

    // console.log(`TOKENS\nauth: ${auth}\nchangePassword: ${changePassword}\nverifyEmail: ${verifyEmail}`);


    next();
  } catch (error) {
    console.log("Error happened while trying to set cookies in tokensMiddleware");
    res.status(500).json({ errorMessage: "Internal" })
  }
}

export default tokensMiddleware;
