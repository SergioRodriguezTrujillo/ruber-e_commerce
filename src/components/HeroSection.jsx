"use client"

import { useState, useEffect, useRef } from "react"
import { ChevronRight, Store } from "lucide-react"
import "./HeroSection.css"

const HeroSection = () => {
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
      image: "/teclado-oscuro.jpg",
      title: "Todo lo que necesitas",
      subtitle: "en un solo lugar",
      label: "Ventas Directas",
      buttonText: "Comprar ahora",
      buttonLink: "/shop",
    },
    {
      id: 5,
      image: "/set.jpg",
      title: "Todo lo que necesitas",
      subtitle: "en un solo lugar",
      label: "Ventas Directas",
      buttonText: "Comprar ahora",
      buttonLink: "/shop",
    },
  ]

  // Función para manejar la animación del carrusel con reset rápido
  useEffect(() => {
    let interval

    if (!isHovered) {
      interval = setInterval(() => {
        setActiveSlide((prev) => {
          if (prev >= slides.length - 1) {
            // Cuando llegamos al último slide, activamos el modo de retroceso suave
            setIsRapidReset(true)
            return prev
          }
          return prev + 1
        })
      }, 3000)
    }

    return () => clearInterval(interval)
  }, [activeSlide, isHovered, slides.length])

  // Añadir un useEffect separado para manejar el retroceso suave
  useEffect(() => {
    let resetInterval

    if (isRapidReset) {
      resetInterval = setInterval(() => {
        setActiveSlide((prev) => {
          if (prev <= 0) {
            // Si llegamos al primer slide, desactivamos el modo de reset rápido
            setIsRapidReset(false)
            return 0
          }
          return prev - 1
        })
      }, 100) // Intervalo muy corto para el reset rápido
    }

    return () => clearInterval(resetInterval)
  }, [isRapidReset])

  // Función para manejar el hover
  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
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
                    <ChevronRight className="menu-arrow" size={14} strokeWidth={1.5} />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="hero-slider" ref={sliderRef} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            {/* Contenido estático que solo aparece en hover */}
            <div className={`slide-content-static ${isHovered ? "visible" : ""}`}>
              <div className="slide-label">
                <Store className="store-icon" size={18} strokeWidth={1.5} />
                <span>Ventas Directas</span>
              </div>
              <h2 className="slide-title">
                Todo lo que necesitas <br /> en un solo lugar
              </h2>
              <a href="/shop" className="slide-button">
                <span className="button-text">Comprar ahora</span> <ChevronRight size={14} strokeWidth={1.5} />
              </a>
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
