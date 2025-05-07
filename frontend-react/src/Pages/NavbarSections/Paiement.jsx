import React from 'react';

const Paiement = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <div className="min-h-screen bg-[#f6d1b6] py-6">
      <div className="max-w-4xl mx-auto bg-[#FFF3E0] p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-[#8B4513] text-center mb-6">
          Gestion des Paiements
        </h2>

        <div className="space-y-6">
          {/* Payment Status */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-[#8B4513] mb-4">Statut de l'Abonnement</h3>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Plan Actuel:</span>
              <span className="font-semibold text-[#c0601c]">Premium</span>
            </div>
            <div className="flex justify-between items-center mt-2">
              <span className="text-gray-600">Prochain Paiement:</span>
              <span className="font-semibold text-[#c0601c]">15/03/2024</span>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-[#8B4513] mb-4">Méthodes de Paiement</h3>
            <div className="space-y-3">
              <button className="w-full bg-[#c0601c] text-white py-2 rounded-md hover:bg-[#db7c38] transition duration-300">
                Ajouter une Carte
              </button>
              <button className="w-full border border-[#c0601c] text-[#c0601c] py-2 rounded-md hover:bg-[#fad9c1] transition duration-300">
                Gérer les Méthodes de Paiement
              </button>
            </div>
          </div>

          {/* Payment History */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-[#8B4513] mb-4">Historique des Paiements</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-gray-600">Premium Plan - Janvier 2024</span>
                <span className="font-semibold text-[#c0601c]">€49.99</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-gray-600">Premium Plan - Décembre 2023</span>
                <span className="font-semibold text-[#c0601c]">€49.99</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Paiement;