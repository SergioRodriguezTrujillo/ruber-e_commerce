"use client"
import { useState } from "react"
import { Link } from "react-router-dom"
import { Heart } from 'lucide-react'
import { useWishlist } from "../context/WishlistContext"
import QuoteModal from "./QuoteModal"
import InfoModal from "./InfoModal"
import "./ProductCard.css"

const ProductCard = ({ product }) => {
  const { addToWishlist, isInWishlist, removeFromWishlist } = useWishlist()
  const [showQuoteModal, setShowQuoteModal] = useState(false)
  const [showInfoModal, setShowInfoModal] = useState(false)

  const handleToggleWishlist = (e) => {
    e.stopPropagation()
    e.preventDefault()
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist(product)
    }
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
            className={`wishlist-btn-shop ${isInWishlist(product.id) ? "active" : ""}`}
            onClick={handleToggleWishlist}
          >
            <Heart size={18} />
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
