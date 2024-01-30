import nodemailer from "nodemailer";

export const sendEmail = async () => {
  try {
    // Create a transporter
    let transporter = nodemailer.createTransport({
      host: "smtp-relay.sendinblue.com",
      port: 587,
      auth: {
        user: "narutouzumaki16092003@gmail.com",
        pass: "40mTStE1OPdU57nL",
      },
    });

    // send mail with defined transport object
    await transporter.sendMail({
      from: "noreply@gmail.com",
      to: "narutouzumaki16092003@gmail.com",
      subject: "Reset your password",
      text: "Hello world",
    });

    console.log("OTP send successfully");
  } catch (error) {
    console.error(error);
  }
};
