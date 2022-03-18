"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrivateChat = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const PrivateChatSchema = new Schema({
    members: {
        type: [
            {
                type: Schema.Types.ObjectId,
                ref: 'UserAuth',
            },
        ],
        required: [true, 'members are required'],
    },
    firstMesssageAt: {
        type: Date,
    },
    lastMessageAt: {
        type: Date,
    },
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});
// PrivateChatSchema.index({ members: 1 }, { unique: true });
exports.PrivateChat = mongoose_1.default.model('PrivateChat', PrivateChatSchema);
