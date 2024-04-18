import { sendEmail } from '../configMailer';
import mailerTemplate from '../mailerHtmlTemplate';


// Asiakas pyytää yhteydenottoa

export interface ISendEvaluationFormCustomerRequestContact {
  userName: string;
  userEmail: string;
  degreeName: string;
  unitName: string;
  supervisorName: string;
}

export const sendEvaluationFormCustomerRequestContact = (params: ISendEvaluationFormCustomerRequestContact) => {

  const text =
    `
    Hei ${params.userName},
  
    Asiakas ${params.userName} pyytää yhteydenottoa liittyen seuraavaan suoritukseen:
    
    
    Tutkinto: ${params.degreeName}
    Tutkinnonosa: ${params.unitName}
    Työpaikkaohjaaja: ${params.supervisorName}
    
    
    Ystävällisin terveisin,
    Ylläpito
    `;

  const subject = 'Arviointilomake: asiakkaan yhteydenottopyyntö';
  const html = mailerTemplate(text);

  sendEmail({ to: params.userEmail, subject, html });
};

// Työpaikkaohjaaja pyytää yhteydenottoa

interface ISendEvaluationFormSupervisorRequestContact {
  userName: string;
  userEmail: string;
  degreeName: string;
  unitName: string;
  supervisorName: string;
  customerName: string;
}


export const sendEvaluationFormSupervisorRequestContact = (params: ISendEvaluationFormSupervisorRequestContact) => {

  const text =
    `
    Hei ${params.userName},

    Työpaikkaohjaaja ${params.supervisorName} pyytää yhteydenottoa liittyen seuraavaan 	suoritukseen:
        
        
    Asiakas: ${params.customerName}
    Tutkinto: ${params.degreeName} 
    Tutkinnonosa: ${params.unitName}
        
        
    Ystävällisin terveisin,
    Ylläpito
    `;

  const subject = 'Arviointilomake: työpaikkaohjaajan yhteydenottopyyntö';
  const html = mailerTemplate(text);

  sendEmail({ to: params.userEmail, subject, html });
};

// Opettaja pyytää yhteydenottoa

interface ISendEvaluationFormCustomerRequestContactMessageTeacher {
  userName: string;
  userEmail: string;
  degreeName: string;
  unitName: string;
  supervisorName: string;
  teacherName: string;
}


export const sendEvaluationFormTeacherRequestContactMessageCustomer = (params: ISendEvaluationFormCustomerRequestContactMessageTeacher) => {

  const text =
    `
    Hei ${params.userName},
  
    Opettaja ${params.teacherName} pyytää yhteydenottoa liittyen seuraavaan suoritukseen:
    
    
    Tutkinto: ${params.degreeName}
    Tutkinnonosa: ${params.unitName}
    Työpaikkaohjaaja: ${params.supervisorName}
    
    
    Ystävällisin terveisin,
    Ylläpito
    `;

  const subject = 'Arviointilomake: opettajan yhteydenottopyyntö';
  const html = mailerTemplate(text);

  sendEmail({ to: params.userEmail, subject, html });
};

interface ISendEvaluationFormTeacherRequestContactMessageSupervisor {
  userName: string;
  userEmail: string;
  customerName: string;
  degreeName: string;
  unitName: string;
  teacherName: string;
  vocationalCompetenceName: string;
}

export const sendEvaluationFormTeacherRequestContactMessageSupervisor = (params: ISendEvaluationFormTeacherRequestContactMessageSupervisor) => {

  const text =
    `
    Hei ${params.userName},
  
    Opettaja ${params.teacherName} pyytää yhteydenottoa liittyen seuraavaan suoritukseen:
    
    
    Asiakas: ${params.customerName}
    Tutkinto: ${params.degreeName}
    Tutkinnonosa: ${params.unitName}
    Ammattitaitovaatimus: ${params.vocationalCompetenceName}
    
    
    Ystävällisin terveisin,
    Ylläpito
    `;

  const subject = 'Arviointilomake: opettajan yhteydenottopyyntö';
  const html = mailerTemplate(text);

  sendEmail({ to: params.userEmail, subject, html });
};

// Arviointilomake: valmis lomake
// Asiakkaan ja opettajan valmis lomake

