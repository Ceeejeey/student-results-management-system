import React, { useState } from 'react';
import axios from 'axios';
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Handle login logic here, e.g., form validation, server request
    console.log('Login Data Submitted:', loginData);

    if (!validateForm()) return;

    setIsLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:3000/login', {
        email: formData.email,
        password: formData.password,
      });

      console.log(response);
      // Check if response status is 201 for created
    if (response.status === 200 && response.data === 'student') {
      alert('Student logged in successfully');
      navigate('/studentdashbord');
    }
    else{
      alert('Teacher logged in successfully');
      navigate('/admindashbord');
    }
    } catch (error) {
      console.error('There was an error registering!', error);
      alert('Registration failed!');
    }


    if (!passwordMatch) {
      alert("Passwords do not match!");
      return;
    }
    

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
