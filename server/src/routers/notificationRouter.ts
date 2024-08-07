import { Router } from 'express';
import getAllNotificationsByUserId from '../controllers/notificationController/getAllNotificationsByUserId';
import getNotificationById from '../controllers/notificationController/getNotificationById';

const router = Router();

router.get("/notifications/", getAllNotificationsByUserId);
router.get("/notification/:id", getNotificationById);

export default router;
