import nodemailer from "nodemailer";
console.log("EMAIL:", process.env.EMAIL_USER);
console.log("PASS:", process.env.EMAIL_PASS);
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendOTPEmail = async (email, otp) => {
  await transporter.sendMail({
    from: `"ShopPoint" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Password Reset OTP",
    html: `
      <div style="font-family:Arial;padding:10px">
        <h2>Password Reset OTP</h2>
        <p>Your OTP is:</p>
        <h1 style="color:#ff7b00">${otp}</h1>
        <p>This OTP will expire in 5 minutes.</p>
      </div>
    `,
  });
};