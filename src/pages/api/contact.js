// pages/api/contact.js
import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, message, consent } = req.body;

    // Basic validation
    if (!name || !email || !message || consent !== true) {
      return res.status(400).json({ error: 'Please fill in all required fields and give consent.' });
    }

    try {
      // Create a more robust transporter configuration
       let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587, // Try using port 587 instead of 465
        secure: false, // true for 465, false for other ports
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        },
        tls: {
          // Do not fail on invalid certs
          rejectUnauthorized: false
        }
      });

      // Set up email data
      const mailOptions = {
        from: `"${name}" <${process.env.EMAIL_USER}>`, // Use your authorized sender
        replyTo: email, // Set reply-to as the visitor's email
        to: process.env.RECIPIENT_EMAIL || 'contact@dyaneparis.com',
        subject: `New Contact Form Submission from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\n\nMessage: ${message}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #333;">New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <div style="margin-top: 20px; padding: 15px; background-color: #f7f7f7; border-left: 4px solid #ccc;">
              <p><strong>Message:</strong></p>
              <p style="white-space: pre-line;">${message}</p>
            </div>
          </div>
        `
      };

      // Send the email
      await transporter.sendMail(mailOptions);
      res.status(200).json({ success: true, message: 'Email sent successfully' });
    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ 
        success: false, 
        error: 'Error sending email', 
        details: error.message 
      });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}