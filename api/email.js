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
      <p><strong>First Name:</strong> ${name}</p>
      <p><strong>Last Name:</strong> ${req.body.lname}</p>
      <p><strong>Phone:</strong> ${req.body.phone}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Address:</strong> ${req.body.address}</p>
      <p><strong>Date:</strong> ${req.body.date}</p>
      <p><strong>Time:</strong> ${req.body.time}</p>
      <p><strong>Number of People:</strong> ${req.body.numPeople}</p>
      <p><strong>Audio Equipment:</strong> ${req.body.audio ? "Yes" : "No"}</p>
      <p><strong>Special Requests:</strong> ${message || "None"}</p>
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
