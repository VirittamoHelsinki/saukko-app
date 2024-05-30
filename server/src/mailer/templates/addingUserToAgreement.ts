import { sendEmail } from "../configMailer";
import mailPoller, { EmailObj } from "../azureEmailService"
import mailerTemplate from "../mailerHtmlTemplate";

export interface ISendNewCustomerAddedEmail {
  degreeName: string;
  supervisorName: string;
  teacherName: string;
  verificationLink: string;
  userEmail: string;
}

export const sendNewCustomerAddedEmail = (params: ISendNewCustomerAddedEmail) => {
  const text = `
    Tervetuloa OsTu-appin käyttäjäksi! 

    Sinut on liitetty osaamisen tunnistamisen toteutukseen. 
    
    
    Tutkinto: ${params.degreeName}
    Työpaikkaohjaaja: ${params.supervisorName}
    Opettaja: ${params.teacherName}
    
    
    Vahvista sähköpostiosoitteesi ja määritä tilisi loppuun <a href="${params.verificationLink}">tästä linkistä</a>.
    
    Linkki vanhenee kahden tunnin kuluttua.
    
    
    Ystävällisin terveisin,
    Ylläpito
  `;

  const mail: EmailObj = {
    content: {
      subject: 'Uuden asiakkaan lisääminen suoritukseen',
      plainText: text,
      html: mailerTemplate(text),
    },
    recipients:
    {
      to: [
        { address: params.userEmail }
      ] 
    }
  }

  mailPoller(mail);
};

export interface ISendNewCustomerVerfiedEmail {
  userFirstName: string;
  userEmail: string;
}

export const sendNewCustomerVerifiedEmail = (params: ISendNewCustomerVerfiedEmail) => {

  const text = `
    Hei ${params.userFirstName}.

    Salasanasi on nyt vaihdettu ja tilisi aktivoitu. Sinulla on nyt käyttäjätili OsTu-appiin!
    
    Löydät asiakkuuteesi liittyvät tiedot omalta tililtäsi, jossa voit myös päivittää omia tietojasi.
    
    Tervetuloa mukaan!
    
    
    Ystävällisin terveisin,
    Ylläpito
  `;

  const mail: EmailObj = {
    content: {
      subject: 'Uusi asiakas liitetty suoritukseen',
      plainText: text,
      html: mailerTemplate(text),
    },
    recipients:
    {
      to: [
        { address: params.userEmail }
      ] 
    }
  }

  mailPoller(mail);
};


export interface ISendNewSupervisorAddedEmail {
  userEmail: string;
  customerName: string;
  degreeName: string;
  supervisorName: string;
  verificationLink: string;
}

export const sendNewSupervisorAddedEmail = (params: ISendNewSupervisorAddedEmail) => {

  const text = `
    Tervetuloa OsTu-appin käyttäjäksi! 
  
    Sinut on liitetty henkilön ${params.customerName} osaamisen tunnistamisen toteutukseen. 
    
    
    Asiakas: ${params.customerName}
    Tutkinto: ${params.degreeName}
    Työpaikkaohjaaja: ${params.supervisorName}
    
    
    Vahvista sähköpostiosoitteesi ja määritä tilisi loppuun <a href="${params.verificationLink}">tästä linkistä</a>.
    
    Linkki vanhenee kahden tunnin kuluttua. 
      
    
    Ystävällisin terveisin, 
    Ylläpito 
  `;

  const mail: EmailObj = {
    content: {
      subject: 'Uusi työpaikkaohjaaja liitetty suoritukseen',
      plainText: text,
      html: mailerTemplate(text),
    },
    recipients:
    {
      to: [
        { address: params.userEmail }
      ] 
    }
  }

  mailPoller(mail);
};

export interface ISendOldSupervisorAddedEmail {
  userFirstName: string;
  userEmail: string;
  customerName: string;
  degreeName: string;
  teacherName: string;
}


export const sendOldSupervisorAddedEmail = (params: ISendOldSupervisorAddedEmail) => {

  const text =
    `
      Hei ${params.userFirstName}.
    
      Sinut on liitetty henkilön ${params.customerName} osaamisen tunnistamisen toteutukseen.
      
      
      Asiakas: ${params.customerName} 
      Tutkinto: ${params.degreeName} 
      Opettaja: ${params.teacherName} 
      
      
      Ystävällisin terveisin,
      Ylläpito
    `;

    const mail: EmailObj = {
      content: {
        subject: 'Vanha työpaikkaohjaaja liitetty suoritukseen',
        plainText: text,
        html: mailerTemplate(text),
      },
      recipients:
      {
        to: [
          { address: params.userEmail }
        ] 
      }
    }
  
    mailPoller(mail)
};