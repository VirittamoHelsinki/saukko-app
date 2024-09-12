import { Router } from 'express';
import userController from '../controllers/userController';

const router = Router();

router.get('/users', userController.getAllUsers);

export default router;