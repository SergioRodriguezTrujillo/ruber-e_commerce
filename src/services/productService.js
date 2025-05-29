// Datos de productos con descripciones únicas y categorías
const products = [
  // PRODUCTOS MÁS VENDIDOS (6 productos)
  {
    id: 1,
    name: "Kit Gamer_AVA Monitor LG",
    price: 230,
    originalPrice: 250,
    discount: 35,
    rating: 5,
    reviewCount: 88,
    colors: ["black", "blue"],
    category: "Gaming",
    image: "/pc.png",
    images: ["/pc.png", "/pc.png", "/pc.png", "/pc.png"],
    description:
      "Kit Gamer completo con monitor LG de alta resolución, PC gaming con procesador de última generación, tarjeta gráfica dedicada y periféricos RGB. Perfecto para gaming competitivo y streaming profesional.",
    specifications: {
      Procesador: "Intel Core i7 11700K",
      "Tarjeta Gráfica": "NVIDIA RTX 3070",
      RAM: "16GB DDR4 3200MHz",
      Almacenamiento: "SSD 1TB NVMe",
      Monitor: 'LG 27" 144Hz IPS',
    },
    sizes: ["XS", "S", "M", "L", "XL"],
    inStock: true,
    isBestSelling: true,
    isMostViewed: false,
  },
  {
    id: 2,
    name: "ROLT-120V",
    price: 135,
    originalPrice: 145,
    discount: 35,
    rating: 4,
    reviewCount: 75,
    colors: ["black", "blue"],
    category: "Procesamiento",
    image: "/mini-pc.png",
    images: ["/mini-pc.png", "/mini-pc.png", "/mini-pc.png", "/mini-pc.png"],
    description:
      "Mini PC ROLT-120V con diseño compacto y rendimiento excepcional. Ideal para espacios reducidos, oficinas y centros de entretenimiento. Conectividad completa y bajo consumo energético para uso diario.",
    specifications: {
      Procesador: "Intel Core i5 10400T",
      "Tarjeta Gráfica": "Intel UHD Graphics 630",
      RAM: "8GB DDR4 2666MHz",
      Almacenamiento: "SSD 256GB NVMe",
      Conectividad: "WiFi 6, Bluetooth 5.1, 4x USB 3.0",
    },
    sizes: ["XS", "S", "M", "L", "XL"],
    inStock: true,
    isBestSelling: true,
    isMostViewed: false,
  },
  {
    id: 3,
    name: "Cable IP67-SORT",
    price: 2.5,
    originalPrice: 3,
    discount: 35,
    rating: 5,
    reviewCount: 99,
    colors: ["black", "blue"],
    category: "Cables",
    image: "/cable.png",
    images: ["/cable.png", "/cable.png", "/cable.png", "/cable.png"],
    description:
      "Cable IP67-SORT resistente al agua y polvo, certificación IP67 para condiciones extremas. Fabricado con materiales de alta calidad para garantizar durabilidad y rendimiento óptimo en cualquier entorno industrial.",
    specifications: {
      Longitud: "1.5 metros",
      Certificación: "IP67 resistente al agua y polvo",
      Material: "PVC de alta resistencia",
      Conectores: "Chapados en oro",
      Compatibilidad: "Universal",
    },
    sizes: ["XS", "S", "M", "L", "XL"],
    inStock: true,
    isBestSelling: true,
    isMostViewed: false,
  },
  {
    id: 4,
    name: "Memoria RAM 16GB RGB 3200Hz",
    price: 10,
    originalPrice: 15,
    discount: 35,
    rating: 5,
    reviewCount: 99,
    colors: ["black", "red"],
    category: "Componentes",
    image: "/ram.png",
    images: ["/ram.png", "/ram.png", "/ram.png", "/ram.png"],
    description:
      "Memoria RAM de 16GB con iluminación RGB personalizable y frecuencia de 3200Hz. Diseñada para overclocking y rendimiento extremo en gaming y aplicaciones exigentes. Disipador térmico de aluminio para mejor refrigeración.",
    specifications: {
      Capacidad: "16GB (2x8GB)",
      Frecuencia: "3200MHz",
      Latencia: "CL16",
      Iluminación: "RGB sincronizable",
      Compatibilidad: "Intel y AMD",
    },
    sizes: ["XS", "S", "M", "L", "XL"],
    inStock: true,
    isBestSelling: true,
    isMostViewed: false,
  },
  {
    id: 5,
    name: "Kit Gamer_AVA Monitor LG Pro",
    price: 280,
    originalPrice: 320,
    discount: 12,
    rating: 5,
    reviewCount: 156,
    colors: ["black", "blue"],
    category: "Gaming",
    image: "/pc.png",
    images: ["/pc.png", "/pc.png", "/pc.png", "/pc.png"],
    description:
      "Kit Gamer Pro con monitor LG de 32 pulgadas, PC gaming con procesador Intel i9, tarjeta gráfica RTX 4070 y periféricos mecánicos RGB. La configuración definitiva para profesionales del gaming y streaming.",
    specifications: {
      Procesador: "Intel Core i9 12900K",
      "Tarjeta Gráfica": "NVIDIA RTX 4070",
      RAM: "32GB DDR4 3600MHz",
      Almacenamiento: "SSD 2TB NVMe",
      Monitor: 'LG 32" 165Hz IPS',
    },
    sizes: ["XS", "S", "M", "L", "XL"],
    inStock: true,
    isBestSelling: true,
    isMostViewed: false,
  },
  {
    id: 6,
    name: "ROLT-120V Advanced",
    price: 185,
    originalPrice: 210,
    discount: 12,
    rating: 4,
    reviewCount: 92,
    colors: ["black", "blue"],
    category: "Procesamiento",
    image: "/mini-pc.png",
    images: ["/mini-pc.png", "/mini-pc.png", "/mini-pc.png", "/mini-pc.png"],
    description:
      "Mini PC ROLT-120V Advanced con procesador de última generación y mayor capacidad de almacenamiento. Perfecto para trabajo profesional y multimedia en espacios compactos con máximo rendimiento.",
    specifications: {
      Procesador: "Intel Core i7 11700T",
      "Tarjeta Gráfica": "Intel Iris Xe Graphics",
      RAM: "16GB DDR4 3200MHz",
      Almacenamiento: "SSD 512GB NVMe",
      Conectividad: "WiFi 6E, Bluetooth 5.2, 6x USB 3.1",
    },
    sizes: ["XS", "S", "M", "L", "XL"],
    inStock: true,
    isBestSelling: true,
    isMostViewed: false,
  },

  // PRODUCTOS MÁS VISTOS (15 productos)
  {
    id: 7,
    name: "Cable IP67-SORT Premium",
    price: 4.5,
    originalPrice: 6,
    discount: 25,
    rating: 5,
    reviewCount: 234,
    colors: ["black", "blue"],
    category: "Cables",
    image: "/cable.png",
    images: ["/cable.png", "/cable.png", "/cable.png", "/cable.png"],
    description:
      "Cable IP67-SORT Premium con conectores reforzados y mayor longitud. Certificación IP67 mejorada para uso industrial y condiciones extremas. Garantía extendida de 5 años para máxima confiabilidad.",
    specifications: {
      Longitud: "3 metros",
      Certificación: "IP67 Premium resistente al agua y polvo",
      Material: "PVC reforzado con kevlar",
      Conectores: "Chapados en oro 24k",
      Compatibilidad: "Universal Plus",
    },
    sizes: ["XS", "S", "M", "L", "XL"],
    inStock: true,
    isBestSelling: false,
    isMostViewed: true,
  },
  {
    id: 8,
    name: "Memoria RAM 32GB RGB 3600Hz",
    price: 25,
    originalPrice: 35,
    discount: 29,
    rating: 5,
    reviewCount: 187,
    colors: ["black", "red"],
    category: "Componentes",
    image: "/ram.png",
    images: ["/ram.png", "/ram.png", "/ram.png", "/ram.png"],
    description:
      "Memoria RAM de 32GB con iluminación RGB avanzada y frecuencia de 3600Hz. Optimizada para workstations y gaming extremo. Disipador térmico de cobre para máximo rendimiento y estabilidad térmica.",
    specifications: {
      Capacidad: "32GB (2x16GB)",
      Frecuencia: "3600MHz",
      Latencia: "CL14",
      Iluminación: "RGB Avanzado sincronizable",
      Compatibilidad: "Intel y AMD DDR4",
    },
    sizes: ["XS", "S", "M", "L", "XL"],
    inStock: true,
    isBestSelling: false,
    isMostViewed: true,
  },
  {
    id: 9,
    name: "Kit Gamer_AVA Monitor Samsung",
    price: 195,
    originalPrice: 230,
    discount: 15,
    rating: 4,
    reviewCount: 143,
    colors: ["black", "blue"],
    category: "Gaming",
    image: "/pc.png",
    images: ["/pc.png", "/pc.png", "/pc.png", "/pc.png"],
    description:
      "Kit Gamer con monitor Samsung curvo, PC gaming optimizado para 1440p y periféricos inalámbricos. Excelente relación calidad-precio para gamers intermedios que buscan inmersión total.",
    specifications: {
      Procesador: "AMD Ryzen 5 5600X",
      "Tarjeta Gráfica": "NVIDIA RTX 3060",
      RAM: "16GB DDR4 3200MHz",
      Almacenamiento: "SSD 500GB NVMe",
      Monitor: 'Samsung 27" 144Hz Curvo',
    },
    sizes: ["XS", "S", "M", "L", "XL"],
    inStock: true,
    isBestSelling: false,
    isMostViewed: true,
  },
  {
    id: 10,
    name: "ROLT-120V Compact",
    price: 95,
    originalPrice: 115,
    discount: 17,
    rating: 4,
    reviewCount: 67,
    colors: ["black", "blue"],
    category: "Procesamiento",
    image: "/mini-pc.png",
    images: ["/mini-pc.png", "/mini-pc.png", "/mini-pc.png", "/mini-pc.png"],
    description:
      "Mini PC ROLT-120V Compact, la versión más pequeña y eficiente. Ideal para uso básico, oficina y streaming multimedia. Consumo ultra bajo y funcionamiento silencioso para entornos de trabajo.",
    specifications: {
      Procesador: "Intel Celeron N5105",
      "Tarjeta Gráfica": "Intel UHD Graphics",
      RAM: "8GB DDR4 2400MHz",
      Almacenamiento: "SSD 128GB eMMC",
      Conectividad: "WiFi 5, Bluetooth 4.2, 4x USB 2.0",
    },
    sizes: ["XS", "S", "M", "L", "XL"],
    inStock: true,
    isBestSelling: false,
    isMostViewed: true,
  },
  {
    id: 11,
    name: "Cable IP67-SORT Industrial",
    price: 8.5,
    originalPrice: 12,
    discount: 29,
    rating: 5,
    reviewCount: 298,
    colors: ["black", "blue"],
    category: "Cables",
    image: "/cable.png",
    images: ["/cable.png", "/cable.png", "/cable.png", "/cable.png"],
    description:
      "Cable IP67-SORT Industrial para aplicaciones pesadas. Resistente a químicos, temperaturas extremas y vibraciones. Certificado para uso en maquinaria industrial y entornos hostiles.",
    specifications: {
      Longitud: "5 metros",
      Certificación: "IP67 Industrial + químicos",
      Material: "TPU industrial reforzado",
      Conectores: "Acero inoxidable",
      Compatibilidad: "Industrial Universal",
    },
    sizes: ["XS", "S", "M", "L", "XL"],
    inStock: true,
    isBestSelling: false,
    isMostViewed: true,
  },
  {
    id: 12,
    name: "Memoria RAM 8GB RGB 2666Hz",
    price: 6,
    originalPrice: 9,
    discount: 33,
    rating: 4,
    reviewCount: 156,
    colors: ["black", "red"],
    category: "Componentes",
    image: "/ram.png",
    images: ["/ram.png", "/ram.png", "/ram.png", "/ram.png"],
    description:
      "Memoria RAM de 8GB con iluminación RGB básica y frecuencia de 2666Hz. Perfecta para builds de entrada y upgrades económicos. Excelente estabilidad y compatibilidad con sistemas básicos.",
    specifications: {
      Capacidad: "8GB (1x8GB)",
      Frecuencia: "2666MHz",
      Latencia: "CL19",
      Iluminación: "RGB Básico",
      Compatibilidad: "Intel y AMD DDR4",
    },
    sizes: ["XS", "S", "M", "L", "XL"],
    inStock: true,
    isBestSelling: false,
    isMostViewed: true,
  },
  {
    id: 13,
    name: "Kit Gamer_AVA Monitor ASUS",
    price: 340,
    originalPrice: 400,
    discount: 15,
    rating: 5,
    reviewCount: 89,
    colors: ["black", "blue"],
    category: "Gaming",
    image: "/pc.png",
    images: ["/pc.png", "/pc.png", "/pc.png", "/pc.png"],
    description:
      "Kit Gamer premium con monitor ASUS ROG, PC gaming de alta gama con refrigeración líquida y periféricos profesionales. Para enthusiasts y competidores profesionales que buscan el máximo rendimiento.",
    specifications: {
      Procesador: "Intel Core i9 13900K",
      "Tarjeta Gráfica": "NVIDIA RTX 4080",
      RAM: "32GB DDR5 5600MHz",
      Almacenamiento: "SSD 2TB NVMe Gen4",
      Monitor: 'ASUS ROG 27" 240Hz IPS',
    },
    sizes: ["XS", "S", "M", "L", "XL"],
    inStock: true,
    isBestSelling: false,
    isMostViewed: true,
  },
  {
    id: 14,
    name: "ROLT-120V Gaming",
    price: 245,
    originalPrice: 280,
    discount: 12,
    rating: 4,
    reviewCount: 78,
    colors: ["black", "blue"],
    category: "Procesamiento",
    image: "/mini-pc.png",
    images: ["/mini-pc.png", "/mini-pc.png", "/mini-pc.png", "/mini-pc.png"],
    description:
      "Mini PC ROLT-120V Gaming con tarjeta gráfica dedicada. Compacto pero potente, ideal para gaming casual y trabajo creativo en espacios reducidos sin comprometer el rendimiento.",
    specifications: {
      Procesador: "AMD Ryzen 7 5700G",
      "Tarjeta Gráfica": "AMD Radeon RX 6400",
      RAM: "16GB DDR4 3200MHz",
      Almacenamiento: "SSD 1TB NVMe",
      Conectividad: "WiFi 6, Bluetooth 5.1, 6x USB 3.0",
    },
    sizes: ["XS", "S", "M", "L", "XL"],
    inStock: true,
    isBestSelling: false,
    isMostViewed: true,
  },
  {
    id: 15,
    name: "Cable IP67-SORT Flexible",
    price: 3.5,
    originalPrice: 5,
    discount: 30,
    rating: 4,
    reviewCount: 167,
    colors: ["black", "blue"],
    category: "Cables",
    image: "/cable.png",
    images: ["/cable.png", "/cable.png", "/cable.png", "/cable.png"],
    description:
      "Cable IP67-SORT Flexible con diseño ultra flexible para instalaciones complejas. Mantiene certificación IP67 con máxima flexibilidad y durabilidad para aplicaciones que requieren movimiento constante.",
    specifications: {
      Longitud: "2 metros",
      Certificación: "IP67 Flexible",
      Material: "Silicona flexible reforzada",
      Conectores: "Chapados en níquel",
      Compatibilidad: "Universal Flexible",
    },
    sizes: ["XS", "S", "M", "L", "XL"],
    inStock: true,
    isBestSelling: false,
    isMostViewed: true,
  },
  {
    id: 16,
    name: "Memoria RAM 64GB RGB 4000Hz",
    price: 85,
    originalPrice: 120,
    discount: 29,
    rating: 5,
    reviewCount: 45,
    colors: ["black", "red"],
    category: "Componentes",
    image: "/ram.png",
    images: ["/ram.png", "/ram.png", "/ram.png", "/ram.png"],
    description:
      "Memoria RAM de 64GB con iluminación RGB profesional y frecuencia de 4000Hz. Para workstations profesionales, servidores y aplicaciones que requieren máxima memoria y rendimiento extremo.",
    specifications: {
      Capacidad: "64GB (4x16GB)",
      Frecuencia: "4000MHz",
      Latencia: "CL18",
      Iluminación: "RGB Profesional",
      Compatibilidad: "Intel y AMD DDR4 Quad Channel",
    },
    sizes: ["XS", "S", "M", "L", "XL"],
    inStock: true,
    isBestSelling: false,
    isMostViewed: true,
  },
  {
    id: 17,
    name: "Kit Gamer_AVA Monitor Dell",
    price: 165,
    originalPrice: 195,
    discount: 15,
    rating: 4,
    reviewCount: 112,
    colors: ["black", "blue"],
    category: "Gaming",
    image: "/pc.png",
    images: ["/pc.png", "/pc.png", "/pc.png", "/pc.png"],
    description:
      "Kit Gamer con monitor Dell IPS, PC gaming equilibrado para 1080p y periféricos con cable. Excelente opción para gamers que buscan calidad y precio justo sin comprometer la experiencia.",
    specifications: {
      Procesador: "AMD Ryzen 5 4600G",
      "Tarjeta Gráfica": "NVIDIA GTX 1660 Super",
      RAM: "16GB DDR4 2933MHz",
      Almacenamiento: "SSD 256GB + HDD 1TB",
      Monitor: 'Dell 24" 75Hz IPS',
    },
    sizes: ["XS", "S", "M", "L", "XL"],
    inStock: true,
    isBestSelling: false,
    isMostViewed: true,
  },
  {
    id: 18,
    name: "ROLT-120V Office",
    price: 125,
    originalPrice: 145,
    discount: 14,
    rating: 4,
    reviewCount: 134,
    colors: ["black", "blue"],
    category: "Procesamiento",
    image: "/mini-pc.png",
    images: ["/mini-pc.png", "/mini-pc.png", "/mini-pc.png", "/mini-pc.png"],
    description:
      "Mini PC ROLT-120V Office optimizado para productividad empresarial. Incluye software de oficina preinstalado y soporte técnico extendido para empresas que buscan eficiencia y confiabilidad.",
    specifications: {
      Procesador: "Intel Core i3 10100T",
      "Tarjeta Gráfica": "Intel UHD Graphics 630",
      RAM: "8GB DDR4 2666MHz",
      Almacenamiento: "SSD 256GB NVMe",
      Conectividad: "WiFi 6, Bluetooth 5.0, 4x USB 3.0",
    },
    sizes: ["XS", "S", "M", "L", "XL"],
    inStock: true,
    isBestSelling: false,
    isMostViewed: true,
  },
  {
    id: 19,
    name: "Cable IP67-SORT USB-C",
    price: 12,
    originalPrice: 18,
    discount: 33,
    rating: 5,
    reviewCount: 203,
    colors: ["black", "blue"],
    category: "Cables",
    image: "/cable.png",
    images: ["/cable.png", "/cable.png", "/cable.png", "/cable.png"],
    description:
      "Cable IP67-SORT con conectores USB-C de última generación. Soporte para carga rápida, transferencia de datos y video 4K. Certificación IP67 para uso en exteriores y condiciones adversas.",
    specifications: {
      Longitud: "2 metros",
      Certificación: "IP67 + USB-C 3.2",
      Material: "Nylon trenzado resistente",
      Conectores: "USB-C chapados en oro",
      Compatibilidad: "USB-C Universal + Thunderbolt 3",
    },
    sizes: ["XS", "S", "M", "L", "XL"],
    inStock: true,
    isBestSelling: false,
    isMostViewed: true,
  },
  {
    id: 20,
    name: "Memoria RAM 128GB ECC 2933Hz",
    price: 245,
    originalPrice: 320,
    discount: 23,
    rating: 5,
    reviewCount: 23,
    colors: ["black", "red"],
    category: "Componentes",
    image: "/ram.png",
    images: ["/ram.png", "/ram.png", "/ram.png", "/ram.png"],
    description:
      "Memoria RAM ECC de 128GB para servidores y workstations profesionales. Corrección de errores automática y máxima estabilidad para aplicaciones críticas que requieren confiabilidad absoluta.",
    specifications: {
      Capacidad: "128GB (4x32GB)",
      Frecuencia: "2933MHz",
      Latencia: "CL21",
      Tipo: "ECC Registered",
      Compatibilidad: "Intel Xeon y AMD EPYC",
    },
    sizes: ["XS", "S", "M", "L", "XL"],
    inStock: true,
    isBestSelling: false,
    isMostViewed: true,
  },
  {
    id: 21,
    name: "Kit Gamer_AVA Monitor AOC",
    price: 145,
    originalPrice: 170,
    discount: 15,
    rating: 4,
    reviewCount: 98,
    colors: ["black", "blue"],
    category: "Gaming",
    image: "/pc.png",
    images: ["/pc.png", "/pc.png", "/pc.png", "/pc.png"],
    description:
      "Kit Gamer con monitor AOC gaming, PC optimizado para esports y periféricos básicos. Configuración ideal para jugadores competitivos con presupuesto ajustado que buscan rendimiento en esports.",
    specifications: {
      Procesador: "Intel Core i3 12100F",
      "Tarjeta Gráfica": "NVIDIA GTX 1650",
      RAM: "8GB DDR4 3200MHz",
      Almacenamiento: "SSD 240GB",
      Monitor: 'AOC 24" 144Hz TN',
    },
    sizes: ["XS", "S", "M", "L", "XL"],
    inStock: true,
    isBestSelling: false,
    isMostViewed: true,
  },

  // PRODUCTOS ADICIONALES (para completar el catálogo general)
  {
    id: 22,
    name: "Procesador Intel Core i9",
    price: 450,
    originalPrice: 520,
    discount: 13,
    rating: 5,
    reviewCount: 67,
    colors: ["black", "blue"],
    category: "Procesamiento",
    image: "/pc.png",
    images: ["/pc.png", "/pc.png", "/pc.png", "/pc.png"],
    description:
      "Procesador Intel Core i9 de última generación con 16 núcleos y 24 hilos. Perfecto para gaming extremo, streaming y aplicaciones profesionales que requieren máximo poder de procesamiento.",
    specifications: {
      Núcleos: "16 núcleos / 24 hilos",
      "Frecuencia Base": "3.2 GHz",
      "Frecuencia Turbo": "5.8 GHz",
      Cache: "30MB L3",
      Socket: "LGA 1700",
    },
    sizes: ["XS", "S", "M", "L", "XL"],
    inStock: true,
    isBestSelling: false,
    isMostViewed: false,
  },
  {
    id: 23,
    name: "Tarjeta Gráfica RTX 4090",
    price: 1200,
    originalPrice: 1400,
    discount: 14,
    rating: 5,
    reviewCount: 89,
    colors: ["black", "blue"],
    category: "Componentes",
    image: "/pc.png",
    images: ["/pc.png", "/pc.png", "/pc.png", "/pc.png"],
    description:
      "Tarjeta gráfica NVIDIA RTX 4090, la más potente del mercado. Ray tracing avanzado, DLSS 3.0 y rendimiento excepcional en 4K para la experiencia gaming definitiva.",
    specifications: {
      GPU: "NVIDIA GeForce RTX 4090",
      "Memoria VRAM": "24GB GDDR6X",
      "Núcleos CUDA": "16384",
      "Frecuencia Base": "2230 MHz",
      "Frecuencia Boost": "2520 MHz",
    },
    sizes: ["XS", "S", "M", "L", "XL"],
    inStock: true,
    isBestSelling: false,
    isMostViewed: false,
  },
  // Productos adicionales para otras categorías
  {
    id: 24,
    name: "Router WiFi 6 Pro",
    price: 89,
    originalPrice: 120,
    discount: 26,
    rating: 4,
    reviewCount: 156,
    colors: ["black", "blue"],
    category: "Redes",
    image: "/mini-pc.png",
    images: ["/mini-pc.png", "/mini-pc.png", "/mini-pc.png", "/mini-pc.png"],
    description: "Router WiFi 6 de alta velocidad para redes domésticas y empresariales.",
    specifications: {},
    sizes: ["XS", "S", "M", "L", "XL"],
    inStock: true,
    isBestSelling: false,
    isMostViewed: false,
  },
  {
    id: 25,
    name: "Disco SSD 1TB NVMe",
    price: 75,
    originalPrice: 95,
    discount: 21,
    rating: 5,
    reviewCount: 234,
    colors: ["black", "red"],
    category: "Almacenamiento",
    image: "/ram.png",
    images: ["/ram.png", "/ram.png", "/ram.png", "/ram.png"],
    description: "Disco SSD NVMe de 1TB con velocidades de lectura ultra rápidas.",
    specifications: {},
    sizes: ["XS", "S", "M", "L", "XL"],
    inStock: true,
    isBestSelling: false,
    isMostViewed: false,
  },
  {
    id: 26,
    name: "Switch Gigabit 24 Puertos",
    price: 145,
    originalPrice: 180,
    discount: 19,
    rating: 4,
    reviewCount: 89,
    colors: ["black", "blue"],
    category: "Enrutamiento",
    image: "/mini-pc.png",
    images: ["/mini-pc.png", "/mini-pc.png", "/mini-pc.png", "/mini-pc.png"],
    description: "Switch Gigabit de 24 puertos para redes empresariales.",
    specifications: {},
    sizes: ["XS", "S", "M", "L", "XL"],
    inStock: true,
    isBestSelling: false,
    isMostViewed: false,
  },
  {
    id: 27,
    name: "Teléfono IP Empresarial",
    price: 65,
    originalPrice: 85,
    discount: 24,
    rating: 4,
    reviewCount: 67,
    colors: ["black", "blue"],
    category: "Comunicación",
    image: "/mini-pc.png",
    images: ["/mini-pc.png", "/mini-pc.png", "/mini-pc.png", "/mini-pc.png"],
    description: "Teléfono IP para comunicaciones empresariales VoIP.",
    specifications: {},
    sizes: ["XS", "S", "M", "L", "XL"],
    inStock: true,
    isBestSelling: false,
    isMostViewed: false,
  },
  {
    id: 28,
    name: "Teclado Mecánico RGB",
    price: 45,
    originalPrice: 60,
    discount: 25,
    rating: 5,
    reviewCount: 178,
    colors: ["black", "red"],
    category: "Accesorios",
    image: "/cable.png",
    images: ["/cable.png", "/cable.png", "/cable.png", "/cable.png"],
    description: "Teclado mecánico con switches Cherry MX e iluminación RGB.",
    specifications: {},
    sizes: ["XS", "S", "M", "L", "XL"],
    inStock: true,
    isBestSelling: false,
    isMostViewed: false,
  },
  {
    id: 29,
    name: "Mouse Gaming Inalámbrico",
    price: 35,
    originalPrice: 50,
    discount: 30,
    rating: 4,
    reviewCount: 145,
    colors: ["black", "red"],
    category: "Accesorios",
    image: "/cable.png",
    images: ["/cable.png", "/cable.png", "/cable.png", "/cable.png"],
    description: "Mouse gaming inalámbrico con sensor óptico de alta precisión.",
    specifications: {},
    sizes: ["XS", "S", "M", "L", "XL"],
    inStock: true,
    isBestSelling: false,
    isMostViewed: false,
  },
  {
    id: 30,
    name: "Webcam 4K Ultra HD",
    price: 55,
    originalPrice: 75,
    discount: 27,
    rating: 4,
    reviewCount: 123,
    colors: ["black", "blue"],
    category: "Accesorios",
    image: "/cable.png",
    images: ["/cable.png", "/cable.png", "/cable.png", "/cable.png"],
    description: "Webcam 4K con enfoque automático para videoconferencias profesionales.",
    specifications: {},
    sizes: ["XS", "S", "M", "L", "XL"],
    inStock: true,
    isBestSelling: false,
    isMostViewed: false,
  },
]

