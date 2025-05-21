"use client"

import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Header from "./components/Header"
import Footer from "./components/Footer"
import HomePage from "./pages/HomePage"
import ShopPage from "./pages/ShopPage"
import ContactPage from "./pages/ContactPage"
import AboutPage from "./pages/AboutPage"
import ProductDetailPage from "./pages/ProductDetailPage"
import { CartProvider } from "./context/CartContext"
import { WishlistProvider } from "./context/WishlistContext"
import { useEffect } from "react"

function App() {
  // Add class to body when header becomes sticky
  useEffect(() => {
    const handleScroll = () => {
      // Hacer que el header se fije exactamente cuando comienza el scroll
      if (window.scrollY > 0) {
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
            <Header />
            <main>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/tienda" element={<ShopPage />} />
                <Route path="/contacto" element={<ContactPage />} />
                <Route path="/acerca-de" element={<AboutPage />} />
                <Route path="/product/:id" element={<ProductDetailPage />} />
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
