require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const SECRET_KEY = process.env.SECRET_KEY;

// ✅ MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB connected"))
.catch(err => console.log("MongoDB connection error:", err));

// ✅ User Model
const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  password: String,
  otp: String,
  verified: { type: Boolean, default: false }
});
const User = mongoose.model("User", UserSchema);

// ✅ Mail Transporter (SMTP with SSL)
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS // 16-char Gmail App Password
  }
});

// ✅ Signup - send OTP
app.post("/signup", async (req, res) => {
  try {
    let { name, email, password } = req.body;
    email = email.trim().toLowerCase();

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedPassword = await bcrypt.hash(password, 10);

    let user = await User.findOne({ email });

    if (user) {
      if (user.verified) return res.status(400).json({ error: "User already exists" });
      // Update unverified user
      user.name = name;
      user.password = hashedPassword;
      user.otp = otp;
      await user.save();
    } else {
      user = new User({ name, email, password: hashedPassword, otp, verified: false });
      await user.save();
    }

    // Send OTP email (HTML + text for better deliverability)
    try {
      await transporter.sendMail({
        from: `"SheShield Team" <${process.env.EMAIL_USER}>`,
        to: email,
        replyTo: process.env.EMAIL_USER,
        subject: "SheShield: Confirm Your Email",
        text: `Hello ${name},

Thank you for registering with SheShield – your trusted platform for women's safety.

Your OTP is: ${otp}

This OTP will expire in 10 minutes. Please do not share it with anyone.

- Team SheShield`,
        html: `<div style="font-family:Arial,sans-serif; line-height:1.6; color:#333;">
                 <h2>Hello ${name},</h2>
                 <p>Thank you for registering with <strong>SheShield</strong> – your trusted platform for women's safety.</p>
                 <p><strong>Your OTP is: ${otp}</strong></p>
                 <p>This OTP will expire in 10 minutes. Please do not share it with anyone.</p>
                 <br>
                 <p>- Team SheShield</p>
               </div>`
      });
      console.log("✅ OTP sent successfully to:", email);
    } catch (mailErr) {
      console.error("❌ Email send error:", mailErr);
      return res.status(500).json({ error: "Failed to send OTP email" });
    }

    res.json({ message: "OTP sent to email. Please verify." });

  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ error: "Signup failed" });
  }
});

// ✅ Verify OTP
app.post("/verify-otp", async (req, res) => {
  try {
    let { email, otp } = req.body;
    email = email.trim().toLowerCase();

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "User not found" });
    if (user.otp !== otp) return res.status(400).json({ error: "Invalid OTP" });

    user.verified = true;
    user.otp = null;
    await user.save();

    res.json({ message: "Email verified successfully ✅" });

  } catch (err) {
    console.error("OTP verification error:", err);
    res.status(500).json({ error: "Verification failed" });
  }
});

// ✅ Login (only after verified)
app.post("/login", async (req, res) => {
  try {
    let { email, password } = req.body;
    email = email.trim().toLowerCase();

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "User not found" });
    if (!user.verified) return res.status(400).json({ error: "Please verify email first" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: "1h" });
    res.json({ message: "Login successful ✅", token });

  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Login failed" });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Backend running on http://localhost:${PORT}`));
