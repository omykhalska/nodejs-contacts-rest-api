const { Contact } = require('../../models');
const createError = require('http-errors');

const removeById = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { contactId } = req.params;
    const result = await Contact.findOneAndRemove({
      _id: contactId,
      owner: _id,
    });

    if (!result) {
      throw createError(404, 'Not found');
    }
    res.status(200).json({
      status: 'success',
      code: 200,
      message: 'contact deleted',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = removeById;
