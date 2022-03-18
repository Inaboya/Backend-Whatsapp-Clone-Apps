"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const messageRoutes_1 = __importDefault(require("./messageRoutes"));
const privateChatController_1 = require("../controllers/privateChatController");
const verifyEmail_1 = require("../controllers/verifyEmail");
const router = express_1.default.Router();
// routers
router.use('/:chatId/messages/:messageId', messageRoutes_1.default);
router.use('/:chatId/messages', messageRoutes_1.default);
router.post('/', verifyEmail_1.protect, privateChatController_1.privateChat);
router.get('/', verifyEmail_1.protect, privateChatController_1.getMyPrivateChat);
// exported router
exports.default = router;
