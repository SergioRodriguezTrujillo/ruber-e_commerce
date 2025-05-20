"use client"

import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { Heart, Minus, Plus, Truck, RotateCcw, Eye } from "lucide-react"
import { useCart } from "../context/CartContext"
import { useWishlist } from "../context/WishlistContext"
import { getProductById, getRelatedProducts } from "../services/productService"
import "./ProductDetailPage.css"

const ProductDetailPage = () => {
  const { id } = useParams()
  const { addToCart } = useCart()
  const { addToWishlist, isInWishlist, removeFromWishlist } = useWishlist()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedColor, setSelectedColor] = useState(null)
  const [selectedSize, setSelectedSize] = useState("M")
  const [quantity, setQuantity] = useState(2)
  const [activeImage, setActiveImage] = useState(0)
  const [relatedProducts, setRelatedProducts] = useState([])

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

  const handleAddToCart = () => {
    if (!product) return

    addToCart({
      ...product,
      selectedColor,
      selectedSize,
      quantity,
    })
  }

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const increaseQuantity = () => {
    setQuantity(quantity + 1)
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

  if (loading) {
    return <div className="loading">Cargando...</div>
  }

  if (!product) {
    return <div className="error">Producto no encontrado</div>
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
              {renderStars(product.rating)}
              <span className="review-count">({product.reviewCount} Reseñas)</span>
              <span className="stock-status">
                {product.inStock ? (
                  <span className="in-stock">En existencia</span>
                ) : (
                  <span className="out-of-stock">Agotado</span>
                )}
              </span>
            </div>

            <div className="product-price">
              <span className="current-price">${product.price.toFixed(2)}</span>
            </div>

            <div className="product-description">
              <p>{product.description}</p>
            </div>

            <div className="product-options">
              <div className="color-option">
                <span className="option-label">Color:</span>
                <div className="color-selector">
                  {product.colors.map((color) => (
                    <div
                      key={color}
                      className={`color-circle ${color} ${selectedColor === color ? "selected" : ""}`}
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
            </div>

            <div className="product-actions">
              <div className="quantity-selector">
                <button className="quantity-btn" onClick={decreaseQuantity}>
                  <Minus size={16} strokeWidth={1.5} />
                </button>
                <input
                  type="number"
                  className="quantity-input"
                  value={quantity}
                  onChange={(e) => setQuantity(Number.parseInt(e.target.value) || 1)}
                  min="1"
                />
                <button className="quantity-btn" onClick={increaseQuantity}>
                  <Plus size={16} strokeWidth={1.5} />
                </button>
              </div>

              <button className="add-to-cart-btn" onClick={handleAddToCart}>
                Comprar ahora
              </button>

              <button
                className={`wishlist-btn ${isInWishlist(product.id) ? "active" : ""}`}
                onClick={handleToggleWishlist}
              >
                <Heart size={20} strokeWidth={1.5} />
              </button>
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
          <div className="section-header">
            <h2 className="section-title">Artículos relacionados</h2>
          </div>

          <div className="related-products-grid">
            {relatedProducts.map((relatedProduct) => (
              <div key={relatedProduct.id} className="product-card">
                <div className="product-image">
                  <img src={relatedProduct.image || "/placeholder.svg"} alt={relatedProduct.name} />
                  {relatedProduct.discount > 0 && <span className="discount-badge">-{relatedProduct.discount}%</span>}

                  <div className="product-actions">
                    <button className="action-btn wishlist-btn">
                      <Heart size={16} strokeWidth={1.5} />
                    </button>
                    <Link to={`/product/${relatedProduct.id}`} className="action-btn view-btn">
                      <Eye size={16} strokeWidth={1.5} />
                    </Link>
                  </div>
                </div>

                <div className="product-info">
                  <h3 className="product-title">{relatedProduct.name}</h3>

                  <div className="product-price">
                    <span className="current-price">${relatedProduct.price.toFixed(2)}</span>
                    <span className="original-price">${relatedProduct.originalPrice.toFixed(2)}</span>
                  </div>

                  <div className="rating">
                    {renderStars(relatedProduct.rating)}
                    <span className="rating-count">({relatedProduct.reviewCount})</span>
                  </div>

                  <div className="color-options">
                    {relatedProduct.colors.map((color) => (
                      <div key={color} className={`color-option ${color}`} />
                    ))}
                  </div>
                </div>

                <button className="add-to-cart-btn">Add To Cart</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetailPage
