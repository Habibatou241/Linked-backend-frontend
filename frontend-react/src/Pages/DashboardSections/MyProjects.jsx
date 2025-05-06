import React, { useState } from 'react';

const MyProjects = () => {
  const [projects, setProjects] = useState([
    { id: 1, name: 'Projet Alpha', date: '25 avril 2025' },
    { id: 2, name: 'Projet Beta', date: '23 avril 2025' }
  ]);
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState('');

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      setProjects(projects.filter(project => project.id !== id));
    }
  };

  const handleEdit = (project) => {
    setEditingId(project.id);
    setEditName(project.name);
  };

  const handleSave = (id) => {
    setProjects(projects.map(project => 
      project.id === id ? { ...project, name: editName } : project
    ));
    setEditingId(null);
  };

  return (
    <div className="p-6 flex-1 bg-[#FFF3E0]">
      <h2 className="text-2xl font-semibold text-[#8B4513] mb-4">My Projects</h2>
      <p className="text-[#8B4513]/80 mb-6">
        List of your existing projects will appear here.
      </p>

      <div className="space-y-4">
        {projects.map(project => (
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
            <p className="text-sm text-gray-500">Créé le {project.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyProjects;
