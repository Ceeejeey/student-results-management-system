import React, { useState } from 'react';
import axios from 'axios';
import logo from '../assets/OIP.jpeg';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validateForm = () => {
      if (!formData.email || !formData.password) {
        setError('All fields are required');
        return false;
      }
      if (!/\S+@\S+\.\S+/.test(formData.email)) {
        setError('Please enter a valid email address');
        return false;
      }
      return true;
    };

    if (!validateForm()) return;

    setIsLoading(true);
    setError('');
    

    try {
      const response = await axios.post('http://localhost:3000/login', {
        email: formData.email,
        password: formData.password,
      });

      console.log(response);
      // Check if response status is 200 for success
      if (response.status === 200) {
        const { userType, token } = response.data;
        localStorage.setItem("token", token);
      
        if (userType === "student") {
          navigate("/studentdashbord");
        } else {
          navigate("/admindashbord");
        }
      }
      
    } catch (error) {
      console.error('There was an error logging in!', error);
      alert('Login failed!');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-[400px] p-[10px] border border-[#ddd] rounded-[10px] shadow-[0_4px_8px_rgba(0,0,0,0.1)] bg-[#f9f9f9]">
        <div className="flex items-center justify-center mb-2">
          <img className="w-[50px] mr-[9px]" src={logo} alt="" />
          <h1 className="text-center text-[#333] text-xl font-semibold">Login</h1>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-[5px]">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
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
              autoComplete="email"
            />
          </div>

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
              autoComplete="current-password"
            />
          </div>

          <div className="flex items-center justify-between mb-4">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              <span className="text-sm text-[#333]">Remember me</span>
            </label>
            <a href="/forgot-password" className="text-sm text-[#9c2b2b] hover:underline">
              Forgot Password?
            </a>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full p-[10px] bg-[#9c2b2b] text-white border-none rounded-[5px] text-base cursor-pointer transition-colors duration-300 hover:bg-[#45a049] ${isLoading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>

          <div className="mt-4 text-center">
            <span className="text-[#333] text-sm">Don't have an account? </span>
            <a href="/" className="text-[#9c2b2b] hover:underline text-sm">
              Register here
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
