import React from 'react';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();

  const handleRegister = () => {
    console.log('Button clicked in Hero');
    navigate('/register');
  };

  return (
    <div className="relative h-[calc(100vh-90px)]">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/OR8.PNG')",
          backgroundColor: 'rgba(0,0,0,0.5)',
          backgroundBlend: 'overlay'
        }}
      >
      </div>
      
      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-start pt-24 text-[#F5F5DC] text-center max-w-7xl mx-auto px-12">
        <div className="text-4xl md:text-5xl font-bold mb-8  shadow-text [text-shadow:_2px_2px_0_rgb(0_0_0),_-2px_-2px_0_rgb(0_0_0),_2px_-2px_0_rgb(0_0_0),_-2px_2px_0_rgb(0_0_0)]">
          <h1 className="mb-4">IMAGINEZ QUE VOUS PUISSEZ GERER DES PROJETS </h1> 
          <h1 className="mb-4">D'INGENIERIE PROFESSIONNELS VIA UNE </h1> 
          <h1>PLATEFORME EN LIGNE </h1>
        </div>
        
        <button 
          onClick={handleRegister}
          className="bg-[#F5F5DC] text-[#8B4513] px-8 py-3 rounded-full text-lg font-semibold hover:bg-gray-100 transition duration-300 mt-12"
        >
          Lancez-vous maintenant
        </button>
      </div>
    </div>
  );
};

export default Hero;