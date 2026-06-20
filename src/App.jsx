import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useProducts } from './hooks/useProducts';
import { Navigation } from './components/Navigation';
import { CartOverlay } from './components/CartOverlay';
import { HomeHub } from './views/HomeHub';
import { ProductLaunch } from './views/ProductLaunch';
import { SearchFilterGrid } from './views/SearchFilterGrid';
import { Preloader } from './components/ui/Preloader';

function App() {
  const [currentView, setCurrentView] = useState('home');
  const [isDarkMode, setIsDarkMode] = useState(true); // 👈 1. Core theme tracking state
  const { isLoading } = useProducts();

  const renderView = () => {
    switch (currentView) {
      case 'home':
        return <HomeHub setCurrentView={setCurrentView} />;
      case 'shop':
        return <ProductLaunch />;
      case 'search':
        return <SearchFilterGrid />;
      default:
        return <HomeHub setCurrentView={setCurrentView} />;
    }
  };

  return (
    // 2. Dynamically injection of the dark mode wrapper engine
    <div className={`min-h-screen antialiased transition-colors duration-300 ${isDarkMode ? 'dark bg-neutral-950 text-neutral-100' : 'bg-neutral-50 text-neutral-900'}`}>
      
      <AnimatePresence mode="wait">
        {isLoading && <Preloader />}
      </AnimatePresence>

      {/* 3. Pass theme controls right into your Navigation layout */}
      <Navigation 
        currentView={currentView} 
        setCurrentView={setCurrentView} 
        isDarkMode={isDarkMode} 
        setIsDarkMode={setIsDarkMode} 
      />
      <CartOverlay />

      <main className="w-full">
        {renderView()}
      </main>
    </div>
  );
}

export default App;