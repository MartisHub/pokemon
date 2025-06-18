import React from 'react';
import { ArrowRight, Star, TrendingUp, Users, Shield } from 'lucide-react';
import { mockPokemonCards } from '../data/mockData';

interface HomepageProps {
  onNavigate: (page: string, cardId?: string) => void;
}

const Homepage: React.FC<HomepageProps> = ({ onNavigate }) => {
  const featuredCards = mockPokemonCards.filter(card => card.isFeatured);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-yellow-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 to-red-500/10"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center">
            <div className="mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-yellow-400 to-red-500 rounded-full mb-6 animate-bounce">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                  <div className="w-6 h-6 bg-red-500 rounded-full"></div>
                </div>
              </div>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Welkom in mijn
              <span className="block text-yellow-400 bg-gradient-to-r from-yellow-400 to-yellow-300 bg-clip-text text-transparent">
                Pokémon Card Vault
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Ontdek zeldzame kaarten, vind de perfecte toevoeging voor je collectie, 
              en handel met vertrouwen in mijn uitgebreide Pokémon kaarten database.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={() => onNavigate('collection')}
                className="bg-yellow-400 hover:bg-yellow-300 text-blue-900 px-8 py-4 rounded-full font-semibold text-lg flex items-center gap-2 transform hover:scale-105 transition-all duration-200 shadow-xl hover:shadow-2xl"
              >
                Bekijk mijn collectie
                <ArrowRight className="w-5 h-5" />
              </button>
              
              <button
                onClick={() => onNavigate('sell-trade')}
                className="border-2 border-white text-white hover:bg-white hover:text-blue-800 px-8 py-4 rounded-full font-semibold text-lg flex items-center gap-2 transform hover:scale-105 transition-all duration-200"
              >
                Start met handelen
                <TrendingUp className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-yellow-400 rounded-full opacity-10 animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-24 h-24 bg-red-500 rounded-full opacity-10 animate-pulse delay-1000"></div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-600 rounded-full mb-4 group-hover:scale-110 transition-transform duration-200">
                <Star className="w-8 h-8" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">500+</h3>
              <p className="text-gray-600">Unieke kaarten in collectie</p>
            </div>
            
            <div className="text-center group">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-100 text-yellow-600 rounded-full mb-4 group-hover:scale-110 transition-transform duration-200">
                <Users className="w-8 h-8" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">200+</h3>
              <p className="text-gray-600">Succesvolle handelingen</p>
            </div>
            
            <div className="text-center group">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 text-red-600 rounded-full mb-4 group-hover:scale-110 transition-transform duration-200">
                <Shield className="w-8 h-8" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">100%</h3>
              <p className="text-gray-600">Veilige transacties</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Cards Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Uitgelichte Kaarten
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Ontdek enkele van de meest bijzondere kaarten uit mijn collectie
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCards.map((card) => (
              <div
                key={card.id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 overflow-hidden cursor-pointer group"
                onClick={() => onNavigate('card-detail', card.id)}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={card.imageUrl}
                    alt={card.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      card.rarity === 'Ultra Rare' ? 'bg-purple-100 text-purple-800' :
                      card.rarity === 'Rare' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {card.rarity}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-200">
                    {card.name}
                  </h3>
                  <p className="text-gray-600 mb-4">{card.set} • {card.number}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {card.isForSale && (
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded-md text-sm font-medium">
                          Te koop
                        </span>
                      )}
                      {card.isForTrade && (
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-sm font-medium">
                          Ruilbaar
                        </span>
                      )}
                    </div>
                    <span className="text-2xl font-bold text-gray-900">
                      €{card.price.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <button
              onClick={() => onNavigate('collection')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-semibold text-lg flex items-center gap-2 mx-auto transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Bekijk alle kaarten
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Klaar om te beginnen met handelen?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Neem contact op voor vragen, handel voorstellen, of om je eigen kaarten toe te voegen aan onze database.
          </p>
          <button
            onClick={() => onNavigate('contact')}
            className="bg-yellow-400 hover:bg-yellow-300 text-blue-900 px-8 py-4 rounded-full font-semibold text-lg transform hover:scale-105 transition-all duration-200 shadow-xl hover:shadow-2xl"
          >
            Neem contact op
          </button>
        </div>
      </section>
    </div>
  );
};

export default Homepage;