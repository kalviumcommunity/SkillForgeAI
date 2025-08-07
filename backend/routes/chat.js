const express = require("express");
const router = express.Router();
const { OpenAI } = require("openai");
require("dotenv").config();

const openai = new OpenAI({
  baseURL: "https://api.groq.com/openai/v1",
  apiKey: process.env.GROQ_API_KEY,
});

router.post("/", async (req, res) => {
  const { message } = req.body;

  try {
    const completion = await openai.chat.completions.create({
      model: "llama3-8b-8192", // or "llama3-70b-8192", "mixtral-8x7b-32768"
      messages: [{ role: "user", content: message }],
      temperature: 0.7,
    });

    const response = completion.choices[0].message.content;
    res.json({ response });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch from Groq." });
  }
});

module.exports = router;

