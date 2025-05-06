import React from 'react';
import { useNavigate } from 'react-router-dom';
import Login from '../Auth/Login';

const LoginSection = () => {
  return (
    <div className="min-h-screen bg-white">
      <Login />
    </div>
  );
};

export default LoginSection;