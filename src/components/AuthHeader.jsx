"use client"

import { useState, useEffect, useRef } from "react"
import { Link, useLocation } from "react-router-dom"
import "./Header.css"

const languageOptions = [
  { code: "en", name: "Inglés", flag: "/usa.jpg" },
  { code: "es", name: "Español", flag: "/spain.jpg" },
]

const AuthHeader = () => {
  const location = useLocation()
  const [searchQuery, setSearchQuery] = useState("")
  const [language, setLanguage] = useState("Español")
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false)

  // Referencias para detectar clicks fuera de los dropdowns
  const languageDropdownRef = useRef(null)

  const isActive = (path) => {
    return location.pathname === path ? "active" : ""
  }

  const handleSearch = (e) => {
    e.preventDefault()
    // Implementar lógica de búsqueda
    console.log("Searching for:", searchQuery)
  }

  const toggleLanguageDropdown = () => {
    setShowLanguageDropdown(!showLanguageDropdown)
  }

  const selectLanguage = (lang) => {
    setLanguage(lang.name)
    setShowLanguageDropdown(false)
  }

  const getCurrentLanguageFlag = () => {
    const currentLang = languageOptions.find((lang) => lang.name === language)
    return currentLang ? currentLang.flag : "/spain.jpg"
  }

  // Efecto para cerrar dropdowns cuando se hace click fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Cerrar dropdown de idioma si se hace click fuera
      if (languageDropdownRef.current && !languageDropdownRef.current.contains(event.target)) {
        setShowLanguageDropdown(false)
      }
    }

    // Agregar event listener
    document.addEventListener("mousedown", handleClickOutside)

    // Cleanup
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <>
      <div className="top-bar">
        <div className="container top-bar-container">
          <div style={{ flex: 1 }}></div> {/* Spacer para centrar el selector de idiomas */}
          <div className="top-bar-actions">
            <div className="language-selector" ref={languageDropdownRef}>
              <div className="language-current" onClick={toggleLanguageDropdown}>
                <span className="language-display">
                  <img src={getCurrentLanguageFlag() || "/placeholder.svg"} alt={language} className="language-flag" />
                  {language}
                </span>
                <span className={`material-icons-outlined expand-icon ${showLanguageDropdown ? "rotated" : ""}`}>
                  expand_more
                </span>
              </div>
              {showLanguageDropdown && (
                <div className="language-dropdown">
                  {languageOptions.map((lang) => (
                    <div key={lang.code} className="language-dropdown-item" onClick={() => selectLanguage(lang)}>
                      <img src={lang.flag || "/placeholder.svg"} alt={lang.name} className="language-flag" />
                      <span>{lang.name}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="main-header">
        <div className="container main-header-container">
          <Link to="/" className="logo">
            <img src="/icon/logo.svg" alt="IT LIVE SOLUTIONS" />
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
            {/* Sin iconos de wishlist, carrito y cuenta */}
          </div>
        </div>
      </div>
    </>
  )
}

export default AuthHeader
