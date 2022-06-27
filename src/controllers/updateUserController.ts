import { UserAuth } from '../models/Users';
import { Router, Request, Response, NextFunction } from 'express';

const cloudinary = require('../cloudinary');

import { CustomRequest } from '../utils/custom';
interface MulterFile {
  key: string; // Available using `S3`.
  path: string; // Available using `DiskStorage`.
  mimetype: string;
  originalname: string;
  size: number;
}
export const updateUserProfilePicture = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user!.id;
    const { file } = req;
    const { public_id, url } = await cloudinary.uploader.upload(file!.path);
    req.body.avatar = url;
    req.body.avatarId = public_id;
    const user = await UserAuth.findByIdAndUpdate(userId, {
      avatar: req.body.avatar ? req.body.avatar : req.user!.avatar,
      avatarId: req.body.avatarId ? req.body.avatarId : req.user!.avatarId,
    });
    res.status(201).json({
      status: 'success',
      data: {
        user,
      },
    });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({
      status: 'failed to update profile picture',
      error: error,
    });
  }
};
export const updateUser = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    // let result: any;
    // if (req.file!.path) {
    //   result = await cloudinary.uploader.upload(req.file!.path);
    //   // replace the old image with the new one and add it to the request body
    //   req.body.avatar = result.url;
    //   req.body.avatarId = result.public_id;
    //   avatar: req.body.avatar ? req.body.avatar : req.user!.avatar,
    //   avatarId: req.body.avatarId ? req.body.avatarId : req.user!.avatarId,
    // }

    let updateData = {
      firstName: req.body.firstName ? req.body.firstName : req.user!.firstName,
      lastName: req.body.lastName ? req.body.lastName : req.user!.lastName,
      favoriteFriends: req.body.favoriteFriends
        ? req.body.favoriteFriends
        : req.user!.favoriteFriends,
      email: req.body.email ? req.body.email : req.user!.email,
      phoneNumber: req.body.phoneNumber
        ? req.body.phoneNumber
        : req.user!.phoneNumber,
      username: req.body.username ? req.body.username : req.user!.username,
      about: req.body.about ? req.body.about : req.user!.about,
    };

    const updatedUser = await UserAuth.findByIdAndUpdate(
      req.user!.id,
      updateData,
      {
        new: true,
        // runValidators: true,
      }
    );
    res.status(200).json({
      message: 'success',
      data: updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Internal Server Error unable to update user',
    });
  }
};

export const getUser = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await UserAuth.findById(req.user!.id);
    res.status(200).json({
      message: 'success',
      data: user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Internal Server Error unable to get user',
    });
  }
};
