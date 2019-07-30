import express from 'express';
import { UsersController } from '../controllers/userControllers';
import validation from '../middlewares/validation';

const router = express.Router();

const { signUp, login } = UsersController;

router.post('/auth/signup', validation.auth, signUp);
router.post('/auth/login', validation.auth, login);
router.post('/bucketlists',)
export default router;
