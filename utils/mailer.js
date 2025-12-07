// utils/mailer.js
const { text } = require("express");
const nodemailer = require("nodemailer");

async function sendEnquiryMail({ emailText}) {
  try {
    const mailSender = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.SENDER_EMAIL,
        pass: process.env.SENDER_PASS
      },
    });

    const mailOptions = {
      from: `"Product Enquiry" <${process.env.SENDER_EMAIL}>`,
      to: process.env.RECEIVER_EMAIL,
      subject: `New Enquiry Received - ID #${enquiryId}`,
      text: emailText,
    };

    const info = await mailSender.sendMail(mailOptions);
    console.log("✅ Email sent successfully:", info.messageId);
  } catch (error) {
    console.error("❌ Email sending failed:", error.message);
  }
}

module.exports = sendEnquiryMail; // ✅ default export
