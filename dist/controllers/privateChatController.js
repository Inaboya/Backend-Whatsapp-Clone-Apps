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
exports.getMyPrivateChat = exports.privateChat = void 0;
const PrivateChatModel_1 = require("../models/PrivateChatModel");
const chalk_1 = __importDefault(require("chalk"));
const red = chalk_1.default.magenta.inverse.italic;
const green = chalk_1.default.green.inverse;
// +Acceptance Criteria:+
// - User can send message to other users(personal chat)
// - User can receive message from other users(personal chat).
// - User can send message to group.
// - User can receive message from group.
const privateChat = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sender = req.user.id;
        const reciever = req.body.members;
        const existingConversation = yield PrivateChatModel_1.PrivateChat.findOne({
            $and: [{ members: sender }, { members: reciever }],
        });
        if (existingConversation) {
            return res.status(200).json({
                status: 'success',
                msg: 'Convo already exist...',
                data: existingConversation,
            });
        }
        const newConversation = yield PrivateChatModel_1.PrivateChat.create({
            members: [sender, reciever],
        });
        res.status(201).json({
            status: 'success',
            data: newConversation,
        });
    }
    catch (err) {
        res.status(403).json({ err });
        console.log(red(err));
    }
});
exports.privateChat = privateChat;
const getMyPrivateChat = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sender = req.user.id;
        // const reciever = req.body.members;
        // const existingConversation = await PrivateChat.findOne({
        //   $and: [{ members: sender }, { members: reciever }],
        // });
        const existingConversation = yield PrivateChatModel_1.PrivateChat.findOne({
            $and: [{ members: sender }],
        });
        if (existingConversation) {
            return res.status(200).json({
                status: 'success',
                data: existingConversation,
            });
        }
    }
    catch (err) {
        res.status(403).json({ err });
        console.log(red(err));
    }
});
exports.getMyPrivateChat = getMyPrivateChat;
