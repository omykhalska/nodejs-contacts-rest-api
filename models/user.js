const { Schema, model } = require('mongoose');
const Joi = require('joi');

const PASSWORD_PATTERN = /^(?=.*[0-9])(?=.*[A-Z]).{6,32}$/;
const EMAIL_PATTERN = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

const userSchema = Schema(
  {
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    email: {
      type: String,
      match: EMAIL_PATTERN,
      required: [true, 'Email is required'],
      unique: true,
    },
    avatarURL: {
      type: String,
      required: true,
    },
    subscription: {
      type: String,
      enum: ['starter', 'pro', 'business'],
      default: 'starter',
    },
    token: {
      type: String,
      default: null,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, 'Verify token is required'],
    },
  },
  { versionKey: false, timestamps: true }
);

const joiRegisterSchema = Joi.object({
  password: Joi.string().pattern(PASSWORD_PATTERN).required(),
  email: Joi.string().pattern(EMAIL_PATTERN).required(),
  subscription: Joi.string()
    .valid('starter', 'pro', 'business')
    .default('starter'),
});

const joiLoginSchema = Joi.object({
  password: Joi.string().pattern(PASSWORD_PATTERN).required(),
  email: Joi.string().pattern(EMAIL_PATTERN).required(),
});

const joiSubscriptionSchema = Joi.object({
  subscription: Joi.string()
    .valid('starter', 'pro', 'business')
    .required()
    .messages({
      'any.required': 'missing field subscription',
    }),
});

const joiEmailSchema = Joi.object({
  email: Joi.string().pattern(EMAIL_PATTERN).required(),
});

const User = model('user', userSchema);

module.exports = {
  User,
  joiRegisterSchema,
  joiLoginSchema,
  joiSubscriptionSchema,
  joiEmailSchema,
};
