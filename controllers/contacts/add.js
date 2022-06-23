const { Contact } = require('../../models');

const add = async (req, res, next) => {
  try {
    const contact = req.body;
    const { _id } = req.user;
    const result = await Contact.create({ ...contact, owner: _id });
    res.status(201).json({
      status: 'success',
      code: 201,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = add;
