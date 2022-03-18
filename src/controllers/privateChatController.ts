import { log } from 'console';
import { Request, Response, NextFunction } from 'express';
import { Message } from '../models/MessageModel';
import { PrivateChat } from '../models/PrivateChatModel';
import Chalk from 'chalk';

const red = Chalk.magenta.inverse.italic;
const green = Chalk.green.inverse;

// +Acceptance Criteria:+
// - User can send message to other users(personal chat)
// - User can receive message from other users(personal chat).
// - User can send message to group.
// - User can receive message from group.

export const privateChat = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const sender = req.user.id;
    const reciever = req.body.members;

    const existingConversation = await PrivateChat.findOne({
      $and: [{ members: sender }, { members: reciever }],
    });

    if (existingConversation) {
      return res.status(200).json({
        status: 'success',
        msg: 'Convo already exist...',
        data: existingConversation,
      });
    }

    const newConversation = await PrivateChat.create({
      members: [sender, reciever],
    });

    res.status(201).json({
      status: 'success',
      data: newConversation,
    });
  } catch (err) {
    res.status(403).json({ err });
    console.log(red(err));
  }
};

export const getMyPrivateChat = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const sender = req.user.id;
    // const reciever = req.body.members;

    // const existingConversation = await PrivateChat.findOne({
    //   $and: [{ members: sender }, { members: reciever }],
    // });

    const existingConversation = await PrivateChat.findOne({
      $and: [{ members: sender }],
    });

    if (existingConversation) {
      return res.status(200).json({
        status: 'success',
        data: existingConversation,
      });
    }
  } catch (err) {
    res.status(403).json({ err });
    console.log(red(err));
  }
};
