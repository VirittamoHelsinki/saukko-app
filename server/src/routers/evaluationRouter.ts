import { Router } from 'express';
import evaluationController from '../controllers/evaluationController';

const router = Router();

router.post("/evaluation/", evaluationController.create);
router.get("/evaluation/", evaluationController.getAll);
router.get("/evaluation/:id", evaluationController.getById);
router.put("/evaluation/:id", evaluationController.update);
router.delete("/evaluation/:id", evaluationController.deleteById);
router.post("/evaluation/sendEmail", evaluationController.sendEmailToTeacher);

export default router;
