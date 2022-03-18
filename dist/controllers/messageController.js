"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMessages = exports.getMessagesBySenderId = exports.getMediaType = exports.getMessages = exports.deleteMessage = void 0;
const MessageModel_1 = require("../models/MessageModel");
const chalk_1 = __importDefault(require("chalk"));
const cloudinary_main_1 = __importDefault(require("../utils/cloud_data/cloudinary-main"));
const red = chalk_1.default.magenta.inverse.italic;
const green = chalk_1.default.green.inverse.italic;
let message = {};
const deleteMessage = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.params, 'request parameters');
        const result = yield MessageModel_1.Message.findOneAndDelete({
            chatId: req.params.chatId,
        });
        console.log(result, 'hhh');
        return res
            .status(201)
            .json({ status: 'success', message: ' message deleted....', result });
    }
    catch (error) {
        return res.status(500).json({ error });
    }
});
exports.deleteMessage = deleteMessage;
/* Route for getting all the messages for a private chat */
function getMessages(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const chatId = req.params.chatId;
            const messages = yield MessageModel_1.Message.find({ chatId });
            res.status(200).json({ data: messages.length, messages });
        }
        catch (error) {
            res.status(404).json({ error: 'Unable to get messages' });
        }
    });
}
exports.getMessages = getMessages;
const getMediaType = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const media = req.body.mediaType;
    console.log(red(media));
    res.status(200).json({ data: req.body });
    return;
    // next();
});
exports.getMediaType = getMediaType;
//Get all messages by a senderId
const getMessagesBySenderId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const senderId = req.params.senderId;
        const messages = yield MessageModel_1.Message.find({ senderId });
        res.status(200).json({ data: messages.length, messages });
    }
    catch (error) {
        res.status(404).json({ error: 'Unable to get messages' });
    }
});
exports.getMessagesBySenderId = getMessagesBySenderId;
const createMessages = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let result;
        if (req.body.mediaType) {
            result = yield cloudinary_main_1.default.uploader.upload(req.file.path, {
                resource_type: 'raw',
            });
        }
        let groupUrl = req.originalUrl.includes('groups');
        if (!req.body.chatId)
            req.body.chatId = req.params.chatId;
        if (!req.body.senderId)
            req.body.senderId = req.user.id;
        req.body.chatType = groupUrl ? 'Group' : 'PrivateChat';
        if (!req.body.text && !req.body.mediaType) {
            throw new Error('Message must have a content');
        }
        if (result) {
            message = Object.assign(Object.assign({}, req.body), { mediaUrl: result.secure_url, mediaId: result.public_id });
        }
        else {
            message = Object.assign({}, req.body);
        }
        const newMessage = yield MessageModel_1.Message.create(message);
        res.status(201).json({ status: 'success', data: newMessage });
    }
    catch (err) {
        res.status(403).json({ status: 'fail', error: err.message });
        console.log(red(err));
    }
});
exports.createMessages = createMessages;
// console.log(green(req.file!.path));
// const result = await cloudinary.uploader.upload(req.file!.path, {
//   upload_preset: 'whatsapp-clone',
// });
// if (req.body.mediaType === 'video') {
//   const result = await cloudinary.uploader.upload(path, {
//     resource_type: 'video',
//     chunk_size: 6000000,
//     eager: [
//       {
//         width: 300,
//         height: 300,
//         crop: 'pad',
//         audio_codec: 'none',
//       },
//       {
//         width: 160,
//         height: 100,
//         crop: 'crop',
//         gravity: 'south',
//         audio_codec: 'none',
//       },
//     ],
//   });
// } else if (req.body.mediaType === 'video') {
//   const result = await cloudinary.uploader.upload(path, {
//     resource_type: 'raw',
//   });
// } else {
//   const result = await cloudinary.uploader.upload(req.file!.path, {
//     resource_type: 'raw',
//   });
// }
