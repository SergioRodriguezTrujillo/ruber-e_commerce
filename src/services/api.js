// Este archivo simula llamadas a una API
// En un proyecto real, estas funciones harían fetch a un backend

// Datos de ejemplo
const products = [
  {
    id: 1,
    name: "Camiseta Básica",
    price: 29.99,
    originalPrice: 39.99,
    discount: 25,
    image: "/images/product-1.jpg",
    hoverImage: "/images/product-1-hover.jpg",
    gallery: ["/images/product-1-1.jpg", "/images/product-1-2.jpg", "/images/product-1-3.jpg"],
    category: "Hombres",
    tags: ["camiseta", "básico", "algodón"],
    rating: 4.5,
    reviews: 12,
    sku: "TC-1001",
    sizes: ["S", "M", "L", "XL"],
    colors: ["#000000", "#FFFFFF", "#6F8FAF"],
    shortDescription: "Camiseta básica de algodón de alta calidad con un ajuste cómodo y versátil.",
    description:
      "<p>Esta camiseta básica es un elemento esencial para cualquier guardarropa. Fabricada con algodón 100% orgánico, ofrece comodidad durante todo el día y una gran durabilidad.</p><p>Su diseño minimalista la hace perfecta para combinar con cualquier look, ya sea casual o más arreglado.</p>",
    details: {
      Material: "100% Algodón Orgánico",
      Ajuste: "Regular",
      Cuidado: "Lavado a máquina, no usar blanqueador",
      "País de origen": "Portugal",
    },
    reviewsList: [
      {
        name: "Carlos Rodríguez",
        avatar: "/images/avatar-1.jpg",
        rating: 5,
        date: "15 Mar, 2023",
        comment:
          "Excelente calidad y muy cómoda. El tamaño es perfecto y el material es suave. Definitivamente compraré más.",
      },
      {
        name: "Laura Martínez",
        avatar: "/images/avatar-2.jpg",
        rating: 4,
        date: "2 Feb, 2023",
        comment:
          "Buena camiseta básica. El material es de buena calidad aunque un poco más delgado de lo que esperaba.",
      },
    ],
  },
  {
    id: 2,
    name: "Jeans Slim Fit",
    price: 59.99,
    originalPrice: 79.99,
    discount: 25,
    image: "/images/product-2.jpg",
    hoverImage: "/images/product-2-hover.jpg",
    category: "Hombres",
    rating: 4.2,
    reviews: 8,
    sku: "JN-2001",
  },
  {
    id: 3,
    name: "Vestido Floral",
    price: 49.99,
    originalPrice: 49.99,
    discount: 0,
    image: "/images/product-3.jpg",
    hoverImage: "/images/product-3-hover.jpg",
    category: "Mujeres",
    rating: 4.8,
    reviews: 15,
    sku: "VF-3001",
  },
  {
    id: 4,
    name: "Zapatillas Deportivas",
    price: 89.99,
    originalPrice: 119.99,
    discount: 25,
    image: "/images/product-4.jpg",
    hoverImage: "/images/product-4-hover.jpg",
    category: "Calzado",
    rating: 4.6,
    reviews: 23,
    sku: "ZD-4001",
  },
  {
    id: 5,
    name: "Bolso de Cuero",
    price: 129.99,
    originalPrice: 159.99,
    discount: 19,
    image: "/images/product-5.jpg",
    hoverImage: "/images/product-5-hover.jpg",
    category: "Accesorios",
    rating: 4.9,
    reviews: 19,
    sku: "BC-5001",
  },
  {
    id: 6,
    name: "Chaqueta Denim",
    price: 79.99,
    originalPrice: 99.99,
    discount: 20,
    image: "/images/product-6.jpg",
    hoverImage: "/images/product-6-hover.jpg",
    category: "Hombres",
    rating: 4.3,
    reviews: 11,
    sku: "CD-6001",
  },
  {
    id: 7,
    name: "Falda Plisada",
    price: 39.99,
    originalPrice: 39.99,
    discount: 0,
    image: "/images/product-7.jpg",
    hoverImage: "/images/product-7-hover.jpg",
    category: "Mujeres",
    rating: 4.4,
    reviews: 7,
    sku: "FP-7001",
  },
  {
    id: 8,
    name: "Reloj Minimalista",
    price: 149.99,
    originalPrice: 199.99,
    discount: 25,
    image: "/images/product-8.jpg",
    hoverImage: "/images/product-8-hover.jpg",
    category: "Accesorios",
    rating: 4.7,
    reviews: 14,
    sku: "RM-8001",
  },
]

// Simular delay de red
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

// Obtener todos los productos
export const fetchProducts = async () => {
  await delay(800)
  return [...products]
}

// Obtener productos destacados
export const fetchFeaturedProducts = async () => {
  await delay(800)
  return products.filter((_, index) => index < 4)
}

// Obtener nuevos productos
export const fetchNewArrivals = async () => {
  await delay(800)
  return products.filter((_, index) => index >= 4)
}

// Obtener producto por ID
export const fetchProductById = async (id) => {
  await delay(800)
  const product = products.find((p) => p.id === Number.parseInt(id))

  if (!product) {
    throw new Error("Producto no encontrado")
  }

  return product
}

// Obtener productos relacionados
export const fetchRelatedProducts = async (category) => {
  await delay(800)
  return products.filter((p) => p.category === category).slice(0, 4)
}

// Obtener productos por categoría
export const fetchProductsByCategory = async (category) => {
  await delay(800)
  return products.filter((p) => p.category === category)
}

// Buscar productos
export const searchProducts = async (query) => {
  await delay(800)
  const searchTerm = query.toLowerCase()

  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm) ||
      p.category.toLowerCase().includes(searchTerm) ||
      (p.tags && p.tags.some((tag) => tag.toLowerCase().includes(searchTerm))),
  )
}
