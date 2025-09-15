const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  password: String,
  otp: String,
  otpCreatedAt: Date,
  verified: { type: Boolean, default: false },
  badges: [String],
  completedQuizzes: [
    {
      date: Date,
      score: Number,
      total: Number
    }
  ]
});

module.exports = mongoose.model("User", UserSchema);
