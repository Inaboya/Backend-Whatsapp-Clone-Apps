"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCreateGroup = exports.validateLogin = void 0;
const joi_1 = __importDefault(require("joi"));
const validateLogin = (data) => {
    const schema = joi_1.default.object({
        email: joi_1.default.string().email().required(),
        password: joi_1.default.string().min(6).required()
    });
    return schema.validate(data);
};
exports.validateLogin = validateLogin;
const validateCreateGroup = (info) => {
    const schema = joi_1.default.object({
        groupName: joi_1.default.string().required(),
        groupDescription: joi_1.default.string().required(),
        groupImage: joi_1.default.string().required(),
        groupImageId: joi_1.default.string().required(),
    });
    return schema.validate(info);
};
exports.validateCreateGroup = validateCreateGroup;
