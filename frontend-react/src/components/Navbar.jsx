import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ onLoginClick, showNavigation = true }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  
  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/'); // Changed from '/login' to '/' to redirect to Hero page
    setShowDropdown(false); // Close the dropdown after logout
  };

  return (
    <nav className="w-full">
      {/* First line */}
      <div className="bg-[#c0601c] h-12">
        <div className="flex justify-between items-center h-full px-16">
          <div className="flex items-center h-full">
            <Link to="/">
              <img 
                src="/logo_habs.png" 
                alt="Logo" 
                className="h-10 w-auto my-1"
              />
            </Link>
            <span className="text-[#F5F5DC] font-bold text-lg ml-3">
              PLATEFORME D'INGENIERIE PETROLIERE
            </span>
          </div>
          <div className="text-[#F5F5DC] text-sm">
            Une plateforme intelligente conçu pour des ingénieurs, par les ingénieurs.
          </div>
        </div>
      </div>

      {/* Second line - Navigation items */}
      {showNavigation && (
        <div className="bg-[#FFF3E0] py-2">
          <div className="flex justify-end px-16">
            <div className="space-x-6 flex items-center">
              <Link to="/about" className="font-semibold text-[#8B4513] hover:text-gray-900">ENTREPRISE</Link>
              <Link to="/technology" className="font-semibold text-[#8B4513] hover:text-gray-900">TECHNOLOGIE</Link>
              <Link to="/services" className="font-semibold text-[#8B4513] hover:text-gray-900">SERVICES</Link>
              <Link to="/contact" className="font-semibold text-[#8B4513] hover:text-gray-900">CONTACT</Link>
              
              {!user ? (
                <Link to="/login" className="font-semibold text-[#8B4513] hover:text-gray-900">LOGIN</Link>
              ) : (
                <div className="relative">
                  <button 
                    onClick={() => setShowDropdown(!showDropdown)}
                    className="w-8 h-8 rounded-full bg-[#c0601c] text-white flex items-center justify-center font-semibold hover:bg-[#db7c38]"
                  >
                    {user.name?.charAt(0).toUpperCase()}
                  </button>
                  
                  {showDropdown && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                      <Link 
                        to="/Profile" 
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Mon profil
                      </Link>
                      <Link 
                        to="/Paiement" 
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Paiement
                      </Link>

                      <Link 
                        to="/Dashboard" 
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Dashboard
                      </Link>

                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Déconnexion
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
