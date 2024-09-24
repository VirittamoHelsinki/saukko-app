import { Router } from 'express';
import getAllNotificationsByUserId from '../controllers/notificationController/getAllNotificationsByUserId';
import getNotificationById from '../controllers/notificationController/getNotificationById';
import updateNotificationById from '../controllers/notificationController/updateNotification';
import getUnseenNotificationCountByUserId from '../controllers/notificationController/getUnseenNotificationCountByUserId';
import deleteNotification from '../controllers/notificationController/deleteNotification';

const router = Router();

router.get("/notifications/", getAllNotificationsByUserId);
router.get("/notification/:id", getNotificationById);
router.put("/notification/:id", updateNotificationById);
router.get("/notifications/unseen-count/:id", getUnseenNotificationCountByUserId);
router.delete("/notifications/:id", deleteNotification.deleteNotificationById);
router.delete("/notifications/delete-all/:userId", deleteNotification.deleteNotificationsByUserId);

export default router;
