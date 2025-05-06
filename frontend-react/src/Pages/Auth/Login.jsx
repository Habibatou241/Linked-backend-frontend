import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// Configure axios instance
const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000',
  withCredentials: true,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  }
});

const Login = ({ onLoginSuccess = () => {} }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await axiosInstance.get('/sanctum/csrf-cookie');
      const response = await axiosInstance.post('/api/login', formData);
      
      if (response.data.status === 'success') {
        // Store the token if needed
        localStorage.setItem('token', response.data.token);
        onLoginSuccess(); // Will use default empty function if prop not provided
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Login error:', error.response?.data || error);
      setError(error.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f6d1b6]">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="max-w-md mx-auto bg-[#FFF3E0] p-8 rounded-lg shadow-md">
          <h2 className="text-2xl text-[#8B4513] font-semibold text-center mb-2">
            Connectez-vous à votre compte
          </h2>
          <p className="text-center text-[#8B4513] mb-6 text-sm">
            Veuillez saisir vos identifiants.
          </p>
          
          <form className="space-y-3" onSubmit={handleSubmit}>
            <div>
              <label className="block text-[#8B4513] text-sm mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Entrez votre email"
                className="w-full px-3 py-1.5 border rounded-md bg-[#fad9c1] focus:outline-none focus:ring-2 focus:ring-[#1E3C58]"
                required
              />
            </div>
            
            <div>
              <label className="block text-[#8B4513] text-sm mb-1">
                Mot de passe
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Entrez votre mot de passe"
                className="w-full px-3 py-1.5 border bg-[#fad9c1] rounded-md focus:outline-none focus:ring-2 focus:ring-[#1E3C58]"
                required
              />
            </div>
            
            <div className="text-right">
              <a href="#" className="text-xs text-gray-600 hover:underline">
                Mot de passe oublié?
              </a>
            </div>
  
            <button 
              type="submit"
              className="w-full bg-[#c0601c] text-white py-1.5 rounded-md hover:bg-[#db7c38] transition duration-300"
            >
              Se connecter
            </button>
          </form>
  
          <div className="mt-4 text-center">
            <p className="text-[#8B4513] text-sm">Vous n'avez pas de compte?</p>
            <button 
              className="text-[#8B4513] font-semibold hover:underline mt-0.5 text-sm"
            >
              Inscrivez-vous
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;