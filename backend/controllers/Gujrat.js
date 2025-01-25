const puppeteer = require("puppeteer");
const path = require("path");
const fs = require("fs");

// Generate PDF controller
exports.generatePDF = async (req, res) => {
    const { baseUrl, pageCount } = req.body;

    if (!baseUrl || !pageCount) {
        return res.status(400).json({ error: "Missing required fields." });
    }

    // Temp folder path
    const tempFolder = path.join(__dirname, "..", "temp");

    // Create the temp folder if it doesn't exist
    if (!fs.existsSync(tempFolder)) {
        fs.mkdirSync(tempFolder);
    }

    const imageUrls = [];
    for (let i = 0; i < pageCount; i++) {
        imageUrls.push(`${baseUrl}${i}.jpg`);
    }

    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        // Build the HTML content with images
        let htmlContent = `<!DOCTYPE html>
    <html>
    <body style="margin: 0; padding: 0;">
    <style>
        @page {
            margin: 0;
        }
        body {
            margin: 0;
            padding: 0;
        }
        img {
            display: block;
            margin: 0;
            width: 100%;
            height: 100vh;
            page-break-after: always;
        }
        img:last-child {
            page-break-after: auto;
        }
    </style>
    `;

        for (const url of imageUrls) {
            htmlContent += `<img src="${url}" alt="Image" />`;
        }

        htmlContent += `</body></html>`;

        await page.setContent(htmlContent);

        const date = new Date();
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = String(date.getFullYear()).slice(-2);
        const formattedDate = `${day}-${month}-${year}`;

        // Path to save PDF
        const pdfPath = path.join(tempFolder, `Gujrat_${formattedDate}.pdf`);

        // Convert the page to PDF
        await page.pdf({
            path: pdfPath,
            format: "A4",
            printBackground: true,
        });

        await browser.close();

        // Return the path for the generated PDF to frontend
        res.json({ message: "PDF created successfully", filePath: pdfPath });
    } catch (error) {
        console.error("Error generating PDF:", error);
        res.status(500).json({ error: "Error generating PDF" });
    }
};
