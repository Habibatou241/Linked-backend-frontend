import React, { useState } from 'react';
import axios from 'axios';

const ImportData = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [selectedProject, setSelectedProject] = useState('');
  const [projects, setProjects] = useState([]);

  // Fetch projects when component mounts
  React.useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/projects', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        if (response.data.status === 'success') {
          setProjects(response.data.projects);
        }
      } catch (err) {
        setError('Failed to load projects');
      }
    };
    fetchProjects();
  }, []);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !selectedProject) {
      setError('Please select a file and a project');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    const formData = new FormData();
    formData.append('file', file);
    formData.append('name', file.name.split('.')[0]);
    formData.append('project_id', selectedProject);

    try {
      const response = await axios.post('http://localhost:8000/api/datasets/upload', 
        formData,
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      if (response.data.status === 'success') {
        setSuccess('Dataset imported successfully!');
        setFile(null);
        // Reset the file input
        e.target.reset();
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to import dataset');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 flex-1 bg-[#FFF3E0]">
      <h2 className="text-2xl font-semibold text-[#8B4513] mb-4">Import Data</h2>
      <p className="text-[#8B4513]/80 mb-6">
        Import your dataset for analysis and processing.
      </p>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
          {error}
        </div>
      )}



      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-[#8B4513] mb-2">Select Project</label>
          <select
            value={selectedProject}
            onChange={(e) => setSelectedProject(e.target.value)}
            className="w-full p-2 border border-[#8B4513]/30 rounded-lg"
            required
          >
            <option value="">Choose a project</option>
            {projects.map(project => (
              <option key={project.id} value={project.id}>
                {project.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-[#8B4513] mb-2">Select File</label>
          <input
            type="file"
            onChange={handleFileChange}
            className="w-full border border-[#8B4513]/30 p-2 rounded-lg"
            accept=".csv,.txt,.xlsx"
            required
          />
          <p className="text-sm text-[#8B4513]/60 mt-1">
            Accepted formats: CSV, TXT, XLSX (max 10MB)
          </p>
        </div>

        <div className="flex items-center space-x-4">
          <button
            type="submit"
            disabled={loading || !file}
            className={`px-6 py-2 bg-[#8B4513] text-white rounded-lg ${
              loading || !file ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#9B5523]'
            }`}
          >
            {loading ? 'Importing...' : 'Import Data'}
          </button>
          {success && (
            <span className="text-green-600 animate-pulse">✓ {success}</span>
          )}
        </div>
      </form>
    </div>
  );
};

export default ImportData;