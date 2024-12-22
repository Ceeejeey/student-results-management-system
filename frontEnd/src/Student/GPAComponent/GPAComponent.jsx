import React, { useState, useEffect } from 'react';

const GPAComponent = ({ results, activeSemester, requiredSubjects }) => {
  const [gpa, setGpa] = useState(null);
  const [isComplete, setIsComplete] = useState(false);
console.log(results);
useEffect(() => {
    if (!results || results.length === 0) {
      setIsComplete(false);
      setGpa(null);
      return;
    }
  
    // Filter by active semester (adjust logic if needed)
    const semesterSubjects = results.filter((subject) => {
      // Adjust this logic based on how semester data is stored or derived
      const semester = subject.name.startsWith('CO12') ? '1.2' : '1.1'; 
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
  }, [results, activeSemester, requiredSubjects]);
  

  const extractCredits = (subjectCode) => {
    const match = subjectCode.match(/^[A-Z]{2}\d{2}(\d)/); // Extracts the third digit
    return match ? parseInt(match[1], 10) : 0; // Default to 0 if no match
  };

  const getGradeValue = (grade) => {
    switch (grade) {
      case 'A+': return 4.0;
      case 'A': return 4.0;
      case 'A-': return 3.7;
      case 'B+': return 3.3;
      case 'B': return 3.0;
      case 'B-': return 2.7;
      case 'C+': return 2.3;
      case 'C': return 2.0;
      case 'C-': return 1.7;
      case 'D+': return 1.3;
      case 'D': return 1.0;
      case 'F': return 0.0;
      default: return 0.0;
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h3 className="text-xl font-semibold text-gray-800">GPA for Semester {activeSemester}</h3>
      {isComplete ? (
        <p className="text-green-600 font-bold text-lg">GPA: {gpa}</p>
      ) : (
        <p className="text-gray-500">Please wait until all subjects are uploaded for this semester.</p>
      )}
    </div>
  );
};

export default GPAComponent;
