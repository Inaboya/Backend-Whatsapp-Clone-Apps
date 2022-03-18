import express from 'express';
import { deleteMessage} from '../controllers/messageController';
import { protect } from '../controllers/verifyEmail';
import { createMessages, getMessages } from '../controllers/messageController';
import { upload } from '../utils/cloud_data/multer-main';
import { getMediaType } from '../controllers/messageController';

const router = express.Router({ mergeParams: true });

// , upload.single('image')
// routers
router.get('/', getMessages);
// router.get('/group/:chatId/messages', getGroupMessages);
router.post('/', upload.single('media'), protect, createMessages);
// delete route
router.delete('/', protect, deleteMessage)

// exported router
export default router
