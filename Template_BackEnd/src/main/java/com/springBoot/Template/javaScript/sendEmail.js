const nodemailer = require('nodemailer');
console.log('hi')
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'ranjithkumar22445588@gmail.com',
        pass: 'vfoivtmatfjgzsrv'
    }
});

const mailOptions = {
    from: 'ranjithkumar22445588@gmail.com',
    to: process.argv[2],
    subject: 'Email verification process for portfolio.com',
    text: `Dear User,\n\n` +
          `${process.argv[2]}\n\n` +
          `We have received a request to access your account. To complete this email verification process, please use the following One-Time Password (OTP):\n\n` +
          `OTP: ${process.argv[3]}\n\n` +
          `Please note:\n` +
          `- This OTP is valid for 60 seconds.\n` +
          `- Do not share this OTP with anyone.\n` +
          `- If you did not request this, please ignore this email or contact support immediately.\n\n` +
          `Thank you,\n` +
          `Your Service Team`
};

transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.error('Error:', error);
    }
    console.log('Email sent:', info.response);
});
