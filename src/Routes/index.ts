import { Router } from 'express';
import { userRoutes } from './routes.user';
import { authRoutes } from './routes.auth';

const router = Router();

router.use('/auth', authRoutes)
router.use('/users', userRoutes)

export { router };