"use client"
import { useState } from "react"
import { Heart } from "lucide-react"
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
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist(product)
    }
  }

  const handleQuoteClick = (e) => {
    e.stopPropagation()
    setShowQuoteModal(true)
  }

  const handleInfoClick = (e) => {
    e.stopPropagation()
    setShowInfoModal(true)
  }

  return (
    <>
      <div className="product-card-shop">
        {product.discount > 0 && <span className="discount-badge">-{product.discount}%</span>}

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

        <div className="product-price-shop">
          <span className="current-price-shop">${product.price.toFixed(2)}</span>
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="original-price-shop">${product.originalPrice.toFixed(2)}</span>
          )}
        </div>

        <div className="product-buttons-shop">
          <button className="info-btn-shop" onClick={handleInfoClick}>
            Info
          </button>
          <button className="quote-btn-shop" onClick={handleQuoteClick}>
            Solicitar cotización
          </button>
        </div>
      </div>

      <QuoteModal isOpen={showQuoteModal} onClose={() => setShowQuoteModal(false)} productName={product.name} />

      <InfoModal isOpen={showInfoModal} onClose={() => setShowInfoModal(false)} productName={product.name} />
    </>
  )
}

export default ProductCard
