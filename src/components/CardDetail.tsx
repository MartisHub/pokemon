import React, { useState } from 'react';
import { ArrowLeft, Heart, ShoppingCart, Repeat, Share2, Star, CheckCircle } from 'lucide-react';
import { mockPokemonCards } from '../data/mockData';

interface CardDetailProps {
  cardId: string;
  onNavigate: (page: string, cardId?: string) => void;
}

const CardDetail: React.FC<CardDetailProps> = ({ cardId, onNavigate }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showTradeForm, setShowTradeForm] = useState(false);
  const [tradeMessage, setTradeMessage] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const card = mockPokemonCards.find(c => c.id === cardId);

  if (!card) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Kaart niet gevonden</h2>
          <button
            onClick={() => onNavigate('collection')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors duration-200"
          >
            Terug naar collectie
          </button>
        </div>
      </div>
    );
  }

  const handleTradeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuccess(true);
    setShowTradeForm(false);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const conditionColors = {
    'Mint': 'bg-green-100 text-green-800',
    'Near Mint': 'bg-blue-100 text-blue-800',
    'Lightly Played': 'bg-yellow-100 text-yellow-800',
    'Moderately Played': 'bg-orange-100 text-orange-800',
    'Heavily Played': 'bg-red-100 text-red-800'
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Success Message */}
      {showSuccess && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center gap-2">
          <CheckCircle className="w-5 h-5" />
          Ruilvoorstel succesvol verzonden!
        </div>
      )}

      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={() => onNavigate('collection')}
            className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors duration-200"
          >
            <ArrowLeft className="w-5 h-5" />
            Terug naar collectie
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Image Section */}
            <div className="p-8">
              <div className="relative">
                <img
                  src={card.imageUrl}
                  alt={card.name}
                  className="w-full max-w-md mx-auto rounded-2xl shadow-xl"
                />
                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={`absolute top-4 right-4 p-3 rounded-full transition-all duration-200 ${
                    isWishlisted
                      ? 'bg-red-500 text-white'
                      : 'bg-white/80 text-gray-600 hover:bg-red-500 hover:text-white'
                  }`}
                >
                  <Heart className="w-6 h-6" fill={isWishlisted ? 'currentColor' : 'none'} />
                </button>
              </div>
            </div>

            {/* Details Section */}
            <div className="p-8">
              <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{card.name}</h1>
                <p className="text-lg text-gray-600">{card.set} • {card.number}</p>
              </div>

              {/* Card Info Grid */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <span className="text-sm font-medium text-gray-500">Type</span>
                  <div className={`mt-1 px-3 py-1 rounded-full text-sm font-medium inline-block ${
                    card.type === 'Fire' ? 'bg-red-100 text-red-800' :
                    card.type === 'Water' ? 'bg-blue-100 text-blue-800' :
                    card.type === 'Electric' ? 'bg-yellow-100 text-yellow-800' :
                    card.type === 'Grass' ? 'bg-green-100 text-green-800' :
                    card.type === 'Psychic' ? 'bg-purple-100 text-purple-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {card.type}
                  </div>
                </div>

                <div>
                  <span className="text-sm font-medium text-gray-500">Zeldzaamheid</span>
                  <div className={`mt-1 px-3 py-1 rounded-full text-sm font-medium inline-block ${
                    card.rarity === 'Ultra Rare' ? 'bg-purple-100 text-purple-800' :
                    card.rarity === 'Secret Rare' ? 'bg-pink-100 text-pink-800' :
                    card.rarity === 'Rare' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {card.rarity}
                  </div>
                </div>

                <div>
                  <span className="text-sm font-medium text-gray-500">Conditie</span>
                  <div className={`mt-1 px-3 py-1 rounded-full text-sm font-medium inline-block ${conditionColors[card.condition]}`}>
                    {card.condition}
                  </div>
                </div>

                <div>
                  <span className="text-sm font-medium text-gray-500">Prijs</span>
                  <div className="mt-1 text-2xl font-bold text-gray-900">
                    €{card.price.toFixed(2)}
                  </div>
                </div>
              </div>

              {/* Description */}
              {card.description && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Beschrijving</h3>
                  <p className="text-gray-600 leading-relaxed">{card.description}</p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="space-y-3">
                {card.isForSale && (
                  <button className="w-full bg-green-600 hover:bg-green-700 text-white py-4 px-6 rounded-xl font-semibold text-lg flex items-center justify-center gap-2 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl">
                    <ShoppingCart className="w-5 h-5" />
                    Koop nu voor €{card.price.toFixed(2)}
                  </button>
                )}

                {card.isForTrade && (
                  <button
                    onClick={() => setShowTradeForm(true)}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 px-6 rounded-xl font-semibold text-lg flex items-center justify-center gap-2 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    <Repeat className="w-5 h-5" />
                    Stel ruil voor
                  </button>
                )}

                <button className="w-full border-2 border-gray-300 hover:border-gray-400 text-gray-700 hover:text-gray-900 py-4 px-6 rounded-xl font-semibold text-lg flex items-center justify-center gap-2 transition-all duration-200">
                  <Share2 className="w-5 h-5" />
                  Deel kaart
                </button>
              </div>

              {/* Additional Info */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400" fill="currentColor" />
                    <span>Authentiek gegarandeerd</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Veilige transactie</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trade Form Modal */}
      {showTradeForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <form onSubmit={handleTradeSubmit} className="p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Ruilvoorstel voor {card.name}
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Je e-mailadres
                  </label>
                  <input
                    type="email"
                    required
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="je@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Wat bied je aan? Beschrijf je kaart(en)
                  </label>
                  <textarea
                    required
                    value={tradeMessage}
                    onChange={(e) => setTradeMessage(e.target.value)}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Ik bied aan: [kaart naam, set, conditie, waarde]. Waarom is dit een eerlijke ruil..."
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowTradeForm(false)}
                  className="flex-1 border border-gray-300 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200"
                >
                  Annuleren
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors duration-200"
                >
                  Verstuur voorstel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CardDetail;