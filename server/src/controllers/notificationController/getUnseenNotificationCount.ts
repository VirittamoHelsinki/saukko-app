import { Response } from 'express';
import NotificationModel from '../../models/notificationModel';


const getUnseenNotificationCount = async (res: Response) => {
  try {
    const unseenCount = await NotificationModel.countDocuments({ isSeen: false });
    res.status(200).json({ count: unseenCount })
  } catch (error) {
    console.error(res, 500, error, 'Failed to get unseen notifications count')
    res.status(500).json({ message: 'Failed to get unseen notifications count' });
  }
}


export default getUnseenNotificationCount;

