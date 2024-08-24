require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "public")));

// Serve the frontend
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

const claudeAPIKey = process.env.CLAUDE_API_KEY;
const apiUrl = "https://api.claude.ai/v1"; // Update with the actual endpoint

app.post("/api/claude", async (req, res) => {
  const { prompt } = req.body;

  try {
    const response = await axios.post(
      `${apiUrl}/chat`,
      {
        prompt: prompt,
      },
      {
        headers: {
          Authorization: `Bearer ${claudeAPIKey}`,
          "Content-Type": "application/json",
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error(
      "Error:",
      error.response ? error.response.data : error.message
    );
    res
      .status(500)
      .json({ error: "Something went wrong, please try again later." });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