// Obtener todos los productos
export const getAllProducts = () => {
  return products
}

// Obtener productos más vendidos (6 productos)
export const getBestSellingProducts = () => {
  return products.filter((product) => product.isBestSelling)
}

// Obtener productos más vistos (15 productos)
export const getMostViewedProducts = () => {
  return products.filter((product) => product.isMostViewed)
}

// Obtener primeros 4 productos más vendidos para homepage
export const getBestSellingProductsForHome = () => {
  return products.filter((product) => product.isBestSelling).slice(0, 4)
}

// Obtener primeros 4 productos más vistos para homepage
export const getMostViewedProductsForHome = () => {
  return products.filter((product) => product.isMostViewed).slice(0, 4)
}

// Obtener un producto por su ID
export const getProductById = (id) => {
  const numericId = Number(id)
  return products.find((product) => product.id === numericId)
}

// Obtener productos relacionados basados en el nombre del producto actual
export const getRelatedProducts = (id) => {
  const numericId = Number(id)
  const currentProduct = products.find((product) => product.id === numericId)

  if (!currentProduct) return []

  // Extraer palabras clave del nombre del producto actual
  const currentName = currentProduct.name.toLowerCase()

  // Buscar productos relacionados basados en palabras clave comunes
  const relatedProducts = products.filter((product) => {
    if (product.id === numericId) return false // Excluir el producto actual

    const productName = product.name.toLowerCase()

    // Buscar productos que contengan palabras clave similares
    if (currentName.includes("kit gamer") && productName.includes("kit gamer")) return true
    if (currentName.includes("rolt-120v") && productName.includes("rolt-120v")) return true
    if (currentName.includes("cable") && productName.includes("cable")) return true
    if (currentName.includes("memoria ram") && productName.includes("memoria ram")) return true
    if (currentName.includes("monitor") && productName.includes("monitor")) return true

    return false
  })

  // Si no hay productos relacionados específicos, mostrar productos aleatorios
  if (relatedProducts.length === 0) {
    return products.filter((product) => product.id !== numericId).slice(0, 8)
  }

  // Limitar a 8 productos relacionados
  return relatedProducts.slice(0, 8)
}

