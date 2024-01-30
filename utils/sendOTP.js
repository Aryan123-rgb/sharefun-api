import nodemailer from "nodemailer";
import crypto from "crypto";
import OTP from "../models/OTP.js";

const generateOTP = () => {
  const verficationCode = crypto.randomInt(1000, 9999);
  return verficationCode;
};

export const sendEmail = async (email) => {
  try {
    // Create a transporter
    let transporter = nodemailer.createTransport({
      host: "smtp-relay.sendinblue.com",
      port: 587,
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASS,
      },
    });
    const otp = generateOTP();

    const mailTemplate = `      <html>
<head>
  <style>
    body {
      font-family: 'Arial', sans-serif;
      background-color: #f4f4f4;
      color: #333;
      text-align: center;
    }
    h1 {
      color: #007bff;
    }
    h2 {
      color: #28a745;
    }
    p {
      margin: 15px 0;
    }
  </style>
</head>
<body>
  <h1>ShareFun Password Reset</h1>
  <p>Hello,</p>
  <p>You have requested to reset your password. Please use the following OTP code:</p>
  <h2>${otp}</h2>
  <p>If you did not request this, please ignore this email.</p>
  <p>Regards,<br/>ShareFun Team</p>
</body>
</html>`;
    // send mail with defined transport object
    await transporter.sendMail({
      from: "noreply@sharefun.com",
      to: email,
      subject: "Reset your password",
      html: mailTemplate,
    });

    await OTP.create({ email, otp });

    console.log("OTP send successfully");
  } catch (error) {
    console.error(error);
  }
};
