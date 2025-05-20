"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { ArrowRight, ArrowLeft, Headphones, Monitor, Smartphone, Clock, Camera, Gamepad2 } from "lucide-react"
import ProductCard from "../components/ProductCard"
import CategoryItem from "../components/CategoryItem"
import ServiceItem from "../components/ServiceItem"
import HeroSection from "../components/HeroSection"
import "./HomePage.css"

const HomePage = () => {
  const [countdown, setCountdown] = useState({
    days: 5,
    hours: 23,
    minutes: 59,
    seconds: 35,
  })

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

  const categories = [
    { id: 1, name: "Teléfonos", slug: "telefonos", icon: <Smartphone size={24} strokeWidth={1.5} /> },
    { id: 2, name: "Computadoras", slug: "computadoras", icon: <Monitor size={24} strokeWidth={1.5} /> },
    { id: 3, name: "Reloj Inteligente", slug: "relojes", icon: <Clock size={24} strokeWidth={1.5} /> },
    { id: 4, name: "Cámara", slug: "camaras", icon: <Camera size={24} strokeWidth={1.5} /> },
    { id: 5, name: "Audífonos", slug: "audifonos", icon: <Headphones size={24} strokeWidth={1.5} /> },
    { id: 6, name: "Jugabilidad", slug: "gaming", icon: <Gamepad2 size={24} strokeWidth={1.5} /> },
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

  const bestSellingProducts = [
    {
      id: 1,
      name: "Kit Gamer_AVA Monitor LG",
      price: 230,
      originalPrice: 250,
      discount: 35,
      rating: 5,
      reviewCount: 88,
      colors: ["black", "blue"],
      image: "/pc.png",
    },
    {
      id: 2,
      name: "ROLT-120V",
      price: 135,
      originalPrice: 145,
      discount: 35,
      rating: 4,
      reviewCount: 75,
      colors: ["black", "blue"],
      image: "/mini-pc.png",
    },
    {
      id: 3,
      name: "Cable IP67-SORT",
      price: 2.5,
      originalPrice: 3,
      discount: 35,
      rating: 5,
      reviewCount: 99,
      colors: ["black", "blue"],
      image: "/cable.png",
    },
    {
      id: 4,
      name: "Memoria RAM 16GB RGB 3200Hz",
      price: 10,
      originalPrice: 15,
      discount: 35,
      rating: 5,
      reviewCount: 99,
      colors: ["black", "blue"],
      image: "/ram.png",
    },
  ]

  const mostViewedProducts = [...bestSellingProducts]

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
                  <a href="/category/pc" className="buy-now-button">
                    Comprar Ahora
                  </a>
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
                    <a href="/category/placas-base" className="buy-now-button">
                      Comprar Ahora
                    </a>
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
                      <a href="/category/accesorios" className="buy-now-button">
                        Comprar Ahora
                      </a>
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
                      <a href="/category/rendimiento" className="buy-now-button">
                        Comprar Ahora
                      </a>
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
                  <ArrowLeft size={16} strokeWidth={1.5} />
                </button>
                <button className="categories-nav-arrow">
                  <ArrowRight size={16} strokeWidth={1.5} />
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
          <div className="section-header">
            <div>
              <h2 className="section-title">Este mes</h2>
              <h3 className="section-subtitle">Productos más vendidos</h3>
            </div>
            <Link to="/shop" className="view-all">
              Ver todos
            </Link>
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
          <div className="section-header">
            <div>
              <h3 className="section-subtitle">Productos más vistos</h3>
            </div>
            <Link to="/shop" className="view-all">
              Ver todos
            </Link>
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

              <Link to="/shop" className="promo-button">
                Ir a algún lado...
              </Link>
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
                  <ArrowLeft size={16} strokeWidth={1.5} />
                </button>
                <button className="categories-nav-arrow">
                  <ArrowRight size={16} strokeWidth={1.5} />
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
    </div>
  )
}

export default HomePage
