import nodemailer from "nodemailer";

// General email sending function
export const sendEmail = async ({ to, subject, html }: any) => {

  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
      user: 'jamie.sauer86@ethereal.email',
      pass: '2FgEanEy4g4DUZt9wV'
    }
  });

  // Define the email options
  const mailOptions = {
    from: '"Jamie Sauer 👻" <jamie.sauer86@ethereal.email>', // sender address
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

