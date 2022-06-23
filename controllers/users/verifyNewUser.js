const createError = require('http-errors');
const { User } = require('../../models');

const verifyNewUser = async (req, res, next) => {
  try {
    const { verificationToken } = req.params;
    const user = await User.findOne({ verificationToken });

    if (!user) {
      throw createError(404, 'User not found');
    }

    await User.findByIdAndUpdate(user._id, {
      verificationToken: null,
      verify: true,
    });

    res.status(200).json({
      message: 'Verification successful',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = verifyNewUser;
