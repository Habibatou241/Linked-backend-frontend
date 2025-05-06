import React from 'react';

const NewFolder = () => {
  return (
    <div className="p-6 flex-1 bg-[#FFF3E0]">
      <h2 className="text-2xl font-semibold text-[#8B4513] mb-4">New Folder</h2>
      <p className="text-[#8B4513]/80 mb-6">
        Create a new folder to organize your files.
      </p>
      {/* Formulaire pour créer un dossier */}
      <form className="space-y-4">
        <div>
          <label htmlFor="folderName" className="block text-[#8B4513]">Folder Name</label>
          <input id="folderName" type="text" className="mt-1 p-2 w-full border border-[#8B4513]/30 rounded-lg" placeholder="Enter folder name" />
        </div>
        <button className="mt-4 px-6 py-2 bg-[#8B4513] text-white rounded-lg">Create Folder</button>
      </form>
    </div>
  );
};

export default NewFolder;
