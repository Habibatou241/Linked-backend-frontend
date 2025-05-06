import React from 'react';

const ImportData = () => {
  return (
    <div className="p-6 flex-1 bg-[#FFF3E0]">
      <h2 className="text-2xl font-semibold text-[#8B4513] mb-4">Import Data</h2>
      <p className="text-[#8B4513]/80 mb-6">
        Import your dataset for analysis and processing.
      </p>
      <input type="file" className="border border-[#8B4513]/30 p-2 rounded-lg" />
    </div>
  );
};

export default ImportData;
