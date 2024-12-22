import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';  // Import ReactMarkdown

import './AIAnalyzer.css';

const AIAnalyzer = () => {
  const location = useLocation();
  const { index_no, activeSemester, gpa } = location.state || {}; // Access passed state
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);

  console.log("index No in aiAnalyzer " + index_no);

  // Fetch analysis from the API
  const fetchAnalysis = async (performanceText) => {
    try {
      const response = await axios.post('http://localhost:3000/api/analyze-performance', {
        performance_text: performanceText,
      });

      setAnalysis(response.data.analysis); // Update state with the API response
      setLoading(false);
    } catch (error) {
      console.error("Error fetching analysis:", error);
      setLoading(false);
    }
  };

  const generateNoGpaPerformanceText = () => {
    return `Student with Index No: ${index_no} is awaiting GPA data. until they recieve the gpa encourage them with a suitable responce`;
  };

  // Fetch analysis when component mounts
  useEffect(() => {
    if (gpa) {
      const performanceText = `Student with Index No: ${index_no} scored a GPA of ${gpa} in Semester ${activeSemester}. Provide a motivational analysis that includes inspiration and actionable advice for improvement.`;
      fetchAnalysis(performanceText);
    } else {
      setLoading(false);  // If no GPA, stop loading
      const noGpaPerformanceText = generateNoGpaPerformanceText();
      fetchAnalysis(noGpaPerformanceText);  // Send a performance text without GPA
    }
  }, [index_no, activeSemester, gpa]);

  return (
    <div className="analysis-container">
      {loading ? (
        <div className="loading-message">
          <p className="text-xl font-semibold">Analyzing your performance...</p>
          <div className="spinner">
            <div className="loader"></div>
          </div>
        </div>
      ) : (
        <div className="analysis-result">
          <h3 className="text-2xl font-bold mb-4">AI Performance Analysis</h3>
          {gpa ? (
            <ReactMarkdown className="markdown-content">
              {analysis}
            </ReactMarkdown> // Render the analysis with markdown
          ) : (
            <div className="waiting-message">
              <ReactMarkdown className="markdown-content">
                {analysis}
              </ReactMarkdown>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AIAnalyzer;
