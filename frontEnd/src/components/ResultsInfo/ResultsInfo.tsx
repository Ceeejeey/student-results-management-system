import React, { useState } from 'react';

// Reusing CustomCard from the original code
const CustomCard = ({ children, className = "" }) => {
  return (
    <div className={`bg-white rounded-lg shadow-md ${className}`}>
      {children}
    </div>
  );
};

const ResultsInfo = () => {
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
            { subject: "Physics", grade: "B+", credits: 3 }
          ],
          "1.2": [
            { subject: "Mathematics II", grade: "A", credits: 4 },
            { subject: "Data Structures", grade: "A", credits: 4 },
            { subject: "Digital Logic", grade: "B+", credits: 3 }
          ],
          "2.1": [
            { subject: "Database Systems", grade: "A-", credits: 4 },
            { subject: "Computer Networks", grade: "B+", credits: 4 },
            { subject: "Operating Systems", grade: "A", credits: 3 }
          ],
          "2.2": [
            { subject: "Software Engineering", grade: "A", credits: 4 },
            { subject: "Web Development", grade: "A+", credits: 4 },
            { subject: "Algorithms", grade: "B", credits: 3 }
          ],
          "3.1": [
            { subject: "Artificial Intelligence", grade: "A-", credits: 4 },
            { subject: "Machine Learning", grade: "B+", credits: 4 },
            { subject: "Cloud Computing", grade: "A", credits: 3 }
          ],
          "3.2": [
            { subject: "Final Project", grade: "A", credits: 6 },
            { subject: "IT Ethics", grade: "A-", credits: 2 },
            { subject: "Technical Writing", grade: "B+", credits: 2 }
          ]
        }
      },
      "PS19001": {
        name: "Jane Smith",
        year: "19/20",
        results: {
          "1.1": [
            { subject: "Physics I", grade: "A+", credits: 4 },
            { subject: "Chemistry", grade: "A", credits: 4 },
            { subject: "Mathematics", grade: "A", credits: 3 }
          ],
          "1.2": [
            { subject: "Physics II", grade: "A", credits: 4 },
            { subject: "Statistical Methods", grade: "A-", credits: 4 },
            { subject: "Lab Methods", grade: "A", credits: 3 }
          ],
          // Similar structure for other semesters
        }
      },
    }
  );

  const [newResult, setNewResult] = useState({
    regNo: '',
    name: '',
    subject: '',
    grade: '',
    credits: '',
    semester: selectedSemester
  });

  const semesters = ["1.1", "1.2", "2.1", "2.2", "3.1", "3.2"];
  const years = ["19/20", "20/21"];

  // Function to handle adding new results
  const addResult = () => {
    const { regNo, name, subject, grade, credits, semester } = newResult;

    // Check if the student already exists
    if (!resultsData[regNo]) {
      // Create a new student entry if it doesn't exist
      setResultsData(prevData => ({
        ...prevData,
        [regNo]: {
          name: name,
          year: selectedYear,
          results: {
            [semester]: [{ subject, grade, credits: parseInt(credits) }]
          }
        }
      }));
    } else {
      // Update the existing student's results
      setResultsData(prevData => ({
        ...prevData,
        [regNo]: {
          ...prevData[regNo],
          results: {
            ...prevData[regNo].results,
            [semester]: [
              ...(prevData[regNo].results[semester] || []),
              { subject, grade, credits: parseInt(credits) }
            ]
          }
        }
      }));
    }

    // Reset the form
    setNewResult({
      regNo: '',
      name: '',
      subject: '',
      grade: '',
      credits: '',
      semester: selectedSemester
    });
  };

  const handleChange = (e) => {
    setNewResult({
      ...newResult,
      [e.target.name]: e.target.value
    });
  };

  // Calculate GPA function
  const calculateGPA = (results) => {
    const gradePoints = {
      "A+": 4.0, "A": 4.0, "A-": 3.7,
      "B+": 3.3, "B": 3.0, "B-": 2.7,
      "C+": 2.3, "C": 2.0, "C-": 1.7,
      "D": 1.0, "F": 0.0
    };

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
        
        {/* Year Selection */}
        <div className="flex gap-4">
          {years.map(year => (
            <button
              key={year}
              onClick={() => setSelectedYear(year)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedYear === year 
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
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedSemester === semester 
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
                                <span className={`inline-block px-2 py-1 rounded ${
                                  result.grade.startsWith('A') ? 'bg-green-100 text-green-800' :
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

        {/* Add More Results Form */}
        <div className="mt-6">
          <h4 className="font-semibold text-lg">Add More Results</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <input
              type="text"
              name="regNo"
              value={newResult.regNo}
              onChange={handleChange}
              placeholder="Registration Number"
              className="border px-4 py-2 rounded-lg"
            />
            <input
              type="text"
              name="name"
              value={newResult.name}
              onChange={handleChange}
              placeholder="Student Name"
              className="border px-4 py-2 rounded-lg"
            />
            <input
              type="text"
              name="subject"
              value={newResult.subject}
              onChange={handleChange}
              placeholder="Subject"
              className="border px-4 py-2 rounded-lg"
            />
            <input
              type="text"
              name="grade"
              value={newResult.grade}
              onChange={handleChange}
              placeholder="Grade (e.g., A+)"
              className="border px-4 py-2 rounded-lg"
            />
            <input
              type="number"
              name="credits"
              value={newResult.credits}
              onChange={handleChange}
              placeholder="Credits"
              className="border px-4 py-2 rounded-lg"
            />
            <button
              onClick={addResult}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Add Result
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsInfo;
