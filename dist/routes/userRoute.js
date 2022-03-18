"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const passwordController_1 = require("../controllers/passwordController");
const userAuthController_1 = require("../controllers/userAuthController");
const userFriendController_1 = require("../controllers/userFriendController");
const updateUserController_1 = require("../controllers/updateUserController");
const verifyEmail_1 = require("../controllers/verifyEmail");
const userAuthController_2 = require("../controllers/userAuthController");
const upload = require('../multer');
const router = express_1.default.Router();
//reset
// users/profile/jlsl
router.get('/profile/:userId', verifyEmail_1.protect, userAuthController_2.otherUserProfile);
// router.get("/verify_email/:token", verifyEmail);
router.post('/signup', userAuthController_1.signup);
router.post('/forgotPassword', passwordController_1.forgotPassword);
router.post('/resetPassword/:hashedToken', passwordController_1.resetPassword);
router.patch('/changePassword', verifyEmail_1.protect, passwordController_1.changePassword);
router.patch('/updateUserProfilePicture', verifyEmail_1.protect, upload.single('avatar'), updateUserController_1.updateUserProfilePicture);
router.get('/', verifyEmail_1.protect, updateUserController_1.getUser);
router.patch('/updateUser', verifyEmail_1.protect, updateUserController_1.updateUser);
router.post('/favorite/:id', verifyEmail_1.protect, userFriendController_1.addFavoriteFriend);
// users/friends
router.route('/friends').get(verifyEmail_1.protect, userFriendController_1.getAllFriends).post(verifyEmail_1.protect, userFriendController_1.addFriend);
router.delete("/friends/:id", verifyEmail_1.protect, userFriendController_1.removeFriend);
router.route('/friends/:id').get(verifyEmail_1.protect, userFriendController_1.getFriend);
// router.route('/friends/favorite').get(protect, getFavoriteFriends);
router.get('/favorite', verifyEmail_1.protect, userFriendController_1.getFavoriteFriends);
router.post('/favorite/:id', verifyEmail_1.protect, userFriendController_1.removeFavoriteFriend);
// router
//   .route('/friends/favorite/:id')
//   .post(protect, addFavoriteFriend)
//   .get(protect, getFavoriteFriends)
//   .delete(protect, removeFavoriteFriend);
// Remove from favorite friends array from Friends to UserAuth collection by id
exports.default = router;
// ('http://localhost:3050/api/v1/users/friends/favorite/61f96689a9bfac9a30be7977');
