import { Router } from 'express';
import eReqController from '../controllers/eReqController';

const router = Router();

router.get(['/business/:id', '/external/business/:id'], eReqController.getBusinessInfo);
router.get(['/degrees', '/external/degrees'], eReqController.getAllDegrees);
router.get(['/degree/:id', '/external/degree/:id'], eReqController.getDegreeById);

export default router;