export enum AssessmentStatus {
  READY = 'Valmis',
  IN_PROGRESS = 'Kesken'
}

export interface ISendEvaluationFormSupervisorReadyMessageCustomer {
  customerFirstName: string;
  customerName: string;
  supervisorName: string;
  degreeName: string;
  unitName: string;
  customerAssessment: AssessmentStatus;
  supervisorAssessment: AssessmentStatus;
  additionalInfo: string;
}

export interface ISendEvaluationFormSupervisorReadyMessageTeacher {
  customerName: string;
  supervisorName: string;
  teacherFirstName: string;
  degreeName: string;
  unitName: string;
  customerAssessment: AssessmentStatus;
  supervisorAssessment: AssessmentStatus;
  additionalInfo: string;
}

export const sendEvaluationFormSupervisorReadyMessageCustomer = (params: ISendEvaluationFormSupervisorReadyMessageCustomer, subject: string, to: string) => {

  const text =
    `
    Hei ${params.customerFirstName},
  
    Tutkinnonosa on valmis tarkistettavaksi.
    
    
    Asiakas: ${params.customerName}
    Työpaikkaohjaaja: ${params.supervisorName}
    Tutkinto: ${params.degreeName} 
    Tutkinnonosa: ${params.unitName}
    Asiakkaan arvio: ${params.customerAssessment}
    Työpaikkaohjaajan arvio: ${params.supervisorAssessment}	
    Lisätiedot: ${params.additionalInfo}
    
    
    Ystävällisin terveisin,
    Ylläpito
    `;

  const html = mailerTemplate(text);

  sendEmail({ to, subject, html });
};

export const sendEvaluationFormSupervisorReadyMessageTeacher = (params: ISendEvaluationFormSupervisorReadyMessageTeacher, subject: string, to: string) => {

  const text =
    `
    Hei ${params.teacherFirstName},
  
    Tutkinnonosa on valmis tarkistettavaksi.
    
    
    Asiakas: ${params.customerName}
    Työpaikkaohjaaja: ${params.supervisorName}
    Tutkinto: ${params.degreeName} 
    Tutkinnonosa: ${params.unitName}
    Asiakkaan arvio: ${params.customerAssessment}
    Työpaikkaohjaajan arvio: ${params.supervisorAssessment}	
    Lisätiedot: ${params.additionalInfo}
    
    
    Ystävällisin terveisin,
    Ylläpito
    `;

  const html = mailerTemplate(text);

  sendEmail({ to, subject, html });
};

export const sendEvaluationFormCustomerReadyMessageTeacher = (params: ISendEvaluationFormSupervisorReadyMessageTeacher, subject: string, to: string) => {

  const text =
    `
    Hei ${params.teacherFirstName},
  
    Tutkinnonosa on valmis tarkistettavaksi.
    
    
    Asiakas: ${params.customerName}
    Työpaikkaohjaaja: ${params.supervisorName}
    Tutkinto: ${params.degreeName} 
    Tutkinnonosa: ${params.unitName}
    Asiakkaan arvio: ${params.customerAssessment}
    Työpaikkaohjaajan arvio: ${params.supervisorAssessment}	
    Lisätiedot: ${params.additionalInfo}
    
    
    Ystävällisin terveisin,
    Ylläpito
    `;

  const html = mailerTemplate(text);

  sendEmail({ to, subject, html });
};
interface ISendEvaluationFormCustomerReadyMessageSupervisor {
  supervisorFirstName: string;
  customerName: string;
  supervisorName: string;
  degreeName: string;
  unitName: string;
  customerAssessment: AssessmentStatus;
  supervisorAssessment: AssessmentStatus;
  additionalInfo: string;
}
export const sendEvaluationFormCustomerReadyMessageSupervisor = (params: ISendEvaluationFormCustomerReadyMessageSupervisor, subject: string, to: string) => {

  const text =
    `
    Hei ${params.supervisorFirstName},
  
    Tutkinnonosa on valmis tarkistettavaksi.
    
    
    Asiakas: ${params.customerName}
    Työpaikkaohjaaja: ${params.supervisorName}
    Tutkinto: ${params.degreeName} 
    Tutkinnonosa: ${params.unitName}
    Asiakkaan arvio: ${params.customerAssessment}
    Työpaikkaohjaajan arvio: ${params.supervisorAssessment}	
    Lisätiedot: ${params.additionalInfo}
    
    
    Ystävällisin terveisin,
    Ylläpito
    `;

  const html = mailerTemplate(text);

  sendEmail({ to, subject, html });
};

