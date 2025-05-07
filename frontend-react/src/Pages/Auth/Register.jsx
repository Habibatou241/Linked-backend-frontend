import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// Configure axios
const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000',
  withCredentials: true,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  }
});

const Register = ({ onLoginClick }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    role: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };



    
  useEffect(() => {
    const initializeCsrf = async () => {
      try {
        console.log('Attempting to fetch CSRF token...');
        const response = await axiosInstance.get('/sanctum/csrf-cookie');
        console.log('CSRF token response:', response);
      } catch (error) {
        console.error('CSRF initialization failed:', error);
        if (error.response) {
          console.log('Error response:', error.response.data);
          console.log('Error status:', error.response.status);
        } else if (error.request) {
          console.log('No response received:', error.request);
        }
        setError('Connection to server failed. Please try again later.');
      }
    };
    initializeCsrf();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');


    try {
      const response = await axiosInstance.post('/api/register', formData);
      if (response.data.status === 'success') {
        navigate('/login');
      }
    } catch (error) {
      console.error('Registration error:', error.response?.data || error);
      setError(error.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f6d1b6] py-6">
      <div className="max-w-md mx-auto bg-[#FFF3E0] p-6 rounded-lg shadow-md">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        
        <h2 className="text-xl font-bold text-[#8B4513] text-center mb-1">Inscrivez-vous pour continuer.</h2>
        <p className="text-center text-[#8B4513] mb-4 text-sm">Veuillez remplir les champs suivants pour vous inscrire.</p>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-[#8B4513] text-sm mb-1">
              Nom
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Entrez votre nom"
              className="w-full px-3 py-1.5 border rounded-md bg-[#fad9c1] focus:outline-none focus:ring-2 focus:ring-[#1E3C58]"
              required
            />
          </div>
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
              className="w-full px-3 py-1.5 border rounded-md bg-[#fad9c1] focus:outline-none focus:ring-2 focus:ring-[#1E3C58]"
              required
            />
          </div>
          <div>
            <label className="block text-[#8B4513] text-sm mb-1">
              Confirmation du mot de passe
            </label>
            <input
              type="password"
              name="password_confirmation"
              value={formData.password_confirmation}
              onChange={handleChange}
              placeholder="Confirmez votre mot de passe"
              className="w-full px-3 py-1.5 border rounded-md bg-[#fad9c1] focus:outline-none focus:ring-2 focus:ring-[#1E3C58]"
              required
            />
          </div>
          <div>
            <label className="block text-[#8B4513] text-sm mb-1">
              Rôle
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-3 py-1.5 border rounded-md bg-[#fad9c1] focus:outline-none focus:ring-2 focus:ring-[#1E3C58]"
              required
            >
              <option value="">Sélectionnez votre rôle</option>
              <option value="drilling engineer">drilling engineer</option>
              <option value="reservoir engineer">reservoir engineer</option>
              <option value="production engineer">production engineer</option>
            </select>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="terms"
              className="mr-2"
              required
            />
            <label htmlFor="terms" className="text-xs text-gray-600">
              J'accepte les <a href="#" className="text-[#1E3C58]">conditions d'utilisation</a> et 
              la <a href="#" className="text-[#1E3C58]">politique de confidentialité</a>
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-[#c0601c] text-white py-1.5 rounded-md hover:bg-[#db7c38] transition duration-300 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {loading ? 'Inscription en cours...' : 'Rejoignez notre équipe'}
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-[#8B4513] text-sm">Vous avez déjà un compte?</p>
          <button 
            onClick={onLoginClick}
            className="text-[#8B4513] font-semibold hover:underline mt-0.5 text-sm"
          >
            Connectez-vous
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
