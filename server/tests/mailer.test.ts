import { User } from '../src/models/userModel';
import * as mailer from '../src/utils/mailer/configMailer';
import { sendVerificationEmail, sendVerificationDoneEmail } from '../src/utils/mailer/templates/newUserVerification';
import { sendResetPasswordEmail, sendResetPasswordSuccessEmail } from '../src/utils/mailer/templates/resetPassword';
import { sendNewCustomerAddedEmail } from '../src/utils/mailer/templates/addingUserToAgreement';
import { sendEvaluationFormCustomerRequestContact } from '../src/utils/mailer/templates/EvaluationForm';

describe('test sending emails', () => {
  xit('verifikaatiolinkki', async () => {
    const mockUser: Partial<User> = {
      firstName: 'Matti',
      lastName: 'Meikäläinen',
      email: 'test@example.com',
    };

    const mockVerificationLink = 'https://example.com/verification-link';

    sendVerificationEmail(mockUser, mockVerificationLink);

  });
  xit('verifiointi tehty', async () => {
    const mockUser: Partial<User> = {
      firstName: 'Matti',
      lastName: 'Meikäläinen',
      email: 'test@example.com',
    };

    sendVerificationDoneEmail(mockUser);

  });

  xit('salasanan vaihto', async () => {
    const mockUser: Partial<User> = {
      firstName: 'Matti',
      lastName: 'Meikäläinen',
      email: 'test@example.com',
    };

    sendResetPasswordEmail(mockUser);

  });

  xit('salasanan vaihto onnistui', async () => {
    const mockUser: Partial<User> = {
      firstName: 'Matti',
      lastName: 'Meikäläinen',
      email: 'test@example.com',
    };

    sendResetPasswordSuccessEmail(mockUser);
  });

  xit('Uusi asiakas liitetään suoritukseen', async () => {
    const mockUser: Partial<User> = {
      firstName: 'Matti',
      lastName: 'Meikäläinen',
      email: 'test@example.com',
    };

    sendNewCustomerAddedEmail(mockUser);
  });

  xit('Arviointilomake: ', async () => {
    const mockUser: Partial<User> = {
      firstName: 'Matti',
      lastName: 'Meikäläinen',
      email: 'test@example.com',
    };

    sendEvaluationFormCustomerRequestContact(mockUser);
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

describe.skip('new user verification emails', () => {

  it('should send a verification email', async () => {
    const mockUser: Partial<User> = {
      firstName: 'Matti',
      lastName: 'Meikäläinen',
      email: 'test@example.com',
    };

    const mockVerificationLink = 'https://example.com/verification-link';

    const sendEmailMock = jest.spyOn(mailer, 'sendEmail').mockImplementation(() => Promise.resolve());

    sendVerificationEmail(mockUser, mockVerificationLink);

    expect(sendEmailMock).toHaveBeenCalledWith({
      to: mockUser.email,
      subject: 'Vahvista sähköpostiosoitteesi',
      html: expect.stringContaining(mockVerificationLink),
    });
  });

  it('should send a verification done email', async () => {
    const mockUser: Partial<User> = {
      firstName: 'Matti',
      lastName: 'Meikäläinen',
      email: 'test@example.com',
    };

    const sendEmailMock = jest.spyOn(mailer, 'sendEmail').mockImplementation(() => Promise.resolve());

    sendVerificationDoneEmail(mockUser);

    expect(sendEmailMock).toHaveBeenCalledWith({
      to: mockUser.email,
      subject: 'Sähköpostiosoitteesi on vahvistettu',
      html: expect.any(String),
    });
  });
});

