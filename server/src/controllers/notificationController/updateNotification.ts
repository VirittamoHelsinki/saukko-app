import { Request } from '../../types/requestType';
import { Response } from 'express';
import NotificationModel from '../../models/notificationModel';


const updateNotificationById = async (req: Request, res: Response) => {
  try {

    const notificationId = req.params.id;

    const updatedData = req.body;

    const updatedNotification = await NotificationModel
      .findByIdAndUpdate(
        notificationId,
        updatedData,
        { new: true }
      );

    if (!updatedNotification) {
      return res.status(200).json({ message: 'Notification not found' })
    }

    return res.status(200).json(updatedNotification)

  } catch (error) {
    console.error('Failed to update notification:', error);
    res.status(500).json({ message: 'Failed to update notification' })
  }
}


export default updateNotificationById;

