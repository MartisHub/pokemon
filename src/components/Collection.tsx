import React, { useState, useMemo } from 'react';
import { Search, Filter, Grid, List, SortAsc, Heart } from 'lucide-react';
import { mockPokemonCards, pokemonTypes, rarityLevels, conditionLevels } from '../data/mockData';
import { PokemonCard } from '../types/pokemon';

interface CollectionProps {
  onNavigate: (page: string, cardId?: string) => void;
}

const Collection: React.FC<CollectionProps> = ({ onNavigate }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('All Types');
  const [selectedRarity, setSelectedRarity] = useState('All Rarities');
  const [selectedCondition, setSelectedCondition] = useState('All Conditions');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [sortBy, setSortBy] = useState('name');
  const [isGridView, setIsGridView] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [wishlist, setWishlist] = useState<string[]>([]);

  const filteredAndSortedCards = useMemo(() => {
    let filtered = mockPokemonCards.filter(card => {
      const matchesSearch = card.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           card.set.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = selectedType === 'All Types' || card.type === selectedType;
      const matchesRarity = selectedRarity === 'All Rarities' || card.rarity === selectedRarity;
      const matchesCondition = selectedCondition === 'All Conditions' || card.condition === selectedCondition;
      const matchesPrice = (!priceRange.min || card.price >= parseFloat(priceRange.min)) &&
                          (!priceRange.max || card.price <= parseFloat(priceRange.max));
      
      return matchesSearch && matchesType && matchesRarity && matchesCondition && matchesPrice;
    });

    // Sort cards
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rarity':
          const rarityOrder = ['Common', 'Uncommon', 'Rare', 'Ultra Rare', 'Secret Rare'];
          return rarityOrder.indexOf(b.rarity) - rarityOrder.indexOf(a.rarity);
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchTerm, selectedType, selectedRarity, selectedCondition, priceRange, sortBy]);

  const toggleWishlist = (cardId: string) => {
    setWishlist(prev => 
      prev.includes(cardId) 
        ? prev.filter(id => id !== cardId)
        : [...prev, cardId]
    );
  };

  const CardGrid = ({ cards }: { cards: PokemonCard[] }) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {cards.map((card) => (
        <div
          key={card.id}
          className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 overflow-hidden cursor-pointer group"
          onClick={() => onNavigate('card-detail', card.id)}
        >
          <div className="relative overflow-hidden">
            <img
              src={card.imageUrl}
              alt={card.name}
              className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
            />
            <div className="absolute top-2 right-2 flex gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleWishlist(card.id);
                }}
                className={`p-2 rounded-full transition-all duration-200 ${
                  wishlist.includes(card.id)
                    ? 'bg-red-500 text-white'
                    : 'bg-white/80 text-gray-600 hover:bg-red-500 hover:text-white'
                }`}
              >
                <Heart className="w-4 h-4" fill={wishlist.includes(card.id) ? 'currentColor' : 'none'} />
              </button>
            </div>
            <div className="absolute top-2 left-2">
              <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                card.rarity === 'Ultra Rare' ? 'bg-purple-100 text-purple-800' :
                card.rarity === 'Secret Rare' ? 'bg-pink-100 text-pink-800' :
                card.rarity === 'Rare' ? 'bg-yellow-100 text-yellow-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {card.rarity}
              </span>
            </div>
          </div>
          
          <div className="p-4">
            <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors duration-200">
              {card.name}
            </h3>
            <p className="text-sm text-gray-600 mb-3">{card.set} • {card.number}</p>
            
            <div className="flex items-center justify-between mb-3">
              <span className={`px-2 py-1 rounded-md text-xs font-medium ${
                card.type === 'Fire' ? 'bg-red-100 text-red-800' :
                card.type === 'Water' ? 'bg-blue-100 text-blue-800' :
                card.type === 'Electric' ? 'bg-yellow-100 text-yellow-800' :
                card.type === 'Grass' ? 'bg-green-100 text-green-800' :
                card.type === 'Psychic' ? 'bg-purple-100 text-purple-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {card.type}
              </span>
              <span className="text-lg font-bold text-gray-900">
                €{card.price.toFixed(2)}
              </span>
            </div>
            
            <div className="flex gap-2">
              {card.isForSale && (
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded-md text-xs font-medium">
                  Te koop
                </span>
              )}
              {card.isForTrade && (
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-xs font-medium">
                  Ruilbaar
                </span>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const CardList = ({ cards }: { cards: PokemonCard[] }) => (
    <div className="space-y-4">
      {cards.map((card) => (
        <div
          key={card.id}
          className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 overflow-hidden cursor-pointer"
          onClick={() => onNavigate('card-detail', card.id)}
        >
          <div className="flex items-center p-4">
            <img
              src={card.imageUrl}
              alt={card.name}
              className="w-16 h-16 object-cover rounded-lg mr-4"
            />
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors duration-200">
                {card.name}
              </h3>
              <p className="text-sm text-gray-600">{card.set} • {card.number} • {card.condition}</p>
            </div>
            <div className="text-right">
              <div className="text-xl font-bold text-gray-900 mb-1">
                €{card.price.toFixed(2)}
              </div>
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
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleWishlist(card.id);
              }}
              className={`ml-4 p-2 rounded-full transition-all duration-200 ${
                wishlist.includes(card.id)
                  ? 'bg-red-500 text-white'
                  : 'text-gray-400 hover:bg-red-500 hover:text-white'
              }`}
            >
              <Heart className="w-5 h-5" fill={wishlist.includes(card.id) ? 'currentColor' : 'none'} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Pokémon Kaarten Collectie</h1>
          <p className="text-gray-600">Ontdek {mockPokemonCards.length} unieke kaarten in mijn collectie</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          {/* Search Bar */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Zoek kaarten op naam of set..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Filter Toggle Button (Mobile) */}
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200"
            >
              <Filter className="w-4 h-4" />
              Filters
            </button>

            {/* View Toggle and Sort */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsGridView(true)}
                  className={`p-2 rounded-lg transition-colors duration-200 ${
                    isGridView ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setIsGridView(false)}
                  className={`p-2 rounded-lg transition-colors duration-200 ${
                    !isGridView ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="name">Sorteer op naam</option>
                <option value="price-low">Prijs: laag naar hoog</option>
                <option value="price-high">Prijs: hoog naar laag</option>
                <option value="rarity">Zeldzaamheid</option>
              </select>
            </div>
          </div>

          {/* Filters */}
          <div className={`grid grid-cols-1 md:grid-cols-5 gap-4 ${showFilters ? 'block' : 'hidden md:grid'}`}>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {pokemonTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>

            <select
              value={selectedRarity}
              onChange={(e) => setSelectedRarity(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {rarityLevels.map(rarity => (
                <option key={rarity} value={rarity}>{rarity}</option>
              ))}
            </select>

            <select
              value={selectedCondition}
              onChange={(e) => setSelectedCondition(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {conditionLevels.map(condition => (
                <option key={condition} value={condition}>{condition}</option>
              ))}
            </select>

            <input
              type="number"
              placeholder="Min prijs"
              value={priceRange.min}
              onChange={(e) => setPriceRange(prev => ({ ...prev, min: e.target.value }))}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />

            <input
              type="number"
              placeholder="Max prijs"
              value={priceRange.max}
              onChange={(e) => setPriceRange(prev => ({ ...prev, max: e.target.value }))}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            {filteredAndSortedCards.length} kaarten gevonden
          </p>
        </div>

        {/* Cards Display */}
        {filteredAndSortedCards.length > 0 ? (
          isGridView ? (
            <CardGrid cards={filteredAndSortedCards} />
          ) : (
            <CardList cards={filteredAndSortedCards} />
          )
        ) : (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Geen kaarten gevonden
            </h3>
            <p className="text-gray-600 mb-4">
              Probeer je zoekcriteria aan te passen
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedType('All Types');
                setSelectedRarity('All Rarities');
                setSelectedCondition('All Conditions');
                setPriceRange({ min: '', max: '' });
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors duration-200"
            >
              Reset filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Collection;