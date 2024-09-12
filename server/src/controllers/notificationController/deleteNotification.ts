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


export default deleteNotificationById;

