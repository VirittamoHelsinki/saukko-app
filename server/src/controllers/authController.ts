import { Response } from 'express';
import { Request } from '../types/requestType';
import userModel from '../models/userModel';
import { IJwtPayload, useCase } from '../types/jwtPayload';
import jwt from 'jsonwebtoken';
import config from '../utils/config';
import bcrypt from 'bcrypt';
import { PasswordValidator } from '../utils/password';
import { passwordValidationOptions } from '../options';
import { sendVerificationEmail, sendVerificationDoneEmail } from '../mailer/templates/newUserVerification';
import { sendResetPasswordEmail } from '../mailer/templates/resetPassword';

const _responseWithError = (res: Response, statusCode: number, err: any, optionalMessage?: string) => {
  if (err.message) {
    console.log(err.message)
    res.status(statusCode).json({ errorMessage: err.message })
  } else {
    res.status(statusCode).json({ errorMessage: optionalMessage ?? "unknown error" })
  }
}

// TODO: FIX THE LINK
const registerUser = async (req: Request, res: Response) => {
  // Retrieve the request body
  const body = req.body;

  if (req.user && req.user.role !== 'teacher') {
    return res.status(401).json({ errorMessage: 'Forbidden' });
  }

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
    newUser.setPassword(body.password)

    // save the user object to the database
    await newUser.save()


    const verificationLink = newUser.generateEmailVerificationLink();
    console.log('verificationLink: ', verificationLink);
    // Send verification email
    sendVerificationEmail({ userEmail: newUser.email, verificationLink });

    res.status(201).json({ userId: newUser._id, message: 'User created. Verification email sent.' });

  } catch (err) {
    console.error(err);
    res.status(500).send();
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
    const resetPasswordLink = existUser.generateResetPasswordLink();
    console.log("resetPasswordLink:", resetPasswordLink)
    sendResetPasswordEmail({ userFirstName: existUser.firstName, userEmail: existUser.email, resetPasswordLink });
    res.status(200).json({ message: "Password reset link sent to email" })
  } catch (err) {
    return _responseWithError(res, 400, err)
  }
}

