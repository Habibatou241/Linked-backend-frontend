import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen bg-[#FFF3E0]">
      {/* First Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-[#8B4513]">
            Obtenez des informations clés à partir de données qualitatives en quelques minutes.
            </h1>
            
            <p className="text-[#8B4513] font-semibold leading-relaxed">
              "PIP" représente l’intégration des technologies avancées de traitement de données dans le domaine de l’ingénierie pétrolière. Cette plateforme permet d’extraire des connaissances stratégiques à partir de données complexes, en vue d’optimiser les processus d’exploitation, d’améliorer les performances opérationnelles et de renforcer la prise de décision technique. En mobilisant l’intelligence artificielle, l’analyse prédictive et les outils de data science, elle offre des solutions concrètes aux problématiques multidimensionnelles du secteur pétrolier.
            </p>
          </div>

          {/* Right Image */}
          <div className="relative">
            <img 
              src="/OR9.png" 
              alt="Petroleum Analysis Setup"
              className="rounded-lg shadow-xl w-full"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-blue-500/30 rounded-lg"></div>
          </div>
        </div>
      </div>

      {/* Problems Section */}
      <div className="md:h-96 pb-6 bg-[#fad9c1]">
        <h2 className="text-3xl font-bold text-center text-[#8B4513] py-12 mb-4">
          Quels problèmes "PIP" résout-elle ?
        </h2>
        
        <p className="text-gray-700 text-center md:w-full mx-5 mb-12 ">
          La plateforme "PIP" est conçue pour résoudre plusieurs problèmes critiques auxquels l'industrie pétrolière est confrontée, notamment :
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-2 ml-20 mr-20">
          <div className="bg-[#FFF3E0] p-6 w-45 rounded-lg shadow-sm text-center">
            <h3 className="font-semibold text-[#1E3C58] mb-2">
              Gestion des <div/> données massives
            </h3>
          </div>

          <div className="bg-[#fcebdf] p-6 w-45 rounded-lg shadow-sm text-center">
            <h3 className="font-semibold text-[#1E3C58] mb-2">
              Précision des <div/> prévisions
            </h3>
          </div>

          <div className="bg-[#FFF3E0] p-6 w-45 rounded-lg shadow-sm text-center">
            <h3 className="font-semibold text-[#1E3C58] mb-2">
              Optimisation de la production
            </h3>
          </div>

          <div className="bg-[#fcebdf] p-6 w-45 rounded-lg shadow-sm text-center">
            <h3 className="font-semibold text-[#1E3C58] mb-2">
              Identification des <div/> risques géologiques
            </h3>
          </div>

          <div className="bg-[#FFF3E0] p-6 w-45 rounded-lg shadow-sm text-center">
            <h3 className="font-semibold text-[#1E3C58] mb-2">
              Amélioration de <div/> l'efficacité des opérations
            </h3>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="min-h-screen justify-self-center bg-white px-20 mx-auto md:flex justify-between space-x-8 py-16">
        {/* Left Side - Image */}
        <div className=" hidden md:block w-1/3">
          <img 
            src="/PIP123.PNG" 
            alt="Question Mark"
            className="w-96 h-auto pl- object-contain"
          />
        </div>
        {/* Right Side - Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 w-2/3 lg:grid-cols-3 gap-6">
          {/* Précision et Fiabilité */}
          <div className="border border-gray-800 shadow-lg hover:scale-105 hover:shadow-[#FFF3E0] transform  p-6 rounded-lg">
            <h3 className="font-semibold text-[#1E3C58] mb-3">Précision et Fiabilité</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Nos modèles de machine learning sont développés pour garantir des résultats fiables, validés par des experts du domaine.
            </p>
          </div>

          {/* Gain de Temps et D'efficacité */}
          <div className="border border-gray-800 shadow-lg hover:scale-105 hover:shadow-[#FFF3E0] transform p-6 rounded-lg">
            <h3 className="font-semibold text-[#1E3C58] mb-3">Gain de Temps et D'efficacité</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              L'automatisation du prétraitement et des analyses permet de réduire les erreurs humaines et d'augmenter la productivité.
            </p>
          </div>

          {/* Collaboration Optimisée */}
          <div className="border border-gray-800 shadow-lg hover:scale-105 hover:shadow-[#FFF3E0] transform p-6 rounded-lg">
            <h3 className="font-semibold text-[#1E3C58] mb-3">Collaboration Optimisée</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Grâce à des outils de travail collaboratifs, nos utilisateurs peuvent travailler en équipe, partager des résultats, et faire avancer leurs projets communs en toute simplicité.
            </p>
          </div>

          {/* Utilité Académique et Professionnelle */}
          <div className="border border-gray-800 shadow-lg hover:scale-105 hover:shadow-[#FFF3E0] transform p-6 rounded-lg">
            <h3 className="font-semibold text-[#1E3C58] mb-3">Utilité Académique et Professionnelle</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Notre plateforme est conçue pour répondre à la fois aux besoins de recherche académique et aux exigences de l'industrie pétrolière, offrant ainsi une solution flexible pour une large gamme d'utilisateurs.
            </p>
          </div>

          {/* Interface Intuitive */}
          <div className="border border-gray-800 shadow-lg hover:scale-105 hover:shadow-[#FFF3E0] transform p-6 rounded-lg">
            <h3 className="font-semibold text-[#1E3C58] mb-3">Interface Intuitive</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Accessible même aux utilisateurs sans expertise technique poussée, la plateforme reste intuitive tout en offrant des fonctionnalités avancées pour les utilisateurs experts.
            </p>
          </div>

          {/* Sécurité et conformité */}
          <div className="border border-gray-800 shadow-lg hover:scale-105 hover:shadow-[#FFF3E0] transform p-6 rounded-lg">
            <h3 className="font-semibold text-[#1E3C58] mb-3">Sécurité et conformité</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Garantie de la sécurité des données sensibles, tout en assurant la conformité avec les normes réglementaires en matière de gestion des données dans l'industrie pétrolière et gazière.
            </p>
          </div>
        </div>

      </div>

      {/* Previous sections remain unchanged */}

            {/* Get Started Section */}
            <div className=" bg-[#FFF3E0] mx-auto px-4 py-16">
              <h2 className="text-3xl font-bold text-center text-[#8B4513] mb-12">
                ACCEDEZ A PIP DES AUJOURD'HUI
              </h2>
  
              <div className="md:flex mx-6 justify-between space-x-4 max-w-4xl md:mx-auto">
                {/* Direct Access Card */}
                <div className="bg-white p-8 my-2 w-2/3 rounded-lg shadow-sm">
                  <h3 className="text-xl font-semibold text-[#8B4513] mb-4">
                    Accès direct
                  </h3>
                  <p className="text-[#8B4513] mb-6">
                    Démarrez votre période d'essai gratuite de 30 jours.
                  </p>
                  <button className="bg-[#8B4513] text-white px-6 py-2 rounded-md hover:bg-[#8B4513]/70 transition-colors">
                    Essayez gratuitement
                  </button>
                </div>
  
                {/* Purchase Options Card */}
                <div className="bg-white w-1/3 my-2 p-8 rounded-lg shadow-sm">
                  <h3 className="text-xl font-semibold text-[#8B4513] mb-4">
                    Mode d'achat
                  </h3>
                  <div className="space-y-4">
                    <button className="flex items-center space-x-3 text-[#8B4513] hover:text-[#1E3C58] transition-colors">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      <span>Explorer les prix</span>
                    </button>
                    <button className="flex items-center space-x-3 text-[#8B4513] hover:text-[#1E3C58] transition-colors">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <span>Solliciter un devis</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
    </div>
  );
};

export default About;