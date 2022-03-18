"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Group = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const GroupSchema = new Schema({
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'UserAuth',
        required: [true, 'createdBy is required'],
    },
    members: {
        type: [
            {
                type: Schema.Types.ObjectId,
                ref: 'UserAuth',
            },
        ],
        required: [true, 'members are required'],
    },
    groupName: {
        type: String,
        required: [true, 'groupName is required'],
    },
    groupDescription: {
        type: String,
    },
    groupImage: {
        type: String,
    },
    groupImageId: {
        type: String,
    },
    groupAdmins: {
        type: [
            {
                type: Schema.Types.ObjectId,
                ref: 'UserAuth',
            },
        ],
    },
    slug: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    groupId: String,
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});
exports.Group = mongoose_1.default.model('Group', GroupSchema);
