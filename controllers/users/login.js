const { User } = require('../../models');
const createError = require('http-errors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { SECRET_KEY } = process.env;

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    let passCompare;

    if (user && !user.verify) {
      throw createError(401, 'Account activation required');
    }

    if (user) {
      passCompare = await bcrypt.compare(password, user.password);
    }

    if (!user || !passCompare) {
      throw createError(401, 'Email or password is wrong');
    }

    const payload = { id: user._id };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1d' });

    await User.findByIdAndUpdate(user._id, { token });

    return res.status(200).json({
      status: 'success',
      code: 200,
      token,
      user: { email: user.email, subscription: user.subscription },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = login;
