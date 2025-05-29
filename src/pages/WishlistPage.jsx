"use client"

import { Link } from "react-router-dom"
import { Heart } from "lucide-react"
import { useWishlist } from "../context/WishlistContext"
import { useCart } from "../context/CartContext"
import ProductCard from "../components/ProductCard"
import "./WishlistPage.css"

const WishlistPage = () => {
  const { wishlistItems, clearWishlist } = useWishlist()
  const { addMultipleToCart } = useCart()

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
      clearWishlist()
    }
  }

  return (
    <div className="wishlist-page">
      <div className="container">
        {wishlistItems.length > 0 ? (
          <>
            <div className="wishlist-header">
              <h1 className="wishlist-title">Lista de Deseos</h1>
              <button className="move-all-btn" onClick={handleMoveAllToCart}>
                Mover todo al carro de compras
              </button>
            </div>

            <div className="wishlist-grid">
              {wishlistItems.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        ) : (
          <div className="empty-wishlist">
            <div className="empty-wishlist-icon">
              <Heart size={80} strokeWidth={1} />
            </div>
            <h2>Tu lista de deseos está vacía</h2>
            <p>Agrega productos que te gusten para encontrarlos fácilmente más tarde</p>
            <Link to="/tienda" className="continue-shopping-btn">
              Continuar comprando
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default WishlistPage
