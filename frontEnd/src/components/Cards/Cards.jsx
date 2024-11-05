import React, { useState } from 'react';
import ResultsInfo from '../ResultsInfo/ResultsInfo';
import SubjectsInfo from '../SubjectsInfo/SubjectsInfo';
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
  
    { id: 1, name: "M.D.P.A. Perera", faculty: "Computer Science", year: "19/20", IndexNo: "19/COM/298" },
    { id: 2, name: "E.Sajithan", faculty: "Computer Science", year: "19/20", IndexNo: "19/COM/298" },
    { id: 3, name: "Y.Piriyavinojan", faculty: "Computer Science", year: "19/20", IndexNo: "19/COM/299" },
    { id: 4, name: "A. Satheska", faculty: "Computer Science", year: "19/20", IndexNo: "19/COM/300" },
    { id: 5, name: "R.A.C.D. Ranasinghe", faculty: "Computer Science", year: "19/20", IndexNo: "19/COM/301" },
    { id: 6, name: "P. Abiram", faculty: "Computer Science", year: "19/20", IndexNo: "19/COM/302" },
    { id: 7, name: "V. Vithursiga", faculty: "Computer Science", year: "19/20", IndexNo: "19/COM/303" },
    { id: 8, name: "P. Thuvaragan", faculty: "Computer Science", year: "19/20", IndexNo: "19/COM/304" },
    { id: 9, name: "R.B.S.N Bandara", faculty: "Computer Science", year: "19/20", IndexNo: "19/COM/305" },
    { id: 10, name: "M.A.A.N.Fernando", faculty: "Computer Science", year: "19/20", IndexNo: "19/COM/306" },
    { id: 11, name: "J.P.S Madhushan", faculty: "Computer Science", year: "19/20", IndexNo: "19/COM/307" },
    { id: 12, name: "K. Dinoritha", faculty: "Computer Science", year: "19/20", IndexNo: "19/COM/308" },
    { id: 13, name: "S.D.S De Kulasinghe", faculty: "Computer Science", year: "19/20", IndexNo: "19/COM/309" },
    { id: 14, name: "K.N.U Ranasinghe", faculty: "Computer Science", year: "19/20", IndexNo: "19/COM/310" },
    { id: 15, name: "P. Sakaniya", faculty: "Computer Science", year: "19/20", IndexNo: "19/COM/311" },
    { id: 16, name: "M.A.A.N.Fernando", faculty: "Computer Science", year: "20/21", IndexNo: "19/COM/306" },
    { id: 17, name: "J.P.S Madhushan", faculty: "Computer Science", year: "20/21", IndexNo: "19/COM/307" },
    { id: 18, name: "K. Dinoritha", faculty: "Computer Science", year: "20/21", IndexNo: "19/COM/308" },
    { id: 19, name: "S.D.S De Kulasinghe", faculty: "Computer Science", year: "20/21", IndexNo: "19/COM/309" },
    { id: 20, name: "K.N.U Ranasinghe", faculty: "Computer Science", year: "20/21", IndexNo: "19/COM/310" },
    { id: 21, name: "P. Sakaniya", faculty: "Computer Science", year: "20/21", IndexNo: "19/COM/311" },
    
  ];

  const [selectedYear, setSelectedYear] = useState("19/20");
  const [selectedFaculty, setSelectedFaculty] = useState("all");
  

  const filteredStudents = studentData.filter(student => {
    const yearMatch = student.year === selectedYear;
    const facultyMatch = selectedFaculty === "all" || student.faculty === selectedFaculty;
    return yearMatch && facultyMatch;
  });

  return (
    <div className="p-6 ">
      <div className="flex flex-col gap-6">
        <h3 className="mb-4 text-2xl font-semibold">Student Information</h3>
        
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

       
      {/* Students List */}
        <div className="grid gap-4 ">
          {filteredStudents.map(student => (
            <CustomCard key={student.id}>
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">{student.name}</h3>
                    <p className="text-gray-600">IndexNo: {student.IndexNo}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-blue-600">{student.faculty}</p>
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
            className="px-4 py-2 mb-4 transition-colors bg-gray-200 rounded-lg hover:bg-gray-300"
          >
            ← Back to Dashboard
          </button>

          {/* Content Area */}
          <div className="bg-white rounded-lg shadow-lg">
            {selectedCard === 1 && <StudentInfo />}
            {selectedCard === 2 && (
              <ResultsInfo />
            )}
            {selectedCard === 3 && <SubjectsInfo />}
          </div>
        </div>
      )}
    </div>
  );
};

export default Cards;