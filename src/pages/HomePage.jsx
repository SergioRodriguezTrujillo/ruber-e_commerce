"use client"

import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import ProductCard from "../components/ProductCard"
import CategoryItem from "../components/CategoryItem"
import ServiceItem from "../components/ServiceItem"
import HeroSection from "../components/HeroSection"
import FullServices from "../components/FullServices"
import { getBestSellingProductsForHome, getMostViewedProductsForHome } from "../services/productService"
import "./HomePage.css"

// Usar iconos de Material Design outline
const MaterialIcons = {
  Smartphone: () => (
    <span className="material-icons-outlined" style={{ fontSize: "48px" }}>
      smartphone
    </span>
  ),
  Monitor: () => (
    <span className="material-icons-outlined" style={{ fontSize: "48px" }}>
      desktop_windows
    </span>
  ),
  Clock: () => (
    <span className="material-icons-outlined" style={{ fontSize: "48px" }}>
      watch
    </span>
  ),
  Camera: () => (
    <span className="material-icons-outlined" style={{ fontSize: "48px" }}>
      photo_camera
    </span>
  ),
  Headphones: () => (
    <span className="material-icons-outlined" style={{ fontSize: "48px" }}>
      headset
    </span>
  ),
  Gamepad: () => (
    <span className="material-icons-outlined" style={{ fontSize: "48px" }}>
      sports_esports
    </span>
  ),
  ArrowLeft: () => <span className="material-icons-outlined">arrow_back</span>,
  ArrowRight: () => <span className="material-icons-outlined">arrow_forward</span>,
}

