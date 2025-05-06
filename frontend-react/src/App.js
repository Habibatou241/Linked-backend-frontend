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
        </Routes>
      </main>
    </div>
  );
}

export default App;
