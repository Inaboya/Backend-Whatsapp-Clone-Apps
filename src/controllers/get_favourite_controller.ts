import { Response } from 'express';
import { CustomRequest } from '../utils/custom';
import { UserAuth } from '../models/Users';
import { Friend } from '../models/userFriendModel';

const getFavouriteFriends = async (req: CustomRequest, res: Response) => {
  try {
    const queryId = req.query.friendId;
    const { _id } = req.user;
    const userId = req.user.id;
    console.log(req.user);
    // console.log(req.query);
    // let id = '61f966a8a9bfac9a30be797a';
    let favoriteFriends = await UserAuth.find({ id: userId }).populate(
      'favoriteFriends'
    );
    if (favoriteFriends.length === 0) {
      res.status(200).json({
        message: 'No friends found',
      });
    } else {
      res.status(200).json({
        message: 'success',
        length: favoriteFriends.length,
        data: favoriteFriends,
      });
    }
  } catch (err: any) {
    console.log(err);
    res.status(500).json({ success: false, error: err.message });
  }
};
export { getFavouriteFriends };
