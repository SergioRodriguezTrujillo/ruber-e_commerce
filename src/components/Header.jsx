"use client"

import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import "./Header.css"

const languageOptions = [
  { code: "es", name: "Español", flag: "/spain.jpg" },
  { code: "en", name: "English", flag: "/usa.jpg" },
]

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
    <>
      <div className="top-bar">
        <div className="container top-bar-container">
          <p className="promo-text">Este puede ser un texto de oferta... Oferta - 25% descuento</p>
          <div className="top-bar-actions">
            <a href="#" className="buy-now-btn">
              Comprar Ahora
            </a>
            <div className="language-selector">
              <span>
                {languageOptions.find((lang) => lang.name === language)?.code === "es" ? (
                  <img src="/spain.jpg" alt="Español" className="language-flag" />
                ) : (
                  <img src="/usa.jpg" alt="English" className="language-flag" />
                )}
                {language}
              </span>
              <span className="material-icons-outlined">expand_more</span>
              <div className="language-dropdown">
                {languageOptions.map((lang) => (
                  <div key={lang.code} onClick={() => setLanguage(lang.name)}>
                    <img src={lang.flag || "/placeholder.svg"} alt={lang.name} className="language-flag" />
                    {lang.name}
                  </div>
                ))}
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
                <span className="material-icons-outlined">search</span>
              </button>
            </form>

            <div className="header-icons">
              <Link to="/wishlist" className="icon-link">
                <span className="material-icons-outlined">favorite_border</span>
              </Link>
              <Link to="/cart" className="icon-link">
                <span className="material-icons-outlined">shopping_cart</span>
              </Link>
              <Link to="/account" className="icon-link">
                <span className="material-icons-outlined">person_outline</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Header
