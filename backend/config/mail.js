const nodemailer = require("nodemailer");

// const mail = nodemailer.createTransport({
//   host: 'smtp.mail.mn',
//   port: 465,
//   secure: true,
//   auth: {
//     user: 'support@itlab.mn',
//     pass: 'Itl@b2020'
//   }
// });

const mail = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'badarch.ogino@gmail.com',
    pass: 'afvdcajhpbmowhrc'
  }
});

module.exports = mail;