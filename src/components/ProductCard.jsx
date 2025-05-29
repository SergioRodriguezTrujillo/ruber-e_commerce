"use client"
import { useState } from "react"
import { Link } from "react-router-dom"
import { Heart } from "lucide-react"
import { useWishlist } from "../context/WishlistContext"
import QuoteModal from "./QuoteModal"
import InfoModal from "./InfoModal"
import "./ProductCard.css"

const ProductCard = ({ product }) => {
  const { addToWishlist, isInWishlist, removeFromWishlist } = useWishlist()
  const [showQuoteModal, setShowQuoteModal] = useState(false)
  const [showInfoModal, setShowInfoModal] = useState(false)
  const [heartAnimation, setHeartAnimation] = useState("")

  const handleToggleWishlist = (e) => {
    e.stopPropagation()
    e.preventDefault()

    const wasInWishlist = isInWishlist(product.id)

    if (wasInWishlist) {
      removeFromWishlist(product.id)
      setHeartAnimation("animate-empty")
    } else {
      addToWishlist(product)
      setHeartAnimation("animate-fill")
    }

    // Limpiar la animación después de que termine
    setTimeout(() => setHeartAnimation(""), 600)
  }

  const handleQuoteClick = (e) => {
    e.stopPropagation()
    e.preventDefault()
    setShowQuoteModal(true)
  }

  const handleInfoClick = (e) => {
    e.stopPropagation()
    e.preventDefault()
    setShowInfoModal(true)
  }

  const handleProductClick = () => {
    // Scroll to top when navigating to product detail
    window.scrollTo(0, 0)
  }

  const isInWishlistState = isInWishlist(product.id)

  return (
    <>
      <Link to={`/product/${product.id}`} className="product-card-shop" onClick={handleProductClick}>
        {product.discount > 0 && <span className="discount-badge">-{product.discount}%</span>}
        {product.isNew && <span className="new-badge">NEW</span>}

        <div className="product-image-shop">
          <img src={product.image || "/placeholder.svg"} alt={product.name} />
        </div>

        <div className="product-title-container">
          <h3 className="product-title-shop">{product.name}</h3>
          <button
            className={`wishlist-btn-shop ${isInWishlistState ? "active" : ""} ${heartAnimation}`}
            onClick={handleToggleWishlist}
          >
            <Heart size={18} fill={isInWishlistState ? "#e63946" : "none"} />
          </button>
        </div>

        <div className="product-buttons-shop">
          <button className="info-btn-shop" onClick={handleInfoClick}>
            Info
          </button>
          <button className="quote-btn-shop" onClick={handleQuoteClick}>
            Solicitar cotización
          </button>
        </div>
      </Link>

      <QuoteModal isOpen={showQuoteModal} onClose={() => setShowQuoteModal(false)} productName={product.name} />

      <InfoModal isOpen={showInfoModal} onClose={() => setShowInfoModal(false)} productName={product.name} />
    </>
  )
}

export default ProductCard
