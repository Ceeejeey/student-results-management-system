import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import logo from '../assets/OIP.jpeg'





function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({

    
    regNo: '',
    indexNo: '',
    email: '',
    password: '',
 
  });
  const [passwordMatch, setPasswordMatch] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "password" || name === "confirmPassword") {
      setPasswordMatch(formData.password === value || formData.confirmPassword === value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Handle form submission logic here, e.g., form validation, sending data to the server
    try {
      const response = await axios.post('http://localhost:3000/register', {
        regNo: formData.regNo,
        indexNo: formData.indexNo,
        email: formData.email,
        password: formData.password,
      });

      console.log(response);
      // Check if response status is 201 for created
    if (response.status === 201) {
      alert(response.data.message); 
      navigate('/Login');
    }
    } catch (error) {
      console.error('There was an error registering!', error);
      alert('Registration failed!');
    }


    if (!passwordMatch) {
      alert("Passwords do not match!");
      return;
    }

    console.log('Form Data Submitted:', formData);
    // Add further processing (e.g., API call) here

  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-[400px] p-[10px] border border-[#ddd] rounded-[10px] shadow-[0_4px_8px_rgba(0,0,0,0.1)] bg-[#f9f9f9]">
        <div className="flex items-center justify-center mb-2">
          <img className="w-[50px] mr-[9px]" src={logo} alt="Logo" />
          <h2 className="text-center text-[#333] text-xl font-semibold">Student Registration</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Registration Number Field */}
          <div className="mb-[15px]">
            <label htmlFor="regNo" className="block mb-[5px] font-bold text-[#333]">
              Registration Number:
            </label>
            <input
              type="text"
              id="regNo"
              name="regNo"
              value={formData.regNo}
              onChange={handleChange}
              required
              placeholder="EUSL/TC/IS/20.../COM/..."
              className="w-full p-[10px] border border-[#ccc] rounded-[5px] text-base focus:outline-none focus:border-[#9c2b2b]"
            />
          </div>

          {/* Other Fields */}
          <div className="mb-[15px]">
            <label htmlFor="indexNo" className="block mb-[5px] font-bold text-[#333]">
              Index Number:
            </label>
            <input
              type="text"
              id="indexNo"
              name="indexNo"
              value={formData.indexNo}
              onChange={handleChange}
              required
              className="w-full p-[10px] border border-[#ccc] rounded-[5px] text-base focus:outline-none focus:border-[#9c2b2b]"
            />
          </div>

          <div className="mb-[15px]">
            <label htmlFor="email" className="block mb-[5px] font-bold text-[#333]">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-[10px] border border-[#ccc] rounded-[5px] text-base focus:outline-none focus:border-[#9c2b2b]"
            />
          </div>

          {/* Password Fields */}
          <div className="mb-[15px]">
            <label htmlFor="password" className="block mb-[5px] font-bold text-[#333]">
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full p-[10px] border border-[#ccc] rounded-[5px] text-base focus:outline-none focus:border-[#9c2b2b]"
            />
          </div>

          <div className="mb-[15px]">
            <label htmlFor="confirmPassword" className="block mb-[5px] font-bold text-[#333]">
              Confirm Password:
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="w-full p-[10px] border border-[#ccc] rounded-[5px] text-base focus:outline-none focus:border-[#9c2b2b]"
            />
            {!passwordMatch && (
              <p className="mt-1 text-sm text-red-500">Passwords do not match!</p>
            )}
          </div>

          <button 
            type="submit" 
            className="w-full p-[10px] bg-[#9c2b2b] text-white border-none rounded-[5px] text-base cursor-pointer transition-colors duration-300 hover:bg-[#871d1d]"
          >
            Register
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <span 
              onClick={() => navigate('/login')}
              className="text-blue-600 cursor-pointer hover:underline"
            >
              Login here
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
