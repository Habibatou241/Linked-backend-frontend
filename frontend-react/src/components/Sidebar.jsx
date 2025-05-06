import React from 'react';

const Sidebar = ({ onSelectSection }) => {
  return (
    <div className="relative w-64 bg-[#FFF3E0] min-h-screen border-r border-[#8B4513]/20 flex flex-col">
      {/* Project Actions */}
      <div className="p-4 flex-1 overflow-y-auto">
        <div>
          <h3 className="text-[#8B4513] text-sm font-medium mb-2">Project Actions</h3>
          <div className="space-y-1">
            <button onClick={() => onSelectSection('NewProject')} className="flex items-center text-[#8B4513] hover:bg-[#8B4513]/10 w-full px-2 py-1 text-sm">
              <span className="w-6">➕</span>
              <span>New Project</span>
            </button>
            <button onClick={() => onSelectSection('MyProjects')} className="flex items-center text-[#8B4513] hover:bg-[#8B4513]/10 w-full px-2 py-1 text-sm">
              <span className="w-6">📁</span>
              <span>My Projects</span>
            </button>
          </div>
        </div>

        {/* File Actions */}
        <div className="pt-4">
          <h3 className="text-[#8B4513] text-sm font-medium mb-2">File Actions</h3>
          <div className="space-y-1">
            <button onClick={() => onSelectSection('AddFile')} className="flex items-center text-[#8B4513] hover:bg-[#8B4513]/10 w-full px-2 py-1 text-sm">
              <span className="w-6">📄</span>
              <span>Add File</span>
            </button>
            <button onClick={() => onSelectSection('NewFolder')} className="flex items-center text-[#8B4513] hover:bg-[#8B4513]/10 w-full px-2 py-1 text-sm">
              <span className="w-6">📁</span>
              <span>New Folder</span>
            </button>
            <button onClick={() => onSelectSection('ImportData')} className="flex items-center text-[#8B4513] hover:bg-[#8B4513]/10 w-full px-2 py-1 text-sm">
              <span className="w-6">📥</span>
              <span>Import Data</span>
            </button>
          </div>
        </div>

        {/* Data Processing */}
        <div className="pt-4">
          <h3 className="text-[#8B4513] text-sm font-medium mb-2">Data Processing</h3>
          <div className="space-y-1">
            <button onClick={() => onSelectSection('DataPreprocessing')} className="flex items-center text-[#8B4513] hover:bg-[#8B4513]/10 w-full px-2 py-1 text-sm">
              <span className="w-6">🔧</span>
              <span>Data Preprocessing</span>
            </button>
            <button onClick={() => onSelectSection('DataAnalysis')} className="flex items-center text-[#8B4513] hover:bg-[#8B4513]/10 w-full px-2 py-1 text-sm">
              <span className="w-6">📊</span>
              <span>Data Analysis</span>
            </button>
          </div>
        </div>

        {/* Prediction */}
        <div className="pt-4">
          <h3 className="text-[#8B4513] text-sm font-medium mb-2">Prediction</h3>
          <div className="space-y-1">
            <button onClick={() => onSelectSection('Classification')} className="flex items-center text-[#8B4513] hover:bg-[#8B4513]/10 w-full px-2 py-1 text-sm">
              <span className="w-6">🎯</span>
              <span>Classification</span>
            </button>
            <button onClick={() => onSelectSection('Regression')} className="flex items-center text-[#8B4513] hover:bg-[#8B4513]/10 w-full px-2 py-1 text-sm">
              <span className="w-6">📈</span>
              <span>Regression</span>
            </button>
          </div>
        </div>
      </div>

      {/* Settings */}
      <div className="bg-[#f6d1b6] border-t border-[#8B4513]/20">
        <button onClick={() => onSelectSection('Settings')} className="flex items-center text-[#8B4513] w-full px-6 py-3 text-sm hover:bg-[#c0601c]/10">
          <span className="w-6">⚙️</span>
          <span>Settings</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
