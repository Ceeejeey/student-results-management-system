import React, { useState } from 'react';
import Header from "../components/Header/Header";
import Sidebar from "../components/Sidebar/Sidebar";
import Main11 from "../ui/Main11";
import Content from "../ui/Content";
import studentData from "../data/studentData.json"; // Import JSON data

const StudentDashBord = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [selectedCardContent, setSelectedCardContent] = useState(null);
  const [activeSemester, setActiveSemester] = useState('1.1');


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
                <div className="p-6 mb-8 bg-white rounded-lg shadow-md">

                  <h1 className="text-2xl font-bold text-gray-800">{studentData.name}</h1>
                  <p className="text-gray-500">Roll No: {studentData.rollNo}</p>
                  <p className="font-medium text-gray-700">{studentData.branch}</p>
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

                <div className="bg-white rounded-lg shadow-md">
                  <div className="p-6 border-b border-gray-100">
                    <h2 className="text-xl font-semibold text-gray-800">Semester {activeSemester} Results</h2>
                    <span className="text-lg font-bold text-gray-800">GPA: {studentData.results[activeSemester].gpa}</span>
                  </div>

                  <div className="p-6">
                    <div className="grid gap-4">
                      {studentData.results[activeSemester].subjects.map((subject, index) => (
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
