import { useQuery } from '@tanstack/react-query';

const fetchMegaCatalog = async () => {
  // Pull a large, varied catalog pool from DummyJSON
  const response = await fetch('https://dummyjson.com/products?limit=100');
  if (!response.ok) throw new Error('Catalog network breach');
  const data = await response.json();

  // Normalize data and inject semantic keyword mapping for flexible search
  return data.products.map((item) => {
    // Semantic Tag Association Mapping
    const semanticKeywords = [];
    const cat = item.category.toLowerCase();
    const title = item.title.toLowerCase();

    if (cat.includes('watch') || title.includes('time') || title.includes('chrono')) {
      semanticKeywords.push('watches', 'wrist', 'clock', 'timepiece', 'luxury');
    }
    if (cat.includes('phone') || cat.includes('mobile') || title.includes('iphone')) {
      semanticKeywords.push('smartphone', 'cell', 'mobile', 'device', 'apple', 'android');
    }
    if (cat.includes('laptop') || title.includes('macbook') || title.includes('pc')) {
      semanticKeywords.push('computer', 'laptop', 'workstation', 'notebook', 'dev');
    }

    return {
      id: `live-mega-${item.id}`,
      name: item.title,
      tagline: item.brand || "Ecosystem Original",
      category: item.category,
      basePrice: Math.floor(item.price),
      rating: item.rating,
      stock: item.stock,
      description: item.description,
      // Fallback clean placeholder arrays for images
      colors: [
        { name: "Default Premium", hex: "#111111", image: item.thumbnail },
        { name: "Alloy Steel", hex: "#71717a", image: item.images[0] || item.thumbnail }
      ],
      storageOptions: ["Standard Structure"],
      specs: [
        { label: "Brand Origin", value: item.brand || "Generic Ecosystem" },
        { label: "Stock Reserves", value: `${item.stock} tracking units remaining` },
        { label: "Discount Factor", value: `${item.discountPercentage}% OFF applied` }
      ],
      keywords: semanticKeywords
    };
  });
};

export const useProducts = () => {
  return useQuery({
    queryKey: ['mega-products'],
    queryFn: async () => {
      // Enforces that the preloader stays visible for at least 1500ms
      // to let the custom animations complete beautifully.
      const [data] = await Promise.all([
        fetchMegaCatalog(),
        new Promise(resolve => setTimeout(resolve, 3000)) 
      ]);
      return data;
    },
    staleTime: 1000 * 60 * 15,
  });
};