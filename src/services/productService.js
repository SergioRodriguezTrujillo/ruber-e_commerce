// Datos de productos con descripciones únicas
const products = [
  {
    id: 1,
    name: "Kit Gamer_AVA Monitor LG",
    price: 230,
    originalPrice: 250,
    discount: 35,
    rating: 5,
    reviewCount: 88,
    colors: ["black", "blue"],
    image: "/pc.png",
    images: ["/pc.png", "/pc.png", "/pc.png", "/pc.png"],
    description:
      "Kit Gamer completo con monitor LG de alta resolución, PC gaming con procesador de última generación, tarjeta gráfica dedicada y periféricos RGB. Perfecto para gaming competitivo y streaming.",
    specifications: {
      Procesador: "Intel Core i7 11700K",
      "Tarjeta Gráfica": "NVIDIA RTX 3070",
      RAM: "16GB DDR4 3200MHz",
      Almacenamiento: "SSD 1TB NVMe",
      Monitor: 'LG 27" 144Hz IPS',
    },
    sizes: ["XS", "S", "M", "L", "XL"],
    inStock: true,
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
    image: "/mini-pc.png",
    images: ["/mini-pc.png", "/mini-pc.png", "/mini-pc.png", "/mini-pc.png"],
    description:
      "Mini PC ROLT-120V con diseño compacto y rendimiento excepcional. Ideal para espacios reducidos, oficinas y centros de entretenimiento. Conectividad completa y bajo consumo energético.",
    specifications: {
      Procesador: "Intel Core i5 10400T",
      "Tarjeta Gráfica": "Intel UHD Graphics 630",
      RAM: "8GB DDR4 2666MHz",
      Almacenamiento: "SSD 256GB NVMe",
      Conectividad: "WiFi 6, Bluetooth 5.1, 4x USB 3.0",
    },
    sizes: ["XS", "S", "M", "L", "XL"],
    inStock: true,
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
    image: "/cable.png",
    images: ["/cable.png", "/cable.png", "/cable.png", "/cable.png"],
    description:
      "Cable IP67-SORT resistente al agua y polvo, certificación IP67 para condiciones extremas. Fabricado con materiales de alta calidad para garantizar durabilidad y rendimiento óptimo en cualquier entorno.",
    specifications: {
      Longitud: "1.5 metros",
      Certificación: "IP67 resistente al agua y polvo",
      Material: "PVC de alta resistencia",
      Conectores: "Chapados en oro",
      Compatibilidad: "Universal",
    },
    sizes: ["XS", "S", "M", "L", "XL"],
    inStock: true,
  },
  {
    id: 4,
    name: "Memoria RAM 16GB RGB 3200Hz",
    price: 10,
    originalPrice: 15,
    discount: 35,
    rating: 5,
    reviewCount: 99,
    colors: ["black", "blue"],
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
  },
]

// Obtener todos los productos
export const getAllProducts = () => {
  return products
}

// Obtener un producto por su ID
export const getProductById = (id) => {
  const numericId = Number(id)
  return products.find((product) => product.id === numericId)
}

// Obtener productos relacionados (excluyendo el producto actual)
export const getRelatedProducts = (id) => {
  const numericId = Number(id)
  return products.filter((product) => product.id !== numericId)
}
