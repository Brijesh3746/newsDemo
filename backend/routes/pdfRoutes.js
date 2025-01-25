const express = require("express");
const router = express.Router();
const { generatePDF } = require("../controllers/Gujrat");

// Route to generate PDF
router.post("/generate-pdf", generatePDF);

module.exports = router;
