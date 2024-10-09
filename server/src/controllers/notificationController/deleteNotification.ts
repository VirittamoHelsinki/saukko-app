import { Request } from '../../types/requestType';
import { Response } from 'express';
import NotificationModel from '../../models/notificationModel';


const deleteNotificationById = async (req: Request, res: Response) => {
  try {

    const notificationId = req.params.id;
    const notification = await NotificationModel.findByIdAndDelete(notificationId);

    console.log(`deleted notification ${notification?._id} successfully`)

    res.status(200).json(notification)

  } catch (error) {
    console.error(res, 500, error, 'Failed to delete notification')
    res.status(500).json({ message: 'Failed to delete notification' });
  }
}

const deleteNotificationsByUserId = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;

    // Use deleteMany to remove all notifications matching the userId in one go
    const result = await NotificationModel.deleteMany({
      $or: [
        { customer: userId },
        { recipient: userId },
      ],
    });

    // result.deletedCount contains the number of deleted documents
    res.status(200).json({ deletedCount: result.deletedCount });

  } catch (error) {
    console.error('Failed to delete notifications', error);
    res.status(500).json({ message: 'Failed to delete notifications' });
  }
}

export default
  {
    deleteNotificationById,
    deleteNotificationsByUserId
  };

