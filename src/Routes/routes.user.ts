import { Router } from 'express';
import { UserController } from '../controllers/UserController';
import { verifyJWT } from '../middlewares/JWT';

const userRoutes = Router();

userRoutes.post('/', UserController.create)

userRoutes.use(verifyJWT);

userRoutes.get('/', UserController.index)

export { userRoutes };
