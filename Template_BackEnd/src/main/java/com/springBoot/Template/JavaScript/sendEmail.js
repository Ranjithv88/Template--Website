// This JavaScript Program Send The GMail

// import the nodemailer
const nodemailer = require('nodemailer')
// set the Properties for Gmail Sending
const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 465,
    secure: true,
    auth: {
        user: 'ranjithkumar22445588@gmail.com',
        pass: 'vfoivtmatfjgzsrv'
    }
})
// Send the Gmail Function
const mailOptions = {
    from: 'portfolio.com',
    to: process.argv[2],
    subject: 'Email verification process for portfolio.com',
    text: `Dear User,\n\n` +
          `${process.argv[2]}\n\n` +
          `We have received a request to access your account. To complete this email verification process, please use the following One-Time Password (OTP):\n\n` +
          `OTP: ${process.argv[3]}\n\n` +
          `Please note:\n` +
          `- This OTP is valid for 5 Minutes.\n` +
          `- Do not share this OTP with anyone.\n` +
          `- If you did not request this, please ignore this email or contact support immediately.\n\n` +
          `Thank you,\n` +
          `Your Service Team`
}
// Check GMail Send Or Not If GMail is Not Send This Show the Message on Log
transporter.sendMail(mailOptions, (error, info) => {
    if(error)
        return console.error('Error:', error);
    console.log('Email sent:', info.response);
})

