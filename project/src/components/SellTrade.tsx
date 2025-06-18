import React, { useState } from 'react';
import { Upload, X, CheckCircle, Plus, Camera } from 'lucide-react';
import { conditionLevels } from '../data/mockData';

const SellTrade: React.FC = () => {
  const [formData, setFormData] = useState({
    cardName: '',
    set: '',
    cardNumber: '',
    type: '',
    condition: '',
    price: '',
    wantedTrade: '',
    description: '',
    contactMethod: 'email',
    email: '',
    phone: ''
  });
  const [listingType, setListingType] = useState<'sell' | 'trade' | 'both'>('sell');
  const [images, setImages] = useState<File[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setImages(prev => [...prev, ...files].slice(0, 5)); // Max 5 images
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      // Reset form
      setFormData({
        cardName: '',
        set: '',
        cardNumber: '',
        type: '',
        condition: '',
        price: '',
        wantedTrade: '',
        description: '',
        contactMethod: 'email',
        email: '',
        phone: ''
      });
      setImages([]);
    }, 3000);
  };

  const pokemonTypes = [
    'Fire', 'Water', 'Electric', 'Grass', 'Psychic', 'Fighting', 
    'Dark', 'Steel', 'Fairy', 'Dragon', 'Normal', 'Flying', 'Rock', 
    'Ground', 'Poison', 'Bug', 'Ghost', 'Ice'
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Success Message */}
      {showSuccess && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center gap-2">
          <CheckCircle className="w-5 h-5" />
          Kaart succesvol toegevoegd!
        </div>
      )}

      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Kaart Toevoegen</h1>
          <p className="text-gray-600">Voeg je eigen Pokémon kaart toe om te verkopen of ruilen</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
          {/* Listing Type Selection */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Wat wil je doen met deze kaart?</h3>
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => setListingType('sell')}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                  listingType === 'sell'
                    ? 'bg-green-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Alleen verkopen
              </button>
              <button
                type="button"
                onClick={() => setListingType('trade')}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                  listingType === 'trade'
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Alleen ruilen
              </button>
              <button
                type="button"
                onClick={() => setListingType('both')}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                  listingType === 'both'
                    ? 'bg-purple-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Beide opties
              </button>
            </div>
          </div>

          {/* Card Information */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Kaart Informatie</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Kaart Naam *
                </label>
                <input
                  type="text"
                  name="cardName"
                  required
                  value={formData.cardName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="bijv. Charizard"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Set *
                </label>
                <input
                  type="text"
                  name="set"
                  required
                  value={formData.set}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="bijv. Base Set"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Kaart Nummer
                </label>
                <input
                  type="text"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="bijv. 4/102"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Type
                </label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Selecteer type</option>
                  {pokemonTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Conditie *
                </label>
                <select
                  name="condition"
                  required
                  value={formData.condition}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Selecteer conditie</option>
                  {conditionLevels.slice(1).map(condition => (
                    <option key={condition} value={condition}>{condition}</option>
                  ))}
                </select>
              </div>

              {(listingType === 'sell' || listingType === 'both') && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Prijs (€) *
                  </label>
                  <input
                    type="number"
                    name="price"
                    required={listingType === 'sell' || listingType === 'both'}
                    value={formData.price}
                    onChange={handleInputChange}
                    min="0"
                    step="0.01"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="0.00"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Trade Information */}
          {(listingType === 'trade' || listingType === 'both') && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Ruil Informatie</h3>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Wat zoek je in ruil? *
                </label>
                <textarea
                  name="wantedTrade"
                  required={listingType === 'trade' || listingType === 'both'}
                  value={formData.wantedTrade}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Beschrijf welke kaarten je zoekt, bijv. 'Blastoise Base Set in Near Mint conditie' of 'Vintage kaarten uit de jaren 90'"
                />
              </div>
            </div>
          )}

          {/* Images */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Foto's (max 5)
              <span className="text-sm font-normal text-gray-600 ml-2">
                Voeg duidelijke foto's toe van voor- en achterkant
              </span>
            </h3>
            
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors duration-200">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="image-upload"
              />
              <label htmlFor="image-upload" className="cursor-pointer">
                <Camera className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-lg font-medium text-gray-900 mb-2">Klik om foto's toe te voegen</p>
                <p className="text-sm text-gray-600">Of sleep bestanden hierheen</p>
              </label>
            </div>

            {/* Image Preview */}
            {images.length > 0 && (
              <div className="mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {images.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      src={URL.createObjectURL(image)}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-24 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors duration-200"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Description */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Aanvullende Beschrijving
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Vertel meer over de kaart, bijzonderheden, waarom je hem verkoopt/ruilt, etc."
            />
          </div>

          {/* Contact Information */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Informatie</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Voorkeurscontact methode
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="contactMethod"
                      value="email"
                      checked={formData.contactMethod === 'email'}
                      onChange={handleInputChange}
                      className="mr-2"
                    />
                    E-mail
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="contactMethod"
                      value="phone"
                      checked={formData.contactMethod === 'phone'}
                      onChange={handleInputChange}
                      className="mr-2"
                    />
                    Telefoon
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    E-mailadres *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="je@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Telefoonnummer {formData.contactMethod === 'phone' && '*'}
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required={formData.contactMethod === 'phone'}
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="+31 6 1234 5678"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <Plus className="w-5 h-5 inline mr-2" />
              Kaart Toevoegen
            </button>
            <p className="text-sm text-gray-600 mt-3">
              Je kaart wordt toegevoegd en getoond aan andere verzamelaars
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SellTrade;