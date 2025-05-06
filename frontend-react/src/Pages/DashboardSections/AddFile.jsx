import React from 'react';

const AddFile = () => {
  return (
    <div className="p-6 flex-1 bg-[#FFF3E0]">
      <h2 className="text-2xl font-semibold text-[#8B4513] mb-4">Add File</h2>
      <p className="text-[#8B4513]/80 mb-6">
        Upload a file to your project by clicking the button below.
      </p>
      <input type="file" className="border border-[#8B4513]/30 p-2 rounded-lg" />
    </div>
  );
};

export default AddFile;
