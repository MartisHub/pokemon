import React, { useState } from 'react';
import { Mail, Phone, Instagram, MessageCircle, Video, CheckCircle } from 'lucide-react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  const socialLinks = [
    {
      name: 'Instagram',
      icon: Instagram,
      url: '#',
      color: 'bg-gradient-to-br from-purple-500 to-pink-500',
      handle: '@pokevault_nl'
    },
    {
      name: 'TikTok',
      icon: Video,
      url: '#',
      color: 'bg-gradient-to-br from-black to-gray-800',
      handle: '@pokevault_tiktok'
    },
    {
      name: 'YouTube',
      icon: Video,
      url: '#',
      color: 'bg-gradient-to-br from-red-500 to-red-600',
      handle: 'PokéVault Channel'
    }
  ];

  const contactReasons = [
    'Algemene vraag',
    'Interesse in een kaart',
    'Ruilvoorstel',
    'Kaart waardering',
    'Verzending/retour',
    'Andere'
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Success Message */}
      {showSuccess && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center gap-2">
          <CheckCircle className="w-5 h-5" />
          Bericht succesvol verzonden!
        </div>
      )}

      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Neem Contact Op</h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Heb je vragen over kaarten, wil je ruilen, of heb je andere vragen? 
              Ik hoor graag van je!
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Stuur een bericht</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Naam *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Je volledige naam"
                    />
                  </div>

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
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Onderwerp *
                  </label>
                  <select
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Selecteer een onderwerp</option>
                    {contactReasons.map(reason => (
                      <option key={reason} value={reason}>{reason}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bericht *
                  </label>
                  <textarea
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={6}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Beschrijf je vraag, ruilvoorstel, of andere bericht hier..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 px-6 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  Verstuur Bericht
                </button>
              </form>
            </div>
          </div>

          {/* Contact Info & Social */}
          <div className="space-y-8">
            {/* Direct Contact */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Direct Contact</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">E-mail</p>
                    <p className="text-gray-600">info@pokevault.nl</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">WhatsApp</p>
                    <p className="text-gray-600">+31 6 1234 5678</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Volg ons</h3>
              <div className="space-y-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 group"
                  >
                    <div className={`w-10 h-10 ${social.color} text-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
                      <social.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{social.name}</p>
                      <p className="text-sm text-gray-600">{social.handle}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Response Time */}
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-6 border border-yellow-200">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Reactietijd</h3>
              <p className="text-gray-700 text-sm mb-3">
                Ik probeer binnen 24 uur te reageren op alle berichten.
              </p>
              <div className="text-xs text-gray-600">
                <p>• E-mail: binnen 24 uur</p>
                <p>• WhatsApp: meestal binnen 2-4 uur</p>
                <p>• Social media: binnen 1-2 dagen</p>
              </div>
            </div>

            {/* Trading Guidelines */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-200">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Handelsrichtlijnen</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Alle kaarten worden gecontroleerd op echtheid</li>
                <li>• Verzending met track & trace</li>
                <li>• 14 dagen retourrecht</li>
                <li>• Veilige betaling via iDEAL of PayPal</li>
              </ul>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Veelgestelde Vragen
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Hoe weet ik of een kaart echt is?</h4>
                <p className="text-gray-600 text-sm">
                  Alle kaarten in mijn collectie zijn gecontroleerd op echtheid. Bij dure kaarten verstuur ik altijd extra foto's en certificaten indien beschikbaar.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Kan ik kaarten inruilen?</h4>
                <p className="text-gray-600 text-sm">
                  Ja! Ik accepteer kaarten in ruil. Stuur foto's en beschrijving van je kaarten, dan maken we een eerlijke afspraak.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Hoe zit het met verzending?</h4>
                <p className="text-gray-600 text-sm">
                  Verzending binnen Nederland is €3,95. Boven €50 is verzending gratis. Internationale verzending is mogelijk.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibeld text-gray-900 mb-2">Kan ik kaarten laten waarderen?</h4>
                <p className="text-gray-600 text-sm">
                  Ik help graag met het inschatten van de waarde van je kaarten. Stuur foto's voor een gratis indicatie.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;