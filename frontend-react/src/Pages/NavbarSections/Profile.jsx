import React, { useState } from 'react';

const Profile = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    role: user?.role || ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle profile update logic here
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-[#f6d1b6] py-6">
      <div className="max-w-2xl mx-auto bg-[#FFF3E0] p-8 rounded-lg shadow-md">
        <div className="flex items-center justify-center mb-6">
          <div className="w-24 h-24 rounded-full bg-[#c0601c] text-white flex items-center justify-center text-4xl font-semibold">
            {user?.name?.charAt(0).toUpperCase()}
          </div>
        </div>

        <h2 className="text-2xl font-bold text-[#8B4513] text-center mb-6">
          Mon Profil
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[#8B4513] text-sm mb-1">Nom</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              disabled={!isEditing}
              className="w-full px-3 py-2 border rounded-md bg-[#fad9c1] focus:outline-none focus:ring-2 focus:ring-[#1E3C58]"
            />
          </div>

          <div>
            <label className="block text-[#8B4513] text-sm mb-1">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              disabled={!isEditing}
              className="w-full px-3 py-2 border rounded-md bg-[#fad9c1] focus:outline-none focus:ring-2 focus:ring-[#1E3C58]"
            />
          </div>

          <div>
            <label className="block text-[#8B4513] text-sm mb-1">Rôle</label>
            <input
              type="text"
              value={formData.role}
              disabled
              className="w-full px-3 py-2 border rounded-md bg-[#fad9c1]"
            />
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            {isEditing ? (
              <>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 border border-[#c0601c] text-[#c0601c] rounded-md hover:bg-[#fad9c1]"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#c0601c] text-white rounded-md hover:bg-[#db7c38]"
                >
                  Sauvegarder
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 bg-[#c0601c] text-white rounded-md hover:bg-[#db7c38]"
              >
                Modifier
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;