import sendEmail, { EmailObj } from '../src/mailer/azureEmailService';
import sendingMailToQueue from '../src/mailer/createNewMail'
import mailTemplate from '../src/mailer/mailerHtmlTemplate';
import { IEmailObj } from '../src/models/emailDocumentModel';
import { sendVerificationEmail } from '../src/mailer/templates/newUserVerification'



describe.skip('Sending verification email', () => {

  interface ISendVerificationEmail {
    userEmail: string;
    verificationLink: string;
    recipentUserId: string;
  }

  const params: ISendVerificationEmail = {
    userEmail: 'straightapricot@navalcadets.com',
    verificationLink: 'test',
    recipentUserId: 'joku112'
  }

  it('should send verification email successfully', async () => {
    try {
      await sendVerificationEmail(params);
      // Optionally add assertions or expect statements here
    } catch (error) {
      // Handle errors or fail the test if necessary
      fail(`Sending verification email failed: ${error}`);
    }
  });
})


describe.skip('Testing create email queue', () => {

  const createNewMailParams: IEmailObj = {
    msg: {
      content: {
        subject: 'hello',
        plainText: 'this is the plain text',
        html: '<p>This is a test email.</p>'
      },
      recipients: {
        to: [{ address: 'straightapricot@navalcadets.com' }]
      }
    },
    recipentUserId: 'joku55'
  };

  interface ISendVerificationEmail {
    userEmail: string;
    verificationLink: string;
    recipentUserId: string;
  }

  const params: ISendVerificationEmail = {
    userEmail: 'straightapricot@navalcadets.com',
    verificationLink: 'test',
    recipentUserId: 'joku112'
  }

  it('should send email data to the queue successfully', async () => {
    await sendingMailToQueue(createNewMailParams);
  });

  it('should work when sending this function', async () => {
    const plainText =
      `
    Tervetuloa OsTu-appin käyttäjäksi!

    Vahvista sähköpostiosoitteesi ja määritä tilisi loppuun <a href="${params.verificationLink}">tästä linkistä</a>.

    Linkki vanhenee kahden tunnin kuluttua.

    
    Ystävällisin terveisin,
    Ylläpito
    `;

    const subject = 'Vahvista sähköpostiosoitteesi';
    const html = mailTemplate(plainText)

    const createNewMailParams2: IEmailObj = {
      msg: {
        content: {
          subject: subject,
          plainText: plainText,
          html: html
        },
        recipients: {
          to: [{ address: 'straightapricot@navalcadets.com' }]
        }
      },
      recipentUserId: 'joku55'
    };

    console.log('html: ', html)
    await sendingMailToQueue(createNewMailParams2);

  })

  it('should send verification email successfully', () => {
    try {
      sendVerificationEmail(params);
      // Optionally add assertions or expect statements here
    } catch (error) {
      // Handle errors or fail the test if necessary
      fail(`Sending verification email failed: ${error}`);
    }
  });

});


// Test sendEmail


const exampleParams = {
  teacherName: 'John Doe',
  supervisorName: 'Jane Smith',
  customerName: 'Customer Name',
  degreeName: 'Degree Name',
  unitName: 'Unit Name',
  vocationalCompetenceName: 'Vocational Competence',
  customerAssessment: 'Accepted',
  supervisorAssessment: 'Pending',
  additionalInfo: 'Additional Information',
  evaluationAccepted: 'Yes',
  customerFirstName: 'Customer First Name',
  teacherFirstName: 'Teacher First Name',
  supervisorFirstName: 'Supervisor First Name',
};

