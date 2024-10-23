import React, { useState } from 'react';
import ResultsInfo from '../ResultsInfo/ResultsInfo';

// Custom Card component
const CustomCard = ({ children, className = "" }) => {
  return (
    <div className={`bg-white rounded-lg shadow-md ${className}`}>
      {children}
    </div>
  );
};

// Student Info Component
const StudentInfo = () => {
  // Sample student data
  const studentData = [
    { id: 1, name: "John Doe", faculty: "Computer Science", year: "19/20", regNo: "CS19001" },
    { id: 2, name: "Jane Smith", faculty: "Physical Science", year: "19/20", regNo: "PS19001" },
    { id: 3, name: "Alex Johnson", faculty: "Management", year: "19/20", regNo: "MG19001" },
    { id: 4, name: "Sarah Wilson", faculty: "Siddha Medicine", year: "19/20", regNo: "SM19001" },
    { id: 5, name: "Mike Brown", faculty: "Computer Science", year: "20/21", regNo: "CS20001" },
    { id: 6, name: "Emma Davis", faculty: "Physical Science", year: "20/21", regNo: "PS20001" },
    { id: 7, name: "Tom Wilson", faculty: "Management", year: "20/21", regNo: "MG20001" },
    { id: 8, name: "Lisa Anderson", faculty: "Siddha Medicine", year: "20/21", regNo: "SM20001" },
  ];

  const [selectedYear, setSelectedYear] = useState("19/20");
  const [selectedFaculty, setSelectedFaculty] = useState("all");
  const faculties = ["all", "Computer Science", "Physical Science", "Management", "Siddha Medicine"];

  const filteredStudents = studentData.filter(student => {
    const yearMatch = student.year === selectedYear;
    const facultyMatch = selectedFaculty === "all" || student.faculty === selectedFaculty;
    return yearMatch && facultyMatch;
  });

  return (
    <div className=" p-6">
      <div className="flex flex-col gap-6">
        <h3 className="text-2xl font-semibold mb-4">Student Information</h3>
        
        {/* Year Selection Buttons */}
        <div className="flex gap-4">
          <button
            onClick={() => setSelectedYear("19/20")}
            className={`px-4 py-2 rounded-lg transition-colors ${
              selectedYear === "19/20" 
                ? "bg-blue-600 text-white" 
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            2019/2020
          </button>
          <button
            onClick={() => setSelectedYear("20/21")}
            className={`px-4 py-2 rounded-lg transition-colors ${
              selectedYear === "20/21" 
                ? "bg-blue-600 text-white" 
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            2020/2021
          </button>
        </div>

        {/* Faculty Filter */}
        <select
          value={selectedFaculty}
          onChange={(e) => setSelectedFaculty(e.target.value)}
          className="p-2 border rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {faculties.map(faculty => (
            <option key={faculty} value={faculty}>
              {faculty === "all" ? "All Faculties" : faculty}
            </option>
          ))}
        </select>

        {/* Students List */}
        <div className="grid gap-4 ">
          {filteredStudents.map(student => (
            <CustomCard key={student.id}>
              <div className="p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold text-lg">{student.name}</h3>
                    <p className="text-gray-600">Registration: {student.regNo}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-blue-600 font-medium">{student.faculty}</p>
                    <p className="text-gray-500">Year: {student.year}</p>
                  </div>
                </div>
              </div>
            </CustomCard>
          ))}
        </div>

        {filteredStudents.length === 0 && (
          <p className="text-center text-gray-500">No students found for the selected criteria.</p>
        )}
      </div>
    </div>
  );
};

// Main Cards Component
const Cards = ({ onCardClick }) => {
  const [selectedCard, setSelectedCard] = useState(null);
  
  const cards = [
    { id: 1, title: "Students", bgColor: "bg-red-400" },
    { id: 2, title: "Results", bgColor: "bg-green-400" },
    { id: 3, title: "Subjects", bgColor: "bg-blue-400" },
  ];

  const handleCardClick = (id) => {
    setSelectedCard(id);
  };

  const handleBack = () => {
    setSelectedCard(null);
  };

  return (
    <div>
      {!selectedCard && (
        <div className="fixed flex flex-row items-center gap-5 p-4 text-center ">
          {cards.map((card) => (
            <div
              key={card.id}
              className={`w-80 h-32 p-6 rounded-lg shadow-lg text-white ${card.bgColor} mb-4 cursor-pointer`}
              onClick={() => handleCardClick(card.id)}
            >
              <h2 className="py-6 text-2xl font-bold text-white">{card.title}</h2>
            </div>
          ))}
        </div>
      )}

      {selectedCard && (
        <div className="p-4 mt-12 max-w-[1000px] ">
          {/* Back Button */}
          <button
            onClick={handleBack}
            className="mb-4 px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
          >
            ← Back to Dashboard
          </button>

          {/* Content Area */}
          <div className="bg-white rounded-lg shadow-lg">
            {selectedCard === 1 && <StudentInfo />}
            {selectedCard === 2 && (
              <ResultsInfo />
            )}
            {selectedCard === 3 && (
              <div className="p-4">
                <h3 className="text-lg font-semibold">Subjects Information</h3>
                <p>Here is the subjects info component...</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Cards;