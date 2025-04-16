import { useState } from "react";
import { Link } from "react-router-dom";
import Papa from "papaparse";
import * as XLSX from "xlsx";

const MultipleBugReports = () => {
  const [data, setData] = useState([]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    if (file.type === "text/csv") {
      reader.onload = (event) => {
        const text = event.target.result;
        Papa.parse(text, {
          header: false,
          skipEmptyLines: true,
          complete: (result) => {
            processFileData(result.data);
          },
          error: (error) => {
            console.error("Error parsing CSV file: ", error);
          },
        });
      };
      reader.readAsText(file);
    } else if (
      file.type ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
      file.type === "application/vnd.ms-excel"
    ) {
      reader.onload = (event) => {
        const binaryStr = event.target.result;
        const workbook = XLSX.read(binaryStr, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
        processFileData(jsonData);
      };
      reader.readAsBinaryString(file);
    } else {
      alert("Unsupported file format. Please upload a CSV or Excel file.");
    }
  };

  const processFileData = (fileData) => {
    const filteredData = fileData
      .filter((row) => row.length >= 2)
      .map((row) => ({
        title: row[0] || "N/A",
        description: row[1] || "N/A",
      }));
    setData(filteredData);
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/bugs/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      console.log("File Upload Response: ", result);
      alert("File uploaded successfully!");
    } catch (error) {
      console.error("Error submitting file: ", error);
      alert("An error occurred while uploading the file.");
    }
  };

  return (
    <div className="p-8 font-serif">
      <Link to="/" className="text-navy-light underline">
        &#129044; {"      "} back to home
      </Link>
      <h2 className="text-2xl font-bold my-4">Multiple Bug Reports</h2>
      <label className="block text-gray-700 mb-2">
        Upload File (CSV or Excel) with first 2 columns being bug title/id and
        second being bug description.
      </label>
      <input
        type="file"
        accept=".csv, .xlsx"
        className="w-full p-2 border border-gray-300 rounded"
        onChange={handleFileUpload}
      />
      <button
        onClick={handleSubmit}
        className="mt-4 bg-navy text-white py-2 px-4 rounded"
      >
        Submit
      </button>
    </div>
  );
};

export default MultipleBugReports;
