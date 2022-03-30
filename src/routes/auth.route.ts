import { Router } from 'express';
import { signupController, signinController } from '../controllers/auth.controller';

const router = Router();

router.post('/sign-up', signupController);
router.post('/sign-in', signinController);

export {
    router
};