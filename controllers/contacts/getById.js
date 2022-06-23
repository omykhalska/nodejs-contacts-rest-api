const { Contact } = require('../../models');
const createError = require('http-errors');

const getById = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { contactId } = req.params;
    const result = await Contact.findOne({ _id: contactId, owner: _id });
    if (!result) {
      throw createError(404, 'Not found');
    }
    res.json({
      status: 'success',
      code: 200,
      data: { result },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getById;
