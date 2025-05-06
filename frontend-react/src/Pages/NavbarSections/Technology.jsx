import React, { useState } from 'react';
import Navbar from '../../components/Navbar';

const Technology = () => {
  const [expandedCard, setExpandedCard] = useState(null);

  const technologies = [
    {
      id: 1,
      name: 'Trello',
      icon: '/Trello.png',
      description: "Trello est un outil de gestion de projet visuel basé sur des tableaux et des cartes. Il facilite l’organisation, le suivi des tâches et la collaboration en équipe."
    },
    {
      id: 2,
      name: 'GitHub',
      icon: '/GH.png',
      description: "GitHub est une plateforme d’hébergement de code source utilisant Git, idéale pour le versioning et le travail collaboratif. Elle permet aussi la gestion de projets open source et privés."
    },
    {
        id: 3,
        name: 'MySQL',
        icon: '/MySQL.png',
        description: "MySQL est un système de gestion de bases de données relationnelles open-source utilisé pour stocker et gérer des données dans des applications web. Il est populaire pour sa rapidité, sa fiabilité et sa compatibilité avec divers langages de programmation."
    },
    {
        id: 4,
        name: 'TRAE',
        icon: '/TRAE.PNG',
        description: "Trae est un environnement de développement intégré (IDE) alimenté par l'intelligence artificielle, conçu pour améliorer la productivité des développeurs. Il offre des fonctionnalités telles que l'assistance en temps réel, la génération de code à partir de descriptions en langage naturel et l'automatisation des tâches répétitives."
    },
    {
        id: 5,
        name: 'React',
        icon: '/React.png',
        description: "React est une bibliothèque JavaScript développée par Meta pour créer des interfaces utilisateur interactives. Elle permet de construire des composants réutilisables et d’optimiser les performances des applications web."
    },
    {
        id: 6,
        name: 'Tailwind CSS',
        icon: '/TAILWIND.png',
        description: "Tailwind est un framework CSS utilitaire qui permet de créer des designs personnalisés en combinant des classes directement dans le HTML. Il offre flexibilité, simplicité et rapidité d'intégration pour développer des applications web réactives et performantes."
    },
    {
        id: 7,
        name: 'Laravel',
        icon: '/Laravel.png',
        description: "Laravel est un framework PHP moderne pour créer des applications web robustes, sécurisées et bien structurées. Il propose une architecture MVC, une syntaxe expressive et des outils puissants."
    },
    {
        id: 8,
        name: 'Python',
        icon: '/PYTHON.PNG',
        description: "Python est un langage de programmation polyvalent et populaire, idéal pour développer des applications web grâce à sa simplicité et ses frameworks. Il permet un développement rapide et s'adapte bien aux projets complexes, tout en intégrant des outils d'analyse de données et de machine learning."
    },
    {
      id: 9,
      name: 'JavaScript',
      icon: '/JS.PNG',
      description: "JavaScript est un langage clé pour créer des applications web interactives et dynamiques, en manipulant le contenu et répondant aux actions des utilisateurs. Utilisé côté client et serveur, il est compatible avec tous les navigateurs et essentiel pour le développement d'applications modernes."
    }
    
    
  ];

  const toggleCard = (id) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-[#FFF3E0]">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold text-center text-[#8B4513] mb-16">
          TECHNOLOGIES
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 ">
          {technologies.map((tech) => (
            <div key={tech.id} className="bg-white rounded-lg shadow-lg p-6  hover:scale-105 hover:shadow-bg-[#f6d1b6] transform flex flex-col items-center h-fit">
              <h3 className="text-xl font-semibold mb-4">{tech.name}</h3>
              <img 
                src={tech.icon} 
                alt={tech.name} 
                className="w-24 h-24 object-contain mb-4"
              />
              <button
                onClick={() => toggleCard(tech.id)}
                className="text-sm text-[#1E3C58] hover:underline"
              >
                {expandedCard === tech.id ? 'Voir moins' : 'Voir plus'}
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${
                expandedCard === tech.id ? 'max-h-96 mt-4' : 'max-h-0'
              }`}>
                <p className="text-sm text-gray-600 text-justify">
                  {tech.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Technology;