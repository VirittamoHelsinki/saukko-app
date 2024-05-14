import { Router } from 'express';
import eReqController from '../controllers/eReqController';

const router = Router();

router.get(['/business/:id', '/external/business/:id'], eReqController.getBusinessInfo);

export default router;
