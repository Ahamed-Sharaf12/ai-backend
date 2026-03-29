const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/generate", async (req, res) => {
  const { prompt } = req.body;

  try {
    const response = await fetch(
      "https://api-inference.huggingface.co/models/bigcode/starcoder",
      {
        method: "POST",
        headers: {
          "Authorization": "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",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          inputs: `Generate a clean HTML, CSS website: ${prompt}`
        })
      }
    );

    const data = await response.json();

    let code = data[0]?.generated_text || `
      <html><body><h1>Failed to generate</h1></body></html>
    `;

    res.json({ code });

  } catch (err) {
    res.json({
      code: `<html><body><h1>Error generating site</h1></body></html>`
    });
  }
});

app.listen(3000, () => console.log("Server running"));