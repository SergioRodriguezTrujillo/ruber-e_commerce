import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Header from "./components/Header"
import Footer from "./components/Footer"
import HomePage from "./pages/HomePage"
import ShopPage from "./pages/ShopPage"
import ContactPage from "./pages/ContactPage"
import AboutPage from "./pages/AboutPage"
import { CartProvider } from "./context/CartContext"
import { WishlistProvider } from "./context/WishlistContext"

function App() {
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
