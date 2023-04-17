import { Router } from 'express';
import { login, register } from '../controllers/authController';
import { validate } from '../middlewares/validate';
import { AuthSchema } from '../utils/validationSchemas';

const router = Router();

router.post('/register',validate(AuthSchema),register);
router.post('/login',validate(AuthSchema),login);

export default router;