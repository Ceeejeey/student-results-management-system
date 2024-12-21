import React, { useState, useEffect } from 'react';
import Header from "../components/Header/Header";
import Sidebar from "../components/Sidebar/Sidebar";
import Main11 from "../ui/Main11";
import Content from "../ui/Content";
import axios from "axios";

const StudentDashBord = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [selectedCardContent, setSelectedCardContent] = useState(null);
  const [activeSemester, setActiveSemester] = useState('1.1');
  const [studentData, setStudentData] = useState(null);
  const [error, setError] = useState(null);

  const getGradeColor = (grade) => {
    switch (grade) {
      case 'A+': return 'bg-green-100 text-green-800';
      case 'A': return 'bg-blue-100 text-blue-800';
      case 'B+': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const toggleDarkMode = () => setDarkMode(!darkMode);
  const toggleSideBar = () => setIsSideBarOpen(!isSideBarOpen);
  const handleCardClick = (content) => setSelectedCardContent(content);

  // Function to get the JWT token from local storage
  const getToken = () => {
    return localStorage.getItem('token');  // Or wherever you store the token after login
  };

  // Fetch student data
  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const token = getToken();
        if (!token) {
          setError("Please log in to access the student data.");
          return;
        }

        // Decode the token to get reg_no (for students)
        const decodedToken = JSON.parse(atob(token.split('.')[1])); // Decodes the payload of JWT
        const indexNo = decodedToken.index_no;  // Extract reg_no from the decoded token

        // If reg_no is missing from the token, show error
        if (!indexNo) {
          setError("Invalid token. Unable to fetch student details.");
          return;
        }

        // Fetch data from the backend API using reg_no
        const response = await axios.get(`http://localhost:3000/api/students/details`, {
          headers: {
            Authorization: `Bearer ${token}`,  // Send token in the Authorization header
          },
        });

        setStudentData(response.data);
        setActiveSemester(Object.keys(response.data.results)[0]); // Set the first semester as active by default
      } catch (error) {
        console.error("Error fetching student data:", error);
        setError("Failed to load student data. Please try again later.");
      }
    };

    fetchStudentData();
  }, []);

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  if (!studentData) {
    return <div className="text-gray-500 text-center">Loading...</div>;
  }

  // Check if there are no results for the selected semester
  const results = studentData.results[activeSemester]?.subjects || [];

  return (
    <div className={`${darkMode && "dark"} font-quicksand bg-slate-200 h-screen flex overflow-hidden`}>
      <Sidebar isSideBarOpen={isSideBarOpen} className="z-50 max-w-[200px]" />

      <div className="flex flex-col flex-1 overflow-hidden">
        <Header toggleDarkMode={toggleDarkMode} darkMode={darkMode} toggleSideBar={toggleSideBar} />

        <div className="flex-1 ml-[240px] overflow-auto">
          {selectedCardContent && (
            <div className="p-4 bg-white">
              {selectedCardContent}
            </div>
          )}

          <Main11>
            <Content>
              <div className="min-h-screen p-4 bg-gray-50 md:p-8">
                {/* Student Details */}
                <div className="p-6 mb-8 bg-white rounded-lg shadow-md">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                      <h1 className="text-2xl font-bold text-gray-800">{studentData.reg_no}</h1><br />
                      <p className="text-gray-500">IndexNO: {studentData.index_no}</p>
                    </div>
                    <div className="mt-4 md:mt-0">
                      <p className="text-gray-500">
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
                  <div className="flex space-x-2 min-w-max">
                    {Object.keys(studentData.results).map((sem) => (
                      <button
                        key={sem}
                        onClick={() => setActiveSemester(sem)}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 
                          ${activeSemester === sem ? 'bg-blue-500 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
                      >
                        Semester {sem}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Results Section */}
                <div className="bg-white rounded-lg shadow-md">
                  <div className="p-6 border-b border-gray-100">
                    <h2 className="text-xl font-semibold text-gray-800">Semester {activeSemester} Results</h2>
                    {/* <span className="text-lg font-bold text-gray-800">GPA: {studentData.results[activeSemester].gpa}</span> */}
                  </div>

                  <div className="p-6">
                    {results.length === 0 ? (
                      <div className="text-center text-gray-500">No results to show</div>
                    ) : (
                      <div className="grid gap-4">
                        {results.map((subject, index) => (
                          <div
                            key={index}
                            className="flex flex-col justify-between p-4 rounded-lg md:flex-row md:items-center bg-gray-50"
                          >
                            <p className="font-medium text-gray-800">{subject.name}</p>
                            <span className={`mt-2 md:mt-0 px-3 py-1 rounded-full text-sm font-medium ${getGradeColor(subject.grade)}`}>
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

export default StudentDashBord;
