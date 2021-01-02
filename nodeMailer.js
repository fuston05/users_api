// for sending the email verification up registration
const nodemailer = require("nodemailer");

const username = process.env.NODEMAILER_USER;
const pass = process.env.NODEMAILER_PASS;
("use strict");

// async..await is not allowed in global scope, must use a wrapper
async function mailer(mailInfo) {

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: username, // generated ethereal user
      pass: pass, // generated ethereal password
    },
    authMethod: 'PLAIN'
  });

  // send mail with defined transport object
  let info = await transporter.sendMail(mailInfo);

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

module.exports = mailer;
