import { Request } from '../../types/requestType';
import { Response } from 'express';
import NotificationModel from '../../models/notificationModel';


const getAllNotificationsByUserId = async (req: Request, res: Response) => {
  try {

    const userId = req.user?._id;

    const notifications = await NotificationModel
      .find({ recipientUserId: userId })
      .populate("recipientUserId")

    res.status(200).json(notifications)

  } catch (error) {
    console.error(res, 500, error, 'Failed to fetch notifications')
    res.status(500).json({ message: 'Failed to fetch notifications' });
  }
}


export default getAllNotificationsByUserId;

