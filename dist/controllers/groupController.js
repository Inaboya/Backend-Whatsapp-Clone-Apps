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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGroup = exports.addOthers = exports.getAllGroups = exports.createGroup = void 0;
const GroupModel_1 = require("../models/GroupModel");
const validatorUtils_1 = require("../utils/validatorUtils");
const nanoid_1 = require("nanoid");
/* This handler creates group for user, set as default, user
becomes admin on creating group */
const createGroup = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { error } = (0, validatorUtils_1.validateCreateGroup)(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        }
        const userId = req.user.id;
        const userStr = req.user.id.toString();
        console.log(userStr);
        // const admin = await Group.find({ id: userId }).populate('id')
        const groupAdmins = [userId];
        const id = (0, nanoid_1.nanoid)();
        const slug = `http://${req.headers.host}/api/v1/groups/${id}`;
        const groupInfo = Object.assign({ groupId: id, createdBy: userId, members: [userStr], slug,
            groupAdmins }, req.body);
        const group = yield GroupModel_1.Group.create(Object.assign({}, groupInfo));
        console.log(group);
        return res.status(201).json({ message: 'successful', link: slug });
    }
    catch (error) {
        return res.status(403).json({ error: error.message });
    }
});
exports.createGroup = createGroup;
/* This handler list all group user belongs to */
const getAllGroups = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user.id;
        console.log(userId);
        const findGroups = yield GroupModel_1.Group.find({ members: userId });
        return res.status(200).json({ allgroups: findGroups });
    }
    catch (error) {
        return res.status(403).json({ error: error.message });
    }
});
exports.getAllGroups = getAllGroups;
/* This handler allows user to add
other people to group created by user */
const addOthers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const groupId = req.params.groupId;
        const { memberId } = req.body;
        const userId = req.user.id;
        if (!memberId) {
            return res
                .status(403)
                .json({ error: 'enter userId to add user to group' });
        }
        const findGroup = yield GroupModel_1.Group.findOneAndUpdate({ $and: [{ groupAdmin: userId }, { id: groupId }] }, { $addToSet: { members: [memberId] } }, { new: true });
        if (!findGroup) {
            return res.status(404).json({ message: 'Not an admin' });
        }
        return res
            .status(200)
            .json({ message: 'user added successfully', group: findGroup });
    }
    catch (error) {
        return res.status(403).json({ error: error.message });
    }
});
exports.addOthers = addOthers;
const getGroup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user.id;
        console.log(userId);
        let groupId = req.params.id;
        const groups = yield GroupModel_1.Group.find({ members: userId });
        let group = groups.find((group) => group.id === groupId);
        if (groups.length <= 0 || group === undefined) {
            return res.status(404).json({
                message: `this user has not a member of this group ${name} or this group does not exist`,
            });
        }
        res.status(200).json({
            message: 'success',
            data: group,
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ success: false, error: err.message });
    }
});
exports.getGroup = getGroup;
