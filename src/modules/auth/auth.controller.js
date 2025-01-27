
import { Router } from 'express'
import * as registrationService from './service/registration.service.js';
import { login } from './service/login.service.js';
import { validation } from '../../middleware/validation.middleware.js';
import { signUp } from './auth.validation.js';

const router = Router();
router.post("/signup",validation(signUp) ,registrationService.signup)
router.patch("/confirm-email", registrationService.confirmEmail)
router.get("/login", login)

export default router