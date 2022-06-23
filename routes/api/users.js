const express = require('express');
const router = express.Router();

const { users: ctrl } = require('../../controllers');
const { schemaValidation, auth, upload } = require('../../middlewares');
const {
  joiRegisterSchema,
  joiLoginSchema,
  joiSubscriptionSchema,
  joiEmailSchema,
} = require('../../models/user');

const validateRegisterSchemaMiddleware = schemaValidation(joiRegisterSchema);
const validateLoginSchemaMiddleware = schemaValidation(joiLoginSchema);
const validateSubscriptionMiddleware = schemaValidation(joiSubscriptionSchema);
const validateEmailMiddleware = schemaValidation(
  joiEmailSchema,
  'missing required field email'
);

router.post('/signup', validateRegisterSchemaMiddleware, ctrl.signup);

router.post('/login', validateLoginSchemaMiddleware, ctrl.login);

router.get('/logout', auth, ctrl.logout);

router.get('/current', auth, ctrl.getCurrent);

router.patch(
  '/',
  auth,
  validateSubscriptionMiddleware,
  ctrl.updateSubscription
);

router.patch('/avatars', auth, upload.single('avatar'), ctrl.updateAvatar);

router.get('/verify/:verificationToken', ctrl.verifyNewUser);

router.post('/verify', validateEmailMiddleware, ctrl.resendVerificationMail);

module.exports = router;
