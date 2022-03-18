"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const messageController_1 = require("../controllers/messageController");
const verifyEmail_1 = require("../controllers/verifyEmail");
const messageController_2 = require("../controllers/messageController");
const multer_main_1 = require("../utils/cloud_data/multer-main");
const router = express_1.default.Router({ mergeParams: true });
// , upload.single('image')
// routers
router.get('/', messageController_2.getMessages);
// router.get('/group/:chatId/messages', getGroupMessages);
router.post('/', multer_main_1.upload.single('media'), verifyEmail_1.protect, messageController_2.createMessages);
// delete route
router.delete('/', verifyEmail_1.protect, messageController_1.deleteMessage);
// exported router
exports.default = router;
