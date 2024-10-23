import React, { useState } from 'react';

const Cards = ({ onCardClick }) => {
  const [selectedCard, setSelectedCard] = useState(null);

  const cards = [
    { id: 1, title: "Students", bgColor: "bg-red-400" },
    { id: 2, title: "Results", bgColor: "bg-green-400" },
    { id: 3, title: "Subjects", bgColor: "bg-blue-400" },
  ];

  // Function to handle card click
  const handleCardClick = (id) => {
    setSelectedCard(id);
  };

  return (
    <div>
      {/* Conditionally render cards or selected component */}
      {!selectedCard && (
        <div className="fixed flex flex-row items-center gap-5 p-4 text-center px-80 ">
          {cards.map((card) => (
            <div
              key={card.id}
              className={`w-80 h-32 p-6 rounded-lg shadow-lg text-white ${card.bgColor} mb-4 cursor-pointer`}
              onClick={() => handleCardClick(card.id)} // Set selected card on click
            >
              <h2 className="py-6 text-2xl font-bold text-white">{card.title}</h2>
            </div>
          ))}
        </div>
      )}

      {/* Conditionally render the selected component */}
      {selectedCard && (
        <div className="flex items-center justify-center h-screen pl-64" >
          {selectedCard === 1 && (
            <div className="p-4 bg-gray-100 rounded shadow">
              <h3 className="text-lg font-semibold">Student Information</h3>
              <p>Here is the student info component...</p>
            </div>
          )}
          {selectedCard === 2 && (
            <div className="p-4 bg-gray-100 rounded shadow">
              <h3 className="text-lg font-semibold">Results Information</h3>
              <p>Here is the results info component...</p>
            </div>
          )}
          {selectedCard === 3 && (
            <div className="p-4 bg-gray-100 rounded shadow">
              <h3 className="text-lg font-semibold">Subjects Information</h3>
              <p>Here is the subjects info component...</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Cards;
