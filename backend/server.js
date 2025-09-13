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

// ✅ Contact Message Model
const ContactSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  createdAt: { type: Date, default: Date.now }
});
const ContactMessage = mongoose.model("ContactMessage", ContactSchema);

// ✅ Mail Transporter
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS // 16-char Gmail App Password
  }
});

// ==========================
// AUTH ROUTES (Same as before)
// ==========================

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
      user.name = name;
      user.password = hashedPassword;
      user.otp = otp;
      await user.save();
    } else {
      user = new User({ name, email, password: hashedPassword, otp, verified: false });
      await user.save();
    }

    await transporter.sendMail({
      from: `"SheShield Team" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "SheShield: Confirm Your Email",
      text: `Hello ${name},\n\nThank you for registering with SheShield.\n\nYour OTP is: ${otp}\n\nThis OTP will expire in 10 minutes.\n\n- Team SheShield`,
      html: `<h2>Hello ${name},</h2>
             <p>Thank you for registering with <strong>SheShield</strong>.</p>
             <p><strong>Your OTP is: ${otp}</strong></p>
             <p>This OTP will expire in 10 minutes.</p>
             <p>- Team SheShield</p>`
    });

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

// ✅ Login
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

// ==========================
// CONTACT ROUTE (NEW)
// ==========================
app.post("/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // ✅ Save message in DB
    const newMessage = new ContactMessage({ name, email, message });
    await newMessage.save();

    // ✅ Send email to Admin
    await transporter.sendMail({
      from: `"SafeHer Contact Form" <${process.env.EMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER, // admin email from .env
      subject: "📩 New Contact Message - SafeHer",
      text: `New message received from ${name} (${email}):\n\n${message}`,
      html: `<h3>New Contact Message</h3>
             <p><strong>Name:</strong> ${name}</p>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>Message:</strong></p>
             <p>${message}</p>`
    });

    res.json({ message: "Message sent successfully ✅" });

  } catch (err) {
    console.error("Contact form error:", err);
    res.status(500).json({ error: "Failed to send message" });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Backend running on http://localhost:${PORT}`));
