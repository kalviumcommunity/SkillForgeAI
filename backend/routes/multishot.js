const express = require('express');
const router = express.Router();
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

const GROQ_API_KEY = process.env.GROQ_API_KEY;

// Multi-shot examples
const multiShotExamples = `
User: Translate the following sentence to Spanish: "Good morning, everyone."
Assistant: "Buenos días a todos."

User: Summarize the following product description in one sentence: "A wireless mouse with ergonomic design and 2-year battery life."
Assistant: "Ergonomic wireless mouse with long-lasting 2-year battery life."

User: Convert the following requirement into a concise API spec: "We need an endpoint to list users with pagination and optional search by name."
Assistant: "GET /api/users?page=&limit=&q= - returns paginated users, supports 'q' for name filter."
`;

router.get('/', async (req, res) => {
  const userPrompt = req.query.prompt || "Explain what multi-shot prompting is and give a short example.";

  const prompt = `You are a helpful assistant. Follow the style demonstrated in the examples: concise, direct, and in plain English. Use the final User's instruction and respond accordingly.\n\n${multiShotExamples}\n\nUser: ${userPrompt}\nAssistant:`;

  if (!GROQ_API_KEY) {
    return res.json({
      info: "No GROQ_API_KEY found. Returning only prompt.",
      prompt
    });
  }

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: "llama3-8b-8192", // or another Groq model
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7
      })
    });

    const data = await response.json();
    return res.json({
      prompt,
      data: data.choices?.[0]?.message?.content || "No response from Groq"
    });

  } catch (err) {
    res.status(500).json({ error: err.message, prompt });
  }
});

module.exports = router;
