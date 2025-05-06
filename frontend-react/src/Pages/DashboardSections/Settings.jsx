import React from 'react';

const Settings = () => {
  return (
    <div className="p-6 flex-1 bg-[#FFF3E0]">
      <h2 className="text-2xl font-semibold text-[#8B4513] mb-4">Settings</h2>
      <p className="text-[#8B4513]/80 mb-6">
        Adjust your preferences and settings for the app.
      </p>
      <div className="space-y-4">
        <button className="w-full py-2 bg-[#8B4513] text-white rounded-lg">Change Theme</button>
        <button className="w-full py-2 bg-[#8B4513] text-white rounded-lg">Account Settings</button>
      </div>
    </div>
  );
};

export default Settings;
