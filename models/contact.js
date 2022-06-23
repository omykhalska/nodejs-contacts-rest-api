const { Schema, model } = require('mongoose');
const Joi = require('joi');

const contactSchema = Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

const joiContactSchema = Joi.object({
  name: Joi.string().min(2).required(),
  email: Joi.string().email(),
  phone: Joi.string(),
  favorite: Joi.bool().default(false),
});

const statusJoiSchema = Joi.object({
  favorite: Joi.bool().default(false).required().messages({
    'any.required': 'missing field favorite',
  }),
});

const Contact = model('contact', contactSchema);

module.exports = { Contact, joiContactSchema, statusJoiSchema };
