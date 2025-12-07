// utils/mailer.js
const nodemailer = require("nodemailer");

async function sendEnquiryMail(emailText) {
  console.log(emailText)
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
      subject: `New Enquiry Received `,
      html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Enquiry Mail</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f6f6f6;
      padding: 20px;
      margin: 0;
    }

    .container {
      background: #ffffff;
      max-width: 600px;
      margin: auto;
      padding: 20px 25px;
      border-radius: 8px;
      box-shadow: 0 2px 6px rgba(0,0,0,0.1);
      border: 1px solid #e0e0e0;
    }

    .header {
      text-align: center;
      padding-bottom: 15px;
      border-bottom: 1px solid #eee;
    }

    .header h2 {
      margin: 0;
      color: #333;
    }

    .content {
      padding: 15px 0;
      color: #555;
      line-height: 1.6;
      font-size: 15px;
    }

    .content strong {
      color: #333;
    }

    .footer {
      margin-top: 25px;
      padding-top: 15px;
      border-top: 1px solid #eee;
      text-align: center;
      font-size: 13px;
      color: #999;
    }
  </style>
</head>

<body>
  <div class="container">
    <div class="header">
      <h2>New Product Enquiry</h2>
    </div>

    <div class="content">
      <p><strong>Name:</strong> {{name}}</p>
      <p><strong>Email:</strong> {{email}}</p>
      <p><strong>Phone:</strong> {{phone}}</p>
      <p><strong>Category:</strong> {{category}}</p>
      <p><strong>Product:</strong> {{product}}</p>

      <p><strong>Message:</strong><br>
      {{message}}</p>
    </div>

    <div class="footer">
      This is an automated email. Please do not reply.
    </div>
  </div>
</body>
</html>`,
    };

    const info = await mailSender.sendMail(mailOptions);
    console.log("✅ Email sent successfully:", info.messageId);
  } catch (error) {
    console.error("❌ Email sending failed:", error.message);
  }
}

module.exports = sendEnquiryMail; // ✅ default export
