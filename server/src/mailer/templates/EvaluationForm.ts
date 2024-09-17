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
  ISendEvaluationRequiresAction,
} from '../types';
import { IUnit } from '../../models/evaluationModel';
import { IUser } from '../../models/userModel';

// Helper function to save notification
const saveNotification = async (
  recipientId: string,
  customerId: string,
  subject: string,
  body: string,
  type: string,
  evaluationId: string,
  unitId: string
) => {
  const notification = new NotificationModel({
    recipient: recipientId,
    customer: customerId,
    isRead: false,
    isSeen: false,
    title: subject,
    body: body,
    type: type,
    evaluationId: evaluationId,
    unitId: unitId
  });

  await notification.save();
};

// Asiakas pyytää yhteydenottoa
export const sendEvaluationFormCustomerRequestContact = async (
  params: ISendEvaluationFormRequestContact,
  to: string,
  customerId: string,
  recipientId: string,
  evaluationId: string,
  unitId: string
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
  await saveNotification(recipientId, customerId, subject, text, 'requestContact', evaluationId, unitId);
};

// Työpaikkaohjaaja pyytää yhteydenottoa

export const sendEvaluationFormSupervisorRequestContact = async (
  params: ISendEvaluationFormRequestContact,
  to: string,
  customerId: string,
  recipientId: string,
  evaluationId: string,
  unitId: string
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
  await saveNotification(recipientId, customerId, subject, text, 'requestContact', evaluationId, unitId);

};

// Opettaja pyytää yhteydenottoa

export const sendEvaluationFormTeacherRequestContactMessageCustomer = async (
  params: ISendEvaluationFormRequestContact,
  to: string,
  customerId: string,
  recipientId: string,
  evaluationId: string,
  unitId: string
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
  await saveNotification(recipientId, customerId, subject, text, 'requestContact', evaluationId, unitId);
};

export const sendEvaluationFormTeacherRequestContactMessageSupervisor = async (
  params: ISendEvaluationFormTeacherRequestContactMessageSupervisor,
  to: string,
  customerId: string,
  recipientId: string,
  evaluationId: string,
  unitId: string
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
  await saveNotification(recipientId, customerId, subject, text, 'requestContact', evaluationId, unitId);
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
  evaluationId: string,
  unitId: string
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
  await saveNotification(recipientId, customerId, subject, text, 'readyForReview', evaluationId, unitId);
};

export const sendEvaluationFormSupervisorReadyMessageTeacher = async (
  params: ISendEvaluationFormSupervisorReadyMessageTeacher,
  subject: string,
  to: string,
  customerId: string,
  recipientId: string,
  evaluationId: string,
  unitId: string
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
  await saveNotification(recipientId, customerId, subject, text, 'readyForReview', evaluationId, unitId);
};

export const sendEvaluationFormCustomerReadyMessageTeacher = async (
  params: ISendEvaluationFormSupervisorReadyMessageTeacher,
  subject: string,
  to: string,
  customerId: string,
  recipientId: string,
  evaluationId: string,
  unitId: string
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
  await saveNotification(recipientId, customerId, subject, text, 'readyForReview', evaluationId, unitId);
};

export const sendEvaluationFormCustomerReadyMessageSupervisor = async (
  params: ISendEvaluationFormCustomerReadyMessageSupervisor,
  subject: string,
  to: string,
  customerId: string,
  recipientId: string,
  evaluationId: string,
  unitId: string
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
  await saveNotification(recipientId, customerId, subject, text, 'readyForReview', evaluationId, unitId);
};


// Opettajan valmis lomake

export const sendEvaluationFormTeacherReadyMessageCustomer = async (
  params: ISendEvaluationFormTeacherReadyMessageCustomer,
  subject: string,
  to: string,
  customerId: string,
  recipientId: string,
  evaluationId: string,
  unitId: string
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
  await saveNotification(recipientId, customerId, subject, text, 'ready', evaluationId, unitId);
};


export const sendEvaluationFormTeacherReadyMessageSupervisor = async (
  params: ISendEvaluationFormTeacherReadyMessageSupervisor,
  subject: string,
  to: string,
  customerId: string,
  recipientId: string,
  evaluationId: string,
  unitId: string
) => {

  console.log('evaluationId in send: ', evaluationId)


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
  await saveNotification(recipientId, customerId, subject, text, 'ready', evaluationId, unitId);
};

export const sendRequireEvaluationMessageToCustomer = async (
  subject: string,
  to: string,
  customer: IUser,
  supervisor: IUser,
  evaluationId: string,
  unitId: string,
  unitName: string,
) => {

  const text =
    `
Hei ${customer.firstName},

Tutkinnonosa ${unitName} vaatii asiakkaan arviointia.


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
  await saveNotification(customer._id, supervisor._id, subject, text, 'requiresAction', evaluationId, unitId);
};

export const sendRequireEvaluationMessageToSupervisor = async (
  subject: string,
  to: string,
  supervisor: IUser,
  customer: IUser,
  evaluationId: string,
  unitId: string,
  unitName: string,
) => {

  const text =
    `
Hei ${supervisor.firstName},

Asiakkaan ${customer.firstName} ${customer.lastName}
tutkinnonosa ${unitName} vaatii ohjaajan arviointia.


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
  await saveNotification(supervisor._id, customer._id, subject, text, 'requiresAction', evaluationId, unitId);
};