// Obtener todas las categorías disponibles
export const getAvailableCategories = () => {
  const categories = [...new Set(products.map((product) => product.category))]
  return categories.sort()
}

// Obtener todos los colores disponibles
export const getAvailableColors = () => {
  const colors = [...new Set(products.flatMap((product) => product.colors))]
  return colors.sort()
}

// Función para filtrar productos
export const filterProducts = (filters) => {
  const { categories, colors, priceRange, sortBy } = filters

  let filteredProducts = [...products]

  // Filtrar por categorías
  if (categories && categories.length > 0) {
    filteredProducts = filteredProducts.filter((product) => categories.includes(product.category))
  }

  // Filtrar por colores
  if (colors && colors.length > 0) {
    filteredProducts = filteredProducts.filter((product) => product.colors.some((color) => colors.includes(color)))
  }

  // Filtrar por rango de precio
  if (priceRange && priceRange.length === 2) {
    const [minPrice, maxPrice] = priceRange
    filteredProducts = filteredProducts.filter((product) => product.price >= minPrice && product.price <= maxPrice)
  }

  // Ordenar productos
  if (sortBy) {
    switch (sortBy) {
      case "price-low":
        filteredProducts.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        filteredProducts.sort((a, b) => b.price - a.price)
        break
      case "newest":
        filteredProducts.sort((a, b) => new Date(b.date) - new Date(a.date))
        break
      case "rating":
        filteredProducts.sort((a, b) => b.rating - a.rating)
        break
      case "name-asc":
        filteredProducts.sort((a, b) => a.name.localeCompare(b.name))
        break
      case "name-desc":
        filteredProducts.sort((a, b) => b.name.localeCompare(a.name))
        break
      default:
        // No sorting for 'featured' or default
        break
    }
  }

  return filteredProducts
}
