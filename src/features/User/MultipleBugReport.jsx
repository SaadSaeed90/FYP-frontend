import React, { useState } from "react";
import { Link } from "react-router-dom";
import Papa from "papaparse";
import * as XLSX from "xlsx";
import axios from "axios";

const MultipleBugReports = () => {
  const [data, setData] = useState([]);
  const [progress, setProgress] = useState(0);
  const [isPredicting, setIsPredicting] = useState(false);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    if (file.type === "text/csv") {
      reader.onload = (event) => {
        const text = event.target.result;
        Papa.parse(text, {
          header: true,
          skipEmptyLines: true,
          complete: (result) => {
            processFileData(result.meta.fields, result.data);
          },
          error: (error) => {
            console.error("Error parsing CSV file: ", error);
            alert("Failed to parse CSV file.");
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
        try {
          const binaryStr = event.target.result;
          const workbook = XLSX.read(binaryStr, { type: "binary" });
          const sheetName = workbook.SheetNames[0];
          const sheet = workbook.Sheets[sheetName];
          const jsonData = XLSX.utils.sheet_to_json(sheet, { defval: "" });
          const fields = Object.keys(jsonData[0] || {});
          processFileData(fields, jsonData);
        } catch (err) {
          console.error("Error parsing Excel file:", err);
          alert("Failed to parse Excel file.");
        }
      };
      reader.readAsBinaryString(file);
    } else {
      alert("Unsupported file format. Please upload a CSV or Excel file.");
    }
  };

  const processFileData = (fields, fileData) => {
    if (fileData.length === 0) {
      alert("No data found in file.");
      return;
    }

    const descriptionField = fields.find((field) =>
      field.toLowerCase().includes("description")
    );

    if (!descriptionField) {
      alert("No 'Description' or similar column found.");
      return;
    }

    const titleField = fields[0];

    const filteredData = fileData.map((row) => ({
      title: row[titleField] || "N/A",
      description: row[descriptionField] || "N/A",
    }));

    setData(filteredData);
    setProgress(0);
  };

  const handlePrediction = async () => {
    if (data.length === 0) {
      alert("No data to predict.");
      return;
    }

    setIsPredicting(true);
    setProgress(0);

    const updatedData = [];

    for (let i = 0; i < data.length; i++) {
      try {
        const response = await axios.post("http://localhost:5000/predict", {
          text: data[i].description,
        });
        updatedData.push({ ...data[i], severity: response.data.prediction });
      } catch (error) {
        console.error("Prediction error for:", data[i].title, error);
        updatedData.push({ ...data[i], severity: "Prediction Failed" });
      }

      // Update progress
      setProgress(Math.round(((i + 1) / data.length) * 100));
    }

    setData(updatedData);
    setIsPredicting(false);
    alert("Prediction process completed. Check results below.");
  };

  const handleExport = () => {
    if (data.length === 0) {
      alert("No data to export.");
      return;
    }

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Predictions");

    XLSX.writeFile(workbook, "predicted_bug_reports.xlsx");
  };

  return (
    <div className="p-8 font-serif">
      <Link to="/" className="text-navy-light underline">
        &#129044; Back to home
      </Link>
      <h2 className="text-2xl font-bold my-4">Multiple Bug Reports</h2>
      <label className="block text-gray-700 mb-2">
        Upload File (CSV or Excel) — must have a bug title/id column and a description column
      </label>
      <input
        type="file"
        accept=".csv, .xlsx"
        className="w-full p-2 border border-gray-300 rounded"
        onChange={handleFileUpload}
      />

      {data.length > 0 && (
        <div className="mt-6">
          <button
            onClick={handlePrediction}
            disabled={isPredicting}
            className={`${
              isPredicting ? "bg-gray-400" : "bg-navy"
            } text-white py-2 px-4 rounded mr-4`}
          >
            {isPredicting ? "Predicting..." : "Predict Severities"}
          </button>
          <button
            onClick={handleExport}
            className="bg-green-600 text-white py-2 px-4 rounded"
            disabled={isPredicting}
          >
            Export to Excel
          </button>

          {/* Progress bar */}
          {isPredicting && (
            <div className="w-full bg-gray-300 rounded mt-4 h-4">
              <div
                className="bg-navy h-4 rounded text-xs text-white text-center"
                style={{ width: `${progress}%` }}
              >
                {progress}%
              </div>
            </div>
          )}

          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-2">Preview:</h3>
            <table className="table-auto w-full border border-gray-300">
              <thead>
                <tr>
                  <th className="border px-4 py-2">No.</th>
                  <th className="border px-4 py-2">Description</th>
                  <th className="border px-4 py-2">Predicted Severity</th>
                </tr>
              </thead>
              <tbody>
                {data.map((row, idx) => (
                  <tr key={idx}>
                    <td className="border px-4 py-2 text-center">{idx + 1}</td>
                    <td className="border px-4 py-2">{row.description}</td>
                    <td className="border px-4 py-2">{row.severity || "N/A"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      )}
    </div>
  );
};

export default MultipleBugReports;
