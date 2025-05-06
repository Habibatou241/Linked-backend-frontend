import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
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

function App() {
  const [currentView, setCurrentView] = useState('MyProjects');
  const navigate = useNavigate();

  const handleRegister = () => {
    console.log('Register button clicked'); // Add this line
    navigate('/register');
  };

  const renderDashboard = () => {
    switch (currentView) {
      case 'MyProjects':
        return <MyProjects />;
      case 'DataImport':
        return <DataImport />;
      case 'Preprocessing':
        return <Preprocessing />;
      case 'DataAnalysis':
        return <DataAnalysis />;
      case 'Classification':
        return <Classification />;
      case 'Regression':
        return <Regression />;
      default:
        return <MyProjects />;
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <Routes>
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login onLoginSuccess={() => setCurrentView('dashboard')} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={
          <div className="flex flex-1">
            <Sidebar setCurrentView={setCurrentView} />
            <div className="flex-1 p-4 overflow-y-auto">
              {renderDashboard()}
            </div>
          </div>
        } />
        <Route path="/" element={<Hero />} />
      </Routes>
    </div>
  );
}

export default App;