import { User } from "../../../models/userModel";
import { sendEmail } from "../configMailer";
import mailerTemplate from "../mailerHtmlTemplate";

export const sendEvaluationFormCustomerRequestContact = (user: Partial<User>) => {
    const title = "Asiakas pyytää yhteydenottoa";
    const textUnderHeading = "";
    const subHeading = "";
    const text =
        `
    Hei [Käyttäjänimi],
  
    Asiakas [Asiakkaan nimi] pyytää yhteydenottoa liittyen seuraavaan suoritukseen:
    
    
    Tutkinto:		[Tutkinnon nimi] 
    Tutkinnonosa: 		[Tutkinnonosan nimi]
    Työpaikkaohjaaja: 	[Työpaikkaohjaajan nimi]
    
    
    Ystävällisin terveisin,
    Ylläpito
    `;

    const subject = 'Arviointilomake: asiakkaan yhteydenottopyyntö';
    const html = mailerTemplate(title, textUnderHeading, subHeading, text);

    sendEmail({ to: user.email, subject, html });
};

export const sendEvaluationFormSupervisorRequestContact = (user: Partial<User>) => {
    const title = "Työpaikkaohjaaja pyytää yhteydenottoa";
    const textUnderHeading = "";
    const subHeading = "";
    const text =
    `
    Hei [Käyttäjänimi],

    Työpaikkaohjaaja [Työpaikka ohjaajan nimi] pyytää yhteydenottoa liittyen seuraavaan 	suoritukseen:
        
        
    Asiakas:		[Asiakkaan nimi]
    Tutkinto: 		[Tutkinnon nimi] 
    Tutkinnonosa: 		[Tutkinnonosan nimi]
        
        
    Ystävällisin terveisin,
    Ylläpito
    `;

    const subject = 'Arviointilomake: työpaikkaohjaajan yhteydenottopyyntö';
    const html = mailerTemplate(title, textUnderHeading, subHeading, text);

    sendEmail({ to: user.email, subject, html });
};

export const sendEvaluationFormTeacherRequestContactMessageCustomer = (user: Partial<User>) => {
    const title = "Opettaja pyytää yhteydenottoa";
    const textUnderHeading = "";
    const subHeading = "";
    const text =
        `
    Hei [Käyttäjänimi],
  
    Opettaja [Opettajan nimi] pyytää yhteydenottoa liittyen seuraavaan suoritukseen:
    
    
    Tutkinto: 		[Tutkinnon nimi] 
    Tutkinnonosa: 		[Tutkinnonosan nimi]
    Työpaikkaohjaaja: 	[Työpaikkaohjaajan nimi]
    
    
    Ystävällisin terveisin,
    Ylläpito
    `;

    const subject = 'Arviointilomake: Opettajan yhteydenottopyyntö';
    const html = mailerTemplate(title, textUnderHeading, subHeading, text);

    sendEmail({ to: user.email, subject, html });
};

export const sendEvaluationFormTeacherRequestContactMessageSupervisor = (user: Partial<User>) => {
    const title = "Opettaja pyytää yhteydenottoa";
    const textUnderHeading = "";
    const subHeading = "";
    const text =
        `
  
    Hei [Käyttäjänimi],
  
    Opettaja [Opettajan nimi] pyytää yhteydenottoa liittyen seuraavaan suoritukseen:
    
    
    Asiakas: 		[Asiakkaan nimi]
    Tutkinto: 		[Tutkinnon nimi] 
    Tutkinnonosa: 		[Tutkinnonosan nimi]
    Ammattitaitovaatimus: 	[Ammattitaitovaatimuksen nimi]
    
    
    Ystävällisin terveisin,
    Ylläpito
    `;

    const subject = 'Arviointilomake: Opettajan yhteydenottopyyntö';
    const html = mailerTemplate(title, textUnderHeading, subHeading, text);

    sendEmail({ to: user.email, subject, html });
};

export const sendEvaluationFormCustomerReadyMessageTeacher = (user: Partial<User>) => {
    const title = "Asiakkaan valmis lomake";
    const textUnderHeading = "";
    const subHeading = "";
    const text =
        `
  
    Hei [Etunimi],
  
    Tutkinnonosa on valmis tarkistettavaksi.
    
    
    Asiakas: 		[Asiakkaan nimi]
    Työpaikkaohjaaja: 	[Työpaikkaohjaajan nimi]
    Tutkinto: 		[Tutkinnon nimi] 
    Tutkinnonosa: 		[Tutkinnonosan nimi]
    Asiakkaan arvio: 	[    /Valmis]
    Työpaikkaohjaajan arvio: 	[    /Valmis]	
    Lisätiedot: 		”[Kommenttiboksiin kirjoitettu teksti]”
    
    
    Ystävällisin terveisin,
    Ylläpito
    `;

    const subject = 'Asiakkaan lomake valmis';
    const html = mailerTemplate(title, textUnderHeading, subHeading, text);

    sendEmail({ to: user.email, subject, html });
};

