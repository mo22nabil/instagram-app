const nodemailer = require("nodemailer");   
var nodeoutlook = require('nodejs-nodemailer-outlook')


//  async function sendEmail(dest,message) {
//   let transporter = nodemailer.createTransport({
//     service: 'gmail',
//     port: 587,
//     secure: false, // true for 465, false for other ports
//     auth: {
//       user: process.env.senderPassword , // generated ethereal user
//       pass: process.env.emailTokenSecret, // generated ethereal password
//     },
//   });

//   // send mail with defined transport object
//    await transporter.sendMail({
//     from: `${testAccount.user}`, // sender address
//     to: dest, // list of receivers
//     subject: "Hello ✔", // Subject line
//     text: "Hello world?", // plain text body
//     html: message, // html body
//   });
// }

async function sendEmail(dest,message ,attachment) {
  if (!attachment) {
    attachment=[]
  }
nodeoutlook.sendEmail({
  auth: {
      user: process.env.senderPassword,
      pass: process.env.emailTokenSecret
  },
  from: process.env.senderPassword,
  to: dest,
  subject: 'Hey you, awesome!',
  html: message,
  text: 'This is text version!',
  attachments: attachment,
  onError: (e) => console.log(e),
  onSuccess: (i) => console.log(i)
}
);
}


module.exports = sendEmail 