require("dotenv").config();
const mongoose = require("mongoose");
const Quiz = require("../models/Quiz");

// ✅ MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB connected for seeding"))
.catch(err => console.error("MongoDB connection error:", err));

const sampleQuestions = [
  {
    question: "What is the emergency helpline number for women in India?",
    options: ["100", "1091", "108", "112"],
    answer: "1091"
  },
  {
    question: "Which law in India deals with protection against domestic violence?",
    options: [
      "Section 498A IPC",
      "POCSO Act",
      "Dowry Prohibition Act",
      "Domestic Violence Act 2005"
    ],
    answer: "Domestic Violence Act 2005"
  },
  {
    question: "Which app was launched by the Indian Government for women’s safety?",
    options: ["Raksha", "Udaan", "Nirbhaya", "SafeHer"],
    answer: "Raksha"
  },
  {
    question: "If you face cyber harassment, where should you report first?",
    options: ["Local Police Station", "Cyber Crime Cell", "Women Helpline", "All of the above"],
    answer: "All of the above"
  },
  {
    question: "Which of these rights is guaranteed under Article 21 of the Indian Constitution?",
    options: ["Right to Education", "Right to Life and Personal Liberty", "Right to Equality", "Right to Freedom of Speech"],
    answer: "Right to Life and Personal Liberty"
  }
];

async function seed() {
  try {
    await Quiz.deleteMany(); // clear old questions
    await Quiz.insertMany(sampleQuestions);
    console.log("✅ Sample quiz questions seeded successfully!");
    mongoose.connection.close();
  } catch (err) {
    console.error("❌ Seeding failed:", err);
    mongoose.connection.close();
  }
}

seed();
