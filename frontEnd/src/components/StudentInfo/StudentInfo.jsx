import React, { useState, useEffect } from "react";

// Custom Card component
const CustomCard = ({ children, className = "" }) => {
  return <div className={`bg-white rounded-lg shadow-md ${className}`}>{children}</div>;
};

// Student Info Component
const StudentInfo = () => {
  const [studentData, setStudentData] = useState([]);
  const [batchList, setBatchList] = useState([]);
  const [selectedBatch, setSelectedBatch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch student data from the backend
  useEffect(() => {
    const fetchStudents = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:3000/api/students");
        if (!response.ok) {
          throw new Error("Failed to fetch student data.");
        }
        const data = await response.json();
        setStudentData(data);

        // Extract unique batch values dynamically
        const uniqueBatches = [...new Set(data.map((student) => student.batch))];
        setBatchList(uniqueBatches);
        setSelectedBatch(uniqueBatches[0]); // Default to the first batch
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  // Filter students based on the selected batch
  const filteredStudents = studentData.filter((student) => student.batch === selectedBatch);

  if (loading) {
    return <p>Loading student data...</p>;
  }

  if (error) {
    return <p className="text-red-500">Error: {error}</p>;
  }

  return (
    <div className="p-6">
      <div className="flex flex-col gap-6">
        <h3 className="text-2xl font-semibold mb-4">Student Information</h3>

        {/* Dynamic Batch Tabs */}
        <div className="flex gap-4">
          {batchList.map((batch) => (
            <button
              key={batch}
              onClick={() => setSelectedBatch(batch)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedBatch === batch
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {batch}
            </button>
          ))}
        </div>

        {/* Students List */}
        <div className="grid gap-4">
          {filteredStudents.map((student) => (
            <CustomCard key={student.id}>
              <div className="p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold text-lg">Registration No: {student.reg_no}</h3>
                    <p className="text-gray-600">Index Number: {student.index_no}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-500">Batch: {student.batch}</p>
                  </div>
                </div>
              </div>
            </CustomCard>
          ))}
        </div>

        {filteredStudents.length === 0 && (
          <p className="text-center text-gray-500">No students found for the selected batch.</p>
        )}
      </div>
    </div>
  );
};

export default StudentInfo;
