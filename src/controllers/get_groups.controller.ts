// import Group Models
import {Response } from 'express';
import { Group } from '../models/GroupModel';
import { CustomRequest } from '../utils/custom';

const cloudinary = require('../cloudinary');


const createGroup = async (req: CustomRequest, res: Response) => {
  try {
    const { _id } = req.user;
    const group = new Group({
      createdBy: _id,
      groupName: req.body.name,
      members: [_id],
      groupDescription: req.body.groupDescription,
      groupImage: req.body.avatar,
      groupImageId: req.body.avatarId,
      groupAdmins: [_id],
    });
    await group.save();
    res.status(201).json({
      message: 'success',
      data: group,
    });
  } catch (err: any) {
    console.log(err);
    res.status(500).json({ success: false, error: err.message });
  }
};

const getGroup = async (req: CustomRequest, res: Response) => {
  try {
    const { _id } = req.user;

    const queryObj = { ...req.query };

    const excludedFields = ['select', 'sort', 'limit', 'page'];
    excludedFields.forEach((el) => delete queryObj[el]);

    let name = queryObj.groupName;
    // find group where the user.id is present in the members array
    let query = Group.find(queryObj)
      .where('members')
      .in([_id])
      .where('groupName')
      .equals(name);

    if (req.query.sort) {
      query = query.sort(req.query.sort);
    }

    const groups = await query;

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
  } catch (err: any) {
    console.log(err);
    res.status(500).json({ success: false, error: err.message });
  }
};

// export the functions
export { getGroup, createGroup };
