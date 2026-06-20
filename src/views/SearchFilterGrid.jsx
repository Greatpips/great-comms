import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useProducts } from '../hooks/useProducts';
import { useDebounce } from '../hooks/useDebounce';
import { useCartStore } from '../store/useCartStore';
import { ProductSkeleton } from '../components/ui/Skeleton';

export const SearchFilterGrid = () => {
  const { data: products, isLoading } = useProducts();
  const addToCart = useCartStore((state) => state.addToCart);

  // Layout parameters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPreviewProduct, setSelectedPreviewProduct] = useState(null);
  const debouncedSearch = useDebounce(searchQuery, 150);

  // Extract structured unique categories
  const categories = useMemo(() => {
    if (!products) return ['All'];
    return ['All', ...new Set(products.map((p) => p.category))];
  }, [products]);

  // High-Performance Flexible Semantic Filtering logic
  const filteredProducts = useMemo(() => {
    if (!products) return [];
    return products.filter((product) => {
      const query = debouncedSearch.toLowerCase().trim();
      if (!query) return selectedCategory === 'All' || product.category === selectedCategory;

      const matchesSearch = 
        product.name.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        product.keywords.some(kw => kw.includes(query));

      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [products, debouncedSearch, selectedCategory]);

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-20 sm:pt-32 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {[1, 2, 3].map((n) => <ProductSkeleton key={n} />)}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 pt-20 sm:pt-28 pb-20 sm:pb-32 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-6 sm:space-y-8">
        
        {/* Search Console header control boards */}
        <div className="space-y-3 sm:space-y-4">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Type 'watches', 'phone', or custom assets (Semantic Engine Active)..."
            className="w-full max-w-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl px-4 sm:px-5 py-3 sm:py-3.5 text-xs sm:text-sm focus:outline-none focus:border-neutral-400 dark:focus:border-neutral-700 font-mono text-neutral-950 dark:text-white shadow-sm"
          />
          
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none max-w-full -mx-4 px-4 sm:mx-0 sm:px-0">
            {categories.slice(0, 8).map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-2.5 sm:px-3 py-1.5 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider rounded-lg border whitespace-nowrap transition-all relative z-10 ${
                    isSelected 
                      ? 'text-white dark:text-black border-neutral-950 dark:border-white' 
                      : 'text-neutral-500 dark:text-neutral-400 border-neutral-200 dark:border-neutral-800 bg-white/50 dark:bg-neutral-900/40'
                  }`}
                >
                  {isSelected && (
                    <motion.div 
                      layoutId="gridCatTab" 
                      className="absolute inset-0 bg-neutral-950 dark:bg-white rounded-md -z-10" 
                    />
                  )}
                  {cat.replace('-', ' ')}
                </button>
              );
            })}
          </div>
        </div>

        {/* The Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredProducts.map((product) => (
            <div 
              key={product.id}
              className="bg-white dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-850 rounded-xl p-4 sm:p-5 flex flex-col justify-between hover:border-neutral-400 dark:hover:border-neutral-700 transition-colors shadow-sm group"
            >
              <div onClick={() => setSelectedPreviewProduct(product)} className="cursor-pointer">
                <div className="w-full aspect-square bg-neutral-100 dark:bg-neutral-950 rounded-lg overflow-hidden mb-3 sm:mb-4 p-4 flex items-center justify-center">
                  <img 
                    src={product.colors[0].image} 
                    alt={product.name} 
                    className="max-h-full object-contain transform group-hover:scale-102 transition-transform duration-300 mix-blend-multiply dark:mix-blend-lighten" 
                  />
                </div>
                <span className="text-[9px] font-mono tracking-widest text-neutral-400 dark:text-neutral-500 uppercase">{product.category}</span>
                <h3 className="text-sm sm:text-base font-bold text-neutral-950 dark:text-white mt-0.5 group-hover:text-neutral-700 dark:group-hover:text-neutral-200 transition-colors">{product.name}</h3>
                <p className="text-[11px] sm:text-xs text-neutral-500 dark:text-neutral-400 mt-1 line-clamp-2">{product.description}</p>
              </div>

              <div className="mt-3 sm:mt-4 pt-3 border-t border-neutral-100 dark:border-neutral-950 flex justify-between items-center">
                <span className="font-mono font-bold text-xs sm:text-sm text-neutral-800 dark:text-neutral-200">${product.basePrice}</span>
                <button
                  onClick={() => addToCart(product, product.colors[0], "Standard Structure")}
                  className="px-2.5 sm:px-3 py-1.5 bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 font-black text-[9px] sm:text-[10px] tracking-wider uppercase rounded hover:opacity-90 transition-opacity"
                >
                  + Add
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* DRAWER SLIDE ACCORDION OVERLAY (Description View Module) */}
        <AnimatePresence>
          {selectedPreviewProduct && (
            <>
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 0.4 }} 
                exit={{ opacity: 0 }} 
                onClick={() => setSelectedPreviewProduct(null)} 
                className="fixed inset-0 bg-black z-50" 
              />
              <motion.div 
                initial={{ x: '100%' }} 
                animate={{ x: 0 }} 
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 26, stiffness: 190 }}
                className="fixed right-0 top-0 bottom-0 w-full max-w-lg bg-white dark:bg-neutral-900 border-l border-neutral-200 dark:border-neutral-800 p-5 sm:p-8 z-50 flex flex-col justify-between text-neutral-800 dark:text-neutral-200 shadow-2xl"
              >
                <div className="space-y-5 sm:space-y-6 overflow-y-auto pr-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[10px] sm:text-xs font-mono tracking-widest text-neutral-400 dark:text-neutral-500 uppercase">{selectedPreviewProduct.category}</span>
                      <h2 className="text-xl sm:text-2xl font-black text-neutral-950 dark:text-white tracking-tight mt-0.5">{selectedPreviewProduct.name}</h2>
                    </div>
                    <button 
                      onClick={() => setSelectedPreviewProduct(null)} 
                      className="text-xs sm:text-sm bg-neutral-100 dark:bg-neutral-800 px-2.5 py-1 rounded hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-950 dark:text-white font-bold transition-colors"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="w-full aspect-video bg-neutral-100 dark:bg-neutral-950 rounded-xl overflow-hidden p-4 sm:p-6 flex items-center justify-center border border-neutral-200 dark:border-neutral-850">
                    <img 
                      src={selectedPreviewProduct.colors[0].image} 
                      alt={selectedPreviewProduct.name} 
                      className="max-h-full object-contain mix-blend-multiply dark:mix-blend-lighten" 
                    />
                  </div>

                  <div className="space-y-1.5">
                    <h4 className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-neutral-400 dark:text-neutral-500">Functional Engineering Overview</h4>
                    <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed bg-neutral-50 dark:bg-neutral-950/40 p-3 sm:p-4 rounded-xl border border-neutral-200 dark:border-neutral-950">{selectedPreviewProduct.description}</p>
                  </div>

                  <div className="space-y-1.5">
                    <h4 className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-neutral-400 dark:text-neutral-500">System Spec Ledger</h4>
                    <div className="bg-neutral-50 dark:bg-neutral-950/60 rounded-xl p-3 sm:p-4 border border-neutral-200 dark:border-neutral-950 space-y-2">
                      {selectedPreviewProduct.specs.map(s => (
                        <div key={s.label} className="flex justify-between text-[11px] sm:text-xs pb-2 border-b border-neutral-200 dark:border-neutral-900/60 last:border-0 last:pb-0">
                          <span className="text-neutral-400 dark:text-neutral-500 font-medium">{s.label}</span>
                          <span className="text-neutral-800 dark:text-neutral-200 font-mono font-bold">{s.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-4 sm:pt-6 border-t border-neutral-200 dark:border-neutral-950 mt-4 sm:mt-6 flex justify-between items-center bg-white dark:bg-neutral-900">
                  <div>
                    <p className="text-[9px] sm:text-[10px] font-mono uppercase text-neutral-400 dark:text-neutral-500">MSRP Matrix</p>
                    <span className="text-xl sm:text-2xl font-mono font-black text-neutral-950 dark:text-white">${selectedPreviewProduct.basePrice}</span>
                  </div>
                  <button 
                    onClick={() => {
                      addToCart(selectedPreviewProduct, selectedPreviewProduct.colors[0], "Standard Structure");
                      setSelectedPreviewProduct(null);
                    }}
                    className="px-4 sm:px-6 py-2.5 sm:py-3 bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 font-black text-xs tracking-wider uppercase rounded-xl hover:opacity-90 transition-all"
                  >
                    Commit Asset
                  </button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
};