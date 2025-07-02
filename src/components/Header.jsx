"use client"

import { useState, useEffect, useRef } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useWishlist } from "../context/WishlistContext"
import { useCart } from "../context/CartContext"
import { useAuth } from "../context/AuthContext"
import { Menu } from "lucide-react"
import "./Header.css"

const languageOptions = [
  { code: "en", name: "Inglés", flag: "/usa.jpg" },
  { code: "es", name: "Español", flag: "/spain.jpg" },
]

const Header = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { wishlistItems } = useWishlist()
  const { getCartCount } = useCart()
  const { user, isAuthenticated, logout } = useAuth()
  const [searchQuery, setSearchQuery] = useState("")
  const [language, setLanguage] = useState("Español")
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false)
  const [showMobileLanguageDropdown, setShowMobileLanguageDropdown] = useState(false)
  const [showAccountDropdown, setShowAccountDropdown] = useState(false)
  const [wishlistAnimate, setWishlistAnimate] = useState(false)
  const [cartAnimate, setCartAnimate] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Referencias para detectar clicks fuera de los dropdowns
  const languageDropdownRef = useRef(null)
  const mobileLanguageDropdownRef = useRef(null)
  const accountDropdownRef = useRef(null)
  const prevWishlistCount = useRef(wishlistItems.length)
  const prevCartCount = useRef(getCartCount())

  const isActive = (path) => {
    return location.pathname === path ? "active" : ""
  }

  // Animación cuando cambia el contador de wishlist
  useEffect(() => {
    const currentWishlistCount = wishlistItems.length
    if (currentWishlistCount > prevWishlistCount.current) {
      // Producto agregado
      setWishlistAnimate("animate")
      setTimeout(() => setWishlistAnimate(""), 600)
    } else if (currentWishlistCount < prevWishlistCount.current) {
      // Producto eliminado
      setWishlistAnimate("animate-remove")
      setTimeout(() => setWishlistAnimate(""), 500)
    }
    prevWishlistCount.current = currentWishlistCount
  }, [wishlistItems.length])

  // Animación cuando cambia el contador del carrito
  useEffect(() => {
    const currentCartCount = getCartCount()
    if (currentCartCount > prevCartCount.current) {
      // Producto agregado
      setCartAnimate("animate")
      setTimeout(() => setCartAnimate(""), 600)
    } else if (currentCartCount < prevCartCount.current) {
      // Producto eliminado
      setCartAnimate("animate-remove")
      setTimeout(() => setCartAnimate(""), 500)
    }
    prevCartCount.current = currentCartCount
  }, [getCartCount()])

  const handleSearch = (e) => {
    e.preventDefault()
    // Implementar lógica de búsqueda
    console.log("Searching for:", searchQuery)
  }

  const toggleLanguageDropdown = () => {
    setShowLanguageDropdown(!showLanguageDropdown)
    setShowAccountDropdown(false) // Cerrar el otro dropdown
  }

  const toggleMobileLanguageDropdown = () => {
    setShowMobileLanguageDropdown(!showMobileLanguageDropdown)
  }

  const toggleAccountDropdown = () => {
    setShowAccountDropdown(!showAccountDropdown)
    setShowLanguageDropdown(false) // Cerrar el otro dropdown
  }

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
    setShowMobileLanguageDropdown(false) // Cerrar el dropdown de idioma al abrir/cerrar el menú
  }

  const selectLanguage = (lang) => {
    setLanguage(lang.name)
    setShowLanguageDropdown(false)
    setShowMobileLanguageDropdown(false)
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
        handleLogout()
        break
      default:
        break
    }
  }

  const handleAuthAction = (action) => {
    setShowAccountDropdown(false)

    // Guardar la ubicación actual para redirigir después del login/signup
    const currentLocation = location.pathname

    if (action === "login") {
      navigate("/login", { state: { from: { pathname: currentLocation } } })
    } else if (action === "signup") {
      navigate("/signup", { state: { from: { pathname: currentLocation } } })
    }
  }

  const handleLogout = () => {
    const confirmLogout = window.confirm("¿Estás seguro de que quieres cerrar sesión?")
    if (confirmLogout) {
      logout()
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

      // Cerrar dropdown de idioma móvil si se hace click fuera
      if (mobileLanguageDropdownRef.current && !mobileLanguageDropdownRef.current.contains(event.target)) {
        setShowMobileLanguageDropdown(false)
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

  const cartCount = getCartCount()

  // Función para obtener el texto del tooltip
  const getWishlistTooltipContent = () => {
    if (wishlistItems.length === 0) {
      return (
        <div className="icon-tooltip">
          <div className="tooltip-title">Lista de Deseos</div>
          <div className="tooltip-subtitle">Actualmente está vacía</div>
        </div>
      )
    }
    return <div className="icon-tooltip">Lista de deseos</div>
  }

  const getCartTooltipContent = () => {
    if (cartCount === 0) {
      return (
        <div className="icon-tooltip">
          <div className="tooltip-title">Carro de Compras</div>
          <div className="tooltip-subtitle">Actualmente está vacío</div>
        </div>
      )
    }
    return <div className="icon-tooltip">Carro de compras</div>
  }

  return (
    <>
      <div className="top-bar">
        <div className="container">
          <div className="top-bar-content">
            <div className="promo-text-container">
              <p className="promo-text-header">
                Este puede ser un texto de oferta... Oferta - 25% descuento{" "}
                <button onClick={handleBuyNowClick} className="buy-now-btn">
                  Comprar Ahora
                </button>
              </p>
            </div>
            <div className="top-bar-actions">
              <div className="language-selector" ref={languageDropdownRef}>
                <div className="language-current" onClick={toggleLanguageDropdown}>
                  <span className="language-display">
                    <img
                      src={getCurrentLanguageFlag() || "/placeholder.svg"}
                      alt={language}
                      className="language-flag"
                    />
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
      </div>

      <div className="main-header">
        <div className="container main-header-container">
          <Link to="/" className="logo">
            <img src="/icon/logo.svg" alt="IT LIVE SOLUTIONS" />
          </Link>

          <button className="mobile-menu-toggle" onClick={toggleMobileMenu}>
            <Menu size={24} />
          </button>

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
              <Link to="/wishlist" className={`icon-link wishlist-icon-container ${wishlistAnimate}`}>
                <span className="material-icons-outlined">favorite_border</span>
                {wishlistItems.length > 0 && (
                  <span className={`wishlist-count ${wishlistAnimate}`}>{wishlistItems.length}</span>
                )}
                {getWishlistTooltipContent()}
              </Link>
              <Link to="/cart" className={`icon-link cart-icon-container ${cartAnimate}`}>
                <span className="material-icons-outlined">shopping_cart</span>
                {cartCount > 0 && <span className={`cart-count ${cartAnimate}`}>{cartCount}</span>}
                {getCartTooltipContent()}
              </Link>
              <div className="account-dropdown-container" ref={accountDropdownRef}>
                <button className="icon-link account-toggle" onClick={toggleAccountDropdown}>
                  <span className="material-icons-outlined">person_outline</span>
                </button>
                {showAccountDropdown && (
                  <div className="account-dropdown">
                    {isAuthenticated ? (
                      // Menú para usuarios autenticados
                      <>
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
                        <div className="account-dropdown-itemLogout" onClick={() => handleAccountAction("logout")}>
                          <span className="material-icons-outlined">logout</span>
                          <span>Cerrar sesión</span>
                        </div>
                      </>
                    ) : (
                      // Menú para usuarios no autenticados
                      <>
                        <div className="account-dropdown-item" onClick={() => handleAuthAction("login")}>
                          <span className="material-icons-outlined">login</span>
                          <span>Iniciar Sesión</span>
                        </div>
                        <div className="account-dropdown-item" onClick={() => handleAuthAction("signup")}>
                          <span className="material-icons-outlined">person_add</span>
                          <span>Registrarse</span>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${mobileMenuOpen ? "open" : ""}`}>
        <div className="mobile-menu-section">
          <h3 className="mobile-menu-title">Menú</h3>
          <div className="mobile-menu-links">
            <Link to="/" className="mobile-menu-link" onClick={() => setMobileMenuOpen(false)}>
              <span className="material-icons-outlined">home</span>
              Inicio
            </Link>
            <Link to="/tienda" className="mobile-menu-link" onClick={() => setMobileMenuOpen(false)}>
              <span className="material-icons-outlined">store</span>
              Tienda
            </Link>
            <Link to="/contacto" className="mobile-menu-link" onClick={() => setMobileMenuOpen(false)}>
              <span className="material-icons-outlined">contact_mail</span>
              Contacto
            </Link>
            <Link to="/acerca-de" className="mobile-menu-link" onClick={() => setMobileMenuOpen(false)}>
              <span className="material-icons-outlined">info</span>
              Acerca de
            </Link>
          </div>
        </div>

        {/* Selector de idioma en el menú móvil */}
        <div className="mobile-menu-section">
          <h3 className="mobile-menu-title">Idioma</h3>
          <div className="mobile-menu-links">
            <div className="mobile-language-selector" ref={mobileLanguageDropdownRef}>
              <div className="mobile-language-current" onClick={toggleMobileLanguageDropdown}>
                <div className="mobile-language-display">
                  <img src={getCurrentLanguageFlag() || "/placeholder.svg"} alt={language} className="language-flag" />
                  <span>{language}</span>
                </div>
                <span className={`material-icons-outlined expand-icon ${showMobileLanguageDropdown ? "rotated" : ""}`}>
                  expand_more
                </span>
              </div>
              {showMobileLanguageDropdown && (
                <div className="mobile-language-dropdown">
                  {languageOptions.map((lang) => (
                    <div
                      key={lang.code}
                      className="mobile-language-dropdown-item"
                      onClick={() => {
                        selectLanguage(lang)
                        setMobileMenuOpen(false)
                      }}
                    >
                      <img src={lang.flag || "/placeholder.svg"} alt={lang.name} className="language-flag" />
                      <span>{lang.name}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mobile-menu-section">
          <h3 className="mobile-menu-title">Mi Cuenta</h3>
          <div className="mobile-menu-links">
            {isAuthenticated ? (
              <>
                <Link to="/account" className="mobile-menu-link" onClick={() => setMobileMenuOpen(false)}>
                  <span className="material-icons-outlined">person</span>
                  Administrar mi cuenta
                </Link>
                <Link to="/account/orders" className="mobile-menu-link" onClick={() => setMobileMenuOpen(false)}>
                  <span className="material-icons-outlined">shopping_bag</span>
                  Mis pedidos
                </Link>
                <Link to="/wishlist" className="mobile-menu-link" onClick={() => setMobileMenuOpen(false)}>
                  <span className="material-icons-outlined">favorite_border</span>
                  Mi lista de deseos
                </Link>
                <Link to="/cart" className="mobile-menu-link" onClick={() => setMobileMenuOpen(false)}>
                  <span className="material-icons-outlined">shopping_cart</span>
                  Mi carrito
                </Link>
                <div className="mobile-menu-link" onClick={handleLogout}>
                  <span className="material-icons-outlined">logout</span>
                  Cerrar sesión
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="mobile-menu-link" onClick={() => setMobileMenuOpen(false)}>
                  <span className="material-icons-outlined">login</span>
                  Iniciar Sesión
                </Link>
                <Link to="/signup" className="mobile-menu-link" onClick={() => setMobileMenuOpen(false)}>
                  <span className="material-icons-outlined">person_add</span>
                  Registrarse
                </Link>
              </>
            )}
          </div>
        </div>

        <div className="mobile-menu-section">
          <form className="search-form" onSubmit={handleSearch} style={{ width: "100%" }}>
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
        </div>
      </div>
    </>
  )
}

export default Header
