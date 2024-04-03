const nodemailer = require("nodemailer");

// General email sending function
export const sendEmail = async ({ to, subject, html }: any) => {
  // Create a transporter using the configuration from your settings
  // const transporter = nodemailer.createTransport({
  //   // service: config.EMAIL_SERVICE, // TODO: maybe used in older version of nodemailer, commented out
  //   // port: config.EMAIL_SERVICE_PORT, // TODO: maybe used in older version of nodemailer, commented out
  //   auth: {
  //     user: config.EMAIL_SERVICE_USER,
  //     pass: config.EMAIL_SERVICE_PASSWORD,
  //   },
  // });
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

