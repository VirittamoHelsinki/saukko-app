import { Response, Request } from 'express';
import NotificationModel from '../../models/notificationModel';


const getUnseenNotificationCountByUserId = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id
    const unseenCount = await NotificationModel.countDocuments({ isSeen: false, recipient: userId });
    res.status(200).json({ count: unseenCount })
  } catch (error) {
    console.error(res, 500, error, 'Failed to get unseen notifications count')
    res.status(500).json({ message: 'Failed to get unseen notifications count' });
  }
}


export default getUnseenNotificationCountByUserId;

