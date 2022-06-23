const { Contact } = require('../../models');

const createError = require('http-errors');

const updateStatus = async (req, res, next) => {
  try {
    const { _id: userId } = req.user;
    const { contactId } = req.params;
    const { favorite } = req.body;
    const result = await Contact.findOneAndUpdate(
      { _id: contactId, owner: userId },
      { favorite },
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

module.exports = updateStatus;
