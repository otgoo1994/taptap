const nodemailer = require("nodemailer");

const mail = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'typingclub.mn@gmail.com',
    // pass: 'afvdcajhpbmowhrc'
    pass: 'oifkmojvcklqsova'
  }
});

module.exports = mail;