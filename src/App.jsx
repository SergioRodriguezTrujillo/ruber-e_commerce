"use client"

import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom"
import Header from "./components/Header"
import Footer from "./components/Footer"
import HomePage from "./pages/HomePage"
import ShopPage from "./pages/ShopPage"
import ContactPage from "./pages/ContactPage"
import AboutPage from "./pages/AboutPage"
import AccountPage from "./pages/AccountPage"
import ProductDetailPage from "./pages/ProductDetailPage"
import WishlistPage from "./pages/WishlistPage"
import CartPage from "./pages/CartPage"
import { CartProvider } from "./context/CartContext"
import { WishlistProvider } from "./context/WishlistContext"
import { useEffect } from "react"

// Componente para manejar el scroll al cambiar de página
function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

function App() {
  // Add class to body when header becomes sticky
  useEffect(() => {
    const handleScroll = () => {
      const topBarHeight = document.querySelector(".top-bar")?.offsetHeight || 0
      const headerOffset = document.querySelector(".main-header")?.offsetTop || 0

      // Si el scroll es mayor que la posición original del header
      if (window.scrollY > headerOffset - topBarHeight) {
        document.body.classList.add("has-sticky-header")
      } else {
        document.body.classList.remove("has-sticky-header")
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <Router>
      <CartProvider>
        <WishlistProvider>
          <div className="app">
            <ScrollToTop />
            <Header />
            <main>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/tienda" element={<ShopPage />} />
                <Route path="/contacto" element={<ContactPage />} />
                <Route path="/acerca-de" element={<AboutPage />} />
                <Route path="/account" element={<AccountPage />} />
                <Route path="/account/*" element={<AccountPage />} />
                <Route path="/product/:id" element={<ProductDetailPage />} />
                <Route path="/wishlist" element={<WishlistPage />} />
                <Route path="/cart" element={<CartPage />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </WishlistProvider>
      </CartProvider>
    </Router>
  )
}

export default App
