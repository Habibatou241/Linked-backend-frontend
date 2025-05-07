import React, { useState } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import MyProjects from './Pages/DashboardSections/MyProjects';
import DataImport from './Pages/DashboardSections/ImportData';
import Preprocessing from './Pages/DashboardSections/DataPreprocessing';
import DataAnalysis from './Pages/DashboardSections/DataAnalysis';
import Classification from './Pages/DashboardSections/Classification';
import Regression from './Pages/DashboardSections/Regression';
// Update these imports to point to NavbarSections
import About from './Pages/NavbarSections/About';
import Services from './Pages/NavbarSections/Services';
import Contact from './Pages/NavbarSections/Contact';
import Login from './Pages/NavbarSections/Login';
// Update Register import path
import Register from './Pages/Auth/Register';
import Hero from './Pages/Hero';
import Profile from './Pages/NavbarSections/Profile';
import Paiement from './Pages/NavbarSections/Paiement';

const App = () => {
  const [currentView, setCurrentView] = useState('dashboard');
  const navigate = useNavigate();

  const renderDashboard = () => {
    switch (currentView) {
      case 'projects': return <MyProjects />;
      case 'import': return <DataImport />;
      case 'preprocessing': return <Preprocessing />;
      case 'analysis': return <DataAnalysis />;
      case 'classification': return <Classification />;
      case 'regression': return <Regression />;
      default: return <MyProjects />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar showNavigation={true} />
      <div className="flex-1">
        <Routes>
          <Route exact path="/" element={<Hero />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login onLoginSuccess={() => navigate('/dashboard')} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/payment" element={<Paiement />} />
          <Route path="/dashboard" element={
            <div className="flex flex-1">
              <Sidebar setCurrentView={setCurrentView} />
              <div className="flex-1 p-4 overflow-y-auto">
                {renderDashboard()}
              </div>
            </div>
          } />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;