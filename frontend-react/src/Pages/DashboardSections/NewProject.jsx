import React from 'react';

const NewProject = () => {
  return (
    <div className="p-6 flex-1 bg-[#FFF3E0]">
      <h2 className="text-2xl font-semibold text-[#8B4513] mb-4">New Project</h2>
      <p className="text-[#8B4513]/80 mb-6">
        Create a new project by filling out the form below.
      </p>
      {/* Formulaire pour un nouveau projet */}
      <form className="space-y-4">
        <div>
          <label htmlFor="projectName" className="block text-[#8B4513]">Project Name</label>
          <input id="projectName" type="text" className="mt-1 p-2 w-full border border-[#8B4513]/30 rounded-lg" placeholder="Enter project name" />
        </div>
        <div>
          <label htmlFor="projectDesc" className="block text-[#8B4513]">Project Description</label>
          <textarea id="projectDesc" rows="4" className="mt-1 p-2 w-full border border-[#8B4513]/30 rounded-lg" placeholder="Describe your project"></textarea>
        </div>
        <button className="mt-4 px-6 py-2 bg-[#8B4513] text-white rounded-lg">Create Project</button>
      </form>
    </div>
  );
};

export default NewProject;
