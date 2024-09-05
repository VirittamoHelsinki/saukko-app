import mongoose, { Schema, Document, Types } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from '../utils/config'
import { IJwtPayload, useCase } from "../types/jwtPayload";
import { IDegree } from './degreeModel';

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  passwordHash: string;
  role: string;
  permissions: string
  degrees: Types.Array<Types.ObjectId> | Types.Array<IDegree>;
  emailVerified: boolean;
  modified: number; // UNIX-timestamp in seconds
  evaluationId?: Types.ObjectId;
  workplaceId?: Types.ObjectId;
  isArchived: boolean;
  isValidPassword: (password: string) => boolean;
  generateEmailVerificationToken: () => string;
  generateEmailVerificationLink: () => string;
  setPassword: (password: string) => void;
  generateResetPasswordToken: () => string;
  generateResetPasswordLink: () => string;
  generateJWT: () => { info: string; auth: string };
  addProperties: () => void;
}

export type User = (Document<unknown, {}, IUser & Document<any, any, any>> & IUser & Document<any, any, any> & {
  _id: Types.ObjectId;
});

export const userSchema = new Schema<IUser>({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  modified: {
    type: Number,
    required: true,
    default: Math.floor(Date.now() / 1000),
  },
  passwordHash: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum: ['customer', 'admin', 'teacher', 'supervisor'],
  },
  permissions: {
    type: String,
    required: true,
    enum: ['admin', 'user'],
    default: 'user'
  },
  degrees: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Degree',
  }],
  emailVerified: {
    type: Boolean,
    default: false,
  },
  evaluationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Evaluation', // Reference to the Evaluation model
    default: null,
  },
  workplaceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Workplace', // Reference to the Workplace model
    default: null,
  },
  isArchived: {
    type: Boolean,
    default: false,
  }
});

// method to check if password is correct
userSchema.methods.isValidPassword = function(password: string) {
  bcrypt.compareSync(password, this.passwordHash)
}

// method to generate email verification token
userSchema.methods.generateEmailVerificationToken = function() {
  return jwt.sign(
    {
      id: this._id,
      useCase: useCase.VERIFY_EMAIL,
    },
    config.JWT_SECRET,
    { expiresIn: '1d' }
  );
};

userSchema.methods.generateEmailVerificationLink = function() {
  return `${config.APP_URL
    }/verify-email/${this.generateEmailVerificationToken()}`
}

// method to set passwordHash
userSchema.methods.setPassword = function setPassword(password: string) {
  this.passwordHash = bcrypt.hashSync(password, 10);
};

// method to generate reset-password token
userSchema.methods.generateResetPasswordToken =
  function generateResetPasswordToken() {
    return jwt.sign(
      {
        id: this._id,
        useCase: useCase.CHANGE_PASSWORD,
      },
      config.JWT_SECRET,
      { expiresIn: '1h' }
    );
  };



// method to generate reset-password token and link
userSchema.methods.generateResetPasswordLink =
  function generateResetPasswordLink() {
    return `${config.APP_URL}/reset-password/${this.generateResetPasswordToken()}`
  }

// method to generate JWT token for authentication
userSchema.methods.generateJWT = function generateJWT() {

  return {
    auth: jwt.sign(
      {
        id: this._id,
        useCase: useCase.AUTH,
        role: this.role,
        verified: this.emailVerified,
      },
      config.JWT_SECRET,
      { expiresIn: '3d' }
    ),
    info: jwt.sign(
      {
        id: this._id,
        useCase: useCase.INFO,
      },
      config.JWT_SECRET,
      { expiresIn: '3d' }
    ),
  };
};

// Transform the returned object to remove the passwordHash and __v properties
userSchema.set('toJSON', {
  transform: (_, returnedObject) => {
    delete returnedObject.__v;
    delete returnedObject.passwordHash;
  },
});

export default mongoose.model<IUser & Document>("User", userSchema);
