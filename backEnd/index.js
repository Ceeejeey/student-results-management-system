require("dotenv").config();

const express = require("express");
const { pool, checkConnection } = require("./config/db_config");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcryptjs");

const app = express();

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["POST", "GET"],
    credentials: true,
  })
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/", require("./controllers/authController"));

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