/*export const sendEvaluationFormCustomerReadyMessageSupervisor = (params: ISendEvaluationFormReady, subject: string) => {

  const text =
    `
    Hei ${params.userFirstName},
  
    Tutkinnonosa on valmis tarkistettavaksi.
    
    
    Asiakas: ${params.customerName}
    Työpaikkaohjaaja: ${params.supervisorName}
    Tutkinto: ${params.degreeName} 
    Tutkinnonosa: ${params.unitName}
    Asiakkaan arvio: ${params.customerAssessment}
    Työpaikkaohjaajan arvio: ${params.supervisorAssessment}	
    Lisätiedot: ${params.additionalInfo}
    
    
    Ystävällisin terveisin,
    Ylläpito
    `;

  const html = mailerTemplate(text);

  sendEmail({ to: params.userEmail, subject, html });
};*/

/*export const sendEvaluationFormCustomerOrSupervisorReady = (params: ISendEvaluationFormReady, subject: string) => {

  const text =
    `
    Hei ${params.userFirstName},
  
    Tutkinnonosa on valmis tarkistettavaksi.
    
    
    Asiakas: ${params.customerName}
    Työpaikkaohjaaja: ${params.supervisorName}
    Tutkinto: ${params.degreeName} 
    Tutkinnonosa: ${params.unitName}
    Asiakkaan arvio: ${params.customerAssessment}
    Työpaikkaohjaajan arvio: ${params.supervisorAssessment}	
    Lisätiedot: ${params.additionalInfo}
    
    
    Ystävällisin terveisin,
    Ylläpito
    `;

  const html = mailerTemplate(text);

  sendEmail({ to: params.userEmail, subject, html });
};*/

enum EvaluationStatus {
  ACCEPTED = 'Kyllä',
  REJECTED = 'Ei'
}

interface ISendEvaluationFormTeacherReadyMessageCustomer {
  customerFirstName: string;
  customerName: string;
  supervisorName: string;
  degreeName: string;
  unitName: string;
  evaluationAccepted: EvaluationStatus;
  additionalInfo: string;
}

// Opettajan valmis lomake

export const sendEvaluationFormTeacherReadyMessageCustomer = (params: ISendEvaluationFormTeacherReadyMessageCustomer, subject: string, to: string) => {

  const text =
    `
    Hei ${params.customerFirstName}, 
  
    Uusi suoritus on valmis.
    
    
    Asiakas: ${params.customerName}
    Työpaikkaohjaaja: ${params.supervisorName}
    Tutkinto: ${params.degreeName}
    Tutkinnonosa: ${params.unitName}
    Suoritus hyväksytty: ${params.evaluationAccepted}
    Lisätiedot: ${params.additionalInfo}
    
    
    Ystävällisin terveisin,
    Ylläpito
    `;

  const html = mailerTemplate(text);

  sendEmail({ to, subject, html });
};

interface ISendEvaluationFormTeacherReadyMessageSupervisor {
  supervisorFirstName: string;
  customerName: string;
  supervisorName: string;
  degreeName: string;
  unitName: string;
  evaluationAccepted: EvaluationStatus;
  additionalInfo: string;
}

export const sendEvaluationFormTeacherReadyMessageSupervisor = (params: ISendEvaluationFormTeacherReadyMessageSupervisor, subject: string, to: string) => {

  const text =
    `
    Hei ${params.supervisorFirstName}, 
  
    Uusi suoritus on valmis.
    
    
    Asiakas: ${params.customerName}
    Työpaikkaohjaaja: ${params.supervisorName}
    Tutkinto: ${params.degreeName}
    Tutkinnonosa: ${params.unitName}
    Suoritus hyväksytty: ${params.evaluationAccepted}
    Lisätiedot: ${params.additionalInfo}
    
    
    Ystävällisin terveisin,
    Ylläpito
    `;

  const html = mailerTemplate(text);

  sendEmail({ to, subject, html });
};
