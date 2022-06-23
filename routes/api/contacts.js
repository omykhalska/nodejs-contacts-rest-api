const express = require('express');
const router = express.Router();

const { contacts: ctrl } = require('../../controllers');
const { schemaValidation, idValidation, auth } = require('../../middlewares');
const { joiContactSchema, statusJoiSchema } = require('../../models/contact');

const validateIdMiddleware = idValidation();
const validateSchemaMiddleware = schemaValidation(joiContactSchema);
const validateFavoriteMiddleware = schemaValidation(statusJoiSchema);

router.get('/', auth, ctrl.getAll);

router.get('/:contactId', auth, validateIdMiddleware, ctrl.getById);

router.post('/', auth, validateSchemaMiddleware, ctrl.add);

router.delete('/:contactId', auth, validateIdMiddleware, ctrl.removeById);

router.put(
  '/:contactId',
  auth,
  validateIdMiddleware,
  validateSchemaMiddleware,
  ctrl.updateById
);

router.patch(
  '/:contactId/favorite',
  auth,
  validateIdMiddleware,
  validateFavoriteMiddleware,
  ctrl.updateStatus
);

module.exports = router;
