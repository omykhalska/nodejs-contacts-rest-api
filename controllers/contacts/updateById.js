const { Contact } = require('../../models');

const createError = require('http-errors');

const updateById = async (req, res, next) => {
  try {
    const { _id: userId } = req.user;
    const { contactId } = req.params;
    const contact = req.body;
    const result = await Contact.findOneAndUpdate(
      { _id: contactId, owner: userId },
      contact,
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

module.exports = updateById;
