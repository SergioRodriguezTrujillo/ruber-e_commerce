"use client"

import { useState, useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { Heart, ChevronDown, ChevronUp } from "lucide-react"
import { getAllProducts, getBestSellingProducts, getMostViewedProducts } from "../services/productService"
import QuoteModal from "../components/QuoteModal"
import InfoModal from "../components/InfoModal"
import "./ShopPage.css"

const ShopPage = () => {
  const location = useLocation()
  const navigate = useNavigate()
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
  const [filterType, setFilterType] = useState(null)

  // Load products based on filter type
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search)
    const filter = searchParams.get("filter")
    setFilterType(filter)

    let productsToShow = []

    if (filter === "best-selling") {
      // Solo mostrar productos más vendidos
      productsToShow = getBestSellingProducts()
    } else if (filter === "most-viewed") {
      // Solo mostrar productos más vistos
      productsToShow = getMostViewedProducts()
    } else {
      // Mostrar todos los productos (generar 20 productos como antes)
      const baseProducts = getAllProducts()
      const extendedProducts = []
      for (let i = 0; i < 5; i++) {
        baseProducts.forEach((product, index) => {
          extendedProducts.push({
            ...product,
            id: product.id + i * baseProducts.length,
            isNew: i === 0 && index < 2,
          })
        })
      }
      productsToShow = extendedProducts.slice(0, 20)
    }

    setProducts(productsToShow)
  }, [location.search])

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

  // Función para navegar al detalle del producto
  const handleProductClick = (productId) => {
    // Scroll to top when navigating to product detail
    window.scrollTo(0, 0)
    navigate(`/product/${productId}`)
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

  // Filtrar productos (solo aplicar filtros adicionales si no es un filtro específico)
  const filteredProducts = products.filter((product) => {
    // Si es un filtro específico (best-selling o most-viewed), no aplicar filtros adicionales
    if (filterType === "best-selling" || filterType === "most-viewed") {
      return true
    }

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

  // Get page title based on filter
  const getPageTitle = () => {
    if (filterType === "best-selling") {
      return "PRODUCTOS MÁS VENDIDOS"
    }
    if (filterType === "most-viewed") {
      return "PRODUCTOS MÁS VISTOS"
    }
    return "PRODUCTOS"
  }

  const getPageSlogan = () => {
    if (filterType === "best-selling") {
      return "Descubre nuestros productos más vendidos"
    }
    if (filterType === "most-viewed") {
      return "Los productos que más llaman la atención"
    }
    return "No compres solo un accesorio, ¡compra una ventaja!"
  }

  return (
    <div className="shop-page">
      <div className="shop-hero">
        <div className="container">
          <div className="shop-hero-content">
            <div className="shop-hero-left">
              <h1 className="shop-title">{getPageTitle()}</h1>
              {/* Solo mostrar selector de categoría si no es un filtro específico */}
              {!filterType && (
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
              )}
            </div>
            <div className="shop-hero-right">
              <h2 className="shop-slogan">{getPageSlogan()}</h2>
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

              {/* Hacer clickeable la imagen y título */}
              <div
                className="product-image-shop"
                onClick={() => handleProductClick(product.id)}
                style={{ cursor: "pointer" }}
              >
                <img src={product.image || "/placeholder.svg"} alt={product.name} />
              </div>

              <div className="product-title-container">
                <h3
                  className="product-title-shop"
                  onClick={() => handleProductClick(product.id)}
                  style={{ cursor: "pointer" }}
                >
                  {product.name}
                </h3>
                <button className="wishlist-btn-shop">
                  <Heart size={18} />
                </button>
              </div>

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

        {/* Solo mostrar paginación si hay productos */}
        {sortedProducts.length > 0 && (
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
        )}
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
