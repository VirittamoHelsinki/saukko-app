import { User } from "../../../models/userModel";
import { sendEmail } from "../configMailer";
import mailerTemplate from "../mailerHtmlTemplate";

// Function for sending reset password email
// const sendResetPasswordEmail = (user: User) => {
//   const subject = 'Reset Your Password';
//   const html = `
//       <p>Hi ${user.firstName},</p>
//       <p>Please click the following link to reset your password:</p>
//       <a href="${user.generateResetPasswordLink()}">Reset Password</a>
//     `; // Place holder text need to be changed once its been agreed with the client what the email should say

//   sendEmail({ to: user.email, subject, html });
// };

export const sendResetPasswordEmail = (user: Partial<User>) => {
  const title = "Salasanan vaihto";
  const textUnderHeading = "";
  const subHeading = "";
  const text =
    `
    Hei ${user.firstName}. 
    Olet pyytänyt salasanasi nollaamista.  
    
    Voit nollata salasanasi alla olevasta linkistä: 
    <a href="https://www.google.com">Nollaa salasana</a> 
    
    Jos et pyytänyt salasanasi nollaamista, voit ohittaa tämän viestin. 
    

    Ystävällisin terveisin, 
    Ylläpito 
    `;

  const subject = 'Salasanan vaihto';
  const html = mailerTemplate(title, textUnderHeading, subHeading, text);

  sendEmail({ to: user.email, subject, html });
};

export const sendResetPasswordSuccessEmail = (user: Partial<User>) => {
  const title = "Salasanan vaihto";
  const textUnderHeading = "";
  const subHeading = "";
  const text =
    `
    Hei ${user.firstName}.
    
    Salasanasi on nyt vaihdettu.  
  
    Jos et ole itse vaihtanut salasanaasi, ota yhteys Saukon tekniseen tukeen <a href="https://digitalents.powerappsportals.com/ict">tästä</a>. 
  

    Ystävällisin terveisin, 
    Ylläpito 
    `;

  const subject = 'Salasanan vaihto onnistunut';
  const html = mailerTemplate(title, textUnderHeading, subHeading, text);

  sendEmail({ to: user.email, subject, html });
};

const sendResetPasswordFailEmail = (user: Partial<User>) => {
  const title = "Salasanan vaihto";
  const textUnderHeading = "";
  const subHeading = "";
  const text =
    `
    Hei ${user.firstName}. 

    Salasanasi on vaihto epäonnistui.
  
    Ota yhteys Saukon tekniseen tukeen <a href="https://digitalents.powerappsportals.com/ict">Tuki</a>. 
  

    Ystävällisin terveisin, 
    Ylläpito 
    `;

  const subject = 'Salasanan vaihto epäonnistui';
  const html = mailerTemplate(title, textUnderHeading, subHeading, text);

  sendEmail({ to: user.email, subject, html });
};

