import nodemailer from "nodemailer";

const createMailTransporter = () => {
  const transporter = nodemailer.createTransport({
    port: process.env.EMAIL_PORT,
    host: process.env.EMAIL_HOST,
    auth: {
      user: process.env.EMAIL_AUTH_USER,
      pass: process.env.EMAIL_AUTH_PASSWORD,
    },
    secure: true,
    pool: true,
  });

  return transporter;
};

export default createMailTransporter;
