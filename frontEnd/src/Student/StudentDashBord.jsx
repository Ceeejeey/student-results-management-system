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
    name: "H.T Lakshan",
    IndexNO: "19/COM/330",
    branch: "Computer Science",
    results: {
      "1.1": {
        gpa: 2.5,
        subjects: [
          { name: "GEP-I General English Proficiency -I", grade: "A", credits: 1 },
          { name: "CO1126 Management Information System", grade: "A+", credits: 0 },
          { name: "CO1115 Practical work on CO1125", grade: "A", credits: 1 },
          { name: "CO1125 Statistics for Science and Technology", grade: "B+", credits: 2 },
          { name: "CO1114 Practical work on CO1124", grade: "B+", credits: 1 },
          { name: "CO1124 Computer System and PC Application", grade: "B+", credits: 2 },
          { name: "CO1123 Formal Methods for Problem Solving", grade: "B+", credits: 2 },
          { name: "CO1112 Practical work on CO1122", grade: "B+", credits: 1 },
          { name: "CO1122 Basic Computer Programming", grade: "B+", credits: 2 },
          { name: "CO1121 Basic Mathematics for Computing", grade: "B+", credits: 2 },
        ]
      },
      "1.2": {
        gpa: 2.1,
        subjects: [
          { name: "CO1226 Social Harmony", grade: "A+", credits: 2 },
          { name: "CO1225 Computer Architecture", grade: "A", credits: 2 },
          { name: "CO1224 Multimedia & Hypermedia Development", grade: "A", credits: 2 },
          { name: "CO1223 Database Management System", grade: "A", credits: 3 },
          { name: "CO1212 Practical work on CO1222", grade: "A", credits: 1 },
          { name: "CO1222 Data Structures and Algorithms", grade: "A", credits: 2 },
          { name: "CO1221 System Analysis & Design", grade: "A", credits: 2 },
          { name: "CO1214 Practical work on CO1224", grade: "A", credits: 1 },
          { name: "CO1213 Practical work on CO1223", grade: "A", credits: 1 },
        ]
      },
      "2.1": {
        gpa: 3.2,
        subjects: [
          { name: "Database Systems", grade: "A+", credits: 4 },
          { name: "Computer Networks", grade: "A", credits: 4 },
          { name: "Operating Systems", grade: "A+", credits: 3 },
          { name: "Discrete Mathematics", grade: "A", credits: 3 },
        ]
      },
      "2.2": {
        gpa: 2.6,
        subjects: [
          { name: "Web Technologies", grade: "A", credits: 4 },
          { name: "Software Engineering", grade: "A+", credits: 4 },
          { name: "Machine Learning", grade: "B+", credits: 3 },
          { name: "Cloud Computing", grade: "A", credits: 3 },
        ]
      },
      "3.1": {
        gpa: 3.3,
        subjects: [
          { name: "Artificial Intelligence", grade: "A+", credits: 4 },
          { name: "Cyber Security", grade: "A", credits: 4 },
          { name: "Mobile Development", grade: "A+", credits: 3 },
          { name: "Data Mining", grade: "A", credits: 3 },
        ]
      },
      "3.2": {
        gpa: 2.1,
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
                {/* Student Info Card */}
                <div className="p-6 mb-8 bg-white rounded-lg shadow-md">
                  <div className="flex flex-col items-start justify-between md:flex-row md:items-center">
                    <div>
                      <h1 className="text-2xl font-bold text-gray-800">{studentData.name}</h1>
                      <p className="text-gray-500">IndexNO: {studentData.IndexNO}</p>
                    </div>
                    <div className="flex items-center mt-4 md:mt-0">
                      <svg className="w-6 h-6 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl font-semibold text-gray-800">
                        Semester {activeSemester} Results
                      </h2>
                      <div className="flex items-center">
                        <svg className="w-5 h-5 mr-2 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                        </svg>
                        <span className="text-lg font-bold text-gray-800">
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
                          className="flex flex-col justify-between p-4 rounded-lg md:flex-row md:items-center bg-gray-50"
                        >
                          <div className="flex items-center space-x-3">
                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
