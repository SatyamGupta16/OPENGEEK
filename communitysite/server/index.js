// index.js
require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;


// Middleware
app.use(express.json()); // Parse JSON bodies

// Routes
app.get("/", (req, res) => {
  res.send("Hello from Express backend!");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
