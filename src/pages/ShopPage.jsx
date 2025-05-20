"use client"

import { useState } from "react"
import { Heart, Eye, ChevronDown, ChevronUp } from "lucide-react"
import "./ShopPage.css"

const ShopPage = () => {
  const [showFilters, setShowFilters] = useState(false)
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false)
  const [selectedCategories, setSelectedCategories] = useState([])
  const [selectedColors, setSelectedColors] = useState([])
  const [priceRange, setPriceRange] = useState([0, 1000])
  const [sortBy, setSortBy] = useState("featured")
  const [currentPage, setCurrentPage] = useState(1)

  const toggleCategory = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    )
  }

  const toggleColor = (color) => {
    setSelectedColors((prev) => (prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]))
  }

  const handlePriceChange = (e, index) => {
    const newRange = [...priceRange]
    newRange[index] = Number.parseInt(e.target.value)
    setPriceRange(newRange)
  }

  const clearFilters = () => {
    setSelectedCategories([])
    setSelectedColors([])
    setPriceRange([0, 1000])
  }

  const toggleCategoryDropdown = () => {
    setShowCategoryDropdown(!showCategoryDropdown)
  }

  // Lista de categorías
  const categories = [
    "Accesorios",
    "Cables",
    "Redes",
    "Almacenamiento",
    "Procesamiento",
    "Enrutamiento",
    "Comunicación",
    "Gaming",
    "Componentes",
  ]

  // Generate 20 products (5 rows x 4 columns)
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
      isNew: true,
      category: "Gaming",
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
      category: "Accesorios",
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
      category: "Cables",
    },
    {
      id: 4,
      name: "Memoria RAM 16GB RGB 3200Hz",
      price: 10,
      originalPrice: 15,
      discount: 0,
      rating: 5,
      reviewCount: 99,
      colors: ["black", "blue"],
      image: "/ram.png",
      isNew: true,
      category: "Componentes",
    },
    // Duplicar productos para llenar 5 filas x 4 columnas (20 productos)
    {
      id: 5,
      name: "Kit Gamer_AVA Monitor LG",
      price: 230,
      originalPrice: 250,
      discount: 35,
      rating: 5,
      reviewCount: 88,
      colors: ["black", "blue"],
      image: "/pc.png",
      isNew: false,
      category: "Gaming",
    },
    {
      id: 6,
      name: "ROLT-120V",
      price: 135,
      originalPrice: 145,
      discount: 35,
      rating: 4,
      reviewCount: 75,
      colors: ["black", "blue"],
      image: "/mini-pc.png",
      category: "Accesorios",
    },
    {
      id: 7,
      name: "Cable IP67-SORT",
      price: 2.5,
      originalPrice: 3,
      discount: 35,
      rating: 5,
      reviewCount: 99,
      colors: ["black", "blue"],
      image: "/cable.png",
      isNew: true,
      category: "Cables",
    },
    {
      id: 8,
      name: "Memoria RAM 16GB RGB 3200Hz",
      price: 10,
      originalPrice: 15,
      discount: 0,
      rating: 5,
      reviewCount: 99,
      colors: ["black", "blue"],
      image: "/ram.png",
      isNew: true,
      category: "Componentes",
    },
    {
      id: 9,
      name: "Kit Gamer_AVA Monitor LG",
      price: 230,
      originalPrice: 250,
      discount: 35,
      rating: 5,
      reviewCount: 88,
      colors: ["black", "blue"],
      image: "/pc.png",
      isNew: false,
      category: "Gaming",
    },
    {
      id: 10,
      name: "ROLT-120V",
      price: 135,
      originalPrice: 145,
      discount: 35,
      rating: 4,
      reviewCount: 75,
      colors: ["black", "blue"],
      image: "/mini-pc.png",
      category: "Accesorios",
    },
    {
      id: 11,
      name: "Cable IP67-SORT",
      price: 2.5,
      originalPrice: 3,
      discount: 35,
      rating: 5,
      reviewCount: 99,
      colors: ["black", "blue"],
      image: "/cable.png",
      isNew: true,
      category: "Cables",
    },
    {
      id: 12,
      name: "Memoria RAM 16GB RGB 3200Hz",
      price: 10,
      originalPrice: 15,
      discount: 0,
      rating: 5,
      reviewCount: 99,
      colors: ["black", "blue"],
      image: "/ram.png",
      isNew: true,
      category: "Componentes",
    },
    {
      id: 13,
      name: "Kit Gamer_AVA Monitor LG",
      price: 230,
      originalPrice: 250,
      discount: 35,
      rating: 5,
      reviewCount: 88,
      colors: ["black", "blue"],
      image: "/pc.png",
      isNew: false,
      category: "Gaming",
    },
    {
      id: 14,
      name: "ROLT-120V",
      price: 135,
      originalPrice: 145,
      discount: 35,
      rating: 4,
      reviewCount: 75,
      colors: ["black", "blue"],
      image: "/mini-pc.png",
      category: "Accesorios",
    },
    {
      id: 15,
      name: "Cable IP67-SORT",
      price: 2.5,
      originalPrice: 3,
      discount: 35,
      rating: 5,
      reviewCount: 99,
      colors: ["black", "blue"],
      image: "/cable.png",
      isNew: true,
      category: "Cables",
    },
    {
      id: 16,
      name: "Memoria RAM 16GB RGB 3200Hz",
      price: 10,
      originalPrice: 15,
      discount: 0,
      rating: 5,
      reviewCount: 99,
      colors: ["black", "blue"],
      image: "/ram.png",
      isNew: true,
      category: "Componentes",
    },
    {
      id: 17,
      name: "Kit Gamer_AVA Monitor LG",
      price: 230,
      originalPrice: 250,
      discount: 35,
      rating: 5,
      reviewCount: 88,
      colors: ["black", "blue"],
      image: "/pc.png",
      isNew: false,
      category: "Gaming",
    },
    {
      id: 18,
      name: "ROLT-120V",
      price: 135,
      originalPrice: 145,
      discount: 35,
      rating: 4,
      reviewCount: 75,
      colors: ["black", "blue"],
      image: "/mini-pc.png",
      category: "Accesorios",
    },
    {
      id: 19,
      name: "Cable IP67-SORT",
      price: 2.5,
      originalPrice: 3,
      discount: 35,
      rating: 5,
      reviewCount: 99,
      colors: ["black", "blue"],
      image: "/cable.png",
      isNew: true,
      category: "Cables",
    },
    {
      id: 20,
      name: "Memoria RAM 16GB RGB 3200Hz",
      price: 10,
      originalPrice: 15,
      discount: 0,
      rating: 5,
      reviewCount: 99,
      colors: ["black", "blue"],
      image: "/ram.png",
      isNew: true,
      category: "Componentes",
    },
  ]

  // Filtrar productos
  const filteredProducts = products.filter((product) => {
    // Filtrar por categoría
    if (selectedCategories.length > 0 && !selectedCategories.includes(product.category)) {
      return false
    }

    // Filtrar por color
    if (selectedColors.length > 0 && !product.colors.some((color) => selectedColors.includes(color))) {
      return false
    }

    // Filtrar por precio
    if (product.price < priceRange[0] || product.price > priceRange[1]) {
      return false
    }

    return true
  })

  // Ordenar productos
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "newest":
        return new Date(b.date) - new Date(a.date)
      case "rating":
        return b.rating - a.rating
      default:
        return 0
    }
  })

  // Renderizar estrellas para las calificaciones
  const renderStars = (rating) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <span key={i} className={i < rating ? "star filled" : "star"}>
          ★
        </span>
      ))
  }

  return (
    <div className="shop-page">
      <div className="shop-hero">
        <div className="container">
          <div className="shop-hero-content">
            <div className="shop-hero-left">
              <h1 className="shop-title">PRODUCTOS</h1>
              <div className="category-selector">
                <p>Buscar por categoría</p>
                <div className="dropdown-container">
                  <button className="dropdown-button" onClick={toggleCategoryDropdown}>
                    Todas las categorías
                    {showCategoryDropdown ? (
                      <ChevronUp size={16} strokeWidth={1.5} />
                    ) : (
                      <ChevronDown size={16} strokeWidth={1.5} />
                    )}
                  </button>
                  {showCategoryDropdown && (
                    <div className="dropdown-menu">
                      <div className="dropdown-item">
                        <label className="filter-option">
                          <input
                            type="checkbox"
                            checked={selectedCategories.length === 0}
                            onChange={() => setSelectedCategories([])}
                          />
                          Todas las categorías
                        </label>
                      </div>

                      {/* Categorías con checkboxes */}
                      {categories.map((category) => (
                        <div key={category} className="dropdown-item">
                          <label className="filter-option">
                            <input
                              type="checkbox"
                              checked={selectedCategories.includes(category)}
                              onChange={() => toggleCategory(category)}
                            />
                            {category}
                          </label>
                        </div>
                      ))}

                      {/* Sección de filtros */}
                      <div className="dropdown-filters">
                        <h4>Filtros</h4>

                        <div className="filter-section">
                          <h4>Color</h4>
                          <div className="filter-options">
                            <label className="filter-option">
                              <input
                                type="checkbox"
                                checked={selectedColors.includes("black")}
                                onChange={() => toggleColor("black")}
                              />
                              Negro
                            </label>
                            <label className="filter-option">
                              <input
                                type="checkbox"
                                checked={selectedColors.includes("blue")}
                                onChange={() => toggleColor("blue")}
                              />
                              Azul
                            </label>
                          </div>
                        </div>

                        <div className="filter-section">
                          <h4>Precio</h4>
                          <div className="price-range">
                            <div className="price-inputs">
                              <input
                                type="number"
                                value={priceRange[0]}
                                onChange={(e) => handlePriceChange(e, 0)}
                                min="0"
                                max={priceRange[1]}
                              />
                              <span>-</span>
                              <input
                                type="number"
                                value={priceRange[1]}
                                onChange={(e) => handlePriceChange(e, 1)}
                                min={priceRange[0]}
                                max="1000"
                              />
                            </div>
                          </div>
                        </div>

                        <button className="clear-filters" onClick={clearFilters}>
                          Limpiar Filtros
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="shop-hero-right">
              <h2 className="shop-slogan">
                No compres solo un accesorio, <br />
                ¡compra una ventaja!
              </h2>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="products-grid">
          {sortedProducts.map((product) => (
            <div key={product.id} className="product-card">
              <div className="product-image">
                <img src={product.image || "/placeholder.svg"} alt={product.name} />
                {product.discount > 0 && <span className="discount-badge">-{product.discount}%</span>}
                {product.isNew && <span className="new-badge">NEW</span>}
                <div className="product-actions">
                  <button className="action-btn wishlist-btn">
                    <Heart size={16} strokeWidth={1.5} />
                  </button>
                  <button className="action-btn view-btn">
                    <Eye size={16} strokeWidth={1.5} />
                  </button>
                </div>
              </div>
              <div className="product-info">
                <h3 className="product-title">{product.name}</h3>
                <div className="product-price">
                  <span className="current-price">${product.price.toFixed(2)}</span>
                  {product.originalPrice > product.price && (
                    <span className="original-price">${product.originalPrice.toFixed(2)}</span>
                  )}
                </div>
                <div className="rating">
                  {renderStars(product.rating)}
                  <span className="rating-count">({product.reviewCount})</span>
                </div>
                <div className="color-options">
                  {product.colors.map((color) => (
                    <div key={color} className={`color-option ${color}`} />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="pagination-container">
          <div className="pagination">
            <button className="pagination-arrow prev">
              <span>&lt;</span>
            </button>
            <div className="pagination-numbers">
              <span
                className={`pagination-number ${currentPage === 1 ? "active" : ""}`}
                onClick={() => setCurrentPage(1)}
              >
                1
              </span>
              <span
                className={`pagination-number ${currentPage === 2 ? "active" : ""}`}
                onClick={() => setCurrentPage(2)}
              >
                2
              </span>
              <span
                className={`pagination-number ${currentPage === 3 ? "active" : ""}`}
                onClick={() => setCurrentPage(3)}
              >
                3
              </span>
              <span
                className={`pagination-number ${currentPage === 4 ? "active" : ""}`}
                onClick={() => setCurrentPage(4)}
              >
                4
              </span>
              <span
                className={`pagination-number ${currentPage === 5 ? "active" : ""}`}
                onClick={() => setCurrentPage(5)}
              >
                5
              </span>
            </div>
            <button className="pagination-arrow next">
              <span>&gt;</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShopPage
