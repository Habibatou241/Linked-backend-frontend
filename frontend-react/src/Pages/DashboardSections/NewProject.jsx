import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const NewProject = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id === 'projectName' ? 'name' : 'description']: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await axios.post('http://localhost:8000/api/projects', formData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.data.status === 'success') {
        setSuccess('Project created successfully!');
        console.log('Project created successfully:', response.data.data);
        setTimeout(() => {
          navigate('/dashboard');
        }, 2000);
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to create project');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 flex-1 bg-[#FFF3E0]">
      <h2 className="text-2xl font-semibold text-[#8B4513] mb-4">New Project</h2>
      <p className="text-[#8B4513]/80 mb-6">
        Create a new project by filling out the form below.
      </p>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
          {error}
        </div>
      )}
      


      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="projectName" className="block text-[#8B4513]">Project Name</label>
          <input 
            id="projectName"
            type="text"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-[#8B4513]/30 rounded-lg"
            placeholder="Enter project name"
            required
          />
        </div>
        <div>
          <label htmlFor="projectDesc" className="block text-[#8B4513]">Project Description</label>
          <textarea 
            id="projectDesc"
            rows="4"
            value={formData.description}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-[#8B4513]/30 rounded-lg"
            placeholder="Describe your project"
            required
          ></textarea>
        </div>
       
        <div className="flex items-center space-x-4">
          <button 
            type="submit"
            disabled={loading}
            className={`px-6 py-2 bg-[#8B4513] text-white rounded-lg ${
              loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#9B5523]'
            }`}
          >
            {loading ? 'Creating...' : 'Create Project'}
          </button>
          {success && (
            <span className="text-green-600 animate-pulse">✓ {success}</span>
          )}
        </div>
      </form>
    </div>
  );
};

export default NewProject;
