"use client"

import { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { ChevronDown, ChevronUp } from "lucide-react"
import "./HeroSection.css"

const HeroSection = () => {
  const navigate = useNavigate()
  const [activeSlide, setActiveSlide] = useState(0)
  const [isRapidReset, setIsRapidReset] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const sliderRef = useRef(null)

  const menuItems = [
    { id: 1, name: "Accesorios", path: "/category/accesorios" },
    { id: 2, name: "Cables", path: "/category/cables" },
    { id: 3, name: "Redes", path: "/category/redes" },
    { id: 4, name: "Almacenamiento", path: "/category/almacenamiento" },
    { id: 5, name: "Procesamiento", path: "/category/procesamiento" },
    { id: 6, name: "Enrutamiento", path: "/category/enrutamiento" },
    { id: 7, name: "Comunicación", path: "/category/comunicacion" },
  ]

  const slides = [
    {
      id: 1,
      image: "/teclado.jpg",
      title: "Todo lo que necesitas",
      subtitle: "en un solo lugar",
      label: "Ventas Directas",
      buttonText: "Comprar ahora",
      buttonLink: "/shop",
    },
    {
      id: 2,
      image: "/laptop-cerrando.jpg",
      title: "Todo lo que necesitas",
      subtitle: "en un solo lugar",
      label: "Ventas Directas",
      buttonText: "Comprar ahora",
      buttonLink: "/shop",
    },
    {
      id: 3,
      image: "/laptop-oscura.jpg",
      title: "Todo lo que necesitas",
      subtitle: "en un solo lugar",
      label: "Ventas Directas",
      buttonText: "Comprar ahora",
      buttonLink: "/shop",
    },
    {
      id: 4,
      image: "/teclado-oscuro.png",
      title: "Todo lo que necesitas",
      subtitle: "en un solo lugar",
      label: "Ventas Directas",
      buttonText: "Comprar ahora",
      buttonLink: "/shop",
    },
    {
      id: 5,
      image: "/set.png",
      title: "Todo lo que necesitas",
      subtitle: "en un solo lugar",
      label: "Ventas Directas",
      buttonText: "Comprar ahora",
      buttonLink: "/shop",
    },
  ]

  // Detectar si es móvil
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Update the carousel animation to reset to first slide without cycling through all slides
  useEffect(() => {
    let interval

    if (!isHovered) {
      interval = setInterval(() => {
        setActiveSlide((prev) => {
          if (prev >= slides.length - 1) {
            // When we reach the last slide, immediately reset to the first slide
            return 0
          }
          return prev + 1
        })
      }, 3000) // Set to exactly 3 seconds
    }

    return () => clearInterval(interval)
  }, [isHovered, slides.length])

  // Función para manejar el hover (solo en desktop)
  const handleMouseEnter = () => {
    if (!isMobile) {
      setIsHovered(true)
    }
  }

  const handleMouseLeave = () => {
    if (!isMobile) {
      setIsHovered(false)
    }
  }

  const handleBuyNowClick = () => {
    navigate("/tienda")
  }

  const toggleMobileDropdown = () => {
    setMobileDropdownOpen(!mobileDropdownOpen)
  }

  return (
    <section className="hero-section">
      <div className="container">
        <div className="hero-content">
          <div className="sidebar-menu">
            <ul>
              {menuItems.map((item) => (
                <li key={item.id}>
                  <a href={item.path}>
                    {item.name}
                    <span className="material-icons-outlined menu-arrow">chevron_right</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="hero-slider" ref={sliderRef} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            {/* Contenido estático que aparece en hover en desktop o siempre en móvil */}
            <div className={`slide-content-static ${isHovered || isMobile ? "visible" : ""}`}>
              <div className="slide-label">
                <span className="material-icons-outlined store-icon">storefront</span>
                <span>Ventas Directas</span>
              </div>
              <h2 className="slide-title">
                Todo lo que necesitas <br /> en un solo lugar
              </h2>
              <button onClick={handleBuyNowClick} className="slide-button">
                <span className="button-text">Comprar ahora</span>{" "}
                <span className="material-icons-outlined">chevron_right</span>
              </button>
            </div>

            {/* Slides con solo imágenes */}
            {slides.map((slide, index) => (
              <div
                key={slide.id}
                className={`slide ${index === activeSlide ? "active" : ""} ${isRapidReset && index === activeSlide ? "rapid-reset" : ""}`}
                style={{
                  backgroundImage: `url(${slide.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              ></div>
            ))}
          </div>
        </div>

        {/* Mobile Categories Dropdown - Aparece debajo del slider en móvil */}
        <div className="mobile-categories-dropdown">
          <button className="mobile-dropdown-button" onClick={toggleMobileDropdown}>
            <span>Categorías</span>
            {mobileDropdownOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
          <div className={`mobile-dropdown-content ${mobileDropdownOpen ? "open" : ""}`}>
            {menuItems.map((item) => (
              <a key={item.id} href={item.path} className="mobile-dropdown-item">
                {item.name}
                <span className="material-icons-outlined menu-arrow">chevron_right</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
