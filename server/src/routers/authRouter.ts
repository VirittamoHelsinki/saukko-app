import { Router } from 'express';
import authController from '../controllers/authController';

const router = Router();

router.post("/", authController.registerUser);
router.post("/forgot-password", authController.forgotPassword);
router.post("/validate-token", authController.validateToken);
router.post("/reset-password", authController.resetPassword);
router.post("/login", authController.login);
router.get("/get-current-user", authController.getCurrentUser);
router.get("/logout", authController.logout);
router.get("/verify-email", authController.verifyEmail);
router.get("/resend-email-verification", authController.resendEmailVerificationLink)

export default router;