describe.skip('Email Sending Functions', () => {
  it('should send an evaluation form for customer request contact', async () => {
    const text = `
    Hei ${exampleParams.customerName},

    Asiakas ${exampleParams.customerName} pyytää yhteydenottoa liittyen seuraavaan suoritukseen:

    Tutkinto: ${exampleParams.degreeName}
    Tutkinnonosa: ${exampleParams.unitName}

    Ystävällisin terveisin,
    Ylläpito
    `;
    const subject = 'Arviointilomake: asiakkaan yhteydenottopyyntö';
    const html = mailTemplate(text.trim());
    const emailObj: EmailObj = {
      content: { subject, plainText: text.trim(), html },
      recipients: { to: [{ address: 'straightapricot@navalcadets.com' }] }
    };

    await sendEmail(emailObj);
  });

  it('should send an evaluation form supervisor request contact', async () => {
    const text = `
    Hei ${exampleParams.teacherName},

    Ohjaaja ${exampleParams.supervisorName} pyytää yhteydenottoa liittyen seuraavaan suoritukseen:

    Asiakas: ${exampleParams.customerName}
    Tutkinto: ${exampleParams.degreeName}
    Tutkinnonosa: ${exampleParams.unitName}

    Ystävällisin terveisin,
    Ylläpito
    `;
    const subject = 'Arviointilomake: ohjaajan yhteydenottopyyntö';
    const html = mailTemplate(text.trim());
    const emailObj: EmailObj = {
      content: { subject, plainText: text.trim(), html },
      recipients: { to: [{ address: 'straightapricot@navalcadets.com' }] }
    };

    await sendEmail(emailObj);
  });

  it('should send an evaluation form teacher request contact message customer', async () => {
    const text = `
    Hei ${exampleParams.customerName},

    Opettaja ${exampleParams.teacherName} pyytää yhteydenottoa liittyen seuraavaan suoritukseen:

    Tutkinto: ${exampleParams.degreeName}
    Tutkinnonosa: ${exampleParams.unitName}
    Ohjaaja: ${exampleParams.supervisorName}

    Ystävällisin terveisin,
    Ylläpito
    `;
    const subject = 'Arviointilomake: opettajan yhteydenottopyyntö';
    const html = mailTemplate(text.trim());
    const emailObj: EmailObj = {
      content: { subject, plainText: text.trim(), html },
      recipients: { to: [{ address: 'straightapricot@navalcadets.com' }] }
    };

    await sendEmail(emailObj);
  });

  it('should send an evaluation form teacher request contact message supervisor', async () => {
    const text = `
    Hei ${exampleParams.supervisorName},

    Opettaja ${exampleParams.teacherName} pyytää yhteydenottoa liittyen seuraavaan suoritukseen:

    Asiakas: ${exampleParams.customerName}
    Tutkinto: ${exampleParams.degreeName}
    Tutkinnonosa: ${exampleParams.unitName}
    Ammattitaitovaatimus: ${exampleParams.vocationalCompetenceName}

    Ystävällisin terveisin,
    Ylläpito
    `;
    const subject = 'Arviointilomake: opettajan yhteydenottopyyntö';
    const html = mailTemplate(text.trim());
    const emailObj: EmailObj = {
      content: { subject, plainText: text.trim(), html },
      recipients: { to: [{ address: 'straightapricot@navalcadets.com' }] }
    };

    await sendEmail(emailObj);
  });

  it('should send an evaluation form supervisor ready message customer', async () => {
    const text = `
    Hei ${exampleParams.customerFirstName},

    Tutkinnonosa on valmis tarkistettavaksi.

    Asiakas: ${exampleParams.customerName}
    Ohjaaja: ${exampleParams.supervisorName}
    Tutkinto: ${exampleParams.degreeName}
    Tutkinnonosa: ${exampleParams.unitName}
    Asiakkaan arvio: ${exampleParams.customerAssessment}
    Ohjaajan arvio: ${exampleParams.supervisorAssessment}
    Lisätiedot: ${exampleParams.additionalInfo}

    Ystävällisin terveisin,
    Ylläpito
    `;
    const subject = 'Arviointilomake: valmis lomake';
    const html = mailTemplate(text.trim());
    const emailObj: EmailObj = {
      content: { subject, plainText: text.trim(), html },
      recipients: { to: [{ address: 'straightapricot@navalcadets.com' }] }
    };

    await sendEmail(emailObj);
  });

  it('should send an evaluation form supervisor ready message teacher', async () => {
    const text = `
    Hei ${exampleParams.teacherFirstName},

    Tutkinnonosa on valmis tarkistettavaksi.

    Asiakas: ${exampleParams.customerName}
    Ohjaaja: ${exampleParams.supervisorName}
    Tutkinto: ${exampleParams.degreeName}
    Tutkinnonosa: ${exampleParams.unitName}
    Asiakkaan arvio: ${exampleParams.customerAssessment}
    Ohjaajan arvio: ${exampleParams.supervisorAssessment}
    Lisätiedot: ${exampleParams.additionalInfo}

    Ystävällisin terveisin,
    Ylläpito
    `;
    const subject = 'Arviointilomake: valmis lomake';
    const html = mailTemplate(text.trim());
    const emailObj: EmailObj = {
      content: { subject, plainText: text.trim(), html },
      recipients: { to: [{ address: 'straightapricot@navalcadets.com' }] }
    };

    await sendEmail(emailObj);
  });

  it('should send an evaluation form customer ready message teacher', async () => {
    const text = `
    Hei ${exampleParams.teacherFirstName},

    Tutkinnonosa on valmis tarkistettavaksi.

    Asiakas: ${exampleParams.customerName}
    Ohjaaja: ${exampleParams.supervisorName}
    Tutkinto: ${exampleParams.degreeName}
    Tutkinnonosa: ${exampleParams.unitName}
    Asiakkaan arvio: ${exampleParams.customerAssessment}
    Ohjaajan arvio: ${exampleParams.supervisorAssessment}
    Lisätiedot: ${exampleParams.additionalInfo}

    Ystävällisin terveisin,
    Ylläpito
    `;
    const subject = 'Arviointilomake: valmis lomake';
    const html = mailTemplate(text.trim());
    const emailObj: EmailObj = {
      content: { subject, plainText: text.trim(), html },
      recipients: { to: [{ address: 'straightapricot@navalcadets.com' }] }
    };

    await sendEmail(emailObj);
  });

  it('should send an evaluation form customer ready message supervisor', async () => {
    const text = `
    Hei ${exampleParams.supervisorFirstName},

    Tutkinnonosa on valmis tarkistettavaksi.

    Asiakas: ${exampleParams.customerName}
    Ohjaaja: ${exampleParams.supervisorName}
    Tutkinto: ${exampleParams.degreeName}
    Tutkinnonosa: ${exampleParams.unitName}
    Asiakkaan arvio: ${exampleParams.customerAssessment}
    Ohjaajan arvio: ${exampleParams.supervisorAssessment}
    Lisätiedot: ${exampleParams.additionalInfo}

    Ystävällisin terveisin,
    Ylläpito
    `;
    const subject = 'Arviointilomake: valmis lomake';
    const html = mailTemplate(text.trim());
    const emailObj: EmailObj = {
      content: { subject, plainText: text.trim(), html },
      recipients: { to: [{ address: 'straightapricot@navalcadets.com' }] }
    };

    await sendEmail(emailObj);
  });

  it('should send an evaluation form teacher ready message customer', async () => {
    const text = `
    Hei ${exampleParams.customerFirstName},

    Uusi suoritus on valmis.

    Asiakas: ${exampleParams.customerName}
    Ohjaaja: ${exampleParams.supervisorName}
    Tutkinto: ${exampleParams.degreeName}
    Tutkinnonosa: ${exampleParams.unitName}
    Suoritus hyväksytty: ${exampleParams.evaluationAccepted}
    Lisätiedot: ${exampleParams.additionalInfo}

    Ystävällisin terveisin,
    Ylläpito
    `;
    const subject = 'Arviointilomake: valmis lomake';
    const html = mailTemplate(text.trim());
    const emailObj: EmailObj = {
      content: { subject, plainText: text.trim(), html },
      recipients: { to: [{ address: 'straightapricot@navalcadets.com' }] }
    };

    await sendEmail(emailObj);
  });

  it('should send an evaluation form teacher ready message supervisor', async () => {
    const text = `
    Hei ${exampleParams.supervisorFirstName},

    Uusi suoritus on valmis.

    Asiakas: ${exampleParams.customerName}
    Ohjaaja: ${exampleParams.supervisorName}
    Tutkinto: ${exampleParams.degreeName}
    Tutkinnonosa: ${exampleParams.unitName}
    Suoritus hyväksytty: ${exampleParams.evaluationAccepted}
    Lisätiedot: ${exampleParams.additionalInfo}

    Ystävällisin terveisin,
    Ylläpito
    `;
    const subject = 'Arviointilomake: valmis lomake';
    const html = mailTemplate(text.trim());
    const emailObj: EmailObj = {
      content: { subject, plainText: text.trim(), html },
      recipients: { to: [{ address: 'straightapricot@navalcadets.com' }] }
    };

    await sendEmail(emailObj);
  });
});
