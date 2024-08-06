import { sendReadyEmails, sendContactRequestEmails } from '../src/controllers/evaluationController/handleUserPerformanceEmails'
import { ISendEvaluationFormRequestContact, ISelectedValues, UserRoleEnum } from '../src/mailer/types';

//TODO: Change id's to real ones
// Create test notifications for test users

type Email = {
  customerEmail: string;
  teacherEmail: string;
  supervisorEmail: string;
};

type Evaluation = {
  degreeId?: {
    name?: {
      fi?: string;
    };
  };
  supervisorIds?: Array<{
    firstName: string;
    lastName: string;
    email: string;
  }>;
  customerId?: {
    firstName: string;
    lastName: string;
    email: string;
  };
  teacherId?: {
    firstName: string;
    lastName: string;
    email: string;
  };
};

type Request = {
  body: {
    units?: Array<{
      name?: {
        fi?: string;
      };
    }>;
    additionalInfo?: string;
  };
};

const evaluation: Evaluation = {
  degreeId: {
    name: {
      fi: 'Engineering',
    },
  },
  supervisorIds: [
    {
      firstName: 'John',
      lastName: 'Doe',
      email: 'supervisor@test.com'
    },
  ],
  customerId: {
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'customer@test.com'
  },
  teacherId: {
    firstName: 'Alice',
    lastName: 'Cooper',
    email: 'teacher@test.com'
  },
};

const req: Request = {
  body: {
    units: [
      {
        name: {
          fi: 'Unit 101',
        },
      },
    ],
    additionalInfo: 'Some additional information',
  },
};

const emails: Email = {
  customerEmail: evaluation.customerId?.email || 'Unknown Customer Email',
  teacherEmail: evaluation.teacherId?.email || 'Unknown Teacher Email',
  supervisorEmail: evaluation.supervisorIds?.[0]?.email || 'Unknown Supervisor Email',
};

const formIsReadyParams = {
  degreeName: evaluation.degreeId?.name?.fi || 'Unknown Degree',
  unitName: req.body.units?.[0]?.name?.fi || 'Unknown Unit',
  supervisorName:
    (evaluation.supervisorIds?.[0]?.firstName + ' ' + evaluation.supervisorIds?.[0]?.lastName) || 'Unknown Supervisor',
  customerName: (evaluation.customerId?.firstName + ' ' + evaluation.customerId?.lastName) || 'Unknown Customer',
  additionalInfo: req.body.additionalInfo || 'No additional info provided',
  supervisorFirstName: evaluation.supervisorIds?.[0]?.firstName || 'Unknown Supervisor First Name',
  customerFirstName: evaluation.customerId?.firstName || 'Unknown Customer First Name',
  teacherFirstName: evaluation.teacherId?.firstName || 'Unknown Teacher First Name',
};

const requestContactParams: ISendEvaluationFormRequestContact = {
  degreeName: evaluation.degreeId?.name?.fi || 'Unknown Degree',
  unitName: req.body.units?.[0]?.name?.fi || 'Unknown Unit',
  teacherName: evaluation.teacherId?.firstName + ' ' + evaluation.teacherId?.lastName,
  customerName: evaluation.customerId?.firstName + ' ' + evaluation.customerId?.lastName || 'Unknown Customer',
  supervisorName: evaluation.supervisorIds?.[0]?.firstName + ' ' + evaluation.supervisorIds?.[0]?.lastName || 'Unknown Supervisor',
};


const selectedValues: ISelectedValues = {
  pyydetaanYhteydenottoaOpettajalta: false,
  pyydetaanYhteydenottoaOhjaajalta: false,
  pyydetaanYhteydenottoaAsiakkaalta: false,
  suoritusValmis: false,
  valmisLahetettavaksi: false
}

const customerId = '12345'
const supervisorId = '123456'
const teacherId = '1234567'


describe('All emails should be send to correct users client page', () => {

  const selectedValuesTest1 = {
    ...selectedValues,
    pyydetaanYhteydenottoaOpettajalta: true
  }

  const selectedValuesTest2 = {
    ...selectedValues,
    pyydetaanYhteydenottoaOhjaajalta: true
  }

  it('should send email to SUPERVISOR and TEACHER when client ready', async () => {
    expect(sendReadyEmails(UserRoleEnum.customer, formIsReadyParams, emails, customerId)[0]).toBe(emails.supervisorEmail)
    expect(sendReadyEmails(UserRoleEnum.customer, formIsReadyParams, emails, customerId)[1]).toBe(emails.teacherEmail)

  })
  it('should send email to TEACHER when requested contact', async () => {
    expect(sendContactRequestEmails(selectedValuesTest1, UserRoleEnum.customer, requestContactParams, emails, customerId).length).toBeGreaterThan(0)
    expect(sendContactRequestEmails(selectedValuesTest1, UserRoleEnum.customer, requestContactParams, emails, customerId)[0]).toBe(emails.teacherEmail)
  })
  it('should NOT send email to TEACHER when not requested contact', async () => {
    expect(sendContactRequestEmails(selectedValuesTest2, UserRoleEnum.customer, requestContactParams, emails, customerId)[0]).not.toBe(emails.teacherEmail)
    expect(sendContactRequestEmails(selectedValuesTest2, UserRoleEnum.customer, requestContactParams, emails, customerId).length).toBe(0)
  })
})

describe('All emails should be send to correct users supervisor page', () => {

  const selectedValuesTest1 = {
    ...selectedValues,
    pyydetaanYhteydenottoaOpettajalta: true
  }

  it('should send email to TEACHER and CUSTOMER when supervisor ready', async () => {
    expect(sendReadyEmails(UserRoleEnum.supervisor, formIsReadyParams, emails, supervisorId)[0]).toBe(emails.customerEmail)
    expect(sendReadyEmails(UserRoleEnum.supervisor, formIsReadyParams, emails, supervisorId)[1]).toBe(emails.teacherEmail)
  })
  it('should send email to TEACHER when requested contact', async () => {
    expect(sendContactRequestEmails(selectedValuesTest1, UserRoleEnum.supervisor, requestContactParams, emails, supervisorId)[0]).toBe(emails.teacherEmail)
  })
})

describe('All emails should be send to correct users teacher page', () => {

  const selectedValuesTest1 = {
    ...selectedValues,
    pyydetaanYhteydenottoaAsiakkaalta: true
  }

  const selectedValuesTest2 = {
    ...selectedValues,
    pyydetaanYhteydenottoaOhjaajalta: true
  }

  it('should send email to SUPERVISOR and CUSTOMER when teacher ready', async () => {
    expect(sendReadyEmails(UserRoleEnum.teacher, formIsReadyParams, emails, teacherId)[0]).toBe(emails.supervisorEmail)
    expect(sendReadyEmails(UserRoleEnum.teacher, formIsReadyParams, emails, teacherId)[1]).toBe(emails.customerEmail)
  })
  it('should send email to CUSTOMER when requested contact', async () => {
    expect(sendContactRequestEmails(selectedValuesTest1, UserRoleEnum.teacher, requestContactParams, emails, teacherId)[0]).toBe(emails.customerEmail)

  })
  it('should send email to SUPERVISOR when requested contact', async () => {
    expect(sendContactRequestEmails(selectedValuesTest2, UserRoleEnum.teacher, requestContactParams, emails, teacherId)[0]).toBe(emails.supervisorEmail)

  })
})

