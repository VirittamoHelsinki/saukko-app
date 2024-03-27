import { User } from '../models/userModel';
import { sendEmail, sendVerificationEmail } from '../utils/mailer';
import * as mailer from '../utils/mailer';


describe.skip('sendEmail', () => {
  it('should send an email', async () => {
    const mockEmail = {
      to: 'test@example.com',
      subject: 'Hello',
      html: '<p>This is a test email</p>',
    };

    const info = await sendEmail(mockEmail);

    expect(info).toBeDefined();

  });
});

describe('sendVerificationEmail', () => {
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
      subject: 'Verify Your Email',
      html: expect.stringContaining(mockVerificationLink),
    });
    });
});