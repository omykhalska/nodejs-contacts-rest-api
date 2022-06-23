const { User } = require('../../models');
const createError = require('http-errors');

const updateSubscription = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { subscription } = req.body;

    const result = await User.findByIdAndUpdate(
      userId,
      { subscription },
      { new: true }
    );

    if (!result) {
      throw createError(404, 'Not found');
    }

    res.status(200).json({
      status: 'success',
      code: 200,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = updateSubscription;
