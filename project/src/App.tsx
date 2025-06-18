import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Homepage from './components/Homepage';
import Collection from './components/Collection';
import CardDetail from './components/CardDetail';
import SellTrade from './components/SellTrade';
import Contact from './components/Contact';
import Dashboard from './components/Dashboard';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedCardId, setSelectedCardId] = useState<string>('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavigate = (page: string, cardId?: string) => {
    setCurrentPage(page);
    if (cardId) {
      setSelectedCardId(cardId);
    }
    setIsMenuOpen(false);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Homepage onNavigate={handleNavigate} />;
      case 'collection':
        return <Collection onNavigate={handleNavigate} />;
      case 'card-detail':
        return <CardDetail cardId={selectedCardId} onNavigate={handleNavigate} />;
      case 'sell-trade':
        return <SellTrade />;
      case 'contact':
        return <Contact />;
      case 'dashboard':
        return <Dashboard onNavigate={handleNavigate} />;
      default:
        return <Homepage onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar 
        currentPage={currentPage} 
        onNavigate={handleNavigate}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
      />
      {renderPage()}
    </div>
  );
}

export default App;