import express from 'express';
import app from '../app';
import { getGroupInfo } from '../controllers/userAuthController';
import { protect } from '../controllers/verifyEmail';
import {
  createGroup,
  getAllGroups,
  addOthers,
  getGroup,
} from '../controllers/groupController';
import messageRoutes from './messageRoutes';
import { Message } from '../models/MessageModel';
const upload = require('../multer');

const router = express.Router();

// router
// get route
// router.route("/").get();
router.get('/', protect, getAllGroups);

router.route('/').get(protect, getGroup);

// posts route
router.post('/create', protect, createGroup);
router.post('/:groupId', protect, addOthers);

//get group imfo

router.get('/:groupId', protect, getGroupInfo);
router.get('/', protect, getGroup);

router.use('/:chatId/messages', messageRoutes);
// delete route
router.use('/:chatId/messages/:messageId', messageRoutes);
// exported router
export default router;
