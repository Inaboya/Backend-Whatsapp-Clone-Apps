import express from 'express';
import { verifyEmail, loginUser } from '../controllers/verifyEmail';

const router = express.Router();

router.get('/user/:confirmationCode', verifyEmail);
router.post('/login', loginUser);

export default router;
