import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '../store/useCartStore';

export const CartOverlay = () => {
  const { isOpen, closeCart, cartItems, updateQuantity, removeFromCart, clearCart } = useCartStore();
  
  // Advanced Checkout Steps Trackers: 'bag' | 'processing' | 'receipt'
  const [checkoutStage, setCheckoutStage] = useState('bag');

  const cartSubtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // Freeze the random order ID so it doesn't shift on minor layout recalculations
  const orderId = useMemo(() => Math.floor(Math.random() * 900000 + 100000), [checkoutStage === 'receipt']);

  const executeMockCheckoutStep = () => {
    setCheckoutStage('processing');
    setTimeout(() => {
      setCheckoutStage('receipt');
    }, 2200); // Realistic payment routing delay sequence
  };

  const handlesCloseReset = () => {
    closeCart();
    // Delay resetting back to standard layout until closing transitions complete
    setTimeout(() => {
      setCheckoutStage('bag');
    }, 300);
  };

  const handleOrderCompletion = () => {
    clearCart();
    handlesCloseReset();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Overlay */}
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            onClick={handlesCloseReset} 
            className="fixed inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-xs z-50" 
          />

          {/* Slide-over Container Drawer */}
          <motion.div
            initial={{ x: '100%' }} 
            animate={{ x: 0 }} 
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 26, stiffness: 210 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white dark:bg-neutral-900 shadow-2xl z-50 flex flex-col border-l border-neutral-200 dark:border-neutral-850 text-neutral-800 dark:text-neutral-200 transition-colors duration-300"
          >
            {/* Header Area */}
            <div className="p-4 sm:p-6 border-b border-neutral-100 dark:border-neutral-950 flex justify-between items-center bg-white/50 dark:bg-neutral-900/50">
              <div>
                <h2 className="text-lg sm:text-xl font-bold tracking-tight text-neutral-950 dark:text-white transition-colors">
                  {checkoutStage === 'bag' && 'Your Bag'}
                  {checkoutStage === 'processing' && 'Processing Validation'}
                  {checkoutStage === 'receipt' && 'Transaction Secured'}
                </h2>
                <p className="text-[9px] sm:text-[10px] font-mono text-neutral-400 dark:text-neutral-500 uppercase tracking-wider mt-0.5">Fulfillment API Sandbox</p>
              </div>
              <button 
                onClick={handlesCloseReset} 
                className="w-7 h-7 rounded-lg bg-neutral-100 dark:bg-neutral-950 flex items-center justify-center text-xs text-neutral-500 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Stage Content Switch Maps */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6">
              
              {/* STAGE 1: Standard Items Bag View */}
              {checkoutStage === 'bag' && (
                cartItems.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center">
                    <p className="text-neutral-400 dark:text-neutral-500 text-xs sm:text-sm font-medium font-mono">BAG IS CURRENTLY EMPTY // 0x0</p>
                  </div>
                ) : (
                  <div className="space-y-3 sm:space-y-4">
                    {cartItems.map((item) => (
                      <div key={item.instanceId} className="flex items-center space-x-3 sm:space-x-4 p-3 rounded-xl border border-neutral-200 dark:border-neutral-950 bg-neutral-50 dark:bg-neutral-950/30 transition-colors">
                        <img 
                          src={item.color.image} 
                          alt={item.name} 
                          className="w-12 h-12 object-contain bg-white dark:bg-neutral-950 rounded-lg p-1 border border-neutral-200 dark:border-neutral-900 shrink-0 mix-blend-multiply dark:mix-blend-lighten" 
                        />
                        <div className="flex-1 min-w-0 text-left">
                          <h4 className="text-xs font-bold text-neutral-950 dark:text-white truncate transition-colors">{item.name}</h4>
                          <p className="text-[10px] text-neutral-400 dark:text-neutral-500 font-mono mt-0.5 truncate uppercase">{item.storage} // {item.color.name}</p>
                          <div className="flex items-center space-x-2 mt-1.5">
                            <button 
                              onClick={() => updateQuantity(item.instanceId, -1)} 
                              className="w-4 h-4 bg-neutral-200 dark:bg-neutral-950 rounded flex items-center justify-center text-[10px] font-black text-neutral-600 dark:text-neutral-400 hover:bg-neutral-300 dark:hover:text-white transition-colors"
                            >
                              -
                            </button>
                            <span className="text-[10px] font-mono font-bold text-neutral-800 dark:text-neutral-300">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.instanceId, 1)} 
                              className="w-4 h-4 bg-neutral-200 dark:bg-neutral-950 rounded flex items-center justify-center text-[10px] font-black text-neutral-600 dark:text-neutral-400 hover:bg-neutral-300 dark:hover:text-white transition-colors"
                            >
                              +
                            </button>
                          </div>
                        </div>
                        <div className="text-right flex flex-col justify-between items-end h-12 shrink-0">
                          <span className="text-xs font-mono font-bold text-neutral-950 dark:text-white">${item.price * item.quantity}</span>
                          <button 
                            onClick={() => removeFromCart(item.instanceId)} 
                            className="text-[9px] uppercase tracking-wider text-neutral-400 dark:text-neutral-600 hover:text-red-500 dark:hover:text-red-400 transition-colors font-bold font-mono"
                          >
                            Drop
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )
              )}

              {/* STAGE 2: Loader Animation Wheels */}
              {checkoutStage === 'processing' && (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-9 h-9 border-2 border-neutral-200 dark:border-neutral-800 border-t-neutral-950 dark:border-t-white rounded-full animate-spin" />
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-neutral-950 dark:text-white tracking-wide uppercase font-mono">Securing Handshakes...</p>
                    <p className="text-[10px] text-neutral-500 dark:text-neutral-400 max-w-xs font-sans px-4">Authorizing dynamic configurations across simulated checkout matrix channels.</p>
                  </div>
                </div>
              )}

              {/* STAGE 3: Receipt Manifest */}
              {checkoutStage === 'receipt' && (
                <div className="space-y-5 py-2 font-mono text-xs">
                  <div className="text-center pb-5 border-b border-dashed border-neutral-200 dark:border-neutral-800 space-y-1.5">
                    <span className="text-2xl">🎉</span>
                    <h3 className="text-xs sm:text-sm font-bold text-neutral-950 dark:text-white uppercase tracking-wider">Fulfillment Confirmed</h3>
                    <p className="text-[10px] text-neutral-400 dark:text-neutral-500">Order Ref: AMZN-LIVE-{orderId}</p>
                  </div>
                  
                  <div className="space-y-2.5 bg-neutral-50 dark:bg-neutral-950/40 p-4 rounded-xl border border-neutral-200 dark:border-neutral-950 text-left">
                    <div className="text-[9px] sm:text-[10px] uppercase font-black text-neutral-400 dark:text-neutral-500 tracking-wider mb-1.5">Manifest Breakdown</div>
                    <div className="flex justify-between items-center text-[11px] text-neutral-600 dark:text-neutral-400">
                      <span>Fulfillment Mode</span>
                      <span className="text-green-600 dark:text-green-400 font-bold text-right text-[10px]">Complimentary Premium</span>
                    </div>
                    <div className="flex justify-between items-center text-[11px] text-neutral-600 dark:text-neutral-400">
                      <span>Destination Grid</span>
                      <span className="text-neutral-950 dark:text-white text-right">Secure Delivery Hub</span>
                    </div>
                    <div className="flex justify-between items-center text-neutral-950 dark:text-white font-bold text-sm pt-2.5 border-t border-neutral-200 dark:border-neutral-900 mt-2">
                      <span>Total Settled</span>
                      <span>${cartSubtotal}</span>
                    </div>
                  </div>

                  <p className="text-[10px] leading-relaxed text-neutral-400 dark:text-neutral-500 font-sans text-center px-2">
                    A sandbox tracing snapshot has been successfully output to your environment's layout ledger.
                  </p>
                </div>
              )}
            </div>

            {/* Footer Control Actions */}
            {cartItems.length > 0 && checkoutStage !== 'processing' && (
              <div className="p-4 sm:p-6 border-t border-neutral-100 dark:border-neutral-950 bg-neutral-50/50 dark:bg-neutral-950/20 space-y-4">
                {checkoutStage === 'bag' ? (
                  <>
                    <div className="flex justify-between items-center text-xs font-mono">
                      <span className="text-neutral-400 dark:text-neutral-500 uppercase font-bold">Subtotal Matrix</span>
                      <span className="text-base font-black text-neutral-950 dark:text-white">${cartSubtotal}</span>
                    </div>
                    <button 
                      onClick={executeMockCheckoutStep} 
                      className="w-full py-3 bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 font-black text-xs tracking-wider uppercase rounded-xl hover:opacity-90 active:scale-[0.98] transition-all shadow-md"
                    >
                      Secure Checkout Console
                    </button>
                  </>
                ) : (
                  <button 
                    onClick={handleOrderCompletion} 
                    className="w-full py-3 bg-neutral-200 dark:bg-neutral-800 text-neutral-950 dark:text-white font-bold text-xs tracking-wider uppercase rounded-xl hover:bg-neutral-300 dark:hover:bg-neutral-700 transition-colors"
                  >
                    Close Manifest & Reset Bag
                  </button>
                )}
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};