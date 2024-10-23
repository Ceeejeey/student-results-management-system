import  { useState } from 'react';

const SubjectsInfo = () => {
  const [selectedYear, setSelectedYear] = useState("19/20");
  const [selectedSemester, setSelectedSemester] = useState("1.1");
  
  const years = ["19/20", "20/21"];
  const semesters = ["1.1", "1.2", "2.1", "2.2", "3.1", "3.2"];
  
  // Sample subjects data - you can replace this with your actual data
  const subjectsData = {
    "19/20": {
      "1.1": [
        { code: "CS1101", name: "Introduction to Programming", credits: 3 },
        { code: "CS1102", name: "Computer Architecture", credits: 3 },
        { code: "CS1103", name: "Discrete Mathematics", credits: 3 }
      ],
      "1.2": [
        { code: "CS1201", name: "Object-Oriented Programming", credits: 3 },
        { code: "CS1202", name: "Data Structures", credits: 3 },
        { code: "CS1203", name: "Digital Logic Design", credits: 3 }
      ],
      // Add more semesters as needed
    },
    "20/21": {
      "1.1": [
        { code: "CS2101", name: "Advanced Programming", credits: 3 },
        { code: "CS2102", name: "Database Systems", credits: 3 },
        { code: "CS2103", name: "Computer Networks", credits: 3 }
      ],
      "1.2": [
        { code: "CS2201", name: "Software Engineering", credits: 3 },
        { code: "CS2202", name: "Operating Systems", credits: 3 },
        { code: "CS2203", name: "Web Development", credits: 3 }
      ],
      // Add more semesters as needed
    }
  };

  const currentSubjects = subjectsData[selectedYear]?.[selectedSemester] || [];

  return (
    <div className="p-6">
      <div className="flex flex-col gap-6">
        <h3 className="text-2xl font-semibold mb-4">Subjects Information</h3>
        
        {/* Year Selection Buttons */}
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
              {year.replace("/", "/")}
            </button>
          ))}
        </div>

        {/* Semester Selection Buttons */}
        <div className="flex flex-wrap gap-4">
          {semesters.map(semester => (
            <button
              key={semester}
              onClick={() => setSelectedSemester(semester)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedSemester === semester 
                  ? "bg-blue-600 text-white" 
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Semester {semester}
            </button>
          ))}
        </div>

        {/* Subjects List */}
        <div className="grid gap-4">
          {currentSubjects.map(subject => (
            <div 
              key={subject.code}
              className="bg-white rounded-lg shadow-md p-4"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold text-lg">{subject.name}</h3>
                  <p className="text-gray-600">Code: {subject.code}</p>
                </div>
                <div className="text-right">
                  <p className="text-blue-600 font-medium">{subject.credits} Credits</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {currentSubjects.length === 0 && (
          <p className="text-center text-gray-500">No subjects found for the selected criteria.</p>
        )}
      </div>
    </div>
  );
};

export default SubjectsInfo;