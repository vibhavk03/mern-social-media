import User from '../models/User.js';
import Post from '../models/Post.js';

const createPost = async (req, res) => {
  try {
    const { userId, description, picturePath } = req.body;
    const user = await User.findById(userId);

    const post = Post.create({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description,
      userPicturePath: user.picturePath,
      picturePath,
      likes: {},
      comments: [],
    });
    res.status(201).json({ message: 'post created', post });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'error in creating post', error: error.message });
  }
};

const getFeedPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const post = await post.find();
    res.status(200).json({ message: 'fetched feed posts', post });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'error in getting feed posts', error: error.message });
  }
};

const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const post = await post.find({ userId });
    res.status(200).json({ message: 'fetched user feed posts', post });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'error in getting feed posts', error: error.message });
  }
};

const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    /* get post to be liked */
    const post = await Post.findById(id);
    /* as likes is an object, see if it contains user id*/
    const isLiked = post.likes.get(userId);

    if (isLiked) {
      /* if liked then unlike */
      post.likes.delete(userId);
    } else {
      /* if not liked then like it */
      post.likes.set(userId, true);
    }

    /* maybe replace this by post.save() */
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );

    res.status(200).json({ message: 'post liked', post: updatedPost });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'error in liking post', error: error.message });
  }
};

export { createPost, getFeedPosts, getUserPosts, likePost };
