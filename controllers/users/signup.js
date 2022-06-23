const createError = require('http-errors');
const bcrypt = require('bcrypt');
const gravatar = require('gravatar');
const { nanoid } = require('nanoid');
const { User } = require('../../models');
const { sendEmail } = require('../../helpers');
require('dotenv').config();
const { CLIENT_URL } = process.env;

const signup = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const result = await User.findOne({ email });
    if (result) {
      throw createError(409, 'Email in use');
    }

    const verificationToken = nanoid();

    const hashedPassword = await bcrypt.hash(password, bcrypt.genSaltSync(10));

    const avatarURL = gravatar.url(email, {}, true);

    const user = await User.create({
      ...req.body,
      password: hashedPassword,
      avatarURL,
      verificationToken,
    });

    const link = `${CLIENT_URL}/api/users/verify/${verificationToken}`;

    const mail = {
      to: email,
      subject: 'Account Activation Link',
      html: `
        <h2>Please, click on given link to activate your account - <a href="${link}" target="_blank" rel="noopener noreferrer">${link}</a></h2>`,
    };
    await sendEmail(mail);

    res.status(201).json({
      status: 'success',
      code: 201,
      user: {
        email: user.email,
        subscription: user.subscription,
        avatar: user.avatarURL,
        verificationToken,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = signup;
