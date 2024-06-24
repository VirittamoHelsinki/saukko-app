/* import { sendEmail } from '../configMailer'; */
import sendEmail, { EmailObj } from '../azureEmailService';
import mailerTemplate from '../mailerHtmlTemplate';
import {
  AssessmentStatus,
  ISendEvaluationFormCustomerReadyMessageSupervisor,
  ISendEvaluationFormRequestContact,
  ISendEvaluationFormTeacherReadyMessageCustomer,
  ISendEvaluationFormTeacherReadyMessageSupervisor,
  ISendEvaluationFormTeacherRequestContactMessageSupervisor,
} from '../types';


// Asiakas pyytää yhteydenottoa
export const sendEvaluationFormCustomerRequestContact = (params: ISendEvaluationFormRequestContact, to: string) => {

  console.log('params-evaluationForm ', params)

  const text =
    `
    Hei ${params.teacherName},
  
    Asiakas ${params.customerName} pyytää yhteydenottoa liittyen seuraavaan suoritukseen:
    
    
    Tutkinto: ${params.degreeName}
    Tutkinnonosa: ${params.unitName}
    Työpaikkaohjaaja: ${params.supervisorName}
    
    
    Ystävällisin terveisin,
    Ylläpito
    `;

  const subject = 'Arviointilomake: asiakkaan yhteydenottopyyntö';
  const html = mailerTemplate(text);

  const emailObj: EmailObj = {
    content: {
      subject: subject,
      plainText: text,
      html: html
    },
    recipients: {
      to: [{
        address: to
      }]
    }
  }

  sendEmail(emailObj);
};

// Työpaikkaohjaaja pyytää yhteydenottoa

export const sendEvaluationFormSupervisorRequestContact = (params: ISendEvaluationFormRequestContact, to: string) => {

  console.log('params-evaluationForm ', params)
  const text =
    `
    Hei ${params.teacherName},

    Työpaikkaohjaaja ${params.supervisorName} pyytää yhteydenottoa liittyen seuraavaan 	suoritukseen:
        
        
    Asiakas: ${params.customerName}
    Tutkinto: ${params.degreeName} 
    Tutkinnonosa: ${params.unitName}
        
        
    Ystävällisin terveisin,
    Ylläpito
    `;

  const subject = 'Arviointilomake: työpaikkaohjaajan yhteydenottopyyntö';
  const html = mailerTemplate(text);

  const emailObj: EmailObj = {
    content: {
      subject: subject,
      plainText: text,
      html: html
    },
    recipients: {
      to: [{
        address: to
      }]
    }
  }

  sendEmail(emailObj);
};

// Opettaja pyytää yhteydenottoa

export const sendEvaluationFormTeacherRequestContactMessageCustomer = (params: ISendEvaluationFormRequestContact, to: string) => {
  console.log('params-evaluationForm ', params)

  const text =
    `
    Hei ${params.customerName},
  
    Opettaja ${params.teacherName} pyytää yhteydenottoa liittyen seuraavaan suoritukseen:
    
    
    Tutkinto: ${params.degreeName}
    Tutkinnonosa: ${params.unitName}
    Työpaikkaohjaaja: ${params.supervisorName}
    
    
    Ystävällisin terveisin,
    Ylläpito
    `;

  const subject = 'Arviointilomake: opettajan yhteydenottopyyntö';
  const html = mailerTemplate(text);

  const emailObj: EmailObj = {
    content: {
      subject: subject,
      plainText: text,
      html: html
    },
    recipients: {
      to: [{
        address: to
      }]
    }
  }

  sendEmail(emailObj);
};

export const sendEvaluationFormTeacherRequestContactMessageSupervisor = (params: ISendEvaluationFormTeacherRequestContactMessageSupervisor, to: string) => {

  console.log('params-evaluationForm ', params)

  const text =
    `
    Hei ${params.supervisorName},
  
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

  const emailObj: EmailObj = {
    content: {
      subject: subject,
      plainText: text,
      html: html
    },
    recipients: {
      to: [{
        address: to
      }]
    }
  }

  sendEmail(emailObj);
};

// Arviointilomake: valmis lomake
// Asiakkaan ja opettajan valmis lomake

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

  console.log('params-evaluationForm ', params)

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

  const emailObj: EmailObj = {
    content: {
      subject: subject,
      plainText: text,
      html: html
    },
    recipients: {
      to: [{
        address: to
      }]
    }
  }

  sendEmail(emailObj);
};

export const sendEvaluationFormSupervisorReadyMessageTeacher = (params: ISendEvaluationFormSupervisorReadyMessageTeacher, subject: string, to: string) => {

  console.log('params-evaluationForm ', params)

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
  const emailObj = {
    content: {
      subject: subject,
      plainText: text,
      html: html
    },
    recipients: {
      to: [{
        address: to
      }]
    }
  }

  sendEmail(emailObj);
};

export const sendEvaluationFormCustomerReadyMessageTeacher = (params: ISendEvaluationFormSupervisorReadyMessageTeacher, subject: string, to: string) => {

  console.log('params-evaluationForm ', params)

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
  const emailObj: EmailObj = {
    content: {
      subject: subject,
      plainText: text,
      html: html
    },
    recipients: {
      to: [{
        address: to
      }]
    }
  }

  sendEmail(emailObj);
};

export const sendEvaluationFormCustomerReadyMessageSupervisor = (params: ISendEvaluationFormCustomerReadyMessageSupervisor, subject: string, to: string) => {

  console.log('params-evaluationForm ', params)

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
  const emailObj: EmailObj = {
    content: {
      subject: subject,
      plainText: text,
      html: html
    },
    recipients: {
      to: [{
        address: to
      }]
    }
  }

  sendEmail(emailObj);
};


// Opettajan valmis lomake

export const sendEvaluationFormTeacherReadyMessageCustomer = (params: ISendEvaluationFormTeacherReadyMessageCustomer, subject: string, to: string) => {

  console.log('params-evaluationForm ', params)

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
  const emailObj: EmailObj = {
    content: {
      subject: subject,
      plainText: text,
      html: html
    },
    recipients: {
      to: [{
        address: to
      }]
    }
  }

  sendEmail(emailObj);
};


export const sendEvaluationFormTeacherReadyMessageSupervisor = (params: ISendEvaluationFormTeacherReadyMessageSupervisor, subject: string, to: string) => {

  console.log('params-evaluationForm ', params)

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
  const emailObj: EmailObj = {
    content: {
      subject: subject,
      plainText: text,
      html: html
    },
    recipients: {
      to: [{
        address: to
      }]
    }
  }

  sendEmail(emailObj);
};