const HomePage = () => {
  const navigate = useNavigate()
  const [countdown, setCountdown] = useState({
    days: 5,
    hours: 23,
    minutes: 59,
    seconds: 35,
  })
  const [bestSellingProducts, setBestSellingProducts] = useState([])
  const [mostViewedProducts, setMostViewedProducts] = useState([])

  useEffect(() => {
    // Cargar solo 4 productos más vendidos y 4 más vistos para la homepage
    const bestSelling = getBestSellingProductsForHome()
    const mostViewed = getMostViewedProductsForHome()

    setBestSellingProducts(bestSelling)
    setMostViewedProducts(mostViewed)
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        let { days, hours, minutes, seconds } = prev

        if (seconds > 0) {
          seconds--
        } else {
          seconds = 59
          if (minutes > 0) {
            minutes--
          } else {
            minutes = 59
            if (hours > 0) {
              hours--
            } else {
              hours = 23
              if (days > 0) {
                days--
              }
            }
          }
        }

        return { days, hours, minutes, seconds }
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // Update the categories with Lucide React outline icons
  const categories = [
    { id: 1, name: "Teléfonos", slug: "telefonos", icon: <MaterialIcons.Smartphone /> },
    { id: 2, name: "Computadoras", slug: "computadoras", icon: <MaterialIcons.Monitor /> },
    { id: 3, name: "Reloj Inteligente", slug: "relojes", icon: <MaterialIcons.Clock /> },
    { id: 4, name: "Cámara", slug: "camaras", icon: <MaterialIcons.Camera /> },
    { id: 5, name: "Audífonos", slug: "audifonos", icon: <MaterialIcons.Headphones /> },
    { id: 6, name: "Jugabilidad", slug: "gaming", icon: <MaterialIcons.Gamepad /> },
  ]

  const services = [
    {
      id: 1,
      title: "Nombre servicio",
      description: "Resumen...",
      image: "/asistencia1.png",
    },
    {
      id: 2,
      title: "Nombre servicio",
      description: "Resumen...",
      image: "/asistencia2.png",
    },
    {
      id: 3,
      title: "Nombre servicio",
      description: "Resumen...",
      image: "/asistencia3.png",
    },
    {
      id: 4,
      title: "Nombre servicio",
      description: "Resumen...",
      image: "/asistencia4.png",
    },
  ]

  const handleViewAllBestSelling = () => {
    // Scroll to top and navigate to shop with best-selling filter
    window.scrollTo(0, 0)
    navigate("/tienda?filter=best-selling")
  }

  const handleViewAllMostViewed = () => {
    // Scroll to top and navigate to shop with most-viewed filter
    window.scrollTo(0, 0)
    navigate("/tienda?filter=most-viewed")
  }

  const handleBuyNowClick = () => {
    // Scroll to top and navigate to shop
    window.scrollTo(0, 0)
    navigate("/tienda")
  }

  return (
    <div className="home-page">
      {/* Hero Section con menú lateral y slider */}
      <HeroSection />

      {/* Recién llegado */}
      <section className="recently-arrived-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Para tí</h2>
          </div>
          <h3 className="section-subtitle">Recién llegado</h3>

          <div className="recently-arrived-grid">
            {/* PC - Elemento grande a la izquierda */}
            <div className="recently-arrived-item large">
              <div className="recently-arrived-content">
                <img src="/torre.png" alt="PC" className="recently-arrived-image" />
                <div className="recently-arrived-info">
                  <h3>PC</h3>
                  <p>Versión Blanco & Negro</p>
                  <button onClick={handleBuyNowClick} className="buy-now-button">
                    Comprar Ahora
                  </button>
                </div>
              </div>
            </div>

            {/* Columna derecha con 3 elementos */}
            <div className="right-grid">
              {/* Placas Base - Elemento superior derecho */}
              <div className="recently-arrived-item">
                <div className="recently-arrived-content">
                  <img src="/placa.jpg" alt="Placas Base" className="recently-arrived-image" />
                  <div className="recently-arrived-info">
                    <h3>Placas Base</h3>
                    <p>Colección de placas base destacadas solo para ti</p>
                    <button onClick={handleBuyNowClick} className="buy-now-button">
                      Comprar Ahora
                    </button>
                  </div>
                </div>
              </div>

              {/* Fila inferior derecha con 2 elementos */}
              <div className="right-bottom-grid">
                {/* Accesorios - Elemento inferior izquierdo */}
                <div className="recently-arrived-item">
                  <div className="recently-arrived-content">
                    <img src="/accesorios.jpg" alt="Accesorios" className="recently-arrived-image" />
                    <div className="recently-arrived-info">
                      <h3>Accesorios</h3>
                      <p>Accesorios múltiples</p>
                      <button onClick={handleBuyNowClick} className="buy-now-button">
                        Comprar Ahora
                      </button>
                    </div>
                  </div>
                </div>

                {/* Rendimiento - Elemento inferior derecho */}
                <div className="recently-arrived-item">
                  <div className="recently-arrived-content">
                    <img src="/ram.png" alt="Rendimiento" className="recently-arrived-image" />
                    <div className="recently-arrived-info">
                      <h3>Rendimiento</h3>
                      <p>Todo en velocidad y rendimiento</p>
                      <button onClick={handleBuyNowClick} className="buy-now-button">
                        Comprar Ahora
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categorías */}
      <section className="categories-section">
        <div className="container">
          <div className="categories-header">
            <div className="categories-title-row">
              <h2 className="section-title">Categorías</h2>
            </div>
            <div className="categories-subtitle-row">
              <h3 className="section-subtitle">Buscar por categoría</h3>
              <div className="categories-navigation">
                <button className="categories-nav-arrow">
                  <MaterialIcons.ArrowLeft />
                </button>
                <button className="categories-nav-arrow">
                  <MaterialIcons.ArrowRight />
                </button>
              </div>
            </div>
          </div>

          <div className="category-grid">
            {categories.map((category) => (
              <CategoryItem key={category.id} category={category} />
            ))}
          </div>
        </div>
      </section>

      {/* Productos más vendidos */}
      <section className="products-section">
        <div className="container">
          <div className="section-header-home">
            <div className="section-title-container">
              <div className="section-header">
                <h2 className="section-title">Este mes</h2>
              </div>
              <h3 className="section-subtitle-home">Productos más vendidos</h3>
            </div>
            <button onClick={handleViewAllBestSelling} className="view-all">
              Ver todos
            </button>
          </div>

          <div className="products-grid">
            {bestSellingProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Productos más vistos */}
      <section className="products-section">
        <div className="container">
          <div className="section-header-home">
            <div className="section-title-container">
              <h3 className="section-subtitle-home">Productos más vistos</h3>
            </div>
            <button onClick={handleViewAllMostViewed} className="view-all2">
              Ver todos
            </button>
          </div>

          <div className="products-grid">
            {mostViewedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Banner promocional */}
      <section className="promo-banner">
        <div className="promo-banner-bg"></div>
        <div className="container">
          <div className="promo-content">
            <div className="promo-text">
              <p className="promo-subtitle">Un texto aquí</p>
              <h2 className="promo-title">
                Mejora tu
                <br />
                experiencia
              </h2>

              <div className="countdown">
                <div className="countdown-item">
                  <span className="countdown-value">{countdown.days.toString().padStart(2, "0")}</span>
                  <span className="countdown-label">días</span>
                </div>
                <div className="countdown-item">
                  <span className="countdown-value">{countdown.hours.toString().padStart(2, "0")}</span>
                  <span className="countdown-label">horas</span>
                </div>
                <div className="countdown-item">
                  <span className="countdown-value">{countdown.minutes.toString().padStart(2, "0")}</span>
                  <span className="countdown-label">minutos</span>
                </div>
                <div className="countdown-item">
                  <span className="countdown-value">{countdown.seconds.toString().padStart(2, "0")}</span>
                  <span className="countdown-label">segundos</span>
                </div>
              </div>

              <button onClick={handleBuyNowClick} className="promo-button">
                Ir a algún lado...
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Servicios */}
      <section className="services-section">
        <div className="container">
          <div className="services-header">
            <div className="services-title-row">
              <h2 className="section-title">Nuestros Servicios</h2>
            </div>
            <div className="services-subtitle-row">
              <h3 className="section-subtitle">Explore nuestros servicios</h3>
              <div className="categories-navigation">
                <button className="categories-nav-arrow">
                  <MaterialIcons.ArrowLeft />
                </button>
                <button className="categories-nav-arrow">
                  <MaterialIcons.ArrowRight />
                </button>
              </div>
            </div>
          </div>

          <div className="service-grid">
            {services.map((service) => (
              <ServiceItem key={service.id} service={service} />
            ))}
          </div>

          <div className="service-button-container">
            <Link to="/services" className="service-button">
              Ver todos los Servicios
            </Link>
          </div>
        </div>
      </section>

      {/* Full Services Section */}
      <FullServices />
    </div>
  )
}

export default HomePage
