import { Response } from 'express';
import { Request } from '../types/requestType';
import userModel from '../models/userModel';
import { IJwtPayloadAuth, IJwtPayloadChangePassword, IJwtPayloadVerifyEmail } from '../types/jwtPayload'; 
import mailer from '../utils/mailer';
import jwt from 'jsonwebtoken';
import config from '../utils/config';
import bcrypt from 'bcrypt';
import { PasswordValidator } from '../utils/password';
import { passwordValidationOptions } from '../options';

// TODO: FIX THE LINK
const registerUser = async (req: Request, res: Response) => {
  // Retrieve the request body
  const body = req.body;

  // Validation checks if any of the required fields are empty
  if (!body.email || !body.password) {
    console.log("email or password empty")
    return res.status(400).json({ errorMessage: "Empty Field" });
  }

  // Check if the password is shorter than 6 characters
  if (body.password.length < 6) {
    console.log("password too short")
    return res.status(400).json({ errorMessage: "Password must be longer" });
  }

  // Check if there is an existing user with the same email address
  const existingUser = await userModel.findOne({ email: body.email });
  if (existingUser) {
    console.log("user already exists")
    return res.status(400).json({ errorMessage: "User already exists" });
  }

  // userModel.addProperties(body.role) // add unique properties to the user object based on the role

  try {
    // Create a new user object, with the provided name, email, password and role
    let newUserObject = {
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      role: body.role,
      modified: Math.floor(Date.now() / 1000),
    }

    const newUser = new userModel(newUserObject);

    // set password to the user object
    await newUser.setPassword(body.password)

    // save the user object to the database
    await newUser.save()


    if (newUser.role !== 'supervisor') {
      const verificationToken = newUser.generateEmailVerificationToken();
      const verificationLink = `https://saukko.azurewebsites.net/verify-email/${verificationToken}`;

      // Send verification email
      mailer.sendVerificationEmail(newUser, verificationLink);
      console.log('user created and verification email sent');
    } else {
      console.log('user created without verification email (role: supervisor)');
    }
    res.status(201).json({ userId: newUser._id, message: "User created. Verification email sent." });

  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
}

const _responseWithError = (res: Response, statusCode: number, err: any, optionalMessage?: string) => {
  if (err.message) {
    console.log(err.message)
    res.status(statusCode).json({ errorMessage: err.message })
  } else {
    res.status(statusCode).json({ errorMessage: optionalMessage ?? "unknown error" })
  }
}

const forgotPassword = async (req: Request, res: Response) => {
  // Retrieve the email from the request body
  const { email } = req.body;

  // Check if the email field is empty
  if (!email) {
    console.log("email empty")
    return res.status(400).json({ errorMessage: "Empty Field" });
  }

  // Check if there is an existing user with the provided email address
  const existUser = await userModel.findOne({ email: email });

  // If there is no user with the provided email address, return with no error message
  if (!existUser) {
    console.log("user's email does not exist")
    return res.json({ message: "Password reset link sent to email" });
  }

  try {
    mailer.sendResetPasswordEmail(existUser)
    res.status(200).json({ message: "Password reset link sent to email" })
  } catch (err) {
    return _responseWithError(res, 400, err)
  }
}

const validateToken = async (req: Request, res: Response) => {
  jwt.verify(req.body.token, config.JWT_SECRET, (err: any, decoded: any) => {
    if (err) {
      console.log(err.message)
      return res.status(401).json({ errorMessage: "Invalid token" })
    }
    res.status(200).json({ message: "Token is valid" })
  })
}

const resetPassword = async (req: Request, res: Response) => {
  try {
    // Check the password change token exists
    if (!req.tokens?.changePassword) throw new Error("Token is missing");
  
    // Retrieve the new password from the request body and validate it
    console.log("BODY", req.body)
    const password = req.body.newPassword || null
    const pv = new PasswordValidator()
    const passwordValidatorErrors = pv.validate(password, passwordValidationOptions)
  
    // validate password
    if (passwordValidatorErrors.length) {
      console.log("authController.resetPassword.passwordValidatorError", ...passwordValidatorErrors)
      return res.status(400).json({ errorMessage: `Password validating error: ${passwordValidatorErrors.join(" ")}` })
    }
  
    const decoded = jwt.verify(req.tokens.changePassword, config.JWT_SECRET) as IJwtPayloadChangePassword;
    const user = await userModel.findById(decoded.id);
  
    if (!user) {
      // TODO: This is even that should be reported
      console.log("resetPassword USER_NOT_FOUND")
      return res.status(404).json({ errorMessage: 'User not found' });
    }
  
    // Second factor for token validation, user modifiedTime should be older than the token creation time, that ensured that the token is valid only one time.
    if (user.modified > decoded.iat) { // TODO: 
      console.log("resetPassword SECOND_FACTOR_FAILS", user.modified, decoded.iat)
      return res.status(401).json({
        errorMessage: "Token is expired",
      });
    } else {
      console.log("resetPassword SECOND_FACTOR_SUCCEED", user.modified, decoded.iat)
    }
  
    user.setPassword(password);
    user.modified = Math.floor(Date.now() / 1000);
    user.save();
    console.log("Password successfully changed");
  
    // Get Url based of current environment
    const url = "http://localhost:3000"; // TODO: handle production
  
    return res
      .clearCookie('change-token')
      .status(200)
      .json({ message: "Password reset successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ errorMessage: "Internal" })
  }
}

const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Check if email or password fields are empty
    if (!email || !password) {
      console.log("email or password empty")
      return res.status(400).json({ errorMessage: "Empty Field" });
    }

    // TODO: Validate email and password

    // Check if user with the provided email exists
    const existingUser = await userModel.findOne({ email: email });
    if (!existingUser) {
      console.log("user does not exist")
      return res.status(401).json({ errorMessage: "Incorrect email/password" });
    }

    // Check if the provided password matches the hashed password stored in the database
    const passwordCorrect = await bcrypt.compare(
      password,
      existingUser.passwordHash
    );

    if (!passwordCorrect) {
      console.log("incorrect password")
      return res.status(401).json({ errorMessage: "Incorrect email/password" });
    }

    // Create a token for the user, with the user id, name and role
    const token = await existingUser.generateJWT()

    // Send token via HTTP-only cookie
    res.cookie("token", token, { httpOnly: true }).send(
      console.log("Logged in")
    );
  } catch (err) {
    _responseWithError(res, 500, err, "Internal server error");
  }
}

// TODO: This is pointless, client can just check did the token exists.
const isLoggedIn = async (req: Request, res: Response) => {
  try {
    // Retrieve token from cookies
    const token = req.cookies.token;
    if (!token) {
      console.log("token unverified")
      return res.json({ loggedIn: false });
    }

    // Verify the token using the JWT_SECRET
    const validateUser = jwt.verify(token, config.JWT_SECRET) as IJwtPayloadAuth;

    console.log("validateUser", validateUser)

    // If the token is valid, respond with loggedIn:true and the decoded user information
    res.json({ loggedIn: true, user: validateUser });
  } catch (err) {
    console.error(err)
    // console.error(err.message);
    // If there is an error, respond with loggedIn:false
    res.json({ loggedIn: false });
  }
}

// TODO: This is pointless, client can just remove the token on logout.
const logout = async (req: Request, res: Response) => {
  // Clear the token cookie
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0),
  }).send(console.log("Logged out"));
}

