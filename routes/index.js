import express from 'express';
import { UsersController } from '../controllers/userControllers';
import validation from '../middlewares/validation';
import bucketListController from '../controllers/bucketListControllers';
import { verifyToken } from '../middlewares/authenticate';
import ItemController from '../controllers/itemController';

const router = express.Router();

const { signUp, login } = UsersController;
const { createBucketList, getAllbucketLists, getSpecificBucketList, 
        updateBucketList, deleteBucketlist } = bucketListController;
const { createItem, getAllItem, getSpecificItem, updateItemData } = ItemController;

router.post('/auth/signup', validation.auth, signUp);
router.post('/auth/login', validation.auth, login);
router.post('/bucketlists', verifyToken, createBucketList);
router.get('/bucketLists', getAllbucketLists);
router.get('/bucketLists/:id', getSpecificBucketList);
router.put('/bucketLists/:id', verifyToken, updateBucketList);
router.delete('/bucketLists/:id', verifyToken, deleteBucketlist );
router.post('/bucketlists/:id/items',verifyToken, createItem);
router.get('/bucketlists/:id/items', getAllItem);
router.get('/bucketlists/:id/items/:id', getSpecificItem);
router.put('/bucketlists/:id/items/:id', verifyToken, updateItemData);


export default router;
