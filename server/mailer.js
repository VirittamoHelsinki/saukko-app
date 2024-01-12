// Import nodemailer and your configuration settings
const nodemailer = require('nodemailer');
const config = require('./utils/config');

// General email sending function
const sendEmail = async ({ to, subject, html }) => {
  // Create a transporter using the configuration from your settings
  const transporter = nodemailer.createTransport({
    service: config.EMAIL_SERVICE,
    port: config.EMAIL_SERVICE_PORT,
    auth: {
      user: config.EMAIL_SERVICE_USER,
      pass: config.EMAIL_SERVICE_PASSWORD,
    },
  });

  // Define the email options
  const mailOptions = {
    from: config.EMAIL_SERVICE_FROM,
    to,
    subject,
    html,
  };

  // Attempt to send the email
  try {
    await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${to}`);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

// Make sure to get the data that mails will be using from Client and product owner and change the text to be more suitable for the project"
// "Place holder text need to be changed once its been agreed with the client what the email should say"

// Function for sending reset password email
const sendResetPasswordEmail = (user) => {
  const subject = 'Reset Your Password';
  const html = `
    <p>Hi ${user.firstName},</p>
    <p>Please click the following link to reset your password:</p>
    <a href="${user.generateResetPasswordLink()}">Reset Password</a>
  `; // Place holder text need to be changed once its been agreed with the client what the email should say

  sendEmail({ to: user.email, subject, html });
};

// Function for sending verification email
const sendVerificationEmail = (user, verificationLink) => {
  const subject = 'Verify Your Email';
  const html = `
    <p>Hello ${user.firstName},</p>
    <p>Please click the link below to verify your email address and change you password: </p>
    <a href="${verificationLink}">Verify Email</a>
  `; // Place holder text need to be changed once its been agreed with the client what the email should say

  sendEmail({ to: user.email, subject, html });
};

const sendNotificationMail = (user, newSupervisors) => {
  const subject = 'New Supervisor Added';
  const html = `
    <p>Hi ${user.firstName},</p>
    <p>New supervisors have been added to your evaluation.</p>
    <p>Supervisors: ${newSupervisors.join(', ')}</p>
  `; // Place holder text need to be changed once its been agreed with the client what the email should say
  sendEmail({ to: user.email, subject, html });
};

const sendUserMail = (user, message) => {
  const subject = 'test bla bla bla';
  const html = `
  <p> moikka ${user.firstName},</p>
  <p>${message}</p>
  `; // Place holder text need to be changed once its been agreed with the client what the email should say
  sendEmail({ to: user.email, subject, html });
};

// Export the email functions
module.exports = {
  sendResetPasswordEmail,
  sendVerificationEmail,
  sendNotificationMail,
  sendUserMail,
};
