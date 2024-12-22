import React, { useState, useEffect, useMemo } from "react";
import StudentSideBar from "./studentSideBar/StudentSideBar";
import StudentHeader from "./studentHeader/StudentHeader";
import Main11 from "../ui/Main11";
import Content from "../ui/Content";
import axios from "axios";

const StudentDash = () => {
  const [gpa, setGpa] = useState(null); // State to store GPA
  const [darkMode, setDarkMode] = useState(false);
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [selectedCardContent, setSelectedCardContent] = useState(null);
  const [activeSemester, setActiveSemester] = useState("1.1");
  const [studentData, setStudentData] = useState(null);
  const [error, setError] = useState(null);
  const [isComplete, setIsComplete] = useState(false);

  // Toggle dark mode
  const toggleDarkMode = () => setDarkMode(!darkMode);

  // Toggle sidebar
  const toggleSideBar = () => setIsSideBarOpen(!isSideBarOpen);

  // Handle card content selection
  const handleCardClick = (content) => setSelectedCardContent(content);

  // Function to get the JWT token
  const getToken = () => localStorage.getItem("token");

  // Fetch student data
  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const token = getToken();
        if (!token) {
          setError("Please log in to access the student data.");
          return;
        }

        const decodedToken = JSON.parse(atob(token.split(".")[1])); // Decode the token payload
        const indexNo = decodedToken.index_no;

        if (!indexNo) {
          setError("Invalid token. Unable to fetch student details.");
          return;
        }

        const response = await axios.get(`http://localhost:3000/api/students/details`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setStudentData(response.data);
        setActiveSemester(Object.keys(response.data.results)[0]); // Default to the first semester
      } catch (error) {
        console.error("Error fetching student data:", error);
        setError(error.response?.data?.message || "Failed to load student data. Please try again later.");
      }
    };

    fetchStudentData();
  }, []);

  // Function to get grade color
  const getGradeColor = (grade) => {
    switch (grade) {
      case "A+":
        return "bg-green-100 text-green-800";
      case "A":
        return "bg-blue-100 text-blue-800";
      case "B+":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // GPA Calculation Logic
  const results = useMemo(() => studentData?.results[activeSemester]?.subjects || [], [studentData, activeSemester]);
  useEffect(() => {
    const requiredSubjects = {
      "1.1": 10,
      "1.2": 9,
      "2.1": 10,
      "2.2": 9,
      "3.1": 10,
      "3.2": 7,
    };

    if (!results || results.length === 0) {
      setIsComplete(false);
      setGpa(null);
      return;
    }

    // Filter by active semester (adjust logic if needed)
    const semesterSubjects = results.filter((subject) => {
      // Adjust this logic based on how semester data is stored or derived
      const semester = subject.name.startsWith("CO12") ? "1.2" : "1.1"; 
      return semester === activeSemester;
    });

    console.log("Filtered Semester Subjects:", semesterSubjects);

    if (semesterSubjects.length < requiredSubjects[activeSemester]) {
      setIsComplete(false);
      setGpa(null);
      return;
    }

    // Calculate GPA
    let totalCredits = 0;
    let weightedSum = 0;

    semesterSubjects.forEach((subject) => {
      const credit = extractCredits(subject.name);
      const gradeValue = getGradeValue(subject.grade);
      weightedSum += credit * gradeValue;
      totalCredits += credit;
    });

    setIsComplete(true);
    setGpa((weightedSum / totalCredits).toFixed(2));
  }, [results, activeSemester]);

  const extractCredits = (subjectCode) => {
    const match = subjectCode.match(/^[A-Z]{2}\d{2}(\d)/); // Extracts the third digit
    return match ? parseInt(match[1], 10) : 0; // Default to 0 if no match
  };

  const getGradeValue = (grade) => {
    switch (grade) {
      case "A+":
        return 4.0;
      case "A":
        return 4.0;
      case "A-":
        return 3.7;
      case "B+":
        return 3.3;
      case "B":
        return 3.0;
      case "B-":
        return 2.7;
      case "C+":
        return 2.3;
      case "C":
        return 2.0;
      case "C-":
        return 1.7;
      case "D+":
        return 1.3;
      case "D":
        return 1.0;
      case "F":
        return 0.0;
      default:
        return 0.0;
    }
  };

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen text-red-500">
        <span className="mr-2">⚠️</span> {error}
      </div>
    );
  }

  if (!studentData) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-500">
        <div className="loader">Loading...</div>
      </div>
    );
  }
  console.log("studentData " + studentData.index_no) 
  return (
    <div className={`${darkMode ? "dark bg-gray-900 text-gray-100" : "bg-slate-200 text-gray-800"} font-quicksand h-screen flex overflow-hidden`}>
      {/* Sidebar */}
      <StudentSideBar isSideBarOpen={isSideBarOpen} index_no={studentData.index_no} activeSemester={activeSemester} gpa={gpa} />

      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Header */}
        <StudentHeader toggleDarkMode={toggleDarkMode} darkMode={darkMode} toggleSideBar={toggleSideBar} />

        <div className="flex-1 ml-[240px] overflow-auto">
          {selectedCardContent && (
            <div className="p-4 bg-white dark:bg-gray-800">
              {selectedCardContent}
            </div>
          )}

          <Main11>
            <Content>
              <div className="min-h-screen p-4 bg-gray-50 dark:bg-gray-800 md:p-8">
                {/* Student Details */}
                <div className="p-6 mb-8 bg-white dark:bg-gray-700 rounded-lg shadow-md">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                      <h1 className="text-2xl font-bold">{studentData.reg_no}</h1>
                      <p className="text-gray-500">Index No: {studentData.index_no}</p>
                    </div>
                    <div className="mt-4 md:mt-0">
                      <p>
                        Department:{" "}
                        {studentData.reg_no.includes("/COM/")
                          ? "Computer Science"
                          : studentData.reg_no.includes("/PS/")
                          ? "Physical Science"
                          : "Unknown"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Semester Buttons */}
                <div className="mb-8 overflow-x-auto">
                  <div className="flex space-x-2">
                    {Object.keys(studentData.results).map((sem) => (
                      <button
                        key={sem}
                        onClick={() => setActiveSemester(sem)}
                        className={`px-4 py-2 rounded-lg font-medium ${
                          activeSemester === sem
                            ? "bg-blue-500 text-white"
                            : "bg-white text-gray-600 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-100"
                        }`}
                      >
                        Semester {sem}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Results Section */}
                <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md">
                  <div className="p-6 border-b border-gray-100 dark:border-gray-600">
                    <h2 className="text-xl font-semibold">Semester {activeSemester} Results</h2>
                    <div className="mt-4 bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                      <div className="p-4 bg-white rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold text-gray-800">GPA for Semester {activeSemester}</h3>
                        {isComplete ? (
                          <p className="text-green-600 font-bold text-lg">GPA: {gpa}</p>
                        ) : (
                          <p className="text-gray-500">Please wait until all subjects are uploaded for this semester.</p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    {results.length === 0 ? (
                      <div className="text-center text-gray-500">No results to show</div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {results.map((subject, index) => (
                          <div key={index} className="flex justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
                            <p className="font-medium">{subject.name}</p>
                            <span className={`px-3 py-1 rounded-full text-sm ${getGradeColor(subject.grade)}`}>
                              {subject.grade}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Content>
          </Main11>
        </div>
      </div>
    </div>
  );
};

export default StudentDash;
