import { User } from "../../../models/userModel";
import { sendEmail } from "../configMailer";
import mailerTemplate from "../mailerHtmlTemplate";

// TODO: Partial<User> for testing purposes, change to User
export const sendVerificationEmail = (user: Partial<User>, verificationLink: string) => {
  
  
    const title = "Uuden käyttäjän verifikaatio";
    const textUnderHeading = "";
    const subHeading = "";
    const text =
      `
    Tervetuloa OsTu-appin käyttäjäksi!

    Vahvista sähköpostiosoitteesi ja määritä tilisi loppuun <a href="${verificationLink}">tästä linkistä</a>.

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
    const textUnderHeading = "";
    const subHeading = "";
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
