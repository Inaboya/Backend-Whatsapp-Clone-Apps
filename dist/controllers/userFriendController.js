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
exports.removeFavoriteFriend = exports.getFavoriteFriends = exports.addFavoriteFriend = exports.removeFriend = exports.getFriend = exports.addFriend = exports.getAllFriends = void 0;
const userFriendModel_1 = require("../models/userFriendModel");
const Users_1 = require("../models/Users");
const getAllFriends = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userLogin = req.user.id;
        const friends = yield userFriendModel_1.Friend.find({ userId: userLogin });
        return res.status(200).json({
            status: 'success',
            results: friends.length,
            data: {
                friends,
            },
        });
    }
    catch (error) {
        return res.status(500).json({ error });
    }
});
exports.getAllFriends = getAllFriends;
const addFriend = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user.id;
        let friendId = '';
        const { email } = req.body;
        const newFriend = yield Users_1.UserAuth.find({ email });
        friendId = newFriend[0]._id;
        if (friendId == userId) {
            return res.status(400).json({
                message: 'user already exist',
            });
        }
        const userFriend = yield userFriendModel_1.Friend.find({ userId, friendId });
        if (userFriend.length <= 0) {
            const friend = yield userFriendModel_1.Friend.create({ userId, friendId });
            res.status(201).json({
                status: 'success',
                data: {
                    friend,
                },
            });
        }
        else {
            res.status(400).json({
                message: 'friend already exist',
            });
        }
    }
    catch (error) {
        res.status(500).json({ error });
    }
});
exports.addFriend = addFriend;
// Get Friend
const getFriend = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user.id;
        const friendId = req.params.id;
        const friend = yield userFriendModel_1.Friend.find({ userId, friendId });
        console.log(friend);
        const friendDetails = yield Users_1.UserAuth.find({ _id: friendId });
        if (!friend) {
            return res.status(404).json({
                message: 'friend not found',
            });
        }
        res.status(200).json({
            status: 'success',
            data: {
                friendDetails,
            },
        });
    }
    catch (error) {
        res.status(500).json({ error });
    }
});
exports.getFriend = getFriend;
// Remove Friend
const removeFriend = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user.id;
        const friendId = req.params.id;
        const friend = yield userFriendModel_1.Friend.find({ userId, friendId });
        if (!friend) {
            return res.status(404).json({
                message: 'friend not found',
            });
        }
        yield userFriendModel_1.Friend.findByIdAndDelete(friendId);
        res.status(200).json({
            status: 'success',
            data: {
                friend,
            },
        });
    }
    catch (error) {
        res.status(500).json({ error });
    }
});
exports.removeFriend = removeFriend;
// User add to favorite friends array from Friends to UserAuth collection by id
const addFavoriteFriend = (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user.id;
        const friendId = req.params.id;
        const userFriend = yield userFriendModel_1.Friend.findOne({ userId, friendId });
        // console.log(userFriend[0].friendId);
        console.log(friendId);
        const user = yield Users_1.UserAuth.findById(userId);
        if (userFriend.length > 0) {
            if (user.favoriteFriendsList.includes(friendId)) {
                return res.status(400).json({
                    message: 'This friend already exists as a favorite friend',
                });
            }
            else {
                user.favoriteFriendsList.push(friendId);
                yield user.save();
                res.status(201).json({
                    status: 'success',
                    data: {
                        friendId,
                    },
                });
            }
        }
        else {
            res.status(400).json({
                message: 'friend not exist',
            });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.addFavoriteFriend = addFavoriteFriend;
// Get user favorite friends array from UserAuth by id
const getFavoriteFriends = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log('>>> userId:', req.user!.id);
    try {
        const userId = req.user.id;
        const user = yield Users_1.UserAuth.findById(userId);
        if (user) {
            const favoriteFriendsList = user.favoriteFriendsList;
            res.status(200).json({
                status: 'success',
                data: {
                    favoriteFriendsList,
                },
            });
        }
        else {
            res.status(400).json({
                message: 'user not exist',
            });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getFavoriteFriends = getFavoriteFriends;
// User remove from favorite friends array from Friends to UserAuth collection by id
const removeFavoriteFriend = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user.id;
        const friendId = req.params.id;
        const userFriend = yield userFriendModel_1.Friend.find({ userId, friendId });
        const user = yield Users_1.UserAuth.findById(userId);
        if (userFriend.length > 0) {
            if (!user.favoriteFriendsList.includes(friendId)) {
                return res.status(400).json({
                    message: 'This friend does not exist as a favorite friend',
                });
            }
            const index = user.favoriteFriendsList.indexOf(friendId);
            user.favoriteFriendsList.splice(index, 1);
            yield user.save();
            res.status(200).json({
                status: 'success',
                data: {
                    friendId,
                },
            });
        }
        else {
            res.status(400).json({
                message: 'friend not exist',
            });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.removeFavoriteFriend = removeFavoriteFriend;
