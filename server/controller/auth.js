import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      picturePath,
      friends,
      location,
      occupation,
    } = req.body;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      picturePath,
      friends,
      location,
      occupation,
      viewedProfile: Math.floor(Math.random() * 10000),
      impressions: Math.floor(Math.random() * 10000),
    });
    res.status(201).json({
      message: 'user created',
      user,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: `error in registering user: ${error.message}` });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (user) {
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        res.status(400).json({ message: 'invalid credentials' });
      }
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      delete user.password;
      res
        .status(200)
        .json({ message: `logged in as ${user.email}`, token, user });
    } else {
      res.status(400).json({ message: 'user does not exist' });
    }
  } catch (error) {
    res.status(500).json({ message: `error in loggin in: ${error.message}` });
  }
};

export { register, login };
