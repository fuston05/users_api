// for sending the email verification up regristration

const name = "Enos Hahn";
const username = "enos62@ethereal.email;";
const pass = "NAJ4MA7p9CatGE5JPA";
("use strict");
const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
async function mailer(mailInfo) {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: "fuston2012@gmail.com", // generated ethereal user
      pass: "Release123!", // generated ethereal password
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
