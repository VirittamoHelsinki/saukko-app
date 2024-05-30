import { sendEmail } from "../configMailer";
import createNewEmail from "../createNewMail";
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

    
    Ystävälisin terveisin,
    Ylläpito
    `;
  
    const subject = 'Vahvista sähköpostiosoitteesi';
    const html = mailerTemplate(plainText);
  
    // sendEmail({ to: params.userEmail, subject, html });

    createNewEmail({
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
  
    sendEmail({ to: params.userEmail, subject, html });
  };
