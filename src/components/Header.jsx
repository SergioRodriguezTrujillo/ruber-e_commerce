"use client"

import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { Search, Heart, ShoppingCart, User, ChevronDown } from "lucide-react"
import "./Header.css"

const Header = () => {
  const location = useLocation()
  const [searchQuery, setSearchQuery] = useState("")
  const [language, setLanguage] = useState("Español")

  const isActive = (path) => {
    return location.pathname === path ? "active" : ""
  }

  const handleSearch = (e) => {
    e.preventDefault()
    // Implementar lógica de búsqueda
    console.log("Searching for:", searchQuery)
  }

  return (
    <header>
      <div className="top-bar">
        <div className="container top-bar-container">
          <p className="promo-text">Este puede ser un texto de oferta... Oferta - 25% descuento</p>
          <div className="top-bar-actions">
            <a href="#" className="buy-now-btn">
              Comprar Ahora
            </a>
            <div className="language-selector">
              <span>{language}</span>
              <ChevronDown size={16} />
              <div className="language-dropdown">
                <div onClick={() => setLanguage("Español")}>Español</div>
                <div onClick={() => setLanguage("English")}>English</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="main-header">
        <div className="container main-header-container">
          <Link to="/" className="logo">
            <h1>IT LIVE SOLUTIONS</h1>
          </Link>

          <nav className="main-nav">
            <ul>
              <li className={isActive("/")}>
                <Link to="/">Inicio</Link>
              </li>
              <li className={isActive("/tienda")}>
                <Link to="/tienda">Tienda</Link>
              </li>
              <li className={isActive("/contacto")}>
                <Link to="/contacto">Contacto</Link>
              </li>
              <li className={isActive("/acerca-de")}>
                <Link to="/acerca-de">Acerca de</Link>
              </li>
            </ul>
          </nav>

          <div className="header-actions">
            <form className="search-form" onSubmit={handleSearch}>
              <input
                type="text"
                placeholder="¿Qué estás buscando?"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit">
                <Search size={18} />
              </button>
            </form>

            <div className="header-icons">
              <Link to="/wishlist" className="icon-link">
                <Heart size={20} strokeWidth={1.5} />
              </Link>
              <Link to="/cart" className="icon-link">
                <ShoppingCart size={20} strokeWidth={1.5} />
              </Link>
              <Link to="/account" className="icon-link">
                <User size={20} strokeWidth={1.5} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
