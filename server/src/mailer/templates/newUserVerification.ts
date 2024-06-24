/* import { sendEmail } from "../configMailer"; */
import sendEmail from "../azureEmailService"
import createNewEmail from "../createNewMail";
import sendingMailToQueue from "../createNewMail";
import mailerTemplate from "../mailerHtmlTemplate";

interface IsendVerificationEmail {
  userEmail: string;
  verificationLink: string;
  recipentUserId: string;
}

export const sendVerificationEmail = (params: IsendVerificationEmail) => {

  const plainText =
    `
    Tervetuloa OsTu-appin käyttäjäksi!

    Vahvista sähköpostiosoitteesi ja määritä tilisi loppuun <a href="${params.verificationLink}">tästä linkistä</a>.

    Linkki vanhenee kahden tunnin kuluttua.

    
    Ystävällisin terveisin,
    Ylläpito
    `;

  const subject = 'Vahvista sähköpostiosoitteesi';
  const html = mailerTemplate(plainText);

  // sendEmail({ to: params.userEmail, subject, html });

  // const emailObj = {
  //   content: {
  //     subject: subject,
  //     plainText: plainText,
  //     html: html
  //   },
  //   recipients: {
  //     to: [{
  //       address: params.userEmail
  //     }]
  //   }
  // }

  /*   sendEmail(emailObj); */
  sendingMailToQueue({
    msg: {
      content: {
        subject,
        html,
        plainText
      },
      recipients: { to: [{ address: params.userEmail }] }
    },
    recipentUserId: params.recipentUserId,
  });
};

interface IsendVerificationDoneEmail {
  userEmail: string;
}

export const sendVerificationDoneEmail = (params: IsendVerificationDoneEmail) => {

  const text =
    `
    Sinulla on nyt käyttäjätili OsTu –appiin.
  
    Löydät asiakkuuteesi liittyvät tiedot omalta tililtäsi, jossa voit myös päivittää omia tietojasi. 
    
    Tervetuloa mukaan! 
    
  
    Ystävällisin terveisin, 
    Ylläpito
    `;

  const subject = 'Sähköpostiosoitteesi on vahvistettu';
  const html = mailerTemplate(text);

  const emailObj = {
    content: {
      subject: subject,
      plainText: text,
      html: html
    },
    recipients: {
      to: [{
        address: params.userEmail
      }]
    }
  }

  sendEmail(emailObj);
};
