"use client"

import { useState, useEffect } from "react"
import { Heart, ChevronDown, ChevronUp } from "lucide-react"
import { getAllProducts } from "../services/productService"
import QuoteModal from "../components/QuoteModal"
import InfoModal from "../components/InfoModal"
import "./ShopPage.css"

const ShopPage = () => {
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false)
  const [selectedCategories, setSelectedCategories] = useState([])
  const [selectedColors, setSelectedColors] = useState([])
  const [priceRange, setPriceRange] = useState([0, 1000])
  const [sortBy, setSortBy] = useState("featured")
  const [currentPage, setCurrentPage] = useState(1)
  const [products, setProducts] = useState([])
  const [showQuoteModal, setShowQuoteModal] = useState(false)
  const [showInfoModal, setShowInfoModal] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)

  // Generate 20 products for the shop page
  useEffect(() => {
    // Get base products
    const baseProducts = getAllProducts()

    // Create 20 products by duplicating the base products
    const extendedProducts = []
    for (let i = 0; i < 5; i++) {
      baseProducts.forEach((product, index) => {
        extendedProducts.push({
          ...product,
          id: product.id + i * baseProducts.length,
          // Add some variation to make products more interesting
          isNew: i === 0 && index < 2, // First 2 products in first iteration are "new"
        })
      })
    }

    // Take only 20 products
    setProducts(extendedProducts.slice(0, 20))
  }, [])

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

  const handleQuoteClick = (product) => {
    setSelectedProduct(product)
    setShowQuoteModal(true)
  }

  const handleInfoClick = (product) => {
    setSelectedProduct(product)
    setShowInfoModal(true)
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
            <div key={product.id} className="product-card-shop">
              {/* Badge de descuento o nuevo */}
              {product.isNew ? (
                <span className="new-badge">NEW</span>
              ) : product.discount > 0 ? (
                <span className="discount-badge">-{product.discount}%</span>
              ) : null}

              <div className="product-image-shop">
                <img src={product.image || "/placeholder.svg"} alt={product.name} />
              </div>

              <div className="product-title-container">
                <h3 className="product-title-shop">{product.name}</h3>
                <button className="wishlist-btn-shop">
                  <Heart size={18} />
                </button>
              </div>

              {/* Agregar precios
              <div className="product-price-shop">
                <span className="current-price-shop">${product.price.toFixed(2)}</span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <span className="original-price-shop">${product.originalPrice.toFixed(2)}</span>
                )}
              </div> */}

              <div className="product-buttons-shop">
                <button className="info-btn-shop" onClick={() => handleInfoClick(product)}>
                  Info
                </button>
                <button className="quote-btn-shop" onClick={() => handleQuoteClick(product)}>
                  Solicitar cotización
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="pagination-container">
          <div className="pagination">
            <button className="pagination-arrow">&lt;</button>
            <button
              className={`pagination-number ${currentPage === 1 ? "active" : ""}`}
              onClick={() => setCurrentPage(1)}
            >
              1
            </button>
            <button
              className={`pagination-number ${currentPage === 2 ? "active" : ""}`}
              onClick={() => setCurrentPage(2)}
            >
              2
            </button>
            <button
              className={`pagination-number ${currentPage === 3 ? "active" : ""}`}
              onClick={() => setCurrentPage(3)}
            >
              3
            </button>
            <button
              className={`pagination-number ${currentPage === 4 ? "active" : ""}`}
              onClick={() => setCurrentPage(4)}
            >
              4
            </button>
            <button
              className={`pagination-number ${currentPage === 5 ? "active" : ""}`}
              onClick={() => setCurrentPage(5)}
            >
              5
            </button>
            <button className="pagination-arrow">&gt;</button>
          </div>
        </div>
      </div>

      <QuoteModal
        isOpen={showQuoteModal}
        onClose={() => setShowQuoteModal(false)}
        productName={selectedProduct?.name}
      />

      <InfoModal isOpen={showInfoModal} onClose={() => setShowInfoModal(false)} productName={selectedProduct?.name} />
    </div>
  )
}

export default ShopPage
