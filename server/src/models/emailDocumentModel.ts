import mongoose, { Schema, Document, mongo, Types } from "mongoose";

export interface IKontsa {
  subject: string;
  plainText: string;
  html: string;
}

export interface IRecepents {
  to: {
    address: string;
  }[];
}

export interface IMessage {
  content: IKontsa;
  recipients: IRecepents;
}

export interface IEmailObj {
  msg: IMessage;
  recipentUserId: string;
  succeess?: boolean;
  retryCount?: number;
  error?: unknown;
}

export interface IEmailObjDocument extends IEmailObj, Document { }

export const emailObjSchema = new Schema<IEmailObjDocument>({
  recipentUserId: Types.ObjectId,
  error: {
    type: String,
    required: false,
  },
  succeess: {
    type: Boolean,
    default: false,
  },
  retryCount: {
    type: Number,
    default: 0,
  },
  msg: {
    content: {
      subject: {
        type: String
      },
      plainText: {
        type: String
      },
      html: {
        type: String
      },
    }
  }
})

export default mongoose.model<IEmailObjDocument & Document>("EmailDocument", emailObjSchema);
