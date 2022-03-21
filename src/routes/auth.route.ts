import { Router } from 'express';
import { signupController } from '../controllers/auth.controller';

const router = Router();

router.post('/sign-up', signupController);

export {
    router
};