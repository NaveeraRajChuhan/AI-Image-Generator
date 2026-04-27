const express = require("express");
const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");

const app = express();

app.use(express.json());
app.use(express.static("public"));

const API_KEY = "sk-your-api-key-here"; // ⚠️ already placed, just replace if needed

// generate image
app.post("/generate", async (req, res) => {
  try {
    const { prompt } = req.body;

    const response = await axios.post(
      "https://api.openai.com/v1/images/generations",
      {
        prompt: prompt,
        n: 1,
        size: "512x512"
      },
      {
        headers: {
          "Authorization": `Bearer ${API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    const imageUrl = response.data.data[0].url;

    // save image
    const fileName = Date.now() + ".png";
    const filePath = path.join(__dirname, "public/images", fileName);

    const img = await axios.get(imageUrl, { responseType: "arraybuffer" });
    await fs.writeFile(filePath, img.data);

    res.json({
      imageUrl: "/images/" + fileName
    });

  } catch (err) {
    res.send("Error: " + err.message);
  }
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});