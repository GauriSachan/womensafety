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
mongoose.connect(process.env.MONGO_URI)
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

// ✅ Emergency Contacts Model
const EmergencyContactSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: String,
  phone: String,
  email: String,
  createdAt: { type: Date, default: Date.now }
});
const EmergencyContact = mongoose.model("EmergencyContact", EmergencyContactSchema);

// ✅ Location Share Model
const LocationShareSchema = new mongoose.Schema({
  shareId: { type: String, required: true, unique: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  contactIds: [String],
  latitude: Number,
  longitude: Number,
  accuracy: Number,
  active: { type: Boolean, default: true },
  expiresAt: Date,
  createdAt: { type: Date, default: Date.now }
});
const LocationShare = mongoose.model("LocationShare", LocationShareSchema);

// ✅ Incident Report Model
const IncidentReportSchema = new mongoose.Schema({
  incidentType: String,
  location: String,
  description: String,
  incidentTime: Date,
  anonymous: { type: Boolean, default: true },
  latitude: Number,
  longitude: Number,
  status: { type: String, default: 'pending' },
  createdAt: { type: Date, default: Date.now }
});
const IncidentReport = mongoose.model("IncidentReport", IncidentReportSchema);

// ==========================
// SAFETY FEATURE ROUTES
// ==========================

// ✅ Emergency Alert Route
app.post("/api/emergency-alert", async (req, res) => {
  try {
    const { location, timestamp, message, userAgent, pageUrl } = req.body;
    
    // Get user's emergency contacts (you might want to get userId from JWT token)
    // For now, we'll just log the emergency and could send to predefined contacts
    
    console.log("🚨 EMERGENCY ALERT RECEIVED:", {
      timestamp,
      location,
      message,
      userAgent,
      pageUrl
    });

    // Here you would typically:
    // 1. Send SMS via Twilio
    // 2. Send emails to emergency contacts
    // 3. Store emergency log in database
    
    // Send SMS example (uncomment when Twilio is configured):
    /*
    const twilio = require('twilio');
    const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
    
    const emergencyContacts = ['emergency_phone_number']; // Get from database
    for(const phone of emergencyContacts) {
      await client.messages.create({
        body: `EMERGENCY ALERT: ${message} Location: ${location?.latitude}, ${location?.longitude}`,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: phone
      });
    }
    */

    res.json({ success: true, message: "Emergency alert processed" });
  } catch (err) {
    console.error("Emergency alert error:", err);
    res.status(500).json({ error: "Failed to process emergency alert" });
  }
});

// ✅ Update Location Route (for live location sharing)
app.post("/api/update-location", async (req, res) => {
  try {
    const { shareId, latitude, longitude, accuracy, timestamp } = req.body;
    
    const locationShare = await LocationShare.findOneAndUpdate(
      { shareId, active: true },
      {
        latitude,
        longitude,
        accuracy,
        lastUpdated: new Date(timestamp)
      },
      { new: true }
    );

    if (!locationShare) {
      return res.status(404).json({ error: "Location share not found or expired" });
    }

    res.json({ success: true, message: "Location updated" });
  } catch (err) {
    console.error("Location update error:", err);
    res.status(500).json({ error: "Failed to update location" });
  }
});

// ✅ Start Location Sharing Route
app.post("/api/start-location-sharing", async (req, res) => {
  try {
    const { contactIds, duration } = req.body;
    const shareId = 'share_' + Date.now();
    const expiresAt = new Date(Date.now() + (duration * 60 * 1000));

    const locationShare = new LocationShare({
      shareId,
      contactIds,
      expiresAt,
      active: true
    });

    await locationShare.save();
    res.json({ success: true, shareId, expiresAt });
  } catch (err) {
    console.error("Start location sharing error:", err);
    res.status(500).json({ error: "Failed to start location sharing" });
  }
});

// ✅ Get Shared Location Route
app.get("/api/location/:shareId", async (req, res) => {
  try {
    const { shareId } = req.params;
    
    const locationShare = await LocationShare.findOne({
      shareId,
      active: true,
      expiresAt: { $gt: new Date() }
    });

    if (!locationShare) {
      return res.status(404).json({ error: "Location share not found or expired" });
    }

    res.json({
      latitude: locationShare.latitude,
      longitude: locationShare.longitude,
      accuracy: locationShare.accuracy,
      lastUpdated: locationShare.lastUpdated
    });
  } catch (err) {
    console.error("Get location error:", err);
    res.status(500).json({ error: "Failed to get location" });
  }
});

// ✅ Submit Anonymous Report Route
app.post("/api/submit-report", async (req, res) => {
  try {
    const { incidentType, location, description, incidentTime, anonymous } = req.body;
    
    const report = new IncidentReport({
      incidentType,
      location,
      description,
      incidentTime: incidentTime ? new Date(incidentTime) : new Date(),
      anonymous
    });

    await report.save();
    
    console.log("📋 New incident report submitted:", {
      type: incidentType,
      location,
      anonymous
    });

    res.json({ success: true, message: "Report submitted successfully" });
  } catch (err) {
    console.error("Report submission error:", err);
    res.status(500).json({ error: "Failed to submit report" });
  }
});

// ✅ Get Incident Reports Route (for admin/map view)
app.get("/api/reports", async (req, res) => {
  try {
    const reports = await IncidentReport.find()
      .select('-__v')
      .sort({ createdAt: -1 })
      .limit(100);

    res.json(reports);
  } catch (err) {
    console.error("Get reports error:", err);
    res.status(500).json({ error: "Failed to get reports" });
  }
});

// ✅ Emergency Contacts Routes
app.post("/api/emergency-contacts", async (req, res) => {
  try {
    // You'd get userId from JWT token in a real app
    const { name, phone, email } = req.body;
    
    const contact = new EmergencyContact({
      userId: new mongoose.Types.ObjectId(), // Replace with actual user ID
      name,
      phone,
      email
    });

    await contact.save();
    res.json({ success: true, contact });
  } catch (err) {
    console.error("Add emergency contact error:", err);
    res.status(500).json({ error: "Failed to add emergency contact" });
  }
});

app.get("/api/emergency-contacts", async (req, res) => {
  try {
    // You'd filter by actual user ID from JWT token
    const contacts = await EmergencyContact.find()
      .select('-__v')
      .sort({ createdAt: -1 });

    res.json(contacts);
  } catch (err) {
    console.error("Get emergency contacts error:", err);
    res.status(500).json({ error: "Failed to get emergency contacts" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Backend running on http://localhost:${PORT}`));
