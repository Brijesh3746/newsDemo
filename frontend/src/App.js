// import React, { useState } from 'react';
// import axios from 'axios';

// function GeneratePDF() {
//   const [baseUrl, setBaseUrl] = useState('');
//   const [pageCount, setPageCount] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   const handleUrlChange = (event) => {
//     setBaseUrl(event.target.value);
//   };

//   const handlePageCountChange = (event) => {
//     setPageCount(event.target.value);
//   };

//   const generatePDF = async () => {
//     // Validate inputs
//     if (!baseUrl || !pageCount || isNaN(pageCount)) {
//       setError("Please provide a valid URL and a valid page count.");
//       return;
//     }

//     try {
//       setLoading(true);
//       // Send the request to the backend with dynamic baseUrl and pageCount
//       const response = await axios.post('http://localhost:4000/generate-pdf', {
//         baseUrl: baseUrl,
//         pageCount: parseInt(pageCount), // Ensure pageCount is a number
//       }, {
//         responseType: 'blob'  // Ensure binary data (PDF) is received correctly
//       });

//       // Create a link to download the PDF
//       const pdfBlob = response.data;
//       const url = URL.createObjectURL(pdfBlob);
//       const a = document.createElement("a");
//       a.href = url;
//       a.download = "generatedPDF.pdf";  // Default filename for the PDF
//       document.body.appendChild(a);
//       a.click();  // Trigger download
//       document.body.removeChild(a);
//     } catch (err) {
//       setError("Error generating PDF.");
//       console.error(err);  // Log the error if there's an issue
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       <h1>Generate PDF from Images</h1>
//       <div>
//         <label htmlFor="url">Base URL of Images:</label>
//         <input
//           type="text"
//           id="url"
//           value={baseUrl}
//           onChange={handleUrlChange}
//           placeholder="Enter the base URL of your images"
//         />
//       </div>
//       <div>
//         <label htmlFor="pageCount">Number of Pages:</label>
//         <input
//           type="number"
//           id="pageCount"
//           value={pageCount}
//           onChange={handlePageCountChange}
//           placeholder="Enter the number of pages"
//           min="1"
//         />
//       </div>
//       <div>
//         <button onClick={generatePDF} disabled={loading}>
//           {loading ? 'Generating PDF...' : 'Generate PDF'}
//         </button>
//       </div>
//       {error && <p>{error}</p>}  {/* Show error message if PDF generation fails */}
//     </div>
//   );
// }

// export default GeneratePDF;

// chagnge single 
// import React, { useState } from "react";
// import axios from "axios";

// const App = () => {
//   const [baseUrl, setBaseUrl] = useState("");
//   const [pageCount, setPageCount] = useState(1);
//   const [message, setMessage] = useState("");

//   const generatePDF = async () => {
//     try {
//       const response = await axios.post("http://localhost:4000/generate-pdf", {
//         baseUrl,
//         pageCount,
//       });
//       setMessage(response.data.message);
//       // Here you can also handle downloading the file
//       // For example: `window.location.href = response.data.filePath;`
//     } catch (error) {
//       setMessage("Error generating PDF: " + error.message);
//     }
//   };

//   return (
//     <div>
//       <h1>Generate PDF</h1>
//       <label>Base URL:</label>
//       <input
//         type="text"
//         value={baseUrl}
//         onChange={(e) => setBaseUrl(e.target.value)}
//       />
//       <label>Page Count:</label>
//       <input
//         type="number"
//         value={pageCount}
//         onChange={(e) => setPageCount(parseInt(e.target.value))}
//       />
//       <button onClick={generatePDF}>Generate PDF</button>
//       <p>{message}</p>
//     </div>
//   );
// };

// export default App;

// add other pages 
// import React, { useState } from "react";
// import axios from "axios";

// const App = () => {
//   const [baseUrl, setBaseUrl] = useState("");
//   const [pageCount, setPageCount] = useState(1);
//   const [selectedPaper, setSelectedPaper] = useState("Gujarat Samachar"); // Default paper
//   const [message, setMessage] = useState("");

//   const generatePDF = async () => {
//     try {
//       let formattedBaseUrl = baseUrl;

//       // Apply specific logic for each newspaper
//       switch (selectedPaper) {
//         case "Gujarat Samachar":
//           // Assuming Gujarat Samachar requires base URL as-is
//           formattedBaseUrl = baseUrl;
//           break;

//         case "Economic Times":
//           // Add logic for Economic Times
//           formattedBaseUrl = `${baseUrl}/et-pages/`;
//           break;

