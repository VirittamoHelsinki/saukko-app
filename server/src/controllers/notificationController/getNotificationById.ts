import { Request } from '../../types/requestType';
import { Response } from 'express';
import NotificationModel from '../../models/notificationModel';


const getNotificationById = async (req: Request, res: Response) => {
  try {

    const notificationId = req.params.notificationId

    const notification = await NotificationModel.findById(notificationId)

    res.status(200).json(notification)

  } catch (error) {
    console.error(res, 500, error, 'Failed to fetch notificattion')
    res.status(500).json({ message: 'Failed to fetch notification' });
  }
}


export default getNotificationById;

