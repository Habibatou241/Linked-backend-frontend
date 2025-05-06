import React from 'react';

const Welcome = () => {
  return (
    <div className="p-6 h-60 w-150 flex-1 bg-[#FFF3E0]">
      <h1 className="text-2xl font-semibold text-[#8B4513] mb-4">
      Bienvenue sur la Plateforme d'Ingénierie Pétrolière!
      </h1>
      <p className="text-gray-600 text-center mb-4">
      Votre application de référence pour l’analyse avancée et la modélisation prédictive des données en ingénierie pétrolière.
      </p>
      <p className="text-gray-600 text-center">
      Commencez par créer un nouveau projet et ensuite importer vos données existantes.
      </p>
    </div>
  );
};

export default Welcome;