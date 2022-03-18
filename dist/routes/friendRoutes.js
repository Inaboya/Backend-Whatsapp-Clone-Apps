"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const verifyEmail_1 = require("../controllers/verifyEmail");
const get_friend_controller_1 = require("../controllers/get_friend_controller");
const router = express_1.default.Router();
router.route('/').get(verifyEmail_1.protect, get_friend_controller_1.getFriend);
// router.route('/getFavoriteFriends').get(protect, getFavouriteFriends);
exports.default = router;
