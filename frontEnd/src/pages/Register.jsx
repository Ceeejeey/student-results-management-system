import React, { useState } from 'react';
import './Registation.css';
import logo from '../assets/OIP.jpeg'

function Register() {
  const [formData, setFormData] = useState({
    
    faculty: '',
    regNo: '',
    indexNo: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here, e.g., form validation, sending data to the server
    console.log('Form Data Submitted:', formData);
  };

  return (
    <div className="form-container">
      <div className="logo-item">
        <img className='logo' src={logo} alt="" />
        <h2>Student Registration</h2>
      </div>
      <form onSubmit={handleSubmit}>

        <div className="form-group">
          <label htmlFor="faculty">Faculty:</label>
          <select
            id="faculty"
            name="faculty"
            value={formData.faculty}
            onChange={handleChange}
            required
          >
            <option value="FAS">FAS</option>
            <option value="FCBS">FCBS</option>
            <option value="Siddha">Siddha</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="regNo">Email:</label>
          <input
            type="email"
            id="regNo"
            name="regNo"
            value={formData.regNo}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="indexNo">Index Number:</label>
          <input
            type="text"
            id="indexNo"
            name="indexNo"
            value={formData.indexNo}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="submit-btn">Register</button>
      </form>
    </div>
  );
}

export default Register;
