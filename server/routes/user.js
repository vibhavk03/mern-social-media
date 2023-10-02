import express from 'express';
import {
  getUser,
  getUserFriends,
  addRemoveFriends,
} from '../controller/user.js';

const router = express.Router();

router.get('/:id', getUser);
router.get('/:id/friends', getUserFriends);
router.patch('/:id/:friendId', addRemoveFriends);

export default router;
