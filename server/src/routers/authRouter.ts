import { Router } from 'express';
import authController from '../controllers/authController';
import auth from '../middlewares/middleware.auth'

const router = Router();

router.post("/forgot-password", authController.forgotPassword);
router.post("/validate-token", authController.validateToken);                           // POINTLESS 🧨
router.post("/reset-password", authController.resetPassword);
router.post("/login", authController.login);
router.get("/get-current-user", authController.getCurrentUser);
router.get("/verify-email", authController.verifyEmail);
router.get("/resend-email-verification", authController.resendEmailVerificationLink)

// Enable auth middleware for specific endpoints
router.post(["/", "/change-password", "/request-pwd-change-token"], auth);
router.get(["/logout"], auth);

// Routes behind the auth middleware
router.post("/", authController.registerUser);                                          // REQUIRE AUTH TOKEN

// User can request password change token
router.post(
  "/request-pwd-change-token",
  authController.requestPasswordChangeTokenAsUser
);
// router.post("/change-password", authController.changePassword);                         // REQUIRE AUTH TOKEN
router.get("/logout", authController.logout);                                           // REQUIRE AUTH TOKEN

export default router;
