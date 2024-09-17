import { Router } from 'express';
import evaluationController from '../controllers/evaluationController';

const router = Router();

router.post("/evaluation/", evaluationController.create);
router.get("/evaluation/", evaluationController.getAllForCurrentUser);
router.get("/evaluation/:id", evaluationController.getById);
// router.put("/evaluation/:id", evaluationController.update);
router.put("/evaluation2/:id", evaluationController.actualUpdate);
router.put("/evaluation/:id", evaluationController.handleUserPerformanceEmails); // TODO: route makes no sense
router.delete("/evaluation/:id", evaluationController.deleteById);
router.post("/evaluation/sendEmail", evaluationController.sendEmailToTeacher);

export default router;
