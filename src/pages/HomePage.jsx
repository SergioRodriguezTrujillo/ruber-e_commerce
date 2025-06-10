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

  // Mobile carousel states
  const [isMobile, setIsMobile] = useState(false)
  const [categoriesSlide, setCategoriesSlide] = useState(0)
  const [bestSellingSlide, setBestSellingSlide] = useState(0)
  const [mostViewedSlide, setMostViewedSlide] = useState(0)
  const [servicesSlide, setServicesSlide] = useState(0)

  // Touch tracking refs for smooth carousel
  const touchStartX = useRef(0)
  const touchEndX = useRef(0)
  const isDragging = useRef(false)
  const startTranslate = useRef({})
  const currentTranslate = useRef({})
  const carouselRefs = useRef({
    categories: null,
    bestSelling: null,
    mostViewed: null,
    services: null,
  })

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 450)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Generic touch handlers for smooth carousel
  const handleTouchStart = (e, carouselType) => {
    if (!isMobile) return

    touchStartX.current = e.touches[0].clientX
    isDragging.current = true
    startTranslate.current[carouselType] = currentTranslate.current[carouselType] || 0

    if (carouselRefs.current[carouselType]) {
      carouselRefs.current[carouselType].style.transition = "none"
    }
  }

  const handleTouchMove = (e, carouselType, itemCount) => {
    if (!isMobile || !isDragging.current) return

    const currentX = e.touches[0].clientX
    const diff = currentX - touchStartX.current

    // Calculate new position with boundaries
    const totalSlides = Math.ceil(itemCount / 2)
    const maxSlides = totalSlides - 1
    const newTranslate = (startTranslate.current[carouselType] || 0) + diff

    // Apply boundaries
    currentTranslate.current[carouselType] = Math.max(Math.min(newTranslate, 0), -100 * maxSlides)

    // Apply the transform
    if (carouselRefs.current[carouselType]) {
      carouselRefs.current[carouselType].style.transform = `translateX(${currentTranslate.current[carouselType]}%)`
    }
  }

  const handleTouchEnd = (carouselType, itemCount, setSlideFunction) => {
    if (!isMobile || !isDragging.current) return

    isDragging.current = false

    // Calculate which slide to snap to
    const slideWidth = 100
    const totalSlides = Math.ceil(itemCount / 2)
    const slideIndex = Math.min(
      Math.max(Math.round(Math.abs(currentTranslate.current[carouselType] || 0) / slideWidth), 0),
      totalSlides - 1,
    )

    setSlideFunction(slideIndex)

    // Apply smooth transition for snap
    if (carouselRefs.current[carouselType]) {
      carouselRefs.current[carouselType].style.transition = "transform 0.3s ease"
      carouselRefs.current[carouselType].style.transform = `translateX(-${slideIndex * 100}%)`
      currentTranslate.current[carouselType] = -slideIndex * 100
    }
  }

  // Update transform when slide changes
  useEffect(() => {
    if (carouselRefs.current.categories) {
      carouselRefs.current.categories.style.transition = "transform 0.3s ease"
      carouselRefs.current.categories.style.transform = `translateX(-${categoriesSlide * 100}%)`
      currentTranslate.current.categories = -categoriesSlide * 100
    }
  }, [categoriesSlide])

  useEffect(() => {
    if (carouselRefs.current.bestSelling) {
      carouselRefs.current.bestSelling.style.transition = "transform 0.3s ease"
      carouselRefs.current.bestSelling.style.transform = `translateX(-${bestSellingSlide * 100}%)`
      currentTranslate.current.bestSelling = -bestSellingSlide * 100
    }
  }, [bestSellingSlide])

  useEffect(() => {
    if (carouselRefs.current.mostViewed) {
      carouselRefs.current.mostViewed.style.transition = "transform 0.3s ease"
      carouselRefs.current.mostViewed.style.transform = `translateX(-${mostViewedSlide * 100}%)`
      currentTranslate.current.mostViewed = -mostViewedSlide * 100
    }
  }, [mostViewedSlide])

  useEffect(() => {
    if (carouselRefs.current.services) {
      carouselRefs.current.services.style.transition = "transform 0.3s ease"
      carouselRefs.current.services.style.transform = `translateX(-${servicesSlide * 100}%)`
      currentTranslate.current.services = -servicesSlide * 100
    }
  }, [servicesSlide])

  // Mobile carousel component with smooth dragging
  const MobileCarousel = ({
    items,
    currentSlide,
    setCurrentSlide,
    renderItem,
    showViewAll = false,
    viewAllAction,
    carouselType,
  }) => {
    const totalSlides = Math.ceil(items.length / 2)

    const getSlideItems = (slideIndex) => {
      const startIndex = slideIndex * 2
      return items.slice(startIndex, startIndex + 2)
    }

    return (
      <div className="mobile-carousel-container">
        <div
          className="mobile-carousel-wrapper"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          onTouchStart={(e) => handleTouchStart(e, carouselType)}
          onTouchMove={(e) => handleTouchMove(e, carouselType, items.length)}
          onTouchEnd={() => handleTouchEnd(carouselType, items.length, setCurrentSlide)}
          ref={(el) => (carouselRefs.current[carouselType] = el)}
        >
          {Array.from({ length: totalSlides }, (_, slideIndex) => (
            <div key={slideIndex} className="mobile-carousel-slide">
              {getSlideItems(slideIndex).map((item, index) => (
                <div key={item.id || index}>{renderItem(item)}</div>
              ))}
            </div>
          ))}
        </div>

        {totalSlides > 1 && (
          <div className="mobile-dots-container">
            {Array.from({ length: totalSlides }, (_, index) => (
              <div
                key={index}
                className={`mobile-dot ${index === currentSlide ? "active" : ""}`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
        )}

        {showViewAll && (
          <div className="mobile-view-all-container">
            <button className="mobile-view-all-btn" onClick={viewAllAction}>
              Ver todos
            </button>
          </div>
        )}
      </div>
    )
  }

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

          {isMobile ? (
            <MobileCarousel
              items={categories}
              currentSlide={categoriesSlide}
              setCurrentSlide={setCategoriesSlide}
              renderItem={(category) => <CategoryItem category={category} />}
              showViewAll={false}
              carouselType="categories"
            />
          ) : (
            <div className="category-grid">
              {categories.map((category) => (
                <CategoryItem key={category.id} category={category} />
              ))}
            </div>
          )}
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

          {isMobile ? (
            <MobileCarousel
              items={bestSellingProducts}
              currentSlide={bestSellingSlide}
              setCurrentSlide={setBestSellingSlide}
              renderItem={(product) => <ProductCard product={product} />}
              showViewAll={true}
              viewAllAction={handleViewAllBestSelling}
              carouselType="bestSelling"
            />
          ) : (
            <div className="products-grid">
              {bestSellingProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
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

          {isMobile ? (
            <MobileCarousel
              items={mostViewedProducts}
              currentSlide={mostViewedSlide}
              setCurrentSlide={setMostViewedSlide}
              renderItem={(product) => <ProductCard product={product} />}
              showViewAll={true}
              viewAllAction={handleViewAllMostViewed}
              carouselType="mostViewed"
            />
          ) : (
            <div className="products-grid">
              {mostViewedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
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

          {isMobile ? (
            <MobileCarousel
              items={services}
              currentSlide={servicesSlide}
              setCurrentSlide={setServicesSlide}
              renderItem={(service) => <ServiceItem service={service} />}
              showViewAll={true}
              viewAllAction={() => navigate("/services")}
              carouselType="services"
            />
          ) : (
            <>
              <div className="service-grid">
                {services.map((service) => (
                  <ServiceItem key={service.id} service={service} />
                ))}
              </div>

              <div className="service-button-container">
                <Link to="/services" className="service-button">
                  Ver todos
                </Link>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Full Services Section */}
      <FullServices />
    </div>
  )
}

export default HomePage
