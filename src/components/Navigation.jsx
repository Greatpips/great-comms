import { useCartStore } from '../store/useCartStore';

export const Navigation = ({ currentView, setCurrentView, isDarkMode, setIsDarkMode }) => {
  const openCart = useCartStore((state) => state.openCart);
  const cartItems = useCartStore((state) => state.cartItems);

  const totalItemsCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const navLinks = [
    { id: 'home', label: 'Ecosystem Hub' },
    { id: 'shop', label: 'Launch Console' },
    { id: 'search', label: 'Instant Grid' }
  ];

  return (
    <>
      {/* --- TOP HEADER NAVIGATION PANEL --- */}
      <nav className="fixed top-0 left-0 right-0 h-16 bg-white/70 dark:bg-neutral-950/70 backdrop-blur-md z-40 border-b border-neutral-200/50 dark:border-neutral-800/50 transition-colors duration-300">
        <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 flex items-center justify-between">
          
          {/* Brand Identity */}
          <div 
            onClick={() => setCurrentView('home')} 
            className="cursor-pointer font-bold text-base sm:text-lg tracking-tight text-neutral-950 dark:text-white select-none shrink-0"
          >
            🎛️ CAPSTONE<span className="font-light text-neutral-400">STORE</span>
          </div>

          {/* DESKTOP VIEWPORTS ONLY: Horizontal Control Pill */}
          <div className="hidden md:flex items-center space-x-1 bg-neutral-100 dark:bg-neutral-900 p-1 rounded-full">
            {navLinks.map((link) => {
              const isCurrent = currentView === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => setCurrentView(link.id)}
                  className={`px-4 py-1.5 text-xs font-bold rounded-full transition-all ${
                    isCurrent 
                      ? 'bg-white dark:bg-neutral-800 text-neutral-950 dark:text-white shadow-sm' 
                      : 'text-neutral-500 hover:text-neutral-950 dark:hover:text-neutral-300'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </div>

          {/* Interactive Utility Trigger Cluster */}
          <div className="flex items-center space-x-1 sm:space-x-2">
            {/* THE DARK MODE SWITCH ACTUATOR BUTTON */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="px-3 py-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-900 text-xs font-mono font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white transition-colors"
              aria-label="Toggle visual palette theme mode"
            >
              {isDarkMode ? '☀️ LIGHT' : '🌙 DARK'}
            </button>

            {/* Shopping Bag Trigger */}
            <button
              onClick={openCart}
              className="relative p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors"
              aria-label="Open Shopping Cart"
            >
              <span className="text-xl">🛍️</span>
              {totalItemsCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-4 h-4 px-1 rounded-full bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 text-[9px] font-black flex items-center justify-center shadow-sm">
                  {totalItemsCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* --- MOBILE VIEWPORTS ONLY: Tactile Fixed Bottom Console Bar --- */}
      <div className="md:hidden fixed bottom-4 left-4 right-4 z-40 flex justify-center">
        <div className="w-full max-w-sm bg-white/80 dark:bg-neutral-950/80 backdrop-blur-lg border border-neutral-200/60 dark:border-neutral-850 p-1.5 rounded-2xl shadow-xl flex justify-around items-center transition-colors duration-300">
          {navLinks.map((link) => {
            const isCurrent = currentView === link.id;
            return (
              <button
                key={link.id}
                onClick={() => setCurrentView(link.id)}
                className={`flex-1 py-2 text-[10px] font-black uppercase tracking-wider rounded-xl transition-all text-center ${
                  isCurrent 
                    ? 'bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 shadow-sm' 
                    : 'text-neutral-400 dark:text-neutral-500 active:text-neutral-950 dark:active:text-white'
                }`}
              >
                {link.id === 'home' && 'Hub'}
                {link.id === 'shop' && 'Launch'}
                {link.id === 'search' && 'Grid'}
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
};