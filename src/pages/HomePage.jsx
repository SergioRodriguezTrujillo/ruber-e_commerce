"use client"

import { useState, useEffect, useRef } from "react"
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

  // Estados para el carrusel móvil de categorías
  const [currentCategorySlide, setCurrentCategorySlide] = useState(0)
  const [isCategoryTouch, setIsCategoryTouch] = useState(false)
  const [categoryStartX, setCategoryStartX] = useState(0)
  const [categoryCurrentX, setCategoryCurrentX] = useState(0)
  const [isCategoryDragging, setIsCategoryDragging] = useState(false)
  const categoryCarouselRef = useRef(null)

  // Estados para el carrusel móvil de productos más vendidos
  const [currentBestSellingSlide, setCurrentBestSellingSlide] = useState(0)
  const [isBestSellingTouch, setIsBestSellingTouch] = useState(false)
  const [bestSellingStartX, setBestSellingStartX] = useState(0)
  const [bestSellingCurrentX, setBestSellingCurrentX] = useState(0)
  const [isBestSellingDragging, setIsBestSellingDragging] = useState(false)
  const bestSellingCarouselRef = useRef(null)

  // Estados para el carrusel móvil de productos más vistos
  const [currentMostViewedSlide, setCurrentMostViewedSlide] = useState(0)
  const [isMostViewedTouch, setIsMostViewedTouch] = useState(false)
  const [mostViewedStartX, setMostViewedStartX] = useState(0)
  const [mostViewedCurrentX, setMostViewedCurrentX] = useState(0)
  const [isMostViewedDragging, setIsMostViewedDragging] = useState(false)
  const mostViewedCarouselRef = useRef(null)

  // Estados para el carrusel móvil de servicios
  const [currentServicesSlide, setCurrentServicesSlide] = useState(0)
  const [isServicesTouch, setIsServicesTouch] = useState(false)
  const [servicesStartX, setServicesStartX] = useState(0)
  const [servicesCurrentX, setServicesCurrentX] = useState(0)
  const [isServicesDragging, setIsServicesDragging] = useState(false)
  const servicesCarouselRef = useRef(null)

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

  // Funciones para el carrusel móvil de categorías
  const totalCategorySlides = Math.ceil(categories.length / 2)

  const handleCategoryTouchStart = (e) => {
    setIsCategoryTouch(true)
    setCategoryStartX(e.touches[0].clientX)
    setCategoryCurrentX(e.touches[0].clientX)
    setIsCategoryDragging(true)
  }

  const handleCategoryTouchMove = (e) => {
    if (!isCategoryDragging) return
    setCategoryCurrentX(e.touches[0].clientX)
  }

  const handleCategoryTouchEnd = () => {
    if (!isCategoryDragging) return

    const diffX = categoryStartX - categoryCurrentX
    const threshold = 50

    if (Math.abs(diffX) > threshold) {
      if (diffX > 0 && currentCategorySlide < totalCategorySlides - 1) {
        setCurrentCategorySlide(currentCategorySlide + 1)
      } else if (diffX < 0 && currentCategorySlide > 0) {
        setCurrentCategorySlide(currentCategorySlide - 1)
      }
    }

    setIsCategoryDragging(false)
    setIsCategoryTouch(false)
  }

  const handleCategoryMouseStart = (e) => {
    setIsCategoryTouch(false)
    setCategoryStartX(e.clientX)
    setCategoryCurrentX(e.clientX)
    setIsCategoryDragging(true)
  }

  const handleCategoryMouseMove = (e) => {
    if (!isCategoryDragging || isCategoryTouch) return
    setCategoryCurrentX(e.clientX)
  }

  const handleCategoryMouseEnd = () => {
    if (!isCategoryDragging || isCategoryTouch) return

    const diffX = categoryStartX - categoryCurrentX
    const threshold = 50

    if (Math.abs(diffX) > threshold) {
      if (diffX > 0 && currentCategorySlide < totalCategorySlides - 1) {
        setCurrentCategorySlide(currentCategorySlide + 1)
      } else if (diffX < 0 && currentCategorySlide > 0) {
        setCurrentCategorySlide(currentCategorySlide - 1)
      }
    }

    setIsCategoryDragging(false)
  }

  const goToCategorySlide = (slideIndex) => {
    setCurrentCategorySlide(slideIndex)
  }

  // Funciones para el carrusel móvil de productos más vendidos
  const totalBestSellingSlides = Math.ceil(bestSellingProducts.length / 2)

  const handleBestSellingTouchStart = (e) => {
    setIsBestSellingTouch(true)
    setBestSellingStartX(e.touches[0].clientX)
    setBestSellingCurrentX(e.touches[0].clientX)
    setIsBestSellingDragging(true)
  }

  const handleBestSellingTouchMove = (e) => {
    if (!isBestSellingDragging) return
    setBestSellingCurrentX(e.touches[0].clientX)
  }

  const handleBestSellingTouchEnd = () => {
    if (!isBestSellingDragging) return

    const diffX = bestSellingStartX - bestSellingCurrentX
    const threshold = 50

    if (Math.abs(diffX) > threshold) {
      if (diffX > 0 && currentBestSellingSlide < totalBestSellingSlides - 1) {
        setCurrentBestSellingSlide(currentBestSellingSlide + 1)
      } else if (diffX < 0 && currentBestSellingSlide > 0) {
        setCurrentBestSellingSlide(currentBestSellingSlide - 1)
      }
    }

    setIsBestSellingDragging(false)
    setIsBestSellingTouch(false)
  }

  const handleBestSellingMouseStart = (e) => {
    setIsBestSellingTouch(false)
    setBestSellingStartX(e.clientX)
    setBestSellingCurrentX(e.clientX)
    setIsBestSellingDragging(true)
  }

  const handleBestSellingMouseMove = (e) => {
    if (!isBestSellingDragging || isBestSellingTouch) return
    setBestSellingCurrentX(e.clientX)
  }

  const handleBestSellingMouseEnd = () => {
    if (!isBestSellingDragging || isBestSellingTouch) return

    const diffX = bestSellingStartX - bestSellingCurrentX
    const threshold = 50

    if (Math.abs(diffX) > threshold) {
      if (diffX > 0 && currentBestSellingSlide < totalBestSellingSlides - 1) {
        setCurrentBestSellingSlide(currentBestSellingSlide + 1)
      } else if (diffX < 0 && currentBestSellingSlide > 0) {
        setCurrentBestSellingSlide(currentBestSellingSlide - 1)
      }
    }

    setIsBestSellingDragging(false)
  }

  const goToBestSellingSlide = (slideIndex) => {
    setCurrentBestSellingSlide(slideIndex)
  }

  // Funciones para el carrusel móvil de productos más vistos
  const totalMostViewedSlides = Math.ceil(mostViewedProducts.length / 2)

  const handleMostViewedTouchStart = (e) => {
    setIsMostViewedTouch(true)
    setMostViewedStartX(e.touches[0].clientX)
    setMostViewedCurrentX(e.touches[0].clientX)
    setIsMostViewedDragging(true)
  }

  const handleMostViewedTouchMove = (e) => {
    if (!isMostViewedDragging) return
    setMostViewedCurrentX(e.touches[0].clientX)
  }

  const handleMostViewedTouchEnd = () => {
    if (!isMostViewedDragging) return

    const diffX = mostViewedStartX - mostViewedCurrentX
    const threshold = 50

    if (Math.abs(diffX) > threshold) {
      if (diffX > 0 && currentMostViewedSlide < totalMostViewedSlides - 1) {
        setCurrentMostViewedSlide(currentMostViewedSlide + 1)
      } else if (diffX < 0 && currentMostViewedSlide > 0) {
        setCurrentMostViewedSlide(currentMostViewedSlide - 1)
      }
    }

    setIsMostViewedDragging(false)
    setIsMostViewedTouch(false)
  }

  const handleMostViewedMouseStart = (e) => {
    setIsMostViewedTouch(false)
    setMostViewedStartX(e.clientX)
    setMostViewedCurrentX(e.clientX)
    setIsMostViewedDragging(true)
  }

  const handleMostViewedMouseMove = (e) => {
    if (!isMostViewedDragging || isMostViewedTouch) return
    setMostViewedCurrentX(e.clientX)
  }

  const handleMostViewedMouseEnd = () => {
    if (!isMostViewedDragging || isMostViewedTouch) return

    const diffX = mostViewedStartX - mostViewedCurrentX
    const threshold = 50

    if (Math.abs(diffX) > threshold) {
      if (diffX > 0 && currentMostViewedSlide < totalMostViewedSlides - 1) {
        setCurrentMostViewedSlide(currentMostViewedSlide + 1)
      } else if (diffX < 0 && currentMostViewedSlide > 0) {
        setCurrentMostViewedSlide(currentMostViewedSlide - 1)
      }
    }

    setIsMostViewedDragging(false)
  }

  const goToMostViewedSlide = (slideIndex) => {
    setCurrentMostViewedSlide(slideIndex)
  }

  // Funciones para el carrusel móvil de servicios
  const totalServicesSlides = Math.ceil(services.length / 2)

  const handleServicesTouchStart = (e) => {
    setIsServicesTouch(true)
    setServicesStartX(e.touches[0].clientX)
    setServicesCurrentX(e.touches[0].clientX)
    setIsServicesDragging(true)
  }

  const handleServicesTouchMove = (e) => {
    if (!isServicesDragging) return
    setServicesCurrentX(e.touches[0].clientX)
  }

  const handleServicesTouchEnd = () => {
    if (!isServicesDragging) return

    const diffX = servicesStartX - servicesCurrentX
    const threshold = 50

    if (Math.abs(diffX) > threshold) {
      if (diffX > 0 && currentServicesSlide < totalServicesSlides - 1) {
        setCurrentServicesSlide(currentServicesSlide + 1)
      } else if (diffX < 0 && currentServicesSlide > 0) {
        setCurrentServicesSlide(currentServicesSlide - 1)
      }
    }

    setIsServicesDragging(false)
    setIsServicesTouch(false)
  }

  const handleServicesMouseStart = (e) => {
    setIsServicesTouch(false)
    setServicesStartX(e.clientX)
    setServicesCurrentX(e.clientX)
    setIsServicesDragging(true)
  }

  const handleServicesMouseMove = (e) => {
    if (!isServicesDragging || isServicesTouch) return
    setServicesCurrentX(e.clientX)
  }

  const handleServicesMouseEnd = () => {
    if (!isServicesDragging || isServicesTouch) return

    const diffX = servicesStartX - servicesCurrentX
    const threshold = 50

    if (Math.abs(diffX) > threshold) {
      if (diffX > 0 && currentServicesSlide < totalServicesSlides - 1) {
        setCurrentServicesSlide(currentServicesSlide + 1)
      } else if (diffX < 0 && currentServicesSlide > 0) {
        setCurrentServicesSlide(currentServicesSlide - 1)
      }
    }

    setIsServicesDragging(false)
  }

  const goToServicesSlide = (slideIndex) => {
    setCurrentServicesSlide(slideIndex)
  }

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

          {/* Carrusel normal para desktop/tablet */}
          <div className="category-grid">
            {categories.map((category) => (
              <CategoryItem key={category.id} category={category} />
            ))}
          </div>

          {/* Carrusel móvil */}
          <div className="mobile-category-carousel">
            <div
              className="mobile-category-track"
              ref={categoryCarouselRef}
              style={{ transform: `translateX(-${currentCategorySlide * 100}%)` }}
              onTouchStart={handleCategoryTouchStart}
              onTouchMove={handleCategoryTouchMove}
              onTouchEnd={handleCategoryTouchEnd}
              onMouseDown={handleCategoryMouseStart}
              onMouseMove={handleCategoryMouseMove}
              onMouseUp={handleCategoryMouseEnd}
              onMouseLeave={handleCategoryMouseEnd}
            >
              {Array.from({ length: totalCategorySlides }, (_, slideIndex) => (
                <div key={slideIndex} className="mobile-category-slide">
                  {categories.slice(slideIndex * 2, slideIndex * 2 + 2).map((category) => (
                    <CategoryItem key={category.id} category={category} />
                  ))}
                </div>
              ))}
            </div>

            <div className="mobile-category-indicators">
              {Array.from({ length: totalCategorySlides }, (_, index) => (
                <div
                  key={index}
                  className={`mobile-category-dot ${index === currentCategorySlide ? "active" : ""}`}
                  onClick={() => goToCategorySlide(index)}
                />
              ))}
            </div>
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

          {/* Carrusel móvil para productos más vendidos */}
          <div className="mobile-products-carousel">
            <div
              className="mobile-products-track"
              ref={bestSellingCarouselRef}
              style={{ transform: `translateX(-${currentBestSellingSlide * 100}%)` }}
              onTouchStart={handleBestSellingTouchStart}
              onTouchMove={handleBestSellingTouchMove}
              onTouchEnd={handleBestSellingTouchEnd}
              onMouseDown={handleBestSellingMouseStart}
              onMouseMove={handleBestSellingMouseMove}
              onMouseUp={handleBestSellingMouseEnd}
              onMouseLeave={handleBestSellingMouseEnd}
            >
              {Array.from({ length: totalBestSellingSlides }, (_, slideIndex) => (
                <div key={slideIndex} className="mobile-products-slide">
                  {bestSellingProducts.slice(slideIndex * 2, slideIndex * 2 + 2).map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ))}
            </div>

            <div className="mobile-products-indicators">
              {Array.from({ length: totalBestSellingSlides }, (_, index) => (
                <div
                  key={index}
                  className={`mobile-products-dot ${index === currentBestSellingSlide ? "active" : ""}`}
                  onClick={() => goToBestSellingSlide(index)}
                />
              ))}
            </div>
          </div>

          {/* Botón Ver todos móvil */}
          <div className="mobile-view-all-container">
            <button onClick={handleViewAllBestSelling} className="mobile-view-all">
              Ver todos
            </button>
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

          {/* Carrusel móvil para productos más vistos */}
          <div className="mobile-products-carousel">
            <div
              className="mobile-products-track"
              ref={mostViewedCarouselRef}
              style={{ transform: `translateX(-${currentMostViewedSlide * 100}%)` }}
              onTouchStart={handleMostViewedTouchStart}
              onTouchMove={handleMostViewedTouchMove}
              onTouchEnd={handleMostViewedTouchEnd}
              onMouseDown={handleMostViewedMouseStart}
              onMouseMove={handleMostViewedMouseMove}
              onMouseUp={handleMostViewedMouseEnd}
              onMouseLeave={handleMostViewedMouseEnd}
            >
              {Array.from({ length: totalMostViewedSlides }, (_, slideIndex) => (
                <div key={slideIndex} className="mobile-products-slide">
                  {mostViewedProducts.slice(slideIndex * 2, slideIndex * 2 + 2).map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ))}
            </div>

            <div className="mobile-products-indicators">
              {Array.from({ length: totalMostViewedSlides }, (_, index) => (
                <div
                  key={index}
                  className={`mobile-products-dot ${index === currentMostViewedSlide ? "active" : ""}`}
                  onClick={() => goToMostViewedSlide(index)}
                />
              ))}
            </div>
          </div>

          {/* Botón Ver todos móvil */}
          <div className="mobile-view-all-container">
            <button onClick={handleViewAllMostViewed} className="mobile-view-all">
              Ver todos
            </button>
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

          {/* Carrusel móvil para servicios */}
          <div className="mobile-services-carousel">
            <div
              className="mobile-services-track"
              ref={servicesCarouselRef}
              style={{ transform: `translateX(-${currentServicesSlide * 100}%)` }}
              onTouchStart={handleServicesTouchStart}
              onTouchMove={handleServicesTouchMove}
              onTouchEnd={handleServicesTouchEnd}
              onMouseDown={handleServicesMouseStart}
              onMouseMove={handleServicesMouseMove}
              onMouseUp={handleServicesMouseEnd}
              onMouseLeave={handleServicesMouseEnd}
            >
              {Array.from({ length: totalServicesSlides }, (_, slideIndex) => (
                <div key={slideIndex} className="mobile-services-slide">
                  {services.slice(slideIndex * 2, slideIndex * 2 + 2).map((service) => (
                    <ServiceItem key={service.id} service={service} />
                  ))}
                </div>
              ))}
            </div>

            <div className="mobile-services-indicators">
              {Array.from({ length: totalServicesSlides }, (_, index) => (
                <div
                  key={index}
                  className={`mobile-services-dot ${index === currentServicesSlide ? "active" : ""}`}
                  onClick={() => goToServicesSlide(index)}
                />
              ))}
            </div>
          </div>

          <div className="service-button-container">
            <Link to="/services" className="service-button">
              Ver todos
            </Link>
          </div>

          {/* Botón Ver todos móvil para servicios */}
          <div className="mobile-view-all-container">
            <Link to="/services" className="mobile-view-all">
              Ver todos
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
