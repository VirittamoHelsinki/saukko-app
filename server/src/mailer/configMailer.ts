import nodemailer from 'nodemailer';

// General email sending function
export const sendEmail = async ({ to, subject, html }: any) => {
// for testing
  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
      user: 'jamie.sauer86@ethereal.email',
      pass: '2FgEanEy4g4DUZt9wV',
    },
  });
// for real mail
  /*  const transporter = nodemailer.createTransport({
      service: process.env.SERVICE,
      host: process.env.EMAIL_SERVICE_HOST,
      auth: {
        user: process.env.EMAIL_SERVICE_USER,
        pass: process.env.EMAIL_SERVICE_PASSWORD,
      },
    });*/

  // Define the email options
  const mailOptions = {
    from: process.env.EMAIL_SERVICE_FROM,
    to,
    subject,
    html,
  };

  // Attempt to send the email
  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

