/* import { sendEmail } from "../configMailer"; */
import sendEmail from "../azureEmailService"
import mailerTemplate from "../mailerHtmlTemplate";


interface ISendResetPasswordEmail {
  userFirstName: string;
  userEmail: string;
  resetPasswordLink: string;
}

export const sendResetPasswordEmail = (params: ISendResetPasswordEmail) => {

  const text =
    `
    Hei ${params.userFirstName}. 
    Olet pyytänyt salasanasi nollaamista.  
    
    Voit nollata salasanasi alla olevasta linkistä: 
    <a href="${params.resetPasswordLink}">Nollaa salasana</a> 
    
    Jos et pyytänyt salasanasi nollaamista, voit ohittaa tämän viestin. 
    

    Ystävällisin terveisin, 
    Ylläpito 
    `.trim();

  const subject = 'Salasanan vaihto';
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

interface ISendResetPasswordSuccessEmail {
  userFirstName: string;
  userEmail: string;
  technicalSupportLink: string;
}

export const sendResetPasswordSuccessEmail = (params: ISendResetPasswordSuccessEmail) => {

  const text =
    `
    Hei ${params.userFirstName}.
    
    Salasanasi on nyt vaihdettu.  
  
    Jos et ole itse vaihtanut salasanaasi, ota yhteys Saukon tekniseen tukeen <a href=${params.technicalSupportLink}>tästä</a>. 
  

    Ystävällisin terveisin, 
    Ylläpito 
    `;

  const subject = 'Salasanan vaihto onnistunut';
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


