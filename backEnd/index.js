require("dotenv").config();
const express = require("express");
const { pool, checkConnection } = require("./config/db_config");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require('axios');
const { GoogleGenerativeAI } = require("@google/generative-ai");



const app = express();

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["POST", "GET", "DELETE"],
    credentials: true,
  })
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/", require("./controllers/authController"));
app.use("/api", require("./admin/getStudents"));
app.use("/api", require("./admin/getResults"));

// Initialize Google Generative AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Define the /api/analyze-performance endpoint
app.post('/api/analyze-performance', async (req, res) => {
    const { performance_text } = req.body;

    if (!performance_text) {
        return res.status(400).json({ error: 'performance_text is required' });
    }

    try {
        const result = await model.generateContent(performance_text);
        return res.json({ analysis: result.response.text() });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error processing request' });
    }
});
// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);

  try {
    await checkConnection();
  } catch (error) {
    console.log("Failed to initialize database", error);
  }
});
