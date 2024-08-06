import { Router } from 'express';
import getAllNotificationsByUserId from '../controllers/notificationController/getAllNotificationsByUserId';

const router = Router();

router.get("/notifications/", getAllNotificationsByUserId);

export default router;
