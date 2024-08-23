import mongoose, { Schema, Document, Types } from "mongoose";

export interface INotificationObj {
  recipient: Types.ObjectId;
  customer: Types.ObjectId;
  isRead: boolean;
  isSeen: boolean;
  title: string;
  body: string;
}

export interface INotificationObjDocument extends INotificationObj, Document { }

export const notificationObjSchema = new Schema<INotificationObjDocument>({
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null,
  },
  customer: {
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
  title: {
    type: String
  },
  body: {
    type: String
  },
})

export default mongoose.model<INotificationObjDocument & Document>("NotificationDocument", notificationObjSchema);

