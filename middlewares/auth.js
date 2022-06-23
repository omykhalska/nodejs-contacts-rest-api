const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { SECRET_KEY } = process.env;

const auth = async (req, res, next) => {
  const { authorization = '' } = req.headers;
  const [bearer, token] = authorization.split(' ');
  try {
    if (bearer !== 'Bearer' || !token) {
      throw new Error();
    }

    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);
    if (!user || !user.token) {
      throw new Error();
    }
    req.user = user;
    next();
  } catch (error) {
    error.status = 401;
    error.message = 'Not authorized';
    next(error);
  }
};

module.exports = auth;
