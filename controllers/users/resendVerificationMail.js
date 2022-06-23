const { User } = require('../../models');
const createError = require('http-errors');
const { sendEmail } = require('../../helpers');
require('dotenv').config();
const { CLIENT_URL } = process.env;

const resendVerificationMail = async (req, res, next) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      throw createError(404, `User with email ${email} was not found`);
    }

    if (user.verify) {
      throw createError(400, 'Verification has already been passed');
    }

    const link = `${CLIENT_URL}/api/users/verify/${user.verificationToken}`;

    const mail = {
      to: email,
      subject: 'Account Activation Link',
      html: `
        <h2>Please, click on given link to activate your account - <a href="${link}" target="_blank" rel="noopener noreferrer">${link}</a></h2>`,
    };

    await sendEmail(mail);

    res.status(200).json({
      message: 'Verification email sent',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = resendVerificationMail;
