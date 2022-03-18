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
exports.getFavouriteFriends = void 0;
const Users_1 = require("../models/Users");
const getFavouriteFriends = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const queryId = req.query.friendId;
        const { _id } = req.user;
        const userId = req.user.id;
        console.log(req.user);
        // console.log(req.query);
        // let id = '61f966a8a9bfac9a30be797a';
        let favoriteFriends = yield Users_1.UserAuth.find({ id: userId }).populate('favoriteFriends');
        if (favoriteFriends.length === 0) {
            res.status(200).json({
                message: 'No friends found',
            });
        }
        else {
            res.status(200).json({
                message: 'success',
                length: favoriteFriends.length,
                data: favoriteFriends,
            });
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ success: false, error: err.message });
    }
});
exports.getFavouriteFriends = getFavouriteFriends;
