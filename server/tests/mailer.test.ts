import * as mailer from '../src/mailer/configMailer';
import { sendVerificationEmail, sendVerificationDoneEmail } from '../src/mailer/templates/newUserVerification';
import { sendResetPasswordEmail, sendResetPasswordSuccessEmail } from '../src/mailer/templates/resetPassword';
import { sendNewCustomerAddedEmail } from '../src/mailer/templates/addingUserToAgreement';
import { AssessmentStatus, ISendEvaluationFormReady, sendEvaluationFormCustomerRequestContact, sendEvaluationFormCustomerOrSupervisorReady } from '../src/mailer/templates/EvaluationForm';
import { send } from 'process';


interface IUser {
  firstName: string;
  lastName: string;
  email: string;
}

describe('test sending emails', () => {
  it('verifikaatiolinkki', async () => {
    const mockUser: IUser = {
      firstName: 'Matti',
      lastName: 'Meikäläinen',
      email: 'test@example.com',
    };

    const mockVerificationLink = 'https://example.com/verification-link';

    sendVerificationEmail({userEmail: mockUser.email, verificationLink: mockVerificationLink});

  });
  it('verifiointi tehty', async () => {
    const mockUser: IUser = {
      firstName: 'Matti',
      lastName: 'Meikäläinen',
      email: 'test@example.com',
    };

    sendVerificationDoneEmail({userEmail: mockUser.email});

  });

  it('salasanan vaihto', async () => {
    const mockUser: IUser = {
      firstName: 'Matti',
      lastName: 'Meikäläinen',
      email: 'test@example.com',
    };

    const mockVerificationLink = 'https://example.com/verification-link';

    sendResetPasswordEmail({userFirstName: mockUser.firstName, userEmail: mockUser.email, resetPasswordLink: mockVerificationLink});

  });

  it('salasanan vaihto onnistui', async () => {
    const mockUser: IUser= {
      firstName: 'Matti',
      lastName: 'Meikäläinen',
      email: 'test@example.com',
    };

    sendResetPasswordSuccessEmail({userFirstName: mockUser.firstName, userEmail: mockUser.email, technicalSupportLink: 'https://example.com/verification-link'});
  });

  it('Uusi asiakas liitetään suoritukseen', async () => {
    const mockUser: IUser = {
      firstName: 'Matti',
      lastName: 'Meikäläinen',
      email: 'test@example.com',
    };

    sendNewCustomerAddedEmail({userEmail: mockUser.email, teacherName: 'Pentti', degreeName: 'Testi', supervisorName: 'Testi', verificationLink: 'https://example.com/verification-link'});
  });

  it('Arviointilomake: ', async () => {
    const mockUser: IUser= {
      firstName: 'Matti',
      lastName: 'Meikäläinen',
      email: 'test@example.com',
    };

    sendEvaluationFormCustomerRequestContact({userName: (mockUser.firstName + ' ' + mockUser.lastName), userEmail: mockUser.email, degreeName: 'Testi', unitName: 'Testi', supervisorName: 'Testi'});
  });

  it('Arviointilomake: ', async () => {
    const mockUser: IUser= {
      firstName: 'Matti',
      lastName: 'Meikäläinen',
      email: 'test@example.com',
    };

    sendEvaluationFormCustomerRequestContact({userName: (mockUser.firstName + ' ' + mockUser.lastName), userEmail: mockUser.email, degreeName: 'Testi', unitName: 'Testi', supervisorName: 'Testi'});
  });


  it('Arviointilomake: ', async () => {
    const mockForm: ISendEvaluationFormReady= {
      userFirstName: 'Matti',
      customerName: 'Meikäläinen',
      supervisorName: 'Pentti Papukaija',
      degreeName: 'Testi',
      unitName: 'Testi',
      customerAssessment: AssessmentStatus.READY,
      supervisorAssessment: AssessmentStatus.READY,
      additionalInfo: 'Testi lksdkafalsdkjöalksdj öalk jöslkfjsaölkfjasödlfkj öalskdfjöaslkfjsöldkjf asölkasjdlfö sadflkajsdölfkasjdlök akföalsdjföalskd',
      userEmail: 'test@test.com'
    };

    const subject = 'hyvää päivää!'

    sendEvaluationFormCustomerOrSupervisorReady(mockForm, subject);

});

});

describe.skip('sendEmail', () => {
  it('should send an email', async () => {
    const mockEmail = {
      to: 'test@example.com',
      subject: 'Hello',
      html: '<p>This is a test email</p>',
    };

    const sendEmailMock = jest.spyOn(mailer, 'sendEmail').mockImplementation(() => Promise.resolve());

    mailer.sendEmail(mockEmail);

    expect(sendEmailMock).toHaveBeenCalledWith(mockEmail);

  });
});

describe('new user verification emails', () => {

  it('should send a verification email', async () => {
    const mockUser: IUser = {
      firstName: 'Matti',
      lastName: 'Meikäläinen',
      email: 'test@example.com',
    };

    const mockVerificationLink = 'https://example.com/verification-link';

    const sendEmailMock = jest.spyOn(mailer, 'sendEmail').mockImplementation(() => Promise.resolve());

    sendVerificationEmail({userEmail: mockUser.email, verificationLink: mockVerificationLink});

    expect(sendEmailMock).toHaveBeenCalledWith({
      to: mockUser.email,
      subject: 'Vahvista sähköpostiosoitteesi',
      html: expect.stringContaining(mockVerificationLink),
    });
  });

});

