import express from 'express';
import { getFeedPosts, getUserPosts, likePost } from '../controller/post.js';

const router = express.Router();

router.get('/', getFeedPosts);
router.get('/:userId/posts', getUserPosts);
router.patch('/:id/like', likePost);

export default router;
