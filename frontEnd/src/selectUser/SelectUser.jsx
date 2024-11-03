import React from 'react';
import { useNavigate } from 'react-router-dom';

function SelectUser() {
  const navigate = useNavigate();

  const handleStudentRegistration = () => {
    navigate('/student-registration');
  };

  const handleTeacherRegistration = () => {
    navigate('/teacher-registration');
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div
          className="bg-gradient-to-r from-blue-500 to-purple-500 p-8 rounded-lg shadow-lg transform transition duration-500 hover:scale-105 cursor-pointer"
          onClick={handleStudentRegistration}
        >
          <h2 className="text-white text-2xl font-bold mb-4">Student Registration</h2>
          <p className="text-white mb-6">
            Register as a student to access our SRMS.
          </p>
          <button className="bg-white text-blue-500 px-6 py-3 rounded-full font-bold hover:bg-blue-500 hover:text-white transition duration-300">
            Register as Student
          </button>
        </div>

        <div
          className="bg-gradient-to-r from-green-500 to-yellow-500 p-8 rounded-lg shadow-lg transform transition duration-500 hover:scale-105 cursor-pointer"
          onClick={handleTeacherRegistration}
        >
          <h2 className="text-white text-2xl font-bold mb-4">Teacher Registration</h2>
          <p className="text-white mb-6">
            Register as a teacher to join Teacher Admin panel.
          </p>
          <button className="bg-white text-green-500 px-6 py-3 rounded-full font-bold hover:bg-green-500 hover:text-white transition duration-300">
            Register as Teacher
          </button>
        </div>
      </div>
    </div>
  );
}

export default SelectUser;