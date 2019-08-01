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
const { createItem, getAllItem, getSpecificItem, updateItemData, deleteItem } = ItemController;

router.post('/auth/signup', validation.auth, signUp);
router.post('/auth/login', validation.auth, login);
router.post('/bucketLists', verifyToken, createBucketList);
router.get('/bucketLists', getAllbucketLists);
router.get('/bucketLists/:id',verifyToken, getSpecificBucketList);
router.put('/bucketLists/:id', verifyToken, updateBucketList);
router.delete('/bucketLists/:id', verifyToken, deleteBucketlist );
router.post('/bucketLists/:id/items',verifyToken, createItem);
router.get('/bucketLists/:id/items',verifyToken, getAllItem);
router.get('/bucketLists/:id/items/:id',verifyToken, getSpecificItem);
router.put('/bucketLists/:id/items/:id', verifyToken, updateItemData);
router.delete('/bucketLists/:id/items/:id', verifyToken, deleteItem);


export default router;
