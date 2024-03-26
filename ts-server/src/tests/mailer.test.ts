import { sendEmail } from '../utils/mailer';


describe('sendEmail', () => {
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