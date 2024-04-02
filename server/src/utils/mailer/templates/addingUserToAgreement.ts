import { User } from "../../../models/userModel";
import { sendEmail } from "../configMailer";
import mailerTemplate from "../mailerHtmlTemplate";

export const sendNewCustomerAddedEmail = (user: Partial<User>) => {
  const title = "Uusi asiakas liitetään Suoritukseen";
  const textUnderHeading = "";
  const subHeading = "";
  const text =
  `
  Tervetuloa OsTu-appin käyttäjäksi! 

  Sinut on liitetty henkilön [Asiakkaan nimi] osaamisen tunnistamisen toteutukseen. 
  
  
  Asiakas: [Asiakkaan nimi] 
  Tutkinto: [Tutkinnon nimi] 
  Työpaikkaohjaaja: Työpaikkaohjaajan nimi] 
  
  
  Vahvista sähköpostiosoitteesi ja määritä tilisi loppuun tästä linkistä: 
  [SÄHKÖPOSTIN VAHVISTAMISLINKKI] 
  
  Linkki vanhenee kahden tunnin kuluttua. 
    
  
  Ystävällisin terveisin, 
  Ylläpito 
  `;

  const subject = 'Uusi asiakas liitetty suoritukseen';
  const html = mailerTemplate(title, textUnderHeading, subHeading, text);

  sendEmail({ to: user.email, subject, html });
};

export const sendNewCustomerVerifiedEmail = (user: Partial<User>) => {
  const title = "";
  const textUnderHeading = "";
  const subHeading = "";
  const text =
  `
  Tervetuloa OsTu-appin käyttäjäksi! 

  Sinut on liitetty henkilön [Asiakkaan nimi] osaamisen tunnistamisen toteutukseen. 
  
  
  Asiakas: [Asiakkaan nimi] 
  Tutkinto: [Tutkinnon nimi] 
  Työpaikkaohjaaja: Työpaikkaohjaajan nimi] 
  
  
  Vahvista sähköpostiosoitteesi ja määritä tilisi loppuun tästä linkistä: 
  [SÄHKÖPOSTIN VAHVISTAMISLINKKI] 
  
  Linkki vanhenee kahden tunnin kuluttua. 
    
  
  Ystävällisin terveisin, 
  Ylläpito 
  `;
 
  const subject = 'Uusi asiakas liitetty suoritukseen';
  const html = mailerTemplate(title, textUnderHeading, subHeading, text);

  sendEmail({ to: user.email, subject, html });
};

export const sendNewSupervisorAddedEmail = (user: Partial<User>) => {
    const title = "Uusi työpaikkaohjaaja liitetään Suoritukseen";
    const textUnderHeading = "";
    const subHeading = "";
    const text =
    `
    Tervetuloa OsTu-appin käyttäjäksi! 
  
    Sinut on liitetty henkilön [Asiakkaan nimi] osaamisen tunnistamisen toteutukseen. 
    
    
    Asiakas: [Asiakkaan nimi] 
    Tutkinto: [Tutkinnon nimi] 
    Työpaikkaohjaaja: Työpaikkaohjaajan nimi] 
    
    
    Vahvista sähköpostiosoitteesi ja määritä tilisi loppuun tästä linkistä: 
    [SÄHKÖPOSTIN VAHVISTAMISLINKKI] 
    
    Linkki vanhenee kahden tunnin kuluttua. 
      
    
    Ystävällisin terveisin, 
    Ylläpito 
    `;
  
    const subject = 'Uusi työpaikkaohjaaja liitetty suoritukseen';
    const html = mailerTemplate(title, textUnderHeading, subHeading, text);
  
    sendEmail({ to: user.email, subject, html });
  };
  
  export const sendOldSupervisorAddedEmail = (user: Partial<User>) => {
    const title = "Vanha työpaikkaohjaaja liitetään Suoritukseen";
    const textUnderHeading = "";
    const subHeading = "";
    const text =
    `
    Hei ${user.firstName}.
  
    Sinut on liitetty henkilön [Asiakkaan nimi] osaamisen tunnistamisen toteutukseen.
    
    
    Asiakas: [Asiakkaan nimi]
    Tutkinto: [Tutkinnon nimi]
    Opettaja: [Opettajan nimi]
    
    
    Ystävällisin terveisin,
    Ylläpito
  
    `;
  
    const subject = 'Vanha työpaikkaohjaaja liitetty suoritukseen';
    const html = mailerTemplate(title, textUnderHeading, subHeading, text);
  
    sendEmail({ to: user.email, subject, html });
  };