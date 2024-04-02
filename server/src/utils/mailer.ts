import { User } from "../models/userModel";
const nodemailer = require("nodemailer");
import config from "./config";
import mailerTemplate from "./mailerTemplate";
// Import nodemailer and your configuration settings
// const nodemailer = require('nodemailer');

// General email sending function
export const sendEmail = async ({ to, subject, html }: any) => {
  // Create a transporter using the configuration from your settings
  // const transporter = nodemailer.createTransport({
  //   // service: config.EMAIL_SERVICE, // TODO: maybe used in older version of nodemailer, commented out
  //   // port: config.EMAIL_SERVICE_PORT, // TODO: maybe used in older version of nodemailer, commented out
  //   auth: {
  //     user: config.EMAIL_SERVICE_USER,
  //     pass: config.EMAIL_SERVICE_PASSWORD,
  //   },
  // });
  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'adolphus.price@ethereal.email',
        pass: '9E5bUarmV9Vzt7pTz8'
    }
});


  // Define the email options
  const mailOptions = {
    from: '"Adolphus Price 👻" <adolphus.price@ethereal.email>', // sender address
    to,
    subject,
    html,
  };

  // Attempt to send the email
  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

// Make sure to get the data that mails will be using from Client and product owner and change the text to be more suitable for the project"
// "Place holder text need to be changed once its been agreed with the client what the email should say"

// Function for sending reset password email
const sendResetPasswordEmail = (user: User) => {
  const subject = 'Reset Your Password';
  const html = `
    <p>Hi ${user.firstName},</p>
    <p>Please click the following link to reset your password:</p>
    <a href="${user.generateResetPasswordLink()}">Reset Password</a>
  `; // Place holder text need to be changed once its been agreed with the client what the email should say

  sendEmail({ to: user.email, subject, html });
};

// Function for sending verification email
// TODO: Partial<User> for testing purposes, change to User
export const sendVerificationEmail = (user: Partial<User>, verificationLink: string) => {


  const title = "Uuden käyttäjän verifikaatio";
  const textUnderHeading = "Opettaja on luonut uuden tunnuksen TPO:lle ja/tai asiakkaalle littämällä heidät suoritukseen.";
  const subHeading = "Verifikaatiolinkki";
  const text = 
  `
  Tervetuloa OsTu-appin käyttäjäksi!
  Vahvista sähköpostiosoitteesi ja määritä tilisi loppuun <a href="${verificationLink}">tästä linkistä</a>
  Linkki vanhenee kahden tunnin kuluttua.

  Ystävälisin terveisin,
  Ylläpito
  `;

  const subject = 'Vahvista sähköpostiosoitteesi';
  const html = mailerTemplate(title, textUnderHeading, subHeading, text);

  sendEmail({ to: user.email, subject, html });
};

export const sendVerificationDoneEmail = (user: Partial<User>) => {


  const title = "Uuden käyttäjän verifikaatio";
  const textUnderHeading = "Opettaja on luonut uuden tunnuksen TPO:lle ja/tai asiakkaalle littämällä heidät suoritukseen.";
  const subHeading = "Verifiointi tehty";
  const text = 
  `
  Sinulla on nyt käyttäjätili OsTu –appiin.

  Löydät asiakkuuteesi liittyvät tiedot omalta tililtäsi, jossa voit myös päivittää omia tietojasi. 
  
  Tervetuloa mukaan! 
  
  
  Ystävällisin terveisin, 
  Ylläpito
  `;

  const subject = 'Sähköpostiosoitteesi on vahvistettu';
  const html = mailerTemplate(title, textUnderHeading, subHeading, text);

  sendEmail({ to: user.email, subject, html });
};


const sendNotificationMail = (user: User, newSupervisors: any) => { // TODO: fix types
  const subject = 'New Supervisor Added';
  const html = `
    <p>Hi ${user.firstName},</p>
    <p>New supervisors have been added to your evaluation.</p>
    <p>Supervisors: ${newSupervisors.join(', ')}</p>
  `; // Place holder text need to be changed once its been agreed with the client what the email should say
  sendEmail({ to: user.email, subject, html });
};

const sendUserMail = (user: User, message: string) => {
  const subject = 'test bla bla bla';
  const html = `
  <p> moikka ${user.firstName},</p>
  <p>${message}</p>
  `; // Place holder text need to be changed once its been agreed with the client what the email should say
  sendEmail({ to: user.email, subject, html });
};

// Export the email functions
export default {
  sendResetPasswordEmail,
  sendVerificationEmail,
  sendNotificationMail,
  sendUserMail,
};
