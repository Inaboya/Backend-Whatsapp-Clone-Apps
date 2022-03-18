import { Friend } from '../models/userFriendModel';
import { Response } from 'express';
import { CustomRequest } from '../utils/custom';

const getFriend = async (req: CustomRequest, res: Response) => {
  try {
    // req.user.id;
    // let id = '61f966a8a9bfac9a30be797a';
    const friends = await Friend.find({ userId: req.user.id })
      .where('friendId')
      .in(['61f96689a9bfac9a30be7977']);

    console.log(friends);
    if (friends.length <= 0) {
      return res.status(404).json({
        message: 'No friends found',
      });
    }

    res.status(200).json({
      message: 'success',
      length: friends.length,
      data: friends,
    });
  } catch (err: any) {
    console.log(err);
    res.status(500).json({ success: false, error: err.message });
  }
};

// export the functions
export { getFriend };
