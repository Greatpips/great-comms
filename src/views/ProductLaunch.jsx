import { useState } from 'react';
import { motion } from 'framer-motion';
import { useProducts } from '../hooks/useProducts';
import { useCartStore } from '../store/useCartStore';
import { ProductSkeleton } from '../components/ui/Skeleton';

export const ProductLaunch = () => {
  const { data: products, isLoading } = useProducts();
  const addToCart = useCartStore((state) => state.addToCart);

  // Focus directly on our core flagship product
  const product = products?.[0];

  // Micro-state tracking for customized variants
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedStorage, setSelectedStorage] = useState('128GB');
  const [activeTab, setActiveTab] = useState(0);

  // Initialize variant options once data resolves successfully
  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-20 sm:pt-32 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-12">
        <ProductSkeleton />
        <div className="space-y-4 sm:space-y-6 pt-6 sm:pt-12">
          <div className="h-6 sm:h-8 bg-neutral-200 dark:bg-neutral-800 rounded w-1/3 animate-pulse" />
          <div className="h-10 sm:h-12 bg-neutral-200 dark:bg-neutral-800 rounded w-3/4 animate-pulse" />
          <div className="h-20 sm:h-24 bg-neutral-200 dark:bg-neutral-800 rounded w-full animate-pulse" />
        </div>
      </div>
    );
  }

  if (!product) return null;

  // Fallback defaults logic
  const currentColor = selectedColor || product.colors[0];

  // Compute pricing modifiers dynamically based on storage scale
  const getCalculatedPrice = () => {
    const premium = selectedStorage === '512GB' ? 150 : selectedStorage === '256GB' ? 80 : 0;
    return product.basePrice + premium;
  };

  const dynamicPrice = getCalculatedPrice();

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 pt-20 sm:pt-28 pb-20 sm:pb-32 transition-colors duration-300 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
        
        {/* Left Side: Premium Visual Sandbox Container */}
        <div className="lg:sticky lg:top-24 flex flex-col items-center w-full">
          <div className="w-full aspect-square max-w-[340px] sm:max-w-lg rounded-2xl sm:rounded-3xl bg-neutral-100 dark:bg-neutral-900 overflow-hidden border border-neutral-200 dark:border-neutral-850 shadow-xl dark:shadow-2xl flex items-center justify-center relative p-6 sm:p-8">
            <motion.img
              key={currentColor.name}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              src={currentColor.image}
              alt={product.name}
              className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-lighten"
            />
            <span className="absolute bottom-3 sm:bottom-4 right-4 sm:right-6 text-[9px] sm:text-xs text-neutral-400 dark:text-neutral-500 font-mono tracking-wider">
              RENDER // {currentColor.name.toUpperCase()}
            </span>
          </div>
        </div>

        {/* Right Side: Configuration Console Layout */}
        <div className="space-y-6 sm:space-y-8 w-full">
          <div>
            <span className="text-[10px] sm:text-xs font-bold tracking-widest text-neutral-500 dark:text-neutral-400 uppercase bg-neutral-200/60 dark:bg-neutral-900 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full border border-neutral-300 dark:border-neutral-800">
              {product.category} Flagship
            </span>
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight mt-3 sm:mt-4 text-neutral-950 dark:text-white">
              {product.name}
            </h1>
            <p className="text-sm sm:text-lg text-neutral-500 dark:text-neutral-400 mt-1.5 sm:mt-2 font-medium italic">
              "{product.tagline}"
            </p>
          </div>

          <div className="text-xl sm:text-3xl font-mono font-bold text-neutral-950 dark:text-white tracking-tight border-b border-neutral-200 dark:border-neutral-900 pb-4">
            ${dynamicPrice}
            <span className="block sm:inline text-[11px] sm:text-xs text-neutral-500 font-normal sm:ml-2 tracking-normal font-sans mt-1 sm:mt-0">
              or ${(dynamicPrice / 12).toFixed(2)}/mo. over 12 mo. at 0% APR
            </span>
          </div>

          {/* Configuration Node 1: Dynamic Color Swatches */}
          <div className="space-y-2.5 sm:space-y-3">
            <h3 className="text-[10px] sm:text-xs font-bold text-neutral-500 dark:text-neutral-400 tracking-widest uppercase">
              Select Finish: <span className="text-neutral-950 dark:text-white font-normal lowercase font-mono">({currentColor.name})</span>
            </h3>
            <div className="flex flex-wrap gap-2 sm:gap-3 items-center">
              {product.colors.map((color) => {
                const isSelected = currentColor.name === color.name;
                return (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color)}
                    className="relative w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center focus:outline-none"
                  >
                    {isSelected && (
                      <motion.div
                        layoutId="activeColorRing"
                        className="absolute inset-0 border-2 border-neutral-950 dark:border-white rounded-full scale-110"
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                      />
                    )}
                    <span
                      className="w-7 h-7 sm:w-8 sm:h-8 rounded-full block border border-neutral-200 dark:border-neutral-800 shadow-inner"
                      style={{ backgroundColor: color.hex }}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Configuration Node 2: Sliding Indicator Architecture for Storage */}
          <div className="space-y-2.5 sm:space-y-3">
            <h3 className="text-[10px] sm:text-xs font-bold text-neutral-500 dark:text-neutral-400 tracking-widest uppercase">
              Select Capacity Array:
            </h3>
            <div className="flex bg-neutral-200/70 dark:bg-neutral-900 p-1 rounded-xl max-w-sm border border-neutral-300/40 dark:border-neutral-850">
              {product.storageOptions.map((size) => {
                const isSelected = selectedStorage === size;
                return (
                  <button
                    key={size}
                    onClick={() => setSelectedStorage(size)}
                    className={`relative flex-1 py-2 sm:py-2.5 text-[11px] sm:text-xs font-bold tracking-wider rounded-lg transition-colors duration-200 z-10 ${
                      isSelected 
                        ? 'text-neutral-950 dark:text-neutral-950' 
                        : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white'
                    }`}
                  >
                    {isSelected && (
                      <motion.div
                        layoutId="activeStoragePill"
                        className="absolute inset-0 bg-white rounded-md -z-10 shadow-sm"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                    {size}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Execution Module Button */}
          <button
            onClick={() => addToCart(product, currentColor, selectedStorage)}
            className="w-full py-3.5 sm:py-4 bg-neutral-950 dark:bg-white hover:bg-neutral-800 dark:hover:bg-neutral-200 text-white dark:text-neutral-950 font-bold text-xs sm:text-sm tracking-wider uppercase rounded-xl transition-all duration-200 active:scale-[0.99] shadow-md sm:shadow-xl"
          >
            Deploy To Ecosystem Bag — ${dynamicPrice}
          </button>

          {/* Premium Accordion Micro-copy */}
          <div className="border border-neutral-200 dark:border-neutral-900 rounded-xl overflow-hidden bg-neutral-100/50 dark:bg-neutral-900/30">
            {['Product Specifications', 'Complimentary Fulfillment'].map((tabTitle, idx) => (
              <div key={tabTitle} className="border-b border-neutral-200 dark:border-neutral-900 last:border-0">
                <button
                  onClick={() => setActiveTab(activeTab === idx ? null : idx)}
                  className="w-full px-4 sm:px-5 py-3.5 sm:py-4 text-left flex justify-between items-center hover:bg-neutral-200/30 dark:hover:bg-neutral-900/50 transition-colors"
                >
                  <span className="text-[11px] sm:text-xs font-bold tracking-wider uppercase text-neutral-700 dark:text-neutral-300">{tabTitle}</span>
                  <span className="text-neutral-400 dark:text-neutral-500 font-mono text-sm sm:text-base">{activeTab === idx ? '−' : '+'}</span>
                </button>
                {activeTab === idx && (
                  <div className="px-4 sm:px-5 pb-4 sm:pb-5 text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 space-y-2.5 sm:space-y-3 pt-1 border-t border-neutral-200 dark:border-neutral-900/50 bg-neutral-50/50 dark:bg-neutral-950/20">
                    {idx === 0 ? (
                      product.specs.map(spec => (
                        <div key={spec.label} className="flex justify-between border-b border-neutral-200/60 dark:border-neutral-900/40 pb-2 last:border-0 last:pb-0">
                          <span className="font-medium text-neutral-400 dark:text-neutral-500">{spec.label}</span>
                          <span className="text-neutral-800 dark:text-neutral-300 font-mono text-right text-[11px] sm:text-xs">{spec.value}</span>
                        </div>
                      ))
                    ) : (
                      <p className="leading-relaxed text-[11px] sm:text-xs">
                        Includes premium localized signature delivery packaging, completely tracking-enabled ecosystem dispatch, and eligible 2-year technical shield warranty options.
                      </p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};