import React, { useState, useEffect } from 'react';
import axios from 'axios';
import studentData from '../../data/studentData.json'; // Importing the JSON file directly
import './AIAnalyzer.css';


const AIAnalyzer = () => {
  const activeSemester = "1.1"; // Hardcoded for now
  const [analysis, setAnalysis] = useState(null);

  const fetchAnalysis = async () => {
    const semesterData = studentData.results?.[activeSemester];
    console.log(semesterData);
    
    if (!semesterData || !semesterData.gpa || !semesterData.subjects) {
      console.error(`No data available for semester ${activeSemester}`);
      return;
    }

    try {
      const performanceText = `Student ${studentData.name} scored ${semesterData.gpa} GPA in semester ${activeSemester}. Give some analysis and inspirational nice and shiny paragraph with attractive items to encourage them.`;

      const response = await axios.post('http://localhost:3000/api/analyze-performance', {
        performance_text: performanceText,
      });

      // Adjust the response handling according to the expected structure
      setAnalysis(response.data.analysis);
    } catch (error) {
      console.error("Error fetching analysis:", error);
    }
  };

  useEffect(() => {
    fetchAnalysis();
  }, [activeSemester]);

  return (
    <div>
      {analysis ? (
        <div className="analysis-result">
          <h3>AI Performance Analysis</h3>
          <p>{analysis}</p> {/* Assuming analysis is a string from Gemini */}
        </div>
      ) : (
        <p>Loading analysis...</p>
      )}
    </div>
  );
};

export default AIAnalyzer;
