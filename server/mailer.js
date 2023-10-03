const nodemailer = require('nodemailer');
const config = require('./utils/config');

// setup email transport
const setup = () => {
  return nodemailer.createTransport({
    service: config.EMAIL_SERVICE,
    port: config.EMAIL_SERVICE_PORT,
    auth: {
      user: config.EMAIL_SERVICE_USER,
      pass: config.EMAIL_SERVICE_PASSWORD
    }
  })
}

// send email to user with reset password link
const sendResetPasswordEmail = (user) => {
  
  // create transport object
  const transport = setup();
  
  // create email object
  const emailObject = {
    from: config.EMAIL_SERVICE_FROM,
    to: user.email,
    subject: 'Reset your password',
    text: `
      Hi ${user.name},

      To reset your password, 
      
      click this link: ${user.generateResetPasswordLink()}
    `
  }

  // send email
  transport.sendMail(emailObject)
}

module.exports = { sendResetPasswordEmail }