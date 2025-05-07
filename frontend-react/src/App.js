import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './Pages/Hero';
import Register from './Pages/Auth/Register';
import Login from './Pages/NavbarSections/Login';
import Dashboard from './Pages/Dashboard';
import Projects from './components/Projects';
import About from './Pages/NavbarSections/About';
import Technology from './Pages/NavbarSections/Technology';
import Services from './Pages/NavbarSections/Services';
import Contact from './Pages/NavbarSections/Contact';
import Profile from './Pages/NavbarSections/Profile';
import Paiement from './Pages/NavbarSections/Paiement';
import NewProject from './Pages/DashboardSections/NewProject';
import ProjectDetails from './Pages/DashboardSections/ProjectDetails';



function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar showNavigation={true} />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/about" element={<About />} />
          <Route path="/technology" element={<Technology />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/paiement" element={<Paiement />} />
          <Route path="/newproject" element={<NewProject />} />
          <Route path="/projectdetails/:projectId" element={<ProjectDetails/>} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
