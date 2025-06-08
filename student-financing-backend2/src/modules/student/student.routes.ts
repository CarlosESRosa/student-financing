import { Router } from 'express';
import { registerStudent, loginStudent, getProfile, updateProfile } from './student.controller';
import { authMiddleware } from '../../core/middlewares/auth.middleware';
import { validate } from '../../core/middlewares/validate.middleware';
import { studentSchema } from './student.schema';

const router = Router();

router.post('/register', validate(studentSchema.create), registerStudent);
router.post('/login', validate(studentSchema.login), loginStudent);
router.get('/me', authMiddleware, getProfile);
router.put('/me', authMiddleware, validate(studentSchema.update), updateProfile);

export default router;
