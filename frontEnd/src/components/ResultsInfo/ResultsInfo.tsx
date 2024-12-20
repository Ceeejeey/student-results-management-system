import React, { useState, useCallback ,useRef} from 'react';
import { Upload, X, FileText, Download } from 'lucide-react';
import axios from 'axios';

import * as XLSX from 'xlsx';
import { useEffect } from 'react';



const Modal = ({ isOpen, onClose, title, children, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-4xl max-h-[80vh] overflow-auto w-full m-4">
        <div className="p-4 border-b">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">{title}</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="p-4">
          {children}
        </div>
        <div className="p-4 border-t flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-700"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white"
          >
            Import Data
          </button>
        </div>
      </div>
    </div>
  );
};

const CustomCard = ({ children, className = "" }) => {
  return (
    <div className={`bg-white rounded-lg shadow-md ${className}`}>
      {children}
    </div>
  );
};

const ResultsInfo = () => {
  const fileInputRef = useRef(null);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [previewData, setPreviewData] = useState(null);
  const [selectedYear, setSelectedYear] = useState("19/20");
  const [selectedSemester, setSelectedSemester] = useState("1.1");
  const [resultsData, setResultsData] = useState([]);

  const semesters = ["1.1", "1.2", "2.1", "2.2", "3.1", "3.2"];
  const years = ["19/20", "20/21"];


  useEffect(() => {
    fetchResults();
  }, [selectedYear, selectedSemester]);


  const handleDeleteResults = async (year, semester) => {
    if (window.confirm(`Are you sure you want to delete all results for Year ${year} Semester ${semester}?`)) {
      try {
        const response = await axios.delete('http://localhost:3000/api/results', {
          params: { year, semester },
        });

        if (response.status === 200) {
          alert('Results deleted successfully.');

          // Reset upload-related states and clear file input
          setUploadError("");
          setPreviewData(null);
          setShowPreviewModal(false);
          fetchResults(); // Refresh the table to reflect changes
          if (fileInputRef.current) fileInputRef.current.value = null; // Clear file input
        }
      } catch (error) {
        console.error('Error deleting results:', error);
        alert('Failed to delete results. Please try again.');
      }
    }
  };
  // Function to validate Excel data
  const validateExcelData = (data) => {
    const errors = [];
    data.forEach((row, index) => {
      if (!row.regNo || !/^[A-Z]{2}\d{5}$/.test(row.regNo)) {
        errors.push(`Row ${index + 1}: Invalid registration number`);
      }
      if (!row.indexNo || isNaN(row.indexNo)) {
        errors.push(`Row ${index + 1}: Missing or invalid index number`);
      }
      if (!row.subject) {
        errors.push(`Row ${index + 1}: Missing subject`);
      }
      if (!row.grade) {
        errors.push(`Row ${index + 1}: Missing grade`);
      }
      if (!row.year || !/^\d{2}\/\d{2}$/.test(row.year)) {
        errors.push(`Row ${index + 1}: Invalid year format`);
      }
      if (!row.semester) {
        errors.push(`Row ${index + 1}: Missing semester`);
      }
    });
    return errors;
  };

  // Function to process Excel data
  const processExcelData = async (data) => {
    try {
      await axios.post('http://localhost:3000/api/results', { data });
      setShowPreviewModal(false);
      alert('Results uploaded successfully.');
      fetchResults(); // Refresh the results table
    } catch (error) {
      console.error('Error saving data:', error);
      alert('Failed to upload results. Please try again.');
    }
  };


  // Function to download template
  const downloadTemplate = () => {
    const template = [
      {
        regNo: 'CS23001',
        indexNo: 1,
        subject: 'Mathematics',
        grade: 'A',
        year: '23/24',
        semester: '1.1',
      }
    ];

    const ws = XLSX.utils.json_to_sheet(template);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Template');
    XLSX.writeFile(wb, 'results_template.xlsx');
  };

  // Function to handle file upload
  const handleFileUpload = useCallback((event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);

        const validationErrors = validateExcelData(jsonData);

        if (validationErrors.length > 0) {
          setUploadError(validationErrors.join('\n'));
        } else {
          setPreviewData(jsonData);
          setShowPreviewModal(true);
          setUploadError("");
        }
      } catch (error) {
        setUploadError("Error processing file. Please check the format.");
        console.error(error);
      }
    };

    if (file) {
      reader.readAsArrayBuffer(file);
    }
  }, []);
  const fetchResults = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/results', {
        params: { year: selectedYear, semester: selectedSemester },
      });

      // Ensure response.data is an array
      if (Array.isArray(response.data)) {
        setResultsData(response.data);
      } else {
        console.error('Received invalid response format');
        setResultsData([]);  // Fallback to empty array
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      alert('Failed to load results. Please try again.');
    }
  };
  


  return (
    <div className="p-6">
      <div className="flex flex-col gap-6">
        <h3 className="text-2xl font-semibold mb-4">Teacher's Subject Results</h3>

        {/* Excel Upload Section */}
        <CustomCard className="p-4">
          <div className="flex flex-col items-center gap-4">
            <div className="flex justify-between w-full">
              <h4 className="font-semibold text-lg">Upload Results from Excel</h4>
              <button
                onClick={downloadTemplate}
                className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
              >
                <Download className="w-4 h-4" />
                Download Template
              </button>
            </div>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 w-full text-center relative">
              <div className="flex flex-col items-center gap-2">
                <Upload className="w-12 h-12 text-gray-400" />
                <p className="text-gray-600">Drop your Excel file here or click to browse</p>
                <input
                  ref={fileInputRef} // Attach useRef here
                  type="file"
                  accept=".xlsx, .xls"
                  onChange={handleFileUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              </div>
            </div>
            {uploadError && (
              <div className="text-red-500 whitespace-pre-line">{uploadError}</div>
            )}
          </div>
        </CustomCard>

        {/* Year Selection */}
        <div className="flex gap-4">
          {years.map(year => (
            <button
              key={year}
              onClick={() => setSelectedYear(year)}
              className={`px-4 py-2 rounded-lg transition-colors ${selectedYear === year
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
            >
              {year}
            </button>
          ))}
        </div>

        {/* Semester Selection */}
        <div className="grid grid-cols-3 gap-4">
          {semesters.map(semester => (
            <button
              key={semester}
              onClick={() => setSelectedSemester(semester)}
              className={`px-4 py-2 rounded-lg transition-colors ${selectedSemester === semester
                ? "bg-green-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
            >
              Semester {semester}
            </button>
          ))}
        </div>

        {/* Results Display with Delete Button */}
        <div className="grid gap-4">
          <div className="flex justify-between items-center">
            <h4 className="text-lg font-semibold">Results for {selectedYear} - Semester {selectedSemester}</h4>
            <button
              onClick={() => handleDeleteResults(selectedYear, selectedSemester)}
              className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
            >
              Delete All Results for This Semester
            </button>
          </div>

          <CustomCard>
            <div className="p-4 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr>
                    <th className="text-left p-2">Reg No</th>
                    <th className="text-left p-2">Index No</th>
                    <th className="text-left p-2">Subject</th>
                    <th className="text-left p-2">Grade</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(resultsData) && resultsData
                    .filter(row => row.year === selectedYear && row.semester === selectedSemester)
                    .map((row, index) => (
                      <tr key={index}>
                        <td className="p-2">{row.regNo}</td>
                        <td className="p-2">{row.indexNo}</td>
                        <td className="p-2">{row.subject}</td>
                        <td className="p-2">{row.grade}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
              {resultsData.filter(row => row.year === selectedYear && row.semester === selectedSemester).length === 0 && (
                <p className="text-gray-500 mt-4">No results found for the selected year and semester.</p>
              )}
            </div>
          </CustomCard>
        </div>


      </div>

      {/* Preview Modal */}
      <Modal
        isOpen={showPreviewModal}
        onClose={() => setShowPreviewModal(false)}
        title="Preview Imported Data"
        onConfirm={() => processExcelData(previewData)}
      >
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr>
                <th className="text-left p-2">Reg No</th>
                <th className="text-left p-2">Index No</th>
                <th className="text-left p-2">Subject</th>
                <th className="text-left p-2">Grade</th>
                <th className="text-left p-2">Year</th>
                <th className="text-left p-2">Semester</th>
              </tr>
            </thead>
            <tbody>
              {previewData?.map((row, index) => (
                <tr key={index}>
                  <td className="p-2">{row.regNo}</td>
                  <td className="p-2">{row.indexNo}</td>
                  <td className="p-2">{row.subject}</td>
                  <td className="p-2">{row.grade}</td>
                  <td className="p-2">{row.year}</td>
                  <td className="p-2">{row.semester}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Modal>
    </div>
  );
};

export default ResultsInfo;
