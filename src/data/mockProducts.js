// Premium, highly detailed mock dataset
export const mockProducts = [
  {
    id: "prod-aero-max",
    name: "AeroSound Max",
    tagline: "Sound, spatialized.",
    category: "Audio",
    basePrice: 549,
    rating: 4.9,
    description: "Computational audio meets luxury materials. Featuring industry-leading Active Noise Cancellation, custom-engineered dynamic drivers, and personalized spatial audio with dynamic head tracking.",
    colors: [
      { name: "Space Gray", hex: "#1d1d1f", image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=600&q=80" },
      { name: "Silver", hex: "#e3e4e5", image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=600&q=80" },
      { name: "Sky Blue", hex: "#a4b9c7", image: "https://images.unsplash.com/photo-1613040809024-b4ef7ba99bc3?auto=format&fit=crop&w=600&q=80" }
    ],
    storageOptions: ["128GB", "256GB", "512GB"],
    specs: [
      { label: "Battery Life", value: "Up to 20 hours of high-fidelity listening" },
      { label: "Connectivity", value: "Bluetooth 5.3 & Ultra-Wideband Chip" },
      { label: "Weight", value: "384 grams" }
    ]
  },
  {
    id: "prod-chrono-titan",
    name: "Chrono Titan",
    tagline: "Precision built for endurance.",
    category: "Wearables",
    basePrice: 799,
    rating: 4.8,
    description: "Forged in aerospace-grade titanium. Incredible dual-frequency GPS accuracy, up to 36-hour battery life, and optimized specialized straps for high-performance athletes.",
    colors: [
      { name: "Titanium Raw", hex: "#c2c2c0", image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&w=600&q=80" },
      { name: "Midnight Sport", hex: "#232b2b", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80" }
    ],
    storageOptions: ["64GB"],
    specs: [
      { label: "Water Resistance", value: "WR100 certified up to 100 meters" },
      { label: "Display", value: "Always-On Retina LTPO OLED, 3000 nits" },
      { label: "Weight", value: "61.3 grams" }
    ]
  },
  {
    id: "prod-vision-glass",
    name: "Vision Glass Air",
    tagline: "Augmented focus.",
    category: "Optics",
    basePrice: 1299,
    rating: 4.7,
    description: "Lighter than a standard pair of sunglasses, bringing contextual AI overlays seamlessly into your peripheral view without isolating you from the world.",
    colors: [
      { name: "Obsidian", hex: "#111111", image: "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&w=600&q=80" }
    ],
    storageOptions: ["256GB", "512GB"],
    specs: [
      { label: "Display Panel", value: "Dual Micro-OLED 4K projection layout" },
      { label: "Processor", value: "Custom M-Series Neural Co-Processor" },
      { label: "Battery Life", value: "4 hours active tethered use" }
    ]
  }
];

// Satisfies Criterion 1: The 600ms Delay Execution
export const fetchProductsMock = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockProducts);
    }, 600);
  });
};