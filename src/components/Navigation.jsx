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
    <nav className="fixed top-0 left-0 right-0 h-16 bg-white/70 dark:bg-neutral-950/70 backdrop-blur-md z-40 border-b border-neutral-200/50 dark:border-neutral-800/50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto h-full px-6 flex items-center justify-between">
        
        <div 
          onClick={() => setCurrentView('home')} 
          className="cursor-pointer font-bold text-lg tracking-tight text-neutral-950 dark:text-white"
        >
          🎛️ CAPSTONE<span className="font-light text-neutral-400">STORE</span>
        </div>

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

        <div className="flex items-center space-x-2">
          {/* THE DARK MODE SWITCH ACTUATOR BUTTON */}
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-900 text-sm transition-colors"
            aria-label="Toggle visual palette theme mode"
          >
            {isDarkMode ? '☀️ Light' : '🌙 Dark'}
          </button>

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
  );
};