"use client"

import { useState, useEffect, useRef } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { Heart, ChevronDown, ChevronUp } from "lucide-react"
import { useWishlist } from "../context/WishlistContext"
import {
  getAllProducts,
  getBestSellingProducts,
  getMostViewedProducts,
  getAvailableCategories,
  getAvailableColors,
  filterProducts,
} from "../services/productService"
import QuoteModal from "../components/QuoteModal"
import InfoModal from "../components/InfoModal"
import "./ShopPage.css"

const ShopPage = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { addToWishlist, isInWishlist, removeFromWishlist } = useWishlist()
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false)
  const [selectedCategories, setSelectedCategories] = useState([])
  const [selectedColors, setSelectedColors] = useState([])
  const [priceRange, setPriceRange] = useState([0, 1000])
  const [sortBy, setSortBy] = useState("featured")
  const [currentPage, setCurrentPage] = useState(1)
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [showQuoteModal, setShowQuoteModal] = useState(false)
  const [showInfoModal, setShowInfoModal] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [filterType, setFilterType] = useState(null)
  const [heartAnimations, setHeartAnimations] = useState({})
  const [availableCategories, setAvailableCategories] = useState([])
  const [availableColors, setAvailableColors] = useState([])

  // Load initial data
  useEffect(() => {
    const categories = getAvailableCategories()
    const colors = getAvailableColors()
    setAvailableCategories(categories)
    setAvailableColors(colors)
  }, [])

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
      // Mostrar todos los productos
      productsToShow = getAllProducts()
    }

    setProducts(productsToShow)
    setFilteredProducts(productsToShow)

    // Reset filters when changing filter type
    if (filter === "best-selling" || filter === "most-viewed") {
      setSelectedCategories([])
      setSelectedColors([])
      setPriceRange([0, 1000])
    }
  }, [location.search])

  // Apply filters whenever filters change
  useEffect(() => {
    if (filterType === "best-selling" || filterType === "most-viewed") {
      // For specific filter types, don't apply additional filters
      setFilteredProducts(products)
    } else {
      // Apply filters for general product view
      const filters = {
        categories: selectedCategories,
        colors: selectedColors,
        priceRange: priceRange,
        sortBy: sortBy,
      }

      const filtered = filterProducts(filters)
      setFilteredProducts(filtered)
    }
  }, [products, selectedCategories, selectedColors, priceRange, sortBy, filterType])

  const toggleCategory = (category) => {
    setSelectedCategories((prev) => {
      if (prev.includes(category)) {
        return prev.filter((c) => c !== category)
      } else {
        return [...prev, category]
      }
    })
  }

  const handleAllCategoriesToggle = () => {
    setSelectedCategories([])
  }

  const toggleColor = (color) => {
    setSelectedColors((prev) => {
      if (prev.includes(color)) {
        return prev.filter((c) => c !== color)
      } else {
        return [...prev, color]
      }
    })
  }

  const handlePriceChange = (e, index) => {
    const newRange = [...priceRange]
    newRange[index] = Number.parseInt(e.target.value) || 0

    // Ensure min is not greater than max
    if (index === 0 && newRange[0] > newRange[1]) {
      newRange[1] = newRange[0]
    }
    if (index === 1 && newRange[1] < newRange[0]) {
      newRange[0] = newRange[1]
    }

    setPriceRange(newRange)
  }

  const clearFilters = () => {
    setSelectedCategories([])
    setSelectedColors([])
    setPriceRange([0, 1000])
    setSortBy("featured")
  }

  const toggleCategoryDropdown = () => {
    setShowCategoryDropdown(!showCategoryDropdown)
  }

  // Referencia para detectar clics fuera del dropdown
  const dropdownRef = useRef(null)

  // Efecto para cerrar el dropdown cuando se hace clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowCategoryDropdown(false)
      }
    }

    // Agregar event listener
    document.addEventListener("mousedown", handleClickOutside)

    // Cleanup
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleToggleWishlist = (e, product) => {
    e.stopPropagation()
    e.preventDefault()

    const wasInWishlist = isInWishlist(product.id)

    if (wasInWishlist) {
      removeFromWishlist(product.id)
      setHeartAnimations((prev) => ({ ...prev, [product.id]: "animate-empty" }))
    } else {
      addToWishlist(product)
      setHeartAnimations((prev) => ({ ...prev, [product.id]: "animate-fill" }))
    }

    // Limpiar la animación después de que termine
    setTimeout(() => {
      setHeartAnimations((prev) => ({ ...prev, [product.id]: "" }))
    }, 600)
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
    return (
      <>
        <div>No compres solo un accesorio,</div>
        <div>¡compra una ventaja!</div>
      </>
    )
  }

  const getFilteredProductsCount = () => {
    return filteredProducts.length
  }

  const getColorDisplayName = (color) => {
    const colorNames = {
      black: "Negro",
      blue: "Azul",
      red: "Rojo",
      white: "Blanco",
      green: "Verde",
    }
    return colorNames[color] || color
  }

  return (
    <div className="shop-page">
      <div className="shop-hero">
        <div className="container">
          <div className="shop-hero-content">
            <div className="shop-hero-top-row">
              <h1 className="shop-title">{getPageTitle()}</h1>
              {/* Solo mostrar selector de categoría si no es un filtro específico */}
              {!filterType && (
                <div className="category-selector">
                  <p>Buscar por categoría</p>
                </div>
              )}
            </div>

            {!filterType && (
              <div className="dropdown-container" ref={dropdownRef}>
                <button className="dropdown-button" onClick={toggleCategoryDropdown}>
                  {selectedCategories.length === 0
                    ? "Todas las categorías"
                    : selectedCategories.length === 1
                      ? selectedCategories[0]
                      : `${selectedCategories.length} categorías seleccionadas`}
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
                          onChange={handleAllCategoriesToggle}
                        />
                        Todas las categorías
                      </label>
                    </div>

                    {/* Categorías con checkboxes */}
                    {availableCategories.map((category) => (
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
                          {availableColors.map((color) => (
                            <label key={color} className="filter-option">
                              <input
                                type="checkbox"
                                checked={selectedColors.includes(color)}
                                onChange={() => toggleColor(color)}
                              />
                              {getColorDisplayName(color)}
                            </label>
                          ))}
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
                              placeholder="Min"
                            />
                            <span>-</span>
                            <input
                              type="number"
                              value={priceRange[1]}
                              onChange={(e) => handlePriceChange(e, 1)}
                              min={priceRange[0]}
                              max="2000"
                              placeholder="Max"
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
            )}

            <div className="shop-hero-right">
              <h2 className="shop-slogan">{getPageSlogan()}</h2>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        {/* Mostrar información de filtros activos */}
        {!filterType &&
          (selectedCategories.length > 0 || selectedColors.length > 0 || priceRange[0] > 0 || priceRange[1] < 1000) && (
            <div
              className="active-filters"
              style={{ marginBottom: "20px", padding: "15px", backgroundColor: "#f8f9fa", borderRadius: "8px" }}
            >
              <div
                style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}
              >
                <h4 style={{ margin: 0, fontSize: "0.9rem", fontWeight: "600" }}>Filtros activos:</h4>
                <span style={{ fontSize: "0.9rem", color: "#666" }}>
                  {getFilteredProductsCount()} productos encontrados
                </span>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {selectedCategories.map((category) => (
                  <span
                    key={category}
                    style={{
                      backgroundColor: "#e63946",
                      color: "white",
                      padding: "4px 8px",
                      borderRadius: "4px",
                      fontSize: "0.8rem",
                      cursor: "pointer",
                    }}
                    onClick={() => toggleCategory(category)}
                  >
                    {category} ×
                  </span>
                ))}
                {selectedColors.map((color) => (
                  <span
                    key={color}
                    style={{
                      backgroundColor: "#4caf50",
                      color: "white",
                      padding: "4px 8px",
                      borderRadius: "4px",
                      fontSize: "0.8rem",
                      cursor: "pointer",
                    }}
                    onClick={() => toggleColor(color)}
                  >
                    {getColorDisplayName(color)} ×
                  </span>
                ))}
                {(priceRange[0] > 0 || priceRange[1] < 1000) && (
                  <span
                    style={{
                      backgroundColor: "#ff9800",
                      color: "white",
                      padding: "4px 8px",
                      borderRadius: "4px",
                      fontSize: "0.8rem",
                      cursor: "pointer",
                    }}
                    onClick={() => setPriceRange([0, 1000])}
                  >
                    ${priceRange[0]} - ${priceRange[1]} ×
                  </span>
                )}
              </div>
            </div>
          )}

        <div className="products-grid">
          {filteredProducts.map((product) => {
            const isInWishlistState = isInWishlist(product.id)
            const heartAnimation = heartAnimations[product.id] || ""

            return (
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
                  <button
                    className={`wishlist-btn-shop ${isInWishlistState ? "active" : ""} ${heartAnimation}`}
                    onClick={(e) => handleToggleWishlist(e, product)}
                  >
                    <Heart size={18} fill={isInWishlistState ? "#e63946" : "none"} />
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
            )
          })}
        </div>

        {/* Mostrar mensaje si no hay productos */}
        {filteredProducts.length === 0 && (
          <div
            style={{
              textAlign: "center",
              padding: "60px 20px",
              backgroundColor: "white",
              borderRadius: "8px",
              boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
            }}
          >
            <h3 style={{ color: "#666", marginBottom: "15px" }}>No se encontraron productos</h3>
            <p style={{ color: "#999", marginBottom: "20px" }}>
              Intenta ajustar los filtros para encontrar lo que buscas
            </p>
            <button
              onClick={clearFilters}
              style={{
                backgroundColor: "#e63946",
                color: "white",
                border: "none",
                padding: "10px 20px",
                borderRadius: "4px",
                cursor: "pointer",
                fontWeight: "600",
              }}
            >
              Limpiar todos los filtros
            </button>
          </div>
        )}

        {/* Solo mostrar paginación si hay productos */}
        {filteredProducts.length > 0 && (
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
