import React, { useState, useCallback } from 'react';
import { Upload, X, FileText, Download } from 'lucide-react';
import * as XLSX from 'xlsx';

// Modal Component
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
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [previewData, setPreviewData] = useState(null);
  const [selectedYear, setSelectedYear] = useState("19/20");
  const [selectedSemester, setSelectedSemester] = useState("1.1");
  const [resultsData, setResultsData] = useState({
    "CS19001": {
      name: "John Doe",
      year: "19/20",
      results: {
        "1.1": [
          { subject: "Mathematics I", grade: "A", credits: 4 },
          { subject: "Programming Fundamentals", grade: "A+", credits: 4 },
          { subject: "Physics", grade: "B+", credits: 3 },
          { subject: "English", grade: "A-", credits: 2 },
          { subject: "Chemistry", grade: "B", credits: 3 }
        ],
      }
    }
  });

  const semesters = ["1.1", "1.2", "2.1", "2.2", "3.1", "3.2"];
  const years = ["19/20", "20/21"];

  // Grade points mapping
  const gradePoints = {
    "A+": 4.0, "A": 4.0, "A-": 3.7,
    "B+": 3.3, "B": 3.0, "B-": 2.7,
    "C+": 2.3, "C": 2.0, "C-": 1.7,
    "D": 1.0, "F": 0.0
  };

  // Function to validate Excel data
  const validateExcelData = (data) => {
    const errors = [];
    const validSemesters = new Set(["1.1", "1.2", "2.1", "2.2", "3.1", "3.2"]);
    const validGrades = new Set(["A+", "A", "A-", "B+", "B", "B-", "C+", "C", "C-", "D", "F"]);

    data.forEach((row, index) => {
      if (!row.regNo || !/^[A-Z]{2}\d{5}$/.test(row.regNo)) {
        errors.push(`Row ${index + 1}: Invalid registration number`);
      }
      if (!row.name) {
        errors.push(`Row ${index + 1}: Missing student name`);
      }
      if (!validSemesters.has(row.semester)) {
        errors.push(`Row ${index + 1}: Invalid semester`);
      }
      if (!row.subject) {
        errors.push(`Row ${index + 1}: Missing subject`);
      }
      if (!validGrades.has(row.grade)) {
        errors.push(`Row ${index + 1}: Invalid grade`);
      }
      if (!row.credits || isNaN(row.credits) || row.credits <= 0) {
        errors.push(`Row ${index + 1}: Invalid credits`);
      }
      if (!row.year || !/^\d{2}\/\d{2}$/.test(row.year)) {
        errors.push(`Row ${index + 1}: Invalid year format`);
      }
    });

    return errors;
  };

  // Updated process data function
  const processExcelData = (data) => {
    const newResultsData = {};

    data.forEach(row => {
      const { year, regNo, name, semester, subject, grade, credits } = row;

      if (!newResultsData[regNo]) {
        newResultsData[regNo] = {
          name,
          year,
          results: {}
        };
      }

      if (!newResultsData[regNo].results[semester]) {
        newResultsData[regNo].results[semester] = [];
      }

      newResultsData[regNo].results[semester].push({
        subject,
        grade,
        credits: parseInt(credits)
      });
    });

    setResultsData(newResultsData);
    setShowPreviewModal(false);
  };

  // Function to download template
  const downloadTemplate = () => {
    const template = [
      {
        regNo: 'CS23001',
        name: 'John Doe',
        semester: '1.1',
        subject: 'Mathematics',
        grade: 'A',
        credits: 4,
        year: '23/24'
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

  // Calculate GPA function
  const calculateGPA = (results) => {
    let totalPoints = 0;
    let totalCredits = 0;

    results.forEach(result => {
      totalPoints += gradePoints[result.grade] * result.credits;
      totalCredits += result.credits;
    });

    return (totalPoints / totalCredits).toFixed(2);
  };

  return (
    <div className="p-6">
      <div className="flex flex-col gap-6">
        <h3 className="text-2xl font-semibold mb-4">Student Results</h3>

        {/* Excel Upload Section */}
        <CustomCard className="p-4">
          <div className="flex flex-col items-center gap-4">
            <div className="flex justify-between w-full">
              <h4 className="font-semibold text-lg">Upload Results from Excel</h4>
              <div className="flex gap-2">
                <button
                  onClick={downloadTemplate}
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
                >
                  <Download className="w-4 h-4" />
                  Download Template
                </button>
              </div>
            </div>

            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 w-full text-center relative">
              <div className="flex flex-col items-center gap-2">
                <Upload className="w-12 h-12 text-gray-400" />
                <p className="text-gray-600">Drop your Excel file here or click to browse</p>
                <input
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

            <div className="bg-gray-50 p-4 rounded-lg w-full">
              <h5 className="font-medium mb-2">Expected Excel Format:</h5>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">Column</th>
                    <th className="text-left py-2">Example</th>
                    <th className="text-left py-2">Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td>regNo</td>
                    <td>CS19001</td>
                    <td>2 letters followed by 5 digits</td>
                  </tr>
                  <tr className="border-b">
                    <td>name</td>
                    <td>John Doe</td>
                    <td>Student's full name</td>
                  </tr>
                  <tr className="border-b">
                    <td>semester</td>
                    <td>1.1</td>
                    <td>Valid values: 1.1, 1.2, 2.1, 2.2, 3.1, 3.2</td>
                  </tr>
                  <tr className="border-b">
                    <td>subject</td>
                    <td>Mathematics I</td>
                    <td>Subject name</td>
                  </tr>
                  <tr className="border-b">
                    <td>grade</td>
                    <td>A</td>
                    <td>Valid grades: A+, A, A-, B+, B, B-, C+, C, C-, D, F</td>
                  </tr>
                  <tr className="border-b">
                    <td>credits</td>
                    <td>4</td>
                    <td>Positive number</td>
                  </tr>
                  <tr>
                    <td>year</td>
                    <td>19/20</td>
                    <td>Academic year</td>
                  </tr>
                </tbody>
              </table>
            </div>
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

        {/* Results Display */}
        <div className="grid gap-4">
          {Object.entries(resultsData)
            .filter(([_, student]) => student.year === selectedYear)
            .map(([regNo, student]) => (
              <CustomCard key={regNo}>
                <div className="p-4">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <h4 className="font-semibold text-lg">{student.name}</h4>
                      <p className="text-gray-600">Reg No: {regNo}</p>
                    </div>
                    {student.results[selectedSemester] && (
                      <div className="text-right">
                        <p className="text-green-600 font-bold">
                          GPA: {calculateGPA(student.results[selectedSemester])}
                        </p>
                      </div>
                    )}
                  </div>

                  {student.results[selectedSemester] ? (
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-2">Subject</th>
                            <th className="text-center py-2">Credits</th>
                            <th className="text-right py-2">Grade</th>
                          </tr>
                        </thead>
                        <tbody>
                          {student.results[selectedSemester].map((result, index) => (
                            <tr key={index} className="border-b">
                              <td className="py-2">{result.subject}</td>
                              <td className="text-center py-2">{result.credits}</td>
                              <td className="text-right py-2">
                                <span className={`inline-block px-2 py-1 rounded ${result.grade.startsWith('A') ? 'bg-green-100 text-green-800' :
                                  result.grade.startsWith('B') ? 'bg-blue-100 text-blue-800' :
                                    result.grade.startsWith('C') ? 'bg-yellow-100 text-yellow-800' :
                                      'bg-red-100 text-red-800'
                                  }`}>
                                  {result.grade}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <p className="text-center text-gray-500">No results available for this semester</p>
                  )}
                </div>
              </CustomCard>
            ))}
        </div>

        {/* Preview Modal */}
        <Modal
          isOpen={showPreviewModal}
          onClose={() => setShowPreviewModal(false)}
          title="Preview Import Data"
          onConfirm={() => {
            if (previewData) {
              processExcelData(previewData);
            }
          }}
        >
          <div className="mb-4">Please review the data before importing</div>
          {previewData && (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr>
                    {Object.keys(previewData[0]).map(key => (
                      <th key={key} className="text-left p-2 border-b">{key}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {previewData.map((row, index) => (
                    <tr key={index}>
                      {Object.values(row).map((value, i) => (
                        <td key={i} className="p-2 border-b">{value}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
};

export default ResultsInfo;