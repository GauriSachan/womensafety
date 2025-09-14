const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
  text: String,
  options: [String],
  answer: Number, // index of correct option
  tags: [String],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Question", QuestionSchema);