//         case "Times of India":
//           // Add logic for Times of India
//           formattedBaseUrl = `${baseUrl}/toi-pages/`;
//           break;

//         default:
//           throw new Error("Invalid newspaper selection");
//       }

//       const response = await axios.post("http://localhost:4000/api/pdf/generate-pdf", {
//         baseUrl: formattedBaseUrl,
//         pageCount,
//       });

//       setMessage(response.data.message);
//     } catch (error) {
//       setMessage("Error generating PDF: " + (error.response?.data?.error || error.message));
//     }
//   };

//   return (
//     <div>
//       <h1>Generate Newspaper PDF</h1>

//       {/* Dropdown for selecting newspaper */}
//       <label>Select Newspaper:</label>
//       <select
//         value={selectedPaper}
//         onChange={(e) => setSelectedPaper(e.target.value)}
//       >
//         <option value="Gujarat Samachar">Gujarat Samachar</option>
//         <option value="Economic Times">Economic Times</option>
//         <option value="Times of India">Times of India</option>
//       </select>

//       <div>
//         <label>Base URL:</label>
//         <input
//           type="text"
//           value={baseUrl}
//           onChange={(e) => setBaseUrl(e.target.value)}
//         />
//       </div>

//       <div>
//         <label>Page Count:</label>
//         <input
//           type="number"
//           min="1"
//           value={pageCount}
//           onChange={(e) => setPageCount(parseInt(e.target.value) || 1)}
//         />
//       </div>

//       <button onClick={generatePDF}>Generate PDF</button>

//       <p>{message}</p>
//     </div>
//   );
// };

// export default App;


// link update
// import React, { useState } from "react";
// import axios from "axios";

// const App = () => {
//   const [baseUrl, setBaseUrl] = useState("");
//   const [pageCount, setPageCount] = useState(1);
//   const [message, setMessage] = useState("");

//   const generatePDF = async () => {
//     try {
//       const formattedBaseUrl = baseUrl.trim(); // Ensure the input is clean
//       console.log(formattedBaseUrl);
      
//       const response = await axios.post("http://localhost:4000/generate-pdf", {
//         baseUrl: formattedBaseUrl,
//         pageCount,
//       });

//       setMessage(response.data.message);
//       // To download the generated PDF:
//       // window.location.href = response.data.filePath;
//     } catch (error) {
//       setMessage("Error generating PDF: " + (error.response?.data?.error || error.message));
//     }
//   };

//   return (
//     <div>
//       <h1>Generate Gujarat PDF</h1>
//       <label>Base URL:</label>
//       <input
//         type="text"
//         value={baseUrl}
//         onChange={(e) => setBaseUrl(e.target.value)}
//         placeholder="Enter Base URL"
//       />
//       <label>Page Count:</label>
//       <input
//         type="number"
//         value={pageCount}
//         onChange={(e) => setPageCount(parseInt(e.target.value, 10))}
//         min="1"
//       />
//       <button onClick={generatePDF}>Generate PDF</button>
//       <p>{message}</p>
//     </div>
//   );
// };

// export default App;
import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const [baseUrl, setBaseUrl] = useState("");
  const [pageCount, setPageCount] = useState(1);
  const [message, setMessage] = useState("");

  const generatePDF = async () => {
    try {
      // Strip the image file extension and page index part from the base URL
      let formattedBaseUrl = baseUrl.trim();

      // If the baseUrl ends with a page index and file extension, remove it
      const urlWithoutFile = formattedBaseUrl.replace(/-\d+\.jpg$/, "-");

      console.log("Formatted Base URL:", urlWithoutFile); // Verify if it's correct

      // Send the processed base URL without the image and page index
      const response = await axios.post("http://localhost:4000/generate-pdf", {
        baseUrl: urlWithoutFile,
        pageCount,
      });

      setMessage(response.data.message);
      // To download the generated PDF:
      // window.location.href = response.data.filePath;
    } catch (error) {
      setMessage("Error generating PDF: " + (error.response?.data?.error || error.message));
    }
  };

  return (
    <div>
      <h1>Generate Gujarat PDF</h1>
      <label>Base URL:</label>
      <input
        type="text"
        value={baseUrl}
        onChange={(e) => setBaseUrl(e.target.value)}
        placeholder="Enter Base URL"
      />
      <label>Page Count:</label>
      <input
        type="number"
        value={pageCount}
        onChange={(e) => setPageCount(parseInt(e.target.value, 10))}
        min="1"
      />
      <button onClick={generatePDF}>Generate PDF</button>
      <p>{message}</p>
    </div>
  );
};

export default App;
