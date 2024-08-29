const nodemailer = require('nodemailer');
const { email } = require('../config');

//creating a transporter object using the email config
const transporter = nodemailer.createTransport({
    service: email.service,
    auth: {
        user: email.user,
        pass: email.pass
    },
});

//send the verification mail
const sendVerificationEmail = async (recipientEmail, verificationLink) => {
    const mailOptions = {
        from: email.user,
        to: recipientEmail,
        subject: 'Email Verification',
        html: `<p>Thank you for registering. Please verify your email by clicking the following link:</p>
           <a href="${verificationLink}">Verify Email</a>`
    }
    try {
        await transporter.sendMail(mailOptions);
        console.log(`verification email send to ${recipientEmail}`)
    } catch (err) {
        console.error(`Failed to send verification email: ${err.message}`);
        throw new Error('Failed to send verification email');
    }
}

module.exports = { sendVerificationEmail }

