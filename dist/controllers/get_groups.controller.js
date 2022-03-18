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
exports.createGroup = exports.getGroup = void 0;
const GroupModel_1 = require("../models/GroupModel");
const cloudinary = require('../cloudinary');
const createGroup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id } = req.user;
        const group = new GroupModel_1.Group({
            createdBy: _id,
            groupName: req.body.name,
            members: [_id],
            groupDescription: req.body.groupDescription,
            groupImage: req.body.avatar,
            groupImageId: req.body.avatarId,
            groupAdmins: [_id],
        });
        yield group.save();
        res.status(201).json({
            message: 'success',
            data: group,
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ success: false, error: err.message });
    }
});
exports.createGroup = createGroup;
const getGroup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id } = req.user;
        const queryObj = Object.assign({}, req.query);
        const excludedFields = ['select', 'sort', 'limit', 'page'];
        excludedFields.forEach((el) => delete queryObj[el]);
        let name = queryObj.groupName;
        // find group where the user.id is present in the members array
        let query = GroupModel_1.Group.find(queryObj)
            .where('members')
            .in([_id])
            .where('groupName')
            .equals(name);
        if (req.query.sort) {
            query = query.sort(req.query.sort);
        }
        const groups = yield query;
        if (groups.length <= 0) {
            return res.status(404).json({
                message: `this user has not a member of this group ${name} or this group does not exist`,
            });
        }
        res.status(200).json({
            message: 'success',
            size: groups.length,
            data: groups,
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ success: false, error: err.message });
    }
});
exports.getGroup = getGroup;
