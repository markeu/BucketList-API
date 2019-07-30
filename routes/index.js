import express from 'express';
import { UsersController } from '../controllers/userControllers';
import validation from '../middlewares/validation';

const router = express.Router();

const { signUp } = UsersController;

router.post('/auth/signup', validation.auth, signUp);

export default router;
