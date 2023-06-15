
const nodemailer = require('nodemailer');
const config = require('../src/utils/config')

const setup = (user) => {
  return nodemailer.createTransport({})
}

// This function is not yet in use
const sendResetPasswordEmail = (user) => {
  const transport = setup(user);
  const emailObject = {}
  transport.sendMail(emailObject, (err, info) => {
    if (err) {
      console.log(err.message);
      return false
    } 
    console.log(info);
    return true
  })
}

module.exports = { sendResetPasswordEmail }