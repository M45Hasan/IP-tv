const nodemailer = require("nodemailer");
const ejs = require("ejs");
const path = require("path");

async function emailV(email, sub, verificationLink) {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    auth: {
      user: process.env.EMAIL, // generated ethereal user
      pass: process.env.APP_PASSWORD, // generated ethereal password
    },
  });

  const emailTemplate = await ejs.renderFile(
    path.join(__dirname, "../views/verifyEamil.ejs"),
    { verificationLink }
  );

  let info = await transporter.sendMail({
    from: "IP TV", // sender address
    to: email, // list of receivers
    subject: sub, // Subject line

    html: emailTemplate, // html body
  });
}

module.exports = emailV;
