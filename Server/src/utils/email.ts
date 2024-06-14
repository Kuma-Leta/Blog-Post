import nodemailer from "nodemailer";

interface EmailOptions {
  email: string;
  subject: string;
  message: string;
}

const sendEmail = async (options: EmailOptions): Promise<void> => {
  // 1) Create a transporter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT || "587"), // Default to port 587 if EMAIL_PORT is not provided
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  //   console.log("username: " + process.env.EMAIL_USERNAME);

  //   console.log("host: " + process.env.EMAIL_HOST);

  //   console.log("password: " + process.env.EMAIL_PASSWORD);

  //   console.log("port: " + process.env.EMAIL_PORT);

  // 2) Define the email options
  const mailOptions = {
    from: `Ephrem Eneyew <${process.env.EMAIL_USERNAME}>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  // 3) Actually send the email
  await transporter.sendMail(mailOptions);
};

export default sendEmail;
