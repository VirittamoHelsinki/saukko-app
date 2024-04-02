import { Router } from 'express';
import degreeController from '../controllers/degreeController';
import auth from '../middlewares/middleware.auth'

const router = Router();

router.all("*", auth);

router.get("/internal/degrees", degreeController.getAll);
router.get("/internal/degree/:id", degreeController.getById);
router.post("/internal/degrees", degreeController.create);

export default router;
