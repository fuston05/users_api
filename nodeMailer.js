// for sending the email verification up registration
const nodemailer = require("nodemailer");

const username = process.env.NODEMAILER_USER;
const pass = process.env.NODEMAILER_PASS;
("use strict");

// async..await is not allowed in global scope, must use a wrapper
async function mailer(userEmail, user_name, emailToken, host) {

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: username,
      pass: pass,
    },
    authMethod: 'PLAIN'
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    // sender address
    from: `"EMAIL VERIFICATION" <process.env.NODEMAILER_USER>`,
    // list of receivers
    to: userEmail,
    // Subject line
    subject: "Email Verification",
    // plain text body
    text: `Thank you for registering. Please verify your account by copying the url below into your browser search bar.\n ${host}/auth/confirmEmail?t=${emailToken}&u=${user_name}`,
    // html body
    html: `<h1>Thank you for registering.</h1> <p> Please verify your account by clicking the link below.</p> <a href=${host}/auth/confirmEmail?t=${emailToken}&u=${user_name}> Verify your email</a>`
  });
}

module.exports = mailer;
