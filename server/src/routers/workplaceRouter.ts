import { Router } from 'express';
import workplaceController from '../controllers/workplaceController';
import auth from "../middlewares/middleware.auth"

const router = Router();

router.all("*", auth);
router.get("/workplace", workplaceController.getAllWorkplaces);
router.get("/workplace/:id", workplaceController.getWorkplaceById);
router.delete("/workplace/:id", workplaceController.deleteWorkplaceById);
router.put("/workplace/:id", workplaceController.updateWorkplace);
router.post("/workplace", workplaceController.createWorkplace);

export default router;
