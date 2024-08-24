const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'jibranshah228@gmail.com',
    pass: 'j@shah252957'
  }
});

function sendEmailNotification(message) {
  const mailOptions = {
    from: 'jibranshah228@gmail.com',
    to: 'jibranshah228@gmail.com',
    subject: 'portfolio notification',
    text: message
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Email sent: ' + info.response);
  });
}

function handleNotification(message) {
  sendEmailNotification(message);
}

module.exports = handleNotification