import React, { useState } from 'react';
import { Heart, Package, MessageSquare, Star, TrendingUp, Eye, Filter } from 'lucide-react';
import { mockPokemonCards } from '../data/mockData';

interface DashboardProps {
  onNavigate: (page: string, cardId?: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'wishlist' | 'trades' | 'sales'>('wishlist');
  const [wishlistCards] = useState(['1', '3', '6']); // Mock wishlist IDs

  const mockTradeRequests = [
    {
      id: '1',
      cardName: 'Charizard Base Set',
      proposedCard: 'Blastoise Base Set + €50',
      status: 'pending',
      date: '2024-01-15',
      userEmail: 'trainer@pokemon.com'
    },
    {
      id: '2', 
      cardName: 'Pikachu Promo',
      proposedCard: '3x Neo Genesis Rare kaarten',
      status: 'accepted',
      date: '2024-01-12',
      userEmail: 'collector@cards.nl'
    },
    {
      id: '3',
      cardName: 'Venusaur Base Set',
      proposedCard: 'Team Rocket set (compleet)',
      status: 'declined',
      date: '2024-01-10',
      userEmail: 'cardmaster@trading.com'
    }
  ];

  const mockSalesStats = {
    totalSales: 12,
    revenue: 850.50,
    avgPrice: 70.87,
    topCard: 'Charizard Base Set'
  };

  const wishlistItems = mockPokemonCards.filter(card => wishlistCards.includes(card.id));

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'accepted': return 'bg-green-100 text-green-800';
      case 'declined': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'In afwachting';
      case 'accepted': return 'Geaccepteerd';
      case 'declined': return 'Afgewezen';
      default: return status;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">Beheer je wishlist, bekijk ruilverzoeken en verkoop statistieken</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Wishlist Items</p>
                <p className="text-3xl font-bold text-gray-900">{wishlistCards.length}</p>
              </div>
              <Heart className="w-8 h-8 text-red-500" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Actieve Ruilverzoeken</p>
                <p className="text-3xl font-bold text-gray-900">
                  {mockTradeRequests.filter(t => t.status === 'pending').length}
                </p>
              </div>
              <MessageSquare className="w-8 h-8 text-blue-500" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Verkopen (deze maand)</p>
                <p className="text-3xl font-bold text-gray-900">{mockSalesStats.totalSales}</p>
              </div>
              <Package className="w-8 h-8 text-green-500" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Omzet (€)</p>
                <p className="text-3xl font-bold text-gray-900">€{mockSalesStats.revenue.toFixed(2)}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-purple-500" />
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-t-xl shadow-md">
          <div className="border-b border-gray-200">
            <nav className="flex">
              <button
                onClick={() => setActiveTab('wishlist')}
                className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors duration-200 ${
                  activeTab === 'wishlist'
                    ? 'border-red-500 text-red-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <Heart className="w-4 h-4 inline mr-2" />
                Wishlist
              </button>
              <button
                onClick={() => setActiveTab('trades')}
                className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors duration-200 ${
                  activeTab === 'trades'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <MessageSquare className="w-4 h-4 inline mr-2" />
                Ruilverzoeken
              </button>
              <button
                onClick={() => setActiveTab('sales')}
                className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors duration-200 ${
                  activeTab === 'sales'
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <TrendingUp className="w-4 h-4 inline mr-2" />
                Verkoop Statistieken
              </button>
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-b-xl shadow-md p-6">
          {activeTab === 'wishlist' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Mijn Wishlist</h2>
                <button
                  onClick={() => onNavigate('collection')}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200"
                >
                  Voeg kaarten toe
                </button>
              </div>

              {wishlistItems.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {wishlistItems.map((card) => (
                    <div
                      key={card.id}
                      className="border border-gray-200 rounded-xl p-4 hover:shadow-lg transition-all duration-200 cursor-pointer"
                      onClick={() => onNavigate('card-detail', card.id)}
                    >
                      <img
                        src={card.imageUrl}
                        alt={card.name}
                        className="w-full h-48 object-cover rounded-lg mb-4"
                      />
                      <h3 className="font-semibold text-gray-900 mb-1">{card.name}</h3>
                      <p className="text-sm text-gray-600 mb-2">{card.set} • {card.number}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-gray-900">
                          €{card.price.toFixed(2)}
                        </span>
                        <div className="flex gap-1">
                          {card.isForSale && (
                            <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">
                              Te koop
                            </span>
                          )}
                          {card.isForTrade && (
                            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
                              Ruilbaar
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Je wishlist is nog leeg
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Voeg kaarten toe aan je wishlist door op het hart-icoon te klikken
                  </p>
                  <button
                    onClick={() => onNavigate('collection')}
                    className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200"
                  >
                    Blader door collectie
                  </button>
                </div>
              )}
            </div>
          )}

          {activeTab === 'trades' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Ruilverzoeken</h2>
                <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option>Alle statussen</option>
                  <option>In afwachting</option>
                  <option>Geaccepteerd</option>
                  <option>Afgewezen</option>
                </select>
              </div>

              <div className="space-y-4">
                {mockTradeRequests.map((trade) => (
                  <div key={trade.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow duration-200">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">{trade.cardName}</h3>
                        <p className="text-sm text-gray-600">{trade.userEmail}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(trade.status)}`}>
                        {getStatusText(trade.status)}
                      </span>
                    </div>
                    
                    <div className="bg-gray-50 rounded-lg p-4 mb-4">
                      <p className="text-sm font-medium text-gray-700 mb-1">Geboden ruil:</p>
                      <p className="text-gray-900">{trade.proposedCard}</p>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">
                        {new Date(trade.date).toLocaleDateString('nl-NL')}
                      </span>
                      {trade.status === 'pending' && (
                        <div className="flex gap-2">
                          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200">
                            Accepteren
                          </button>
                          <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200">
                            Afwijzen
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'sales' && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-6">Verkoop Statistieken</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
                  <div className="flex items-center justify-between mb-2">
                    <Package className="w-8 h-8 text-green-600" />
                    <TrendingUp className="w-5 h-5 text-green-500" />
                  </div>
                  <p className="text-sm font-medium text-green-700">Totale Verkopen</p>
                  <p className="text-2xl font-bold text-green-900">{mockSalesStats.totalSales}</p>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
                  <div className="flex items-center justify-between mb-2">
                    <TrendingUp className="w-8 h-8 text-blue-600" />
                    <Star className="w-5 h-5 text-blue-500" />
                  </div>
                  <p className="text-sm font-medium text-blue-700">Totale Omzet</p>
                  <p className="text-2xl font-bold text-blue-900">€{mockSalesStats.revenue.toFixed(2)}</p>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">
                  <div className="flex items-center justify-between mb-2">
                    <Star className="w-8 h-8 text-purple-600" />
                    <Eye className="w-5 h-5 text-purple-500" />
                  </div>
                  <p className="text-sm font-medium text-purple-700">Gemiddelde Prijs</p>
                  <p className="text-2xl font-bold text-purple-900">€{mockSalesStats.avgPrice.toFixed(2)}</p>
                </div>

                <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl p-6 border border-yellow-200">
                  <div className="flex items-center justify-between mb-2">
                    <Star className="w-8 h-8 text-yellow-600" />
                    <TrendingUp className="w-5 h-5 text-yellow-500" />
                  </div>
                  <p className="text-sm font-medium text-yellow-700">Populairste Kaart</p>
                  <p className="text-lg font-bold text-yellow-900">{mockSalesStats.topCard}</p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recente Verkopen</h3>
                <div className="text-center py-8">
                  <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-600">Gedetailleerde verkoophistorie komt binnenkort beschikbaar</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;