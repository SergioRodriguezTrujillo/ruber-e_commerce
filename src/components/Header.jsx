"use client"

import { useState, useEffect, useRef } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import "./Header.css"

const languageOptions = [
  { code: "en", name: "Inglés", flag: "/usa.jpg" },
  { code: "es", name: "Español", flag: "/spain.jpg" },
]

const Header = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState("")
  const [language, setLanguage] = useState("Español")
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false)
  const [showAccountDropdown, setShowAccountDropdown] = useState(false)

  // Referencias para detectar clicks fuera de los dropdowns
  const languageDropdownRef = useRef(null)
  const accountDropdownRef = useRef(null)

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
    setShowAccountDropdown(false) // Cerrar el otro dropdown
  }

  const toggleAccountDropdown = () => {
    setShowAccountDropdown(!showAccountDropdown)
    setShowLanguageDropdown(false) // Cerrar el otro dropdown
  }

  const selectLanguage = (lang) => {
    setLanguage(lang.name)
    setShowLanguageDropdown(false)
  }

  const handleAccountAction = (action) => {
    console.log("Account action:", action)
    setShowAccountDropdown(false)

    // Navegación específica para cada acción
    switch (action) {
      case "manage":
        navigate("/account")
        break
      case "orders":
        navigate("/account/orders")
        break
      case "reviews":
        navigate("/account/reviews")
        break
      case "cancellations":
        navigate("/account/cancellations")
        break
      case "logout":
        // Implementar lógica de logout
        console.log("Logging out...")
        break
      default:
        break
    }
  }

  const getCurrentLanguageFlag = () => {
    const currentLang = languageOptions.find((lang) => lang.name === language)
    return currentLang ? currentLang.flag : "/spain.jpg"
  }

  const handleBuyNowClick = () => {
    navigate("/tienda")
  }

  // Efecto para cerrar dropdowns cuando se hace click fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Cerrar dropdown de idioma si se hace click fuera
      if (languageDropdownRef.current && !languageDropdownRef.current.contains(event.target)) {
        setShowLanguageDropdown(false)
      }

      // Cerrar dropdown de cuenta si se hace click fuera
      if (accountDropdownRef.current && !accountDropdownRef.current.contains(event.target)) {
        setShowAccountDropdown(false)
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
          <p className="promo-text-header">Este puede ser un texto de oferta... Oferta - 25% descuento</p>
          <div className="top-bar-actions">
            <button onClick={handleBuyNowClick} className="buy-now-btn">
              Comprar Ahora
            </button>
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

            <div className="header-icons">
              <Link to="/wishlist" className="icon-link">
                <span className="material-icons-outlined">favorite_border</span>
              </Link>
              <Link to="/cart" className="icon-link">
                <span className="material-icons-outlined">shopping_cart</span>
              </Link>
              <div className="account-dropdown-container" ref={accountDropdownRef}>
                <button className="icon-link account-toggle" onClick={toggleAccountDropdown}>
                  <span className="material-icons-outlined">person_outline</span>
                </button>
                {showAccountDropdown && (
                  <div className="account-dropdown">
                    <div className="account-dropdown-item" onClick={() => handleAccountAction("manage")}>
                      <span className="material-icons-outlined">person</span>
                      <span>Administrar mi cuenta</span>
                    </div>
                    <div className="account-dropdown-item" onClick={() => handleAccountAction("orders")}>
                      <span className="material-icons-outlined">shopping_bag</span>
                      <span>Mis pedidos</span>
                    </div>
                    <div className="account-dropdown-item" onClick={() => handleAccountAction("reviews")}>
                      <span className="material-icons-outlined">star_border</span>
                      <span>Mis Reseñas</span>
                    </div>
                    <div className="account-dropdown-item" onClick={() => handleAccountAction("cancellations")}>
                      <span className="material-icons-outlined">cancel</span>
                      <span>Mis Cancelaciones</span>
                    </div>
                    <div className="account-dropdown-item" onClick={() => handleAccountAction("logout")}>
                      <span className="material-icons-outlined">logout</span>
                      <span>Cerrar sesión</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Header