const verifyEmail = async (req: Request, res: Response) => {
  try {
    // Check the request contains the token
    if (!req.tokens?.verifyEmail) throw new Error("Token is missing");

    // Verify the token
    const decoded = jwt.verify(req.tokens.verifyEmail, config.JWT_SECRET) as IJwtPayloadVerifyEmail;

    // Get the user that is related to this token
    const user = await userModel.findById(decoded.id);

    if (!user) {
      // User does not exists
      // TODO: This is even that should be reported
      console.log("verifyEmailm USER_NOT_FOUND")
      return res.status(404).json({ errorMessage: 'User not found' });
    }

    // Second factor for token validation, user modifiedTime should be older than the token creation time, that ensured that the token is valid only one time.
    if (user.modified > decoded.iat) { // TODO: 
      console.log("verifyEmailm SECOND_FACTOR_FAILS", user.modified, decoded.iat)
      return res.status(401).json({
        errorMessage: "Token is expired",
      });
    } else {
      console.log("verifyEmailm SECOND_FACTOR_SUCCEED", user.modified, decoded.iat)
    }

    // Update the state of email verification
    user.emailVerified = true;
    user.modified = Math.floor(Date.now() / 1000);
    await user.save();
    console.log("Email successfully activated");

    // Create password change token
    // can use only once, if user is modified after the token is created, then the token should be useless
    const passwordChanegeToken = user.generateResetPasswordToken();

    // Get Url based of current environment
    const url = "http://localhost:3000"; // TODO: handle production

    // Redirect user to the reset-password page
    console.log("Returning REDIRECT TO", url)
    return res
      .clearCookie('verification-token')
      .cookie("change-token", passwordChanegeToken, { httpOnly: true })
      .json({ redirectURL: `${url}/set-password` });
      // .redirect(`${url}/reset-password`);
  } catch (err) {
    console.log("AuthController.verifyEmail. Token: {", req.tokens?.verifyEmail, "}", err)
    return _responseWithError(res, 500, err, 'Error verifying email');
  }
}

export default {
  registerUser,
  forgotPassword,
  validateToken,
  resetPassword,
  login,
  isLoggedIn,
  logout,
  verifyEmail,
}