export const sendEvaluationFormCustomerReadyMessageSupervisor = (user: Partial<User>) => {
    const title = "Asiakkaan valmis lomake";
    const textUnderHeading = "";
    const subHeading = "";
    const text =
        `
  
    Hei [Etunimi], 
  
    Tutkinnonosa on valmis tarkistettavaksi.
    
    
    Asiakas: 		[Asiakkaan nimi]
    Tutkinto: 		[Tutkinnon nimi] 
    Tutkinnonosa: 		[Tutkinnonosan nimi]
    Asiakkaan arvio: 	[    /Valmis]
    Työpaikkaohjaajan arvio: 	[    /Valmis]	
    Lisätiedot: 		”[Kommenttiboksiin kirjoitettu teksti]”
    
    
    Ystävällisin terveisin,
    Ylläpito
    `;

    const subject = 'Asiakkaan lomake valmis';
    const html = mailerTemplate(title, textUnderHeading, subHeading, text);

    sendEmail({ to: user.email, subject, html });
};

export const sendEvaluationFormSupervisorReadyMessageCustomer = (user: Partial<User>) => {
    const title = "Työpaikkaohjaajan valmis lomake";
    const textUnderHeading = "";
    const subHeading = "";
    const text =
        `
  
    Hei [Etunimi], 
  
    Tutkinnonosa on valmis tarkistettavaksi.
    
    
    Asiakas: 		[Asiakkaan nimi]
    Tutkinto: 		[Tutkinnon nimi] 
    Tutkinnonosa: 		[Tutkinnonosan nimi]
    Asiakkaan arvio: 	[    /Valmis]
    Työpaikkaohjaajan arvio: 	[    /Valmis]	
    Lisätiedot: 		”[Kommenttiboksiin kirjoitettu teksti]”
    
    
    Ystävällisin terveisin,
    Ylläpito
    `;

    const subject = 'Työpaikkaohjaajan lomake valmis';
    const html = mailerTemplate(title, textUnderHeading, subHeading, text);

    sendEmail({ to: user.email, subject, html });
};

export const sendEvaluationFormSupervisorReadyMessageTeacher = (user: Partial<User>) => {
    const title = "Työpaikkaohjaajan valmis lomake";
    const textUnderHeading = "";
    const subHeading = "";
    const text =
        `
  
    Hei [Etunimi], 
  
    Tutkinnonosa on valmis tarkistettavaksi.
    
    
    Asiakas: 		[Asiakkaan nimi]
    Tutkinto: 		[Tutkinnon nimi] 
    Tutkinnonosa: 		[Tutkinnonosan nimi]
    Asiakkaan arvio: 	[    /Valmis]
    Työpaikkaohjaajan arvio: 	[    /Valmis]	
    Lisätiedot: 		”[Kommenttiboksiin kirjoitettu teksti]”
    
    
    Ystävällisin terveisin,
    Ylläpito
    `;

    const subject = 'Työpaikkaohjaajan lomake valmis';
    const html = mailerTemplate(title, textUnderHeading, subHeading, text);

    sendEmail({ to: user.email, subject, html });
};

export const sendEvaluationFormTeacherReadyMessageCustomer = (user: Partial<User>) => {
    const title = "Opettajan valmis lomake";
    const textUnderHeading = "";
    const subHeading = "";
    const text =
        `
  
    Hei [Etunimi], 
  
    Tutkinnonosa on valmis tarkistettavaksi.
    
    
    Asiakas: 		[Asiakkaan nimi]
    Tutkinto: 		[Tutkinnon nimi] 
    Tutkinnonosa: 		[Tutkinnonosan nimi]
    Asiakkaan arvio: 	[    /Valmis]
    Työpaikkaohjaajan arvio: 	[    /Valmis]	
    Lisätiedot: 		”[Kommenttiboksiin kirjoitettu teksti]”
    
    
    Ystävällisin terveisin,
    Ylläpito
    `;

    const subject = 'Opettajan lomake valmis';
    const html = mailerTemplate(title, textUnderHeading, subHeading, text);

    sendEmail({ to: user.email, subject, html });
};

export const sendEvaluationFormTeacherReadyMessageSupervisor = (user: Partial<User>) => {
    const title = "Opettajan valmis lomake";
    const textUnderHeading = "";
    const subHeading = "";
    const text =
        `
  
    Hei [Etunimi], 
  
    Tutkinnonosa on valmis tarkistettavaksi.
    
    
    Asiakas: 		[Asiakkaan nimi]
    Tutkinto: 		[Tutkinnon nimi] 
    Tutkinnonosa: 		[Tutkinnonosan nimi]
    Asiakkaan arvio: 	[    /Valmis]
    Työpaikkaohjaajan arvio: 	[    /Valmis]	
    Lisätiedot: 		”[Kommenttiboksiin kirjoitettu teksti]”
    
    
    Ystävällisin terveisin,
    Ylläpito
    `;

    const subject = 'Opettajan lomake valmis';
    const html = mailerTemplate(title, textUnderHeading, subHeading, text);

    sendEmail({ to: user.email, subject, html });
};
