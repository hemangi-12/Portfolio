const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());



app.post("/send-email", async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ error: "Please provide all required fields (name, email, message)." });
    }

    try {
        // Create a transporter
        const transporter = nodemailer.createTransport({
            service: "gmail", // e.g., "gmail" or "outlook"
            auth: {
                user: "hemanginp2002@gmail.com", // Your email address
                pass: "mcyqlcywkonwxkxx", // Your email password or app-specific password
                
            },
        });

        // Email options
        const mailOptions = {
            from: `"${name}" <${email}>`,
            to: "hemanginp2002@gmail.com", // Replace with your email address
            subject: `Contact Form Submission from ${name}`,
            text: message,
        };

        // Send the email
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: "Email sent successfully!" });
    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).json({ error: "Failed to send email." });
    }
});

/*app.post("/send-email", async (req, res) => {
    const { name, email, message } = req.body;

    // Validate input
    if (!name || !email || !message) {
        return res.status(400).json({ error: "Please provide all required fields (name, email, message)." });
    }

    try {
        // Create a transporter using SMTP
        const transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "403ced8c032adf",
              pass: "********779f"
            }
        });

        // Email options
        const mailOptions = {
            from: `"${name}" <${email}>`,  // Sender's email
            to: "hemanginp2002@gmail.com", // Recipient's email
            subject: `Contact Form Submission from ${name}`,
            text: message,                // Plain text message
        };

        // Send the email
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: "Email sent successfully!" });
    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).json({ error: "Failed to send email. Please try again later." });
    }
});
*/


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});