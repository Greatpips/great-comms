import { motion } from 'framer-motion';
import { useProducts } from '../hooks/useProducts';

export const HomeHub = ({ setCurrentView }) => {
  const { data: products } = useProducts();

  // Pull out key hero elements for featured display placements
  const featuredProduct = products?.[0];

  // Animation orchestration containers
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { type: 'spring', stiffness: 100, damping: 20 } 
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 transition-colors duration-300 overflow-hidden">
      
      {/* SECTION 1: Fullscreen Cinematographic Hero Display */}
      <section className="relative min-h-screen w-full flex flex-col items-center justify-center text-center px-4 sm:px-6 bg-radial-[at_50%_40%] from-neutral-200/50 via-neutral-50 to-neutral-50 dark:from-neutral-900 dark:via-neutral-950 dark:to-neutral-950">
        
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="max-w-4xl space-y-4 sm:space-y-6 z-10 pt-12"
        >
          <motion.span 
            variants={itemVariants}
            className="text-[10px] sm:text-xs font-black tracking-widest uppercase text-neutral-400 dark:text-neutral-500 font-mono"
          >
            Ecosystem Portfolio Blueprint
          </motion.span>
          
          <motion.h1 
            variants={itemVariants}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-neutral-950 dark:text-white leading-[1.05] sm:leading-[0.95]"
          >
            Tomorrow's Design.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-500 via-neutral-800 to-neutral-400 dark:from-neutral-400 dark:via-white dark:to-neutral-500">
              Engineered Today.
            </span>
          </motion.h1>
          
          <motion.p 
            variants={itemVariants}
            className="max-w-xs sm:max-w-xl mx-auto text-xs sm:text-base text-neutral-600 dark:text-neutral-400 font-medium leading-relaxed"
          >
            Experience a curated universe of premium hardware assets seamlessly tied into a unified frontend operational engine.
          </motion.p>

          <motion.div variants={itemVariants} className="pt-2 sm:pt-4 flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4">
            <button
              onClick={() => setCurrentView('shop')}
              className="w-full sm:w-auto px-6 py-3 bg-neutral-950 dark:bg-white hover:bg-neutral-800 dark:hover:bg-neutral-200 text-white dark:text-neutral-950 font-bold text-xs tracking-wider uppercase rounded-full shadow-lg transition-transform active:scale-98"
            >
              Enter Console
            </button>
            <button
              onClick={() => setCurrentView('search')}
              className="w-full sm:w-auto px-6 py-3 bg-white dark:bg-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-850 border border-neutral-300 dark:border-neutral-800 text-neutral-900 dark:text-white font-bold text-xs tracking-wider uppercase rounded-full transition-colors"
            >
              Explore Catalog
            </button>
          </motion.div>
        </motion.div>

        {/* Ambient Subtle Background Graphic Circle elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] sm:w-[500px] h-[280px] sm:h-[500px] bg-neutral-950/[0.02] dark:bg-white/[0.01] rounded-full border border-neutral-950/[0.04] dark:border-white/[0.03] pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] sm:w-[800px] h-[450px] sm:h-[800px] bg-neutral-950/[0.01] dark:bg-white/[0.005] rounded-full border border-neutral-950/[0.02] dark:border-white/[0.01] pointer-events-none" />
      </section>

      {/* SECTION 2: Curated Ecosystem Feature Grid Showcase */}
      {featuredProduct && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-32 border-t border-neutral-200 dark:border-neutral-900/60">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            <div className="lg:col-span-5 space-y-3 sm:space-y-4 text-left order-2 lg:order-1">
              <span className="text-[10px] sm:text-xs font-bold text-neutral-400 dark:text-neutral-500 font-mono uppercase tracking-wider">
                Featured Hardware Showcase
              </span>
              <h2 className="text-xl sm:text-3xl md:text-4xl font-black tracking-tight text-neutral-950 dark:text-white">
                {featuredProduct.name}
              </h2>
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                {featuredProduct.description}
              </p>
              <div className="pt-1 sm:pt-2">
                <button
                  onClick={() => setCurrentView('shop')}
                  className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-neutral-950 dark:text-white underline underline-offset-8 hover:opacity-80 transition-opacity"
                >
                  Configure Hardware Spec Matrix →
                </button>
              </div>
            </div>

            <div className="lg:col-span-7 order-1 lg:order-2 w-full">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="w-full aspect-[4/3] sm:aspect-[16/10] bg-gradient-to-br from-neutral-100 to-neutral-200/50 dark:from-neutral-900 dark:to-neutral-950 rounded-2xl sm:rounded-3xl border border-neutral-200 dark:border-neutral-850 overflow-hidden flex items-center justify-center p-6 sm:p-12 group relative shadow-md"
              >
                <img 
                  src={featuredProduct.colors[0].image} 
                  alt="Featured Hero asset view"
                  className="max-h-full object-contain transform group-hover:scale-103 transition-transform duration-700 mix-blend-multiply dark:mix-blend-lighten"
                />
                <div className="absolute top-4 sm:top-6 left-4 sm:left-6 font-mono text-[9px] sm:text-[10px] text-neutral-400 dark:text-neutral-600">
                  SYSTEM STATUS // ACTIVE
                </div>
              </motion.div>
            </div>

          </div>
        </section>
      )}

    </div>
  );
};