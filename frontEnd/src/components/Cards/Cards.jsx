import React, { useState } from 'react';
import ResultsInfo from '../ResultsInfo/ResultsInfo';
import SubjectsInfo from '../SubjectsInfo/SubjectsInfo';
import StudentInfo from '../StudentInfo/StudentInfo';
// Custom Card component
const CustomCard = ({ children, className = "" }) => {
  return (
    <div className={`bg-white rounded-lg shadow-md ${className}`}>
      {children}
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