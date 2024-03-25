import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '../utils/config';

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  // Function to authenticate user
  try {
    const token = req.cookies.token; // Extracting token from cookies
    if (!token)
      return res.status(401).json({ errorMessage: "Unauthorized" }); // Check if token is missing

    const verified = jwt.verify(token, config.JWT_SECRET); // Verify token using JWT_SECRET
    // TODO: Create dependency injection is needed
    // req.user = verified.user; // Assign verified user to request object

    next(); // Calling the 'next' function to pass control to the next middleware function
  } catch (err) {
    console.error(err);
    res.status(401).json({ errorMessage: "Unauthorized" });
  }
}

export default authMiddleware;
