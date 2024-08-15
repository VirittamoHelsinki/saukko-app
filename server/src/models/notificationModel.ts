import mongoose, { Schema, Document, Types } from "mongoose";

export interface IContent {
  title: string;
  body: string;
}

export interface IMessage {
  content: IContent;
}

export interface INotificationObj {
  msg: IMessage;
  recipientUserId: Types.ObjectId;
  isRead: boolean;
  isSeen: boolean;
}

export interface INotificationObjDocument extends INotificationObj, Document { }

export const notificationObjSchema = new Schema<INotificationObjDocument>({
  recipientUserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null,
  },
  isRead: {
    type: Boolean,
    required: true,
  },
  isSeen: {
    type: Boolean,
    required: true
  },
  msg: {
    content: {
      title: {
        type: String
      },
      body: {
        type: String
      }
    }
  }
})

export default mongoose.model<INotificationObjDocument & Document>("NotificationDocument", notificationObjSchema);

