import React, { useState } from 'react';

const Projects = () => {
  const [projects, setProjects] = useState([
    {
      name: 'DATA CLEANING',
      dateCreated: '14 Mars 2025'
    }
  ]);

  return (
    <div className="p-8 bg-white">
      {/* Tabs */}
      <div className="flex gap-8 mb-8">
        <button className="text-[#1E3C58] font-semibold border-b-2 border-[#1E3C58]">
          Mes projets
        </button>
        <button className="text-gray-500 hover:text-[#1E3C58]">
          Projets collectifs
        </button>
      </div>

      {/* Header Actions */}
      <div className="flex justify-between mb-8">
        <div className="text-xl font-semibold">Noms des projets</div>
        <div className="flex gap-4">
          <button className="bg-[#1E3C58] text-white px-4 py-2 rounded-md flex items-center gap-2">
            New project <span className="text-xl">+</span>
          </button>
          <button className="text-red-600 border border-red-600 px-4 py-2 rounded-md flex items-center gap-2">
            Delete
          </button>
        </div>
      </div>

      {/* Projects List */}
      <div className="bg-white rounded-lg shadow">
        <div className="flex justify-between items-center p-4 border-b">
          <div className="font-semibold">Noms des projets</div>
          <div className="font-semibold">Dates de création</div>
        </div>

        {projects.map((project, index) => (
          <div key={index} className="flex justify-between items-center p-4 hover:bg-gray-50">
            <div>{project.name}</div>
            <div className="flex items-center gap-4">
              <span>{project.dateCreated}</span>
              <button className="text-gray-500 hover:text-gray-700">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
              </button>
              <button className="text-red-600 hover:text-red-700">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;