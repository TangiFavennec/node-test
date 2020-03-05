const nodemailer = require('nodemailer');

const SENDER = 'do_not_reply@northpole.com'
const RECEIVER = 'santa@northpole.com'
const ETHERMAIL_USER = 'muhammad.farrell@ethereal.email'
const ETHERMAIL_PASS = '7UsfjJgkMhYrcj7PGQ'
const SMTP_HOST = 'smtp.ethereal.email'
const SMTP_PORT = 587

const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT,
  auth: {
    user: ETHERMAIL_USER,
    pass: ETHERMAIL_PASS
  }
});

function sendMessage(user, content) {
  // Message object
  let message = {
    from: `Wish Reminder <${SENDER}>`,
    to: `Santa chan <${RECEIVER}>`,
    subject: 'Please grant this wish',
    text: `Please perform following wish : ${content} for user ${user.name} who lives at ${user.address}`,
    html: "<b>Hello world?</b>" // html body
  };

  transporter.sendMail(message, (err, info) => {
    if (err) {
      console.log('Error occurred. ' + err.message);
    }
    else {
      console.log('Message sent: %s', info.messageId);
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    }
  });
}

module.exports = 
{
  sendMessage
}