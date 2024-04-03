import { User } from '../models/userModel';
import * as mailer from '../utils/mailer';


describe('test sending emails', () => {
  it('verifikaatiolinkki', async () => {
    const mockUser: Partial<User> = {
      firstName: 'Matti',
      lastName: 'Meikäläinen',
      email: 'test@example.com',
    };

    const mockVerificationLink = 'https://example.com/verification-link';

    mailer.sendVerificationEmail(mockUser, mockVerificationLink);

  });
  it('verifiointi tehty', async () => {
    const mockUser: Partial<User> = {
      firstName: 'Matti',
      lastName: 'Meikäläinen',
      email: 'test@example.com',
    };

    mailer.sendVerificationDoneEmail(mockUser);

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

describe.skip('sendVerificationEmail', () => {
  it('should send a verification email', async () => {
    const mockUser: Partial<User> = {
      firstName: 'Matti',
      lastName: 'Meikäläinen',
      email: 'test@example.com',
    };

    const mockVerificationLink = 'https://example.com/verification-link';

    const sendEmailMock = jest.spyOn(mailer, 'sendEmail').mockImplementation(() => Promise.resolve());

    mailer.sendVerificationEmail(mockUser, mockVerificationLink);

    expect(sendEmailMock).toHaveBeenCalledWith({
      to: mockUser.email,
      subject: 'Vahvista sähköpostiosoitteesi',
      html: expect.stringContaining(mockVerificationLink),
    });
  });
});

describe.skip('sendVerificationDoneEmail', () => {
  it('should send a verification done email', async () => {
    const mockUser: Partial<User> = {
      firstName: 'Matti',
      lastName: 'Meikäläinen',
      email: 'test@example.com',
    };

    const sendEmailMock = jest.spyOn(mailer, 'sendEmail').mockImplementation(() => Promise.resolve());

    mailer.sendVerificationDoneEmail(mockUser);

    expect(sendEmailMock).toHaveBeenCalledWith({
      to: mockUser.email,
      subject: 'Sähköpostiosoitteesi on vahvistettu',
      html: expect.any(String),
    });
  });
});