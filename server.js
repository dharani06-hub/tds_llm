// server.js
const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 10000;

// Serve static files (index.html, styles.css, agent.js)
app.use(express.static(path.join(__dirname)));

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// Example proxy route for AI Pipe or other APIs
// (You can expand this as needed)
app.use(express.json());
app.post("/api/aipipe", async (req, res) => {
  try {
    const response = await fetch("https://api.aipipe.io/run", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.AIPIPE_API_KEY}`
      },
      body: JSON.stringify(req.body)
    });
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "AI Pipe proxy failed" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://0.0.0.0:${PORT}`);
});
