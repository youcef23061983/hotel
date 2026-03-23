// utils/sendEmailBrevo.js
// const brevo = require("@getbrevo/brevo");

// const sendEmailBrevo = async ({ to, subject, html }) => {
//   // Check if API key exists
//   //   if (!process.env.BREVO_API_KEY) {
//   //     console.error("❌ BREVO_API_KEY is missing in environment variables");
//   //     throw new Error("BREVO_API_KEY missing");
//   //   }

//   //   try {
//   //     // Configure Brevo API
//   //     const apiInstance = new brevo.TransactionalEmailsApi();
//   //     apiInstance.setApiKey(process.env.BREVO_API_KEY);

//   //     // Create email content
//   //     const sendSmtpEmail = {
//   //       to: [{ email: to }],
//   //       sender: {
//   //         email: process.env.GMAIL_USER, // Your Gmail as sender
//   //         name: "My Shop",
//   //       },
//   //       subject: subject,
//   //       htmlContent: html,
//   //       // Optional: Add text version for better deliverability
//   //       textContent: subject,
//   //     };

//   //     // Send the email
//   //     const response = await apiInstance.sendTransacEmail(sendSmtpEmail);
//   //     console.log("✅ Email sent via Brevo to:", to);
//   //     return response;
//   //   } catch (error) {
//   //     console.error("❌ Brevo error:", error.response?.body || error.message);
//   //     throw error;
//   //   }
//   // };
//   if (!process.env.BREVO_API_KEY) {
//     console.error("❌ BREVO_API_KEY is missing");
//     throw new Error("BREVO_API_KEY missing");
//   }

//   try {
//     const response = await fetch("https://api.brevo.com/v3/smtp/email", {
//       method: "POST",
//       headers: {
//         accept: "application/json",
//         "api-key": process.env.BREVO_API_KEY,
//         "content-type": "application/json",
//       },
//       body: JSON.stringify({
//         sender: {
//           name: "My Shop",
//           email: process.env.GMAIL_USER,
//         },
//         to: [{ email: to }],
//         subject: subject,
//         htmlContent: html,
//       }),
//     });

//     const data = await response.json();

//     if (!response.ok) {
//       throw new Error(data.message || "Failed to send email");
//     }

//     console.log("✅ Email sent via Brevo to:", to);
//     return data;
//   } catch (error) {
//     console.error("❌ Brevo error:", error.message);
//     throw error;
//   }
// };

const sendEmailBrevo = async ({ to, subject, html }) => {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000); // 10s timeout

  try {
    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        accept: "application/json",
        "api-key": process.env.BREVO_API_KEY,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        sender: { name: "My Shop", email: process.env.GMAIL_USER },
        to: [{ email: to }],
        subject,
        htmlContent: html,
      }),
      signal: controller.signal,
    });

    clearTimeout(timeout);

    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    console.log("✅ Email sent:", data);
    return data;
  } catch (err) {
    console.error("❌ Brevo error FULL:", err);
    throw err;
  }
};
module.exports = sendEmailBrevo;
