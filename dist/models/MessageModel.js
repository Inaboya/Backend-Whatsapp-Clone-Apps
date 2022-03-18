"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Message = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const MessageSchema = new Schema({
    senderId: {
        type: Schema.Types.ObjectId,
        ref: 'UserAuth',
        required: [true, 'senderId is required'],
    },
    chatId: {
        type: Schema.Types.ObjectId,
        refPath: 'chatType',
        required: [true, 'chatId is required'],
    },
    chatType: {
        type: String,
        enum: {
            values: ['Group', 'PrivateChat'],
            message: 'chatType must be either Group or PrivateChat',
        },
        required: [true, 'chatType is required'],
    },
    text: {
        type: String,
    },
    mediaType: {
        type: String,
        enum: {
            values: ['image', 'video', 'audio', 'document'],
            message: 'mediaType must be either image, video,document or audio',
        },
    },
    receiver: Boolean,
    mediaUrl: String,
    mediaId: String,
    deletedAt: {
        type: Date,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updateAt: {
        type: Date,
        default: Date.now,
    },
}, {
    toJSON: {
        virtuals: true,
    },
    toObject: {
        virtuals: true,
    },
});
exports.Message = mongoose_1.default.model('Message', MessageSchema);
