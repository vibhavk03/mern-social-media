import User from '../models/User.js';

/* get user details */
const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json({ message: 'fetched user', user });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'error in getting user', error: error.message });
  }
};

/* get user friends */
const getUserFriends = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    /* fetch all friends' profiles */
    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );
    /* filter information before returning */
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        _id, firstName, lastName, occupation, location, picturePath;
      }
    );

    res
      .status(200)
      .json({ message: 'fetched user friends', friends: formattedFriends });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'error in getting user friends', error: error.message });
  }
};

/* add or remove friends */
const addRemoveFriends = async (req, res) => {
  try {
    const { id, friendId } = req.params;
    const user = await User.findById(id);
    const friend = await User.findById(friendId);

    if (user.friends.includes(friendId)) {
      user.friends = user.friends.filter((fid) => fid !== friendId);
      friend.friends = friend.friends.filter((fid) => fid !== id);
    } else {
      user.friends.push(friendId);
      friend.friends.push(id);
    }
    await user.save();
    await friend.save();

    /* fetch all friends' profiles */
    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );
    /* filter information before returning */
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        _id, firstName, lastName, occupation, location, picturePath;
      }
    );

    res
      .status(200)
      .json({ message: 'updated user friends', friends: formattedFriends });
  } catch (error) {
    res.status(500).json({
      message: 'error in adding/removing friends',
      error: error.message,
    });
  }
};

export { getUser, getUserFriends, addRemoveFriends };
