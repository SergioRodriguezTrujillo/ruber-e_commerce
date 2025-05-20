"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { Heart, Eye, Star } from "lucide-react"
import { useCart } from "../context/CartContext"
import { useWishlist } from "../context/WishlistContext"
import "./ProductCard.css"

const ProductCard = ({ product }) => {
  const { addToCart } = useCart()
  const { addToWishlist, isInWishlist, removeFromWishlist } = useWishlist()
  const [selectedColor, setSelectedColor] = useState(product.colors[0])

  const handleToggleWishlist = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist(product)
    }
  }

  const handleAddToCart = () => {
    addToCart({
      ...product,
      selectedColor,
      quantity: 1,
    })
  }

  return (
    <div className="product-card">
      {product.discount > 0 && <span className="discount-badge">-{product.discount}%</span>}

      <div className="product-image">
        <img src={product.image || "/placeholder.svg"} alt={product.name} />
      </div>

      <div className="product-actions">
        <button
          className={`action-btn wishlist-btn ${isInWishlist(product.id) ? "active" : ""}`}
          onClick={handleToggleWishlist}
        >
          <Heart size={16} strokeWidth={1.5} />
        </button>
        <Link to={`/product/${product.id}`} className="action-btn view-btn">
          <Eye size={16} strokeWidth={1.5} />
        </Link>
      </div>

      <div className="product-info">
        <h3 className="product-title">{product.name}</h3>

        <div className="product-price">
          <span className="current-price">${product.price.toFixed(2)}</span>
          {product.originalPrice && <span className="original-price">${product.originalPrice.toFixed(2)}</span>}
        </div>

        <div className="rating">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={14}
              strokeWidth={1.5}
              className={i < product.rating ? "star filled" : "star"}
              fill={i < product.rating ? "#ffc107" : "none"}
            />
          ))}
          <span className="rating-count">({product.reviewCount})</span>
        </div>

        <div className="color-options">
          {product.colors.map((color) => (
            <div
              key={color}
              className={`color-option ${color} ${selectedColor === color ? "selected" : ""}`}
              onClick={() => setSelectedColor(color)}
            />
          ))}
        </div>
      </div>

      {/* Add to Cart button that appears on hover */}
      <button className="add-to-cart-btn" onClick={handleAddToCart}>
        Add To Cart
      </button>
    </div>
  )
}

export default ProductCard