// TOKEN-BASED PASWORD CHANGE METHOD (changePassword - token)
const resetPassword = async (req: Request, res: Response) => {
  try {
    // Check the password change token exists
    if (!req.tokens?.changePassword) throw new Error("Token is missing");

    // Retrieve the new password from the request body and validate it
    const password = req.body.newPassword || null
    const pv = new PasswordValidator()
    const passwordValidatorErrors = pv.validate(password, passwordValidationOptions)

    // validate password
    if (passwordValidatorErrors.length) {
      console.log("authController.resetPassword.passwordValidatorError", ...passwordValidatorErrors)
      return res.status(400).json({ errorMessage: `Password validating error: ${passwordValidatorErrors.join(" ")}` })
    }

    const decoded = jwt.verify(req.tokens.changePassword, config.JWT_SECRET) as IJwtPayload;
    const user = req.user ?? await userModel.findById(decoded.id);

    if (!user) {
      // TODO: This is even that should be reported
      console.log("resetPassword USER_NOT_FOUND")
      return res.status(404).json({ errorMessage: 'User not found' });
    }

    // Second factor for token validation, token should be created for password change process
    if (decoded.useCase !== useCase.CHANGE_PASSWORD) {
      return res.status(401).json({
        errorMessage: "Invalid token",
      })
    }

    // Third factor for token validation, user modifiedTime should be older than the token creation time, that ensured that the token is valid only one time.
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

    return res
      .clearCookie('change-token')
      .status(200)
      .json({ message: "Password reset successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ errorMessage: "Internal" })
  }
}

// Request password change token using auth token
const requestPasswordChangeTokenAsUser = async (req: Request, res: Response) => {
  try {
    if (req.user) {
      const { password } = req.body;

      const passwordCorrect = await bcrypt.compare(
        password,
        req.user.passwordHash
      );

      if (passwordCorrect) {
        const t = req.user.generateResetPasswordToken();
        return res
          .status(200)
          .cookie("change-token", t, { httpOnly: true })
          .send();
      }
      return res.status(401).json({ errorMessage: "Invalid password" });;
    }

    throw new Error("Internal")
  } catch (error) {
    console.error("requestPasswordChangeTokenAsUser", error)
    return res.status(500).json({ errorMessage: "internal" })
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

    // Create a tokens for the user
    const tokens = existingUser.generateJWT();

    // Send token via HTTP-only cookie
    res
      .status(200)
      // This token have the same expiration time than auth token and it's accessible from client.
      // So client side can use that token to test, did the user is signed in or not. It is not possible to use that auth_state token for authorization.
      .cookie("auth_state", tokens.info, { httpOnly: false })
      // "token" is "HTTP-Only" token, it is not programmatically accessible from client, but client can add it automatically in requests.
      // It is used for authorize the requests created by the client.
      .cookie("token", tokens.auth, { httpOnly: true })
      .json({ message: "User is signed in" })
  } catch (err) {
    _responseWithError(res, 500, err, "Internal server error");
  }
}

const renewToken = async (req: Request, res: Response) => {
  console.log("RENEW_TOKEN")
  try {
    const existingUser = req.user;
    if (!existingUser) {
      console.log("RENEW_TOKEN: FAIL")
      return res.status(401).json({ errorMessage: 'Unauthorized' })
    }
    // Create a tokens for the user
    const tokens = existingUser.generateJWT();
    console.log("RENEW_TOKEN: OK")
    return res
      .status(200)
      .cookie("auth_state", tokens.info, { httpOnly: false })
      .cookie("token", tokens.auth, { httpOnly: true })
      .send()
  } catch (error) {
    console.log("renewToken was catch an error", error);
    res.status(500).json({
      errorMessage: 'Internal'
    })
  }
}

const logout = async (_req: Request, res: Response) => {
  // Clear the token cookie
  res
    .status(200)
    .clearCookie('token')
    .clearCookie('auth_state')
    .json({ message: "User is signed out" })
}

const verifyEmail = async (req: Request, res: Response) => {
  try {
    // Check the request contains the token
    if (!req.tokens?.verifyEmail) throw new Error("Token is missing");

    // Verify the token
    const decoded = jwt.verify(req.tokens.verifyEmail, config.JWT_SECRET) as IJwtPayload;

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
    sendVerificationDoneEmail({ userEmail: user.email })
    // Create password change token
    // can use only once, if user is modified after the token is created, then the token should be useless
    const passwordChanegeToken = user.generateResetPasswordToken();

    // Get Url based of current environment

    // Redirect user to the reset-password page
    return res
      .clearCookie('verification-token')
      .cookie('change-token', passwordChanegeToken, { httpOnly: true })
      .json({ redirectURL: `${config.APP_URL}/set-password` });
    // .redirect(`${url}/reset-password`);
  } catch (err) {
    console.log("AuthController.verifyEmail. Token: {", req.tokens?.verifyEmail, "}", err)
    return _responseWithError(res, 500, err, 'Error verifying email');
  }
}

const resendEmailVerificationLink = async (req: Request, res: Response) => {
  // Check the request contains the token
  if (!req.tokens?.verifyEmail) throw new Error("Token is missing");

  // Verify the token
  const decoded = jwt.verify(req.tokens.verifyEmail, config.JWT_SECRET) as IJwtPayload;

  // Get the user that is related to this token
  const user = await userModel.findById(decoded.id);

  if (!user) {
    // User does not exists
    // TODO: This is even that should be reported
    console.log("resendEmailVerificationLink USER_NOT_FOUND")
    return res.status(404).json({ errorMessage: 'Invalid token' });
  }

  if (user.emailVerified) {
    return res.status(400).json({ errorMessage: 'Invalid token' });
  }


  if (user.role !== 'supervisor') {
    const verificationLink = user.generateEmailVerificationLink();

    // Send verification email
    sendVerificationEmail({ userEmail: user.email, verificationLink });
    console.log('user created and verification email sent');
  }

  res
    .status(201)
    .json({ message: "Verification email sent." });
}

const getCurrentUser = (req: Request, res: Response) => {
  if (req.user) {
    const { firstName, lastName, email, role, emailVerified, _id } = req.user;

    // Do not send whole user object, like password hash.
    return res.status(200).json({
      id: _id,
      firstName,
      lastName,
      email,
      role,
      emailVerified,
    })
  }

  res.status(401).json({ errorMessage: 'Unauthorized' })
}

export default {
  registerUser,
  forgotPassword,
  // validateToken,
  resetPassword,
  login,
  renew: renewToken,
  logout,
  verifyEmail,
  resendEmailVerificationLink,
  getCurrentUser,
  requestPasswordChangeTokenAsUser,
}
