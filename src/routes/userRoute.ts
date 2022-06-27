import express from 'express';
import {
  forgotPassword,
  resetPassword,
  changePassword,
} from '../controllers/passwordController';
import { signup } from '../controllers/userAuthController';
import {
  getAllFriends,
  addFriend,
  getFriend,
  addFavoriteFriend,
  getFavoriteFriends,
  removeFavoriteFriend,
} from '../controllers/userFriendController';
import {
  updateUserProfilePicture,
  updateUser,
  getUser,
} from '../controllers/updateUserController';
import { protect } from '../controllers/verifyEmail';
import { otherUserProfile } from '../controllers/userAuthController';
const upload = require('../multer');
const router = express.Router();
//reset
// users/profile/jlsl
router.get('/profile/:userId', protect, otherUserProfile);
router.post('/signup', signup);
router.post('/forgotPassword', forgotPassword);
router.post('/resetPassword/:hashedToken', resetPassword);
router.patch('/changePassword', protect, changePassword);
router.patch(
  '/updateUserProfilePicture',
  protect,
  upload.single('avatar'),
  updateUserProfilePicture
);
router.get('/', protect, getUser);
router.patch('/updateUser', protect, updateUser);
router.post('/friend/:id', protect, addFavoriteFriend);
// users/friends
router.route('/friends').get(protect, getAllFriends).post(protect, addFriend);
router.route('/friends/:id').get(protect, getFriend);

// router.route('/friends/favorite').get(protect, getFavoriteFriends);
router.get('/getfavorites', protect, getFavoriteFriends);
router.post('/favorite/:id', protect, removeFavoriteFriend);

// router
//   .route('/friends/favorite/:id')
//   .post(protect, addFavoriteFriend)
//   .get(protect, getFavoriteFriends)
//   .delete(protect, removeFavoriteFriend);
// Remove from favorite friends array from Friends to UserAuth collection by id
export default router;
// ('http://localhost:3050/api/v1/users/friends/favorite/61f96689a9bfac9a30be7977');
