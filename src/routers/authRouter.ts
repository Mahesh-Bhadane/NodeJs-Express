import { Router } from 'express';
import { login, register } from '../controllers/authController';
import  {validate}  from '../middlewares/validate';
import { LogSchema, RegSchema } from '../utils/validationSchemas';

const router = Router();

router.post('/register',validate(RegSchema),register);
router.post('/login',validate(LogSchema),login);

export default router;