const { Contact } = require('../../models');

const getAll = async (req, res, next) => {
  try {
    const { _id } = req.user;

    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 20;
    const skipped = (page - 1) * limit;
    const skip = skipped < 0 ? 0 : skipped;
    const isOnlyFavorite = req.query.favorite === 'true';

    let contacts;

    if (isOnlyFavorite) {
      contacts = await Contact.find({ owner: _id, favorite: true }, '', {
        skip,
        limit,
      }).populate('owner', '_id, email');
    } else {
      contacts = await Contact.find({ owner: _id }, '', {
        skip,
        limit,
      }).populate('owner', '_id, email');
    }

    res.json({
      status: 'success',
      code: 200,
      page,
      data: { contacts },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getAll;
