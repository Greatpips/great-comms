import { motion } from 'framer-motion';

export const Preloader = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} // Premium custom cubic bezier curve
      className="fixed inset-0 bg-neutral-50 dark:bg-neutral-950 z-50 flex flex-col items-center justify-center space-y-6 select-none transition-colors duration-300"
    >
      <div className="flex flex-col items-center space-y-2 text-center">
        {/* Animated Brand Identity */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="font-black text-xl tracking-tighter text-neutral-950 dark:text-white font-mono transition-colors"
        >
          🎛️ CAPSTONE.<span className="font-light text-neutral-400 dark:text-neutral-500">CORE</span>
        </motion.div>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-[9px] font-mono tracking-widest text-neutral-400 dark:text-neutral-600 uppercase transition-colors"
        >
          Initializing Operational Network Layer
        </motion.p>
      </div>

      {/* The Premium Infinite Loading Core Line */}
      <div className="w-32 h-[1px] bg-neutral-200 dark:bg-neutral-900 rounded-full overflow-hidden relative transition-colors">
        <motion.div 
          initial={{ left: "-100%", width: "30%" }}
          animate={{ left: "100%" }}
          transition={{ 
            repeat: Infinity, 
            duration: 1.4, 
            ease: "easeInOut" 
          }}
          className="absolute top-0 bottom-0 bg-neutral-950 dark:bg-white transition-colors"
        />
      </div>
    </motion.div>
  );
};