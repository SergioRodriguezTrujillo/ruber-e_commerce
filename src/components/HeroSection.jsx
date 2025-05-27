"use client"

import { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import "./HeroSection.css"

const HeroSection = () => {
  const navigate = useNavigate()
  const [activeSlide, setActiveSlide] = useState(0)
  const [isRapidReset, setIsRapidReset] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
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

  // Remove the separate useEffect for rapid reset since we're now jumping directly to the first slide

  // Función para manejar el hover
  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
  }

  const handleBuyNowClick = () => {
    navigate("/tienda")
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
            {/* Contenido estático que solo aparece en hover */}
            <div className={`slide-content-static ${isHovered ? "visible" : ""}`}>
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
      </div>
    </section>
  )
}

export default HeroSection
