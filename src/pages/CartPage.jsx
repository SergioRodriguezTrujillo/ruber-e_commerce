"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Minus, Plus, Trash2, Settings } from "lucide-react"
import { useCart } from "../context/CartContext"
import "./CartPage.css"

const CartPage = () => {
  const navigate = useNavigate()
  const { cartItems, updateQuantity, removeFromCart, clearCart, getCartTotal, getCartCount } = useCart()
  const [showFeatureModal, setShowFeatureModal] = useState(false)
  const [isClearing, setIsClearing] = useState(false)

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(id)
    } else {
      updateQuantity(id, newQuantity)
    }
  }

  const handleCheckout = () => {
    // Aquí iría la lógica para proceder al checkout
    console.log("Proceeding to checkout with items:", cartItems)
    alert("Funcionalidad de checkout será implementada próximamente")
  }

  const handleClearCart = () => {
    if (window.confirm("¿Estás seguro de que quieres vaciar tu carrito?")) {
      setIsClearing(true)

      // Wait for the animation to complete before actually clearing
      setTimeout(() => {
        clearCart()
        setIsClearing(false)
      }, 300) // Wait for the staggered animation to complete
    }
  }

  const handleProductClick = (productId) => {
    // Navegar al detalle del producto
    navigate(`/product/${productId}`)
  }

  const handleBuyIndividual = (e) => {
    e.stopPropagation()
    setShowFeatureModal(true)
  }

  const closeFeatureModal = () => {
    setShowFeatureModal(false)
  }

  const subtotal = getCartTotal()
  const shipping = subtotal > 100 ? 0 : 10
  const tax = subtotal * 0.1
  const total = subtotal + shipping + tax

  return (
    <div className="cart-page">
      <div className="container">
        {cartItems.length > 0 ? (
          <>
            <div className="cart-header">
              <h1 className="cart-title">Carrito de Compras</h1>
              <button className="checkout-btn" onClick={handleCheckout}>
                Proceder al Checkout
              </button>
            </div>

            <div className="cart-content">
              <div className={`cart-items ${isClearing ? "clearing" : ""}`}>
                {cartItems.map((item) => (
                  <div key={item.id} className="cart-item">
                    <div className="cart-item-image" onClick={() => handleProductClick(item.id)}>
                      <img src={item.image || "/placeholder.svg"} alt={item.name} />
                    </div>

                    <div className="cart-item-details" onClick={() => handleProductClick(item.id)}>
                      <h3>{item.name}</h3>
                      <p>Producto disponible en stock</p>
                    </div>

                    <div className="cart-item-price">${item.price}</div>

                    <div className="quantity-controls">
                      <button className="quantity-btn" onClick={() => handleQuantityChange(item.id, item.quantity - 1)}>
                        <Minus size={14} strokeWidth={2} />
                      </button>
                      <input
                        type="number"
                        className="quantity-input"
                        value={item.quantity}
                        onChange={(e) => handleQuantityChange(item.id, Number.parseInt(e.target.value) || 1)}
                        min="1"
                      />
                      <button className="quantity-btn" onClick={() => handleQuantityChange(item.id, item.quantity + 1)}>
                        <Plus size={14} strokeWidth={2} />
                      </button>
                    </div>

                    <button className="buy-individual-btn" onClick={handleBuyIndividual}>
                      Comprar
                    </button>

                    <button className="remove-btn" onClick={() => removeFromCart(item.id)}>
                      <Trash2 size={18} strokeWidth={1.5} />
                    </button>
                  </div>
                ))}
              </div>

              <div className="cart-summary">
                <h3 className="summary-title">Resumen del Pedido</h3>

                <div className="summary-row">
                  <span>Subtotal ({getCartCount()} productos)</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>

                <div className="summary-row">
                  <span>Envío</span>
                  <span>{shipping === 0 ? "Gratis" : `$${shipping.toFixed(2)}`}</span>
                </div>

                <div className="summary-row">
                  <span>Impuestos</span>
                  <span>${tax.toFixed(2)}</span>
                </div>

                <div className="summary-row total">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>

                <div className="summary-actions">
                  <button className="summary-btn primary" onClick={handleCheckout}>
                    Proceder al Checkout
                  </button>
                  <button className="summary-btn secondary" onClick={handleClearCart}>
                    Vaciar Carrito
                  </button>
                </div>

                <p style={{ fontSize: "0.8rem", color: "#666", marginTop: "15px", textAlign: "center" }}>
                  Envío gratis en pedidos superiores a $100
                </p>
              </div>
            </div>
          </>
        ) : (
          <div className="empty-cart">
            <div className="empty-cart-header">
              <h1 className="empty-cart-title">CARRO DE COMPRAS</h1>
            </div>

            <div className="empty-cart-banner-container">
              <div className="empty-cart-banner">
                <h2 className="empty-cart-banner-title">Tu carro de compras está vacío</h2>
                <p className="empty-cart-banner-subtitle">¡Comienza a llenar tu carro con tus productos favoritos!</p>
              </div>
            </div>

            <div className="empty-cart-content">
              <Link to="/tienda" className="continue-shopping-btn">
                Seguir comprando
              </Link>
            </div>
          </div>
        )}

        {/* Modal para funcionalidad no disponible */}
        {showFeatureModal && (
          <div className="feature-modal-overlay" onClick={closeFeatureModal}>
            <div className="feature-modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="feature-modal-icon">
                <Settings size={48} strokeWidth={1.5} />
              </div>
              <h3 className="feature-modal-title">Funcionalidad en Desarrollo</h3>
              <p className="feature-modal-message">
                La opción de compra individual está siendo desarrollada. Pronto estará disponible para mejorar tu
                experiencia de compra.
              </p>
              <button className="feature-modal-btn" onClick={closeFeatureModal}>
                Entendido
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CartPage
