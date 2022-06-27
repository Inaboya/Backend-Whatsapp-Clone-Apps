import express, { Request, Response, NextFunction } from 'express';
import { Group } from '../models/GroupModel';
import { validateCreateGroup } from '../utils/validatorUtils';
import { CustomRequest } from '../utils/custom';
import { nanoid } from 'nanoid';

/* This handler creates group for user, set as default, user
becomes admin on creating group */

export const createGroup = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { error } = validateCreateGroup(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    const userId = req.user!.id;
    const userStr = req.user!.id.toString();
    // const admin = await Group.find({ id: userId }).populate('id')
    const groupAdmins = [userId];
    const id = nanoid();
    const slug = `http://${req.headers.host}/api/v1/groups/${id}`;
    const groupInfo = {
      groupId: id,
      createdBy: userId,
      members: [userStr],
      slug,
      groupAdmins,
      ...req.body,
    };
    const group = await Group.create({ ...groupInfo });
    return res.status(201).json({ message: 'successful', link: slug });
  } catch (error: any) {
    return res.status(403).json({ error: error.message });
  }
};

/* This handler list all group user belongs to */
export const getAllGroups = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user!.id;
    const findGroups = await Group.find({ members: userId });
    return res.status(200).json({ allgroups: findGroups });
  } catch (error: any) {
    return res.status(403).json({ error: error.message });
  }
};

/* This handler allows user to add
other people to group created by user */
export const addOthers = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const groupId = req.params.groupId;
    const { memberId } = req.body;
    const userId = req.user!.id;
    if (!memberId) {
      return res
        .status(403)
        .json({ error: 'enter userId to add user to group' });
    }
    const findGroup = await Group.findOneAndUpdate(
      { $and: [{ groupAdmin: userId }, { id: groupId }] },
      { $addToSet: { members: [memberId] } },
      { new: true }
    );
    if (!findGroup) {
      return res.status(404).json({ message: 'Not an admin' });
    }
    return res
      .status(200)
      .json({ message: 'user added successfully', group: findGroup });
  } catch (error: any) {
    return res.status(403).json({ error: error.message });
  }
};

export const getGroup = async (req: CustomRequest, res: Response) => {
  try {
    const userId = req.user!.id;
    let groupId = req.params.id;
    const groups = await Group.find({ members: userId });
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
  } catch (err: any) {
    console.log(err);
    res.status(500).json({ success: false, error: err.message });
  }
};
