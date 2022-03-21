import { Router } from 'express';
import { 
    healthCheckController,
    getTimeController
} from '../controllers/common.controller';

const router = Router();

router.get('/health-check', healthCheckController);
router.get('/get-time', getTimeController)

export {
    router
};