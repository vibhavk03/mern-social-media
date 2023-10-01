import jwt from 'jsonwebtoken';

const verifyToken = async (req, res, next) => {
  try {
    let token = req.header('Authorization');

    if (!token) {
      return res
        .status(403)
        .json({ message: 'please provide a token in header' });
    }

    if (token.startsWith('Bearer ')) {
      token = token.slice(7).trimLeft();
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res
      .status(500)
      .json({ message: 'error in verifying token', error: error.message });
  }
};

export { verifyToken };
