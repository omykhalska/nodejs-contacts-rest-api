const mailgun = require('mailgun-js');
require('dotenv').config();

const { MAILGUN_APIKEY, MAILGUN_DOMAIN } = process.env;

const mg = mailgun({ apiKey: MAILGUN_APIKEY, domain: MAILGUN_DOMAIN });

const sendEmail = async (data) => {
  const email = { ...data, from: 'noreply@oksana.mailgun.org' };
  await mg.messages().send(email, function (error, body) {
    if (error) {
      console.log(error);
      throw error;
    }
  });
};

module.exports = sendEmail;
