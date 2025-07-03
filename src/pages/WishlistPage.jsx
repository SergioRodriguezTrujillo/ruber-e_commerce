"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { useWishlist } from "../context/WishlistContext"
import { useCart } from "../context/CartContext"
import ProductCard from "../components/ProductCard"
import "./WishlistPage.css"

const WishlistPage = () => {
  const { wishlistItems, clearWishlist } = useWishlist()
  const { addMultipleToCart } = useCart()
  const [isClearing, setIsClearing] = useState(false)

  const handleMoveAllToCart = () => {
    if (wishlistItems.length === 0) return

    // Agregar todos los productos de la wishlist al carrito
    addMultipleToCart(wishlistItems)

    // Mostrar mensaje de confirmación
    alert(`${wishlistItems.length} productos agregados al carrito`)

    // Opcional: limpiar la wishlist después de mover todo al carrito
    // clearWishlist()
  }

  const handleClearWishlist = () => {
    if (window.confirm("¿Estás seguro de que quieres vaciar tu lista de deseos?")) {
      setIsClearing(true)

      // Wait for the animation to complete before actually clearing
      setTimeout(() => {
        clearWishlist()
        setIsClearing(false)
      }, 300) // Wait for the staggered animation to complete
    }
  }

  return (
    <div className="wishlist-page">
      <div className="container">
        {wishlistItems.length > 0 ? (
          <>
            <div className="wishlist-header">
              <h1 className="wishlist-title">LISTA DE DESEOS</h1>
              <div className="wishlist-actions">
                <button className="clear-wishlist-btn" onClick={handleClearWishlist}>
                  Vaciar la lista
                </button>
                <button className="move-all-btn" onClick={handleMoveAllToCart}>
                  Mover al carro
                </button>
              </div>
            </div>

            <div className={`wishlist-grid ${isClearing ? "clearing" : ""}`}>
              {wishlistItems.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            {wishlistItems.length > 0 && (
              <div className="pagination-container">
                <div className="pagination">
                  <button className="pagination-arrow">&lt;</button>
                  <button className="pagination-number active">1</button>
                  <button className="pagination-number">2</button>
                  <button className="pagination-number">3</button>
                  <button className="pagination-number">4</button>
                  <button className="pagination-number">5</button>
                  <button className="pagination-arrow">&gt;</button>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="empty-wishlist">
            <div className="empty-wishlist-header">
              <h1 className="empty-wishlist-title">LISTA DE DESEOS</h1>
            </div>

            <div className="empty-wishlist-banner-container">
              <div className="empty-wishlist-banner">
                <h2 className="empty-wishlist-banner-title">Tu lista de deseos está vacía</h2>
                <p className="empty-wishlist-banner-subtitle">
                  ¡Agrega productos que te gusten para encontrarlos fácilmente más tarde!
                </p>
              </div>
            </div>

            <div className="empty-wishlist-content">
              <Link to="/tienda" className="continue-shopping-btn">
                Seguir comprando
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default WishlistPage
