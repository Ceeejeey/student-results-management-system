import React from 'react'
import Header from "../components/Header/Header";
import Sidebar from "../components/Sidebar/Sidebar";
import Main11 from "../ui/Main11";
import Content from "../ui/Content";
import { useState } from "react";

const StudentDashBord = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [selectedCardContent, setSelectedCardContent] = useState(null);
  const [activeSemester, setActiveSemester] = useState('1.1');

  // Sample student data
  const studentData = {
    name: "John Doe",
    rollNo: "20CS001",
    branch: "Computer Science",
    results: {
      "1.1": {
        gpa: 8.5,
        subjects: [
          { name: "Mathematics-1", grade: "A", credits: 4 },
          { name: "Physics", grade: "A+", credits: 4 },
          { name: "Programming Fundamentals", grade: "A", credits: 3 },
          { name: "English", grade: "B+", credits: 2 },
        ]
      },
      "1.2": {
        gpa: 8.7,
        subjects: [
          { name: "Mathematics-2", grade: "A+", credits: 4 },
          { name: "Chemistry", grade: "A", credits: 4 },
          { name: "Data Structures", grade: "A", credits: 3 },
          { name: "Professional Ethics", grade: "A", credits: 2 },
        ]
      },
      "2.1": {
        gpa: 8.9,
        subjects: [
          { name: "Database Systems", grade: "A+", credits: 4 },
          { name: "Computer Networks", grade: "A", credits: 4 },
          { name: "Operating Systems", grade: "A+", credits: 3 },
          { name: "Discrete Mathematics", grade: "A", credits: 3 },
        ]
      },
      "2.2": {
        gpa: 8.6,
        subjects: [
          { name: "Web Technologies", grade: "A", credits: 4 },
          { name: "Software Engineering", grade: "A+", credits: 4 },
          { name: "Machine Learning", grade: "B+", credits: 3 },
          { name: "Cloud Computing", grade: "A", credits: 3 },
        ]
      },
      "3.1": {
        gpa: 9.0,
        subjects: [
          { name: "Artificial Intelligence", grade: "A+", credits: 4 },
          { name: "Cyber Security", grade: "A", credits: 4 },
          { name: "Mobile Development", grade: "A+", credits: 3 },
          { name: "Data Mining", grade: "A", credits: 3 },
        ]
      },
      "3.2": {
        gpa: 8.8,
        subjects: [
          { name: "Deep Learning", grade: "A", credits: 4 },
          { name: "Blockchain", grade: "A+", credits: 4 },
          { name: "IoT Systems", grade: "A", credits: 3 },
          { name: "Project Management", grade: "A+", credits: 3 },
        ]
      }
    }
  };

  const getGradeColor = (grade) => {
    switch (grade) {
      case 'A+': return 'bg-green-100 text-green-800';
      case 'A': return 'bg-blue-100 text-blue-800';
      case 'B+': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const toggleSideBar = () => {
    setIsSideBarOpen(!isSideBarOpen);
  };

  const handleCardClick = (content) => {
    setSelectedCardContent(content);
  };

  return (
    <div className={`${darkMode && "dark"} font-quicksand bg-slate-200 h-screen flex overflow-hidden`}>
      <Sidebar isSideBarOpen={isSideBarOpen} className="z-50 max-w-[200px]" />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header toggleDarkMode={toggleDarkMode} darkMode={darkMode} toggleSideBar={toggleSideBar} />

        <div className="flex-1 ml-[240px] overflow-auto">
          {selectedCardContent && (
            <div className="p-4 bg-white">
              {selectedCardContent}
            </div>
          )}

          <Main11>
            <Content>
              <div className="min-h-screen bg-gray-50 p-4 md:p-8">
                {/* Student Info Card */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                    <div>
                      <h1 className="text-2xl font-bold text-gray-800">{studentData.name}</h1>
                      <p className="text-gray-500">Roll No: {studentData.rollNo}</p>
                    </div>
                    <div className="mt-4 md:mt-0 flex items-center">
                      <svg className="h-6 w-6 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 6.94c-.96.43-1.96.78-3 1.06A3.99 3.99 0 0014 6c-2.21 0-4 1.79-4 4v1c-3.87 0-7-3.13-7-7m14 8v2.5c0 .83-.67 1.5-1.5 1.5H9.5c-.83 0-1.5-.67-1.5-1.5V12" />
                      </svg>
                      <span className="font-medium text-gray-700">{studentData.branch}</span>
                    </div>
                  </div>
                </div>

                {/* Semester Tabs */}
                <div className="mb-8 overflow-x-auto">
                  <div className="flex space-x-2 min-w-max">
                    {Object.keys(studentData.results).map((sem) => (
                      <button
                        key={sem}
                        onClick={() => setActiveSemester(sem)}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 
                ${activeSemester === sem
                            ? 'bg-blue-500 text-white'
                            : 'bg-white text-gray-600 hover:bg-gray-50'}`}
                      >
                        Semester {sem}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Results Card */}
                <div className="bg-white rounded-lg shadow-md">
                  <div className="p-6 border-b border-gray-100">
                    <div className="flex justify-between items-center">
                      <h2 className="text-xl font-semibold text-gray-800">
                        Semester {activeSemester} Results
                      </h2>
                      <div className="flex items-center">
                        <svg className="h-5 w-5 text-yellow-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                        </svg>
                        <span className="font-bold text-lg text-gray-800">
                          GPA: {studentData.results[activeSemester].gpa}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="grid gap-4">
                      {studentData.results[activeSemester].subjects.map((subject, index) => (
                        <div
                          key={index}
                          className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-gray-50 rounded-lg"
                        >
                          <div className="flex items-center space-x-3">
                            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                            <div>
                              <p className="font-medium text-gray-800">{subject.name}</p>
                              <p className="text-sm text-gray-500">Credits: {subject.credits}</p>
                            </div>
                          </div>
                          <span className={`mt-2 md:mt-0 px-3 py-1 rounded-full text-sm font-medium ${getGradeColor(subject.grade)}`}>
                            {subject.grade}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Content>
          </Main11>
        </div>
      </div>
    </div>
  );
}

export default StudentDashBord
