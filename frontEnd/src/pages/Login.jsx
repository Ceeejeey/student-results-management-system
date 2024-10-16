import React, { useState } from 'react';
import './Login.css';
import logo from '../assets/OIP.jpeg';

function Login() {
  const [loginData, setLoginData] = useState({
    indexNo: '',
    password: ''
  });

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here, e.g., form validation, server request
    console.log('Login Data Submitted:', loginData);
  };

  return (
    <div className="form-container">
      <div className="logo-item">
        <img className='logo' src={logo} alt="" />
        <h2>Student Login</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="indexNo">Index Number:</label>
          <input
            type="text"
            id="indexNo"
            name="indexNo"
            value={loginData.indexNo}
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
            value={loginData.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="submit-btn">Login</button>
      </form>
    </div>
  );
}

export default Login;
