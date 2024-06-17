import sendEmail, { EmailObj } from '../src/mailer/azureEmailService';
import mailTemplate from '../src/mailer/mailerHtmlTemplate';

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

    Työpaikkaohjaaja ${exampleParams.supervisorName} pyytää yhteydenottoa liittyen seuraavaan suoritukseen:

    Asiakas: ${exampleParams.customerName}
    Tutkinto: ${exampleParams.degreeName}
    Tutkinnonosa: ${exampleParams.unitName}

    Ystävällisin terveisin,
    Ylläpito
    `;
    const subject = 'Arviointilomake: työpaikkaohjaajan yhteydenottopyyntö';
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
    Työpaikkaohjaaja: ${exampleParams.supervisorName}

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
    Työpaikkaohjaaja: ${exampleParams.supervisorName}
    Tutkinto: ${exampleParams.degreeName}
    Tutkinnonosa: ${exampleParams.unitName}
    Asiakkaan arvio: ${exampleParams.customerAssessment}
    Työpaikkaohjaajan arvio: ${exampleParams.supervisorAssessment}
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
    Työpaikkaohjaaja: ${exampleParams.supervisorName}
    Tutkinto: ${exampleParams.degreeName}
    Tutkinnonosa: ${exampleParams.unitName}
    Asiakkaan arvio: ${exampleParams.customerAssessment}
    Työpaikkaohjaajan arvio: ${exampleParams.supervisorAssessment}
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
    Työpaikkaohjaaja: ${exampleParams.supervisorName}
    Tutkinto: ${exampleParams.degreeName}
    Tutkinnonosa: ${exampleParams.unitName}
    Asiakkaan arvio: ${exampleParams.customerAssessment}
    Työpaikkaohjaajan arvio: ${exampleParams.supervisorAssessment}
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
    Työpaikkaohjaaja: ${exampleParams.supervisorName}
    Tutkinto: ${exampleParams.degreeName}
    Tutkinnonosa: ${exampleParams.unitName}
    Asiakkaan arvio: ${exampleParams.customerAssessment}
    Työpaikkaohjaajan arvio: ${exampleParams.supervisorAssessment}
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
    Työpaikkaohjaaja: ${exampleParams.supervisorName}
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
    Työpaikkaohjaaja: ${exampleParams.supervisorName}
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
