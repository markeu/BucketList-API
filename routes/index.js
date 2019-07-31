import express from 'express';
import { UsersController } from '../controllers/userControllers';
import validation from '../middlewares/validation';
import bucketListController from '../controllers/bucketListControllers';
import { verifyToken } from '../middlewares/authenticate';

const router = express.Router();

const { signUp, login } = UsersController;
const { createBucketList, getAllbucketLists } = bucketListController;

router.post('/auth/signup', validation.auth, signUp);
router.post('/auth/login', validation.auth, login);
router.post('/bucketlists', verifyToken, createBucketList);
router.get('/bucketLists', getAllbucketLists);
export default router;
