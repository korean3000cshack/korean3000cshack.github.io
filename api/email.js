import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ message: "Method Not Allowed" });
    return;
  }

  const { name, email, message } = req.body;

  // Set up Nodemailer transporter with Gmail (replace with your credentials or env vars)
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER, // Use environment variables for security!
      pass: process.env.GMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `${name} <${email}>`,
    to: process.env.GMAIL_USER,
    subject: "New Contact Form Message",
    html: `
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong><br>${message}</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Email sending failed:", error);
    res.status(500).json({ error: "Failed to send email" });
  }
}
