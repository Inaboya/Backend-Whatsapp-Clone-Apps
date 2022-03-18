"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userAuthController_1 = require("../controllers/userAuthController");
const verifyEmail_1 = require("../controllers/verifyEmail");
const groupController_1 = require("../controllers/groupController");
const messageRoutes_1 = __importDefault(require("./messageRoutes"));
const upload = require('../multer');
const router = express_1.default.Router();
// router
// get route
// router.route("/").get();
router.get('/', verifyEmail_1.protect, groupController_1.getAllGroups);
router.route('/').get(verifyEmail_1.protect, groupController_1.getGroup);
// posts route
router.post('/create', verifyEmail_1.protect, groupController_1.createGroup);
router.post('/:groupId', verifyEmail_1.protect, groupController_1.addOthers);
//get group imfo
router.get('/:groupId', verifyEmail_1.protect, userAuthController_1.getGroupInfo);
router.get('/', verifyEmail_1.protect, groupController_1.getGroup);
router.use('/:chatId/messages', messageRoutes_1.default);
// delete route
router.use('/:chatId/messages/:messageId', messageRoutes_1.default);
// exported router
exports.default = router;
