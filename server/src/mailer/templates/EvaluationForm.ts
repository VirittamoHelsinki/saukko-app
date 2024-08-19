import sendEmail, { EmailObj } from '../azureEmailService';
import mailerTemplate from '../mailerHtmlTemplate';
import NotificationModel from '../../models/notificationModel';
import {
  AssessmentStatus,
  ISendEvaluationFormCustomerReadyMessageSupervisor,
  ISendEvaluationFormRequestContact,
  ISendEvaluationFormTeacherReadyMessageCustomer,
  ISendEvaluationFormTeacherReadyMessageSupervisor,
  ISendEvaluationFormTeacherRequestContactMessageSupervisor,
} from '../types';

// Helper function to save notification
const saveNotification = async (
  recipientId: string,
  customerId: string,
  subject: string,
  body: string
) => {
  const notification = new NotificationModel({
    recipient: recipientId,
    customer: customerId,
    isRead: false,
    isSeen: false,
    title: subject,
    body: body,
  });

  await notification.save();
};

// Asiakas pyytää yhteydenottoa
export const sendEvaluationFormCustomerRequestContact = async (
  params: ISendEvaluationFormRequestContact,
  to: string,
  customerId: string,
  recipientId: string,
) => {

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
  const html = mailerTemplate(text.trim());

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
  await saveNotification(recipientId, customerId, subject, text);
};

// Työpaikkaohjaaja pyytää yhteydenottoa

export const sendEvaluationFormSupervisorRequestContact = async (
  params: ISendEvaluationFormRequestContact,
  to: string,
  customerId: string,
  recipientId: string,
) => {

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
  await saveNotification(recipientId, customerId, subject, text);

};

// Opettaja pyytää yhteydenottoa

export const sendEvaluationFormTeacherRequestContactMessageCustomer = async (
  params: ISendEvaluationFormRequestContact,
  to: string,
  customerId: string,
  recipientId: string,
) => {

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
  await saveNotification(recipientId, customerId, subject, text);
};

export const sendEvaluationFormTeacherRequestContactMessageSupervisor = async (
  params: ISendEvaluationFormTeacherRequestContactMessageSupervisor,
  to: string,
  customerId: string,
  recipientId: string,
) => {

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
  await saveNotification(recipientId, customerId, subject, text);
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

export const sendEvaluationFormSupervisorReadyMessageCustomer = async (
  params: ISendEvaluationFormSupervisorReadyMessageCustomer,
  subject: string,
  to: string,
  customerId: string,
  recipientId: string,
) => {

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
  await saveNotification(recipientId, customerId, subject, text);
};

export const sendEvaluationFormSupervisorReadyMessageTeacher = async (
  params: ISendEvaluationFormSupervisorReadyMessageTeacher,
  subject: string,
  to: string,
  customerId: string,
  recipientId: string,
) => {

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
  await saveNotification(recipientId, customerId, subject, text);
};

export const sendEvaluationFormCustomerReadyMessageTeacher = async (
  params: ISendEvaluationFormSupervisorReadyMessageTeacher,
  subject: string,
  to: string,
  customerId: string,
  recipientId: string,
) => {

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
  await saveNotification(recipientId, customerId, subject, text);
};

export const sendEvaluationFormCustomerReadyMessageSupervisor = async (
  params: ISendEvaluationFormCustomerReadyMessageSupervisor,
  subject: string,
  to: string,
  customerId: string,
  recipientId: string,
) => {

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
  await saveNotification(recipientId, customerId, subject, text);
};


// Opettajan valmis lomake

export const sendEvaluationFormTeacherReadyMessageCustomer = async (
  params: ISendEvaluationFormTeacherReadyMessageCustomer,
  subject: string,
  to: string,
  customerId: string,
  recipientId: string,
) => {

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
  await saveNotification(recipientId, customerId, subject, text);
};


export const sendEvaluationFormTeacherReadyMessageSupervisor = async (
  params: ISendEvaluationFormTeacherReadyMessageSupervisor,
  subject: string,
  to: string,
  customerId: string,
  recipientId: string,
) => {


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
  await saveNotification(recipientId, customerId, subject, text);
};
