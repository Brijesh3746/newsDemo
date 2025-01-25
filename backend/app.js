const express = require("express");
const cors = require("cors");
const pdfRoutes = require("./routes/pdfRoutes");

const app = express();

// Enable CORS
app.use(cors({ origin: "http://localhost:3000" })); // Frontend URL

// Middleware
app.use(express.json());

// Routes
app.use("/", pdfRoutes);

module.exports = app;
