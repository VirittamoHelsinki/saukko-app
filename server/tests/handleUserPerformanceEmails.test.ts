import { sendReadyEmails } from '../src/controllers/evaluationController/handleUserPerformanceEmails'

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


//TODO: put the emails here under id's
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
      email: 'test@test.com'
    },
  ],
  customerId: {
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'test@test.com'
  },
  teacherId: {
    firstName: 'Alice',
    email: 'test@test.com'
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

const emails = {
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


describe('All emails should be send to correct users client page', () => {


  it('should send email to supervisor and teacher when client ready', async () => {
    expect(sendReadyEmails('customer', formIsReadyParams, emails)[0] === (emails.supervisorEmail))
    expect(sendReadyEmails('customer', formIsReadyParams, emails)[1] === (emails.teacherEmail))

  })
  xit('should send email to teacher when requested contact', async () => {
    /* sendContactRequestEmails() */
  })
})

describe.skip('All emails should be send to correct users supervisor page', () => {
  it('should send email to teacher and customer when supervisor ready', async () => {
    expect(sendReadyEmails('supervisor', formIsReadyParams, emails.supervisorEmail)[0] === (emails.customerEmail))
    expect(sendReadyEmails('supervisor', formIsReadyParams, emails.supervisorEmail)[1] === (emails.teacherEmail))
  })
  xit('should send email to teacher when requested contact', async () => {
    /*     sendContactRequestEmails() */
  })
})

describe.skip('All emails should be send to correct users teacher page', () => {
  it('should send email to supervisor and customer when teacher ready', async () => {
    expect(sendReadyEmails('teacher', formIsReadyParams, emails.teacherEmail)[0] === (emails.supervisorEmail))
    expect(sendReadyEmails('teacher', formIsReadyParams, emails.teacherEmail)[1] === (emails.customerEmail))
  })
  xit('should send email to customer when requested contact', async () => {
    /*     sendContactRequestEmails() */
  })
  xit('should send email to supervisor when requested contact', async () => {
    /*     sendContactRequestEmails() */
  })
})

