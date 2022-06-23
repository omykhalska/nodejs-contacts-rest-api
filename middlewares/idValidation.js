const mongoose = require('mongoose');
const createError = require('http-errors');

const idValidation = () => {
  return (req, res, next) => {
    const { contactId } = req.params;
    const isError = !mongoose.isObjectIdOrHexString(contactId);
    if (isError) {
      throw createError(400, 'Contact ID is not valid');
    }
    next();
  };
};

module.exports = idValidation;
