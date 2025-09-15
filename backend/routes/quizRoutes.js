const express = require("express");
const router = express.Router();
const Quiz = require("../models/Quiz");
const auth = require("../middleware/auth");

// Get today's quiz questions
router.get("/questions/today", auth, async (req, res) => {
  try {
    // pick random 5 questions
    const questions = await Quiz.aggregate([{ $sample: { size: 5 } }]);
    const formatted = questions.map(q => ({
      id: q._id,
      text: q.question,
      options: q.options
    }));
    res.json({ questions: formatted });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch questions" });
  }
});

// Submit quiz answers
router.post("/quiz/submit", auth, async (req, res) => {
  try {
    const { answers } = req.body;
    const questions = await Quiz.find({ _id: { $in: Object.keys(answers) } });

    let correct = 0;
    questions.forEach(q => {
      if (answers[q._id] !== undefined &&
          q.answerIndex === answers[q._id]) {
        correct++;
      }
    });

    const total = questions.length;
    const pct = Math.round((correct / total) * 100);

    // Add badge if passed
    if (pct >= 70) {
      req.user.badges.push("Quiz Master");
      await req.user.save();
    }

    res.json({ result: { correct, total, pct } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to submit quiz" });
  }
});

module.exports = router;
