const nodemailer = require('nodemailer');
require('dotenv').config();

const {META_PASSWORD} = process.env;

const nodemailerConfig ={
    host: 'smtp.meta.ua',
    port: 465,
    secure: true,
    auth: {
        user: "oksana_lytvynchuk@meta.ua",
        pass: META_PASSWORD,
    }
}

const transporter = nodemailer.createTransport(nodemailerConfig);

const sendEmail = async (data) => {
  const email = { ...data, from: 'oksana_lytvynchuk@meta.ua' };
  try {
      await transporter.sendMail(email)
      console.log('Email sent successfully');
  }
  catch (error) {
      console.log(error.message);
  }
};

module.exports = sendEmail;
