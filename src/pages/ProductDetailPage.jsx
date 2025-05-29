"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Heart, Minus, Plus, Truck, RotateCcw } from "lucide-react"
import { useWishlist } from "../context/WishlistContext"
import { getProductById, getRelatedProducts } from "../services/productService"
import QuoteModal from "../components/QuoteModal"
import InfoModal from "../components/InfoModal"
import "./ProductDetailPage.css"
import ProductCard from "../components/ProductCard"

const ProductDetailPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToWishlist, isInWishlist, removeFromWishlist } = useWishlist()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedColor, setSelectedColor] = useState("black")
  const [selectedSize, setSelectedSize] = useState("M")
  const [quantity, setQuantity] = useState(1)
  const [activeImage, setActiveImage] = useState(0)
  const [relatedProducts, setRelatedProducts] = useState([])
  const [showQuoteModal, setShowQuoteModal] = useState(false)
  const [showInfoModal, setShowInfoModal] = useState(false)
  const [selectedRelatedProduct, setSelectedRelatedProduct] = useState(null)

  // Cargar datos del producto
  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true)
      try {
        // Obtener el producto por ID
        const productData = getProductById(id)

        if (productData) {
          setProduct(productData)
          setSelectedColor(productData.colors[0])

          // Obtener productos relacionados
          const related = getRelatedProducts(id)
          setRelatedProducts(related)
        }
      } catch (error) {
        console.error("Error fetching product:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [id])

  const handleToggleWishlist = () => {
    if (!product) return

    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist(product)
    }
  }

  const handleQuoteClick = () => {
    setSelectedRelatedProduct(product)
    setShowQuoteModal(true)
  }

  const handleRelatedQuoteClick = (relatedProduct) => {
    setSelectedRelatedProduct(relatedProduct)
    setShowQuoteModal(true)
  }

  const handleInfoClick = () => {
    setSelectedRelatedProduct(product)
    setShowInfoModal(true)
  }

  const handleRelatedInfoClick = (relatedProduct) => {
    setSelectedRelatedProduct(relatedProduct)
    setShowInfoModal(true)
  }

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const increaseQuantity = () => {
    setQuantity(quantity + 1)
  }

  const handleContinueShopping = () => {
    navigate("/tienda")
  }

  const renderStars = (rating) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <span key={i} className={i < rating ? "star filled" : "star"}>
          ★
        </span>
      ))
  }

  const getColorClass = (color) => {
    switch (color) {
      case "black":
        return "black"
      case "blue":
        return "blue"
      case "red":
        return "red"
      default:
        return "black"
    }
  }

  if (loading) {
    return (
      <div className="product-detail-page">
        <div className="container">
          <div style={{ textAlign: "center", padding: "100px 0" }}>Cargando...</div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="product-detail-page">
        <div className="container">
          <div style={{ textAlign: "center", padding: "100px 0" }}>Producto no encontrado</div>
        </div>
      </div>
    )
  }

  return (
    <div className="product-detail-page">
      <div className="container">
        <div className="product-detail-container">
          <div className="product-gallery">
            <div className="thumbnail-list">
              {product.images.map((image, index) => (
                <div
                  key={index}
                  className={`thumbnail ${activeImage === index ? "active" : ""}`}
                  onClick={() => setActiveImage(index)}
                >
                  <img src={image || "/placeholder.svg"} alt={`${product.name} - Thumbnail ${index + 1}`} />
                </div>
              ))}
            </div>
            <div className="main-image">
              <img src={product.images[activeImage] || "/placeholder.svg"} alt={product.name} />
            </div>
          </div>

          <div className="product-info">
            <h1 className="product-title">{product.name}</h1>

            <div className="product-rating">
              <div className="stars">{renderStars(product.rating)}</div>
              <span className="rating-text">({product.reviewCount} Reseñas)</span>
              <span className="review-count">|</span>
              <span className="in-stock">En existencias</span>
            </div>

            <div className="product-description">
              <p>{product.description}</p>
            </div>

            <div className="description-divider"></div>

            <div className="product-options">
              <div className="color-option">
                <span className="option-label">Color:</span>
                <div className="color-selector">
                  {product.colors.map((color) => (
                    <div
                      key={color}
                      className={`color-circle ${getColorClass(color)} ${selectedColor === color ? "selected" : ""}`}
                      onClick={() => setSelectedColor(color)}
                    ></div>
                  ))}
                </div>
              </div>

              <div className="size-option">
                <span className="option-label">Tamaño:</span>
                <div className="size-selector">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      className={`size-button ${selectedSize === size ? "selected" : ""}`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
              <div className="size-option">
               <div className="quantity-selector">
                <button className="quantity-btn" onClick={decreaseQuantity}>
                  <Minus size={14} strokeWidth={2} />
                </button>
                <input
                  type="number"
                  className="quantity-input"
                  value={quantity}
                  onChange={(e) => setQuantity(Number.parseInt(e.target.value) || 1)}
                  min="1"
                />
                <button className="quantity-btn" onClick={increaseQuantity}>
                  <Plus size={14} strokeWidth={2} />
                </button>
              </div>

              <button className="quote-btn" onClick={handleQuoteClick}>
                Solicitar cotización
              </button>

              <button
                className={`wishlist-btn ${isInWishlist(product.id) ? "active" : ""}`}
                onClick={handleToggleWishlist}
              >
                <Heart size={16} strokeWidth={1.5} />
              </button>
              </div>
            </div>

            <div className="shipping-info">
              <div className="shipping-item">
                <div className="shipping-icon">
                  <Truck size={20} strokeWidth={1.5} />
                </div>
                <div className="shipping-text">
                  <h4>Entrega gratuita</h4>
                  <p>Ingrese su código postal para ver la disponibilidad de entrega</p>
                </div>
              </div>

              <div className="shipping-item">
                <div className="shipping-icon">
                  <RotateCcw size={20} strokeWidth={1.5} />
                </div>
                <div className="shipping-text">
                  <h4>Entrega de devolución</h4>
                  <p>
                    Envío y devolución gratuitos en 30 días. <span className="details-link">Detalles</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="related-products-section">
          <h2 className="section-title">Artículos relacionados</h2>

          <div className="related-products-grid">
            {relatedProducts.map((relatedProduct) => (
              <ProductCard key={relatedProduct.id} product={relatedProduct} />
            ))}
          </div>

          <button className="continue-shopping-btn" onClick={handleContinueShopping}>
            Seguir comprando
          </button>
        </div>
      </div>

      <QuoteModal
        isOpen={showQuoteModal}
        onClose={() => setShowQuoteModal(false)}
        productName={selectedRelatedProduct?.name}
      />

      <InfoModal
        isOpen={showInfoModal}
        onClose={() => setShowInfoModal(false)}
        productName={selectedRelatedProduct?.name}
      />
    </div>
  )
}

export default ProductDetailPage
