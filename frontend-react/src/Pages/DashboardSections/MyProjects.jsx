import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const MyProjects = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch projects from the database
  const fetchProjects = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/projects', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        }
      });
      if (response.data.status === 'success') {
        setProjects(response.data.projects);
      }
    } catch (err) {
      setError('Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await axios.delete(`http://localhost:8000/api/projects/${id}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          }
        });
        setProjects(projects.filter(project => project.id !== id));
      } catch (err) {
        setError('Failed to delete project');
      }
    }
  };

  const handleEdit = (project) => {
    setEditingId(project.id);
    setEditName(project.name);
  };

  const handleSave = async (id) => {
    try {
      const response = await axios.put(`http://localhost:8000/api/projects/${id}`, 
        { name: editName },
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          }
        }
      );
      
      if (response.data.status === 'success') {
        setProjects(projects.map(project => 
          project.id === id ? { ...project, name: editName } : project
        ));
        setEditingId(null);
      }
    } catch (err) {
      setError('Failed to update project');
    }
  };

  const handleViewDatasets = (projectId) => {
    navigate(`/projectdetails/${projectId}`);
  };

  return (
    <div className="p-6 flex-1 bg-[#FFF3E0]">
      <h2 className="text-2xl font-semibold text-[#8B4513] mb-4">My Projects</h2>
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
          {error}
        </div>
      )}
      <p className="text-[#8B4513]/80 mb-6">
        List of your existing projects will appear here.
      </p>

      <div className="space-y-4">
        {projects.length === 0 ? (
          <p className="text-gray-500">No projects found. Create your first project!</p>
        ) : (
          projects.map(project => (
            <div key={project.id} className="p-4 border border-[#8B4513]/30 rounded-lg shadow-sm bg-white">
              <div className="flex justify-between items-center">
                {editingId === project.id ? (
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="text-lg font-medium text-[#8B4513] border rounded px-2"
                    autoFocus
                  />
                ) : (
                  <h3 className="text-lg font-medium text-[#8B4513]">{project.name}</h3>
                )}
                <div className="flex space-x-2">
                  {editingId === project.id ? (
                    <>
                      <button
                        onClick={() => handleSave(project.id)}
                        className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => handleViewDatasets(project.id)}
                        className="px-3 py-1 bg-[#8B4513] text-white rounded hover:bg-[#9B5523]"
                      >
                        View Datasets
                      </button>
                      <button
                        onClick={() => handleEdit(project)}
                        className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(project.id)}
                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </>
                  )}
                </div>
              </div>
              <p className="text-sm text-gray-500">Created on {new Date(project.created_at).toLocaleDateString()}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyProjects;
