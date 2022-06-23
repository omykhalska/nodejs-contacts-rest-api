const getCurrent = async (req, res, next) => {
  try {
    const { email, subscription } = req.user;

    res.status(200).json({
      status: 'success',
      code: 200,
      user: { email, subscription },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getCurrent;
