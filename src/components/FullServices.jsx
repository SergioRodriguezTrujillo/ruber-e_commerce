"use client"

import { useState, useEffect, useRef } from "react"
import "./FullServices.css"

const FullServices = () => {
  const [isMobile, setIsMobile] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const touchStartX = useRef(0)
  const touchEndX = useRef(0)
  const carouselRef = useRef(null)
  const isDragging = useRef(false)
  const startTranslate = useRef(0)
  const currentTranslate = useRef(0)

  const serviceFeatures = [
    {
      id: 1,
      icon: "/icon/Delivery.svg",
      title: "ENTREGA GRATUITA Y RÁPIDA",
      description: "Entrega gratuita para todos los pedidos superiores a $140",
    },
    {
      id: 2,
      icon: "/icon/Customer-service.svg",
      title: "SERVICIO AL CLIENTE 24/7",
      description: "Atención amigable al cliente 24/7",
    },
    {
      id: 3,
      icon: "/icon/Money-back.svg",
      title: "GARANTÍA DE DEVOLUCIÓN DE DINERO",
      description: "Devolvemos el dinero en 60 días.",
    },
  ]

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 450)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Touch event handlers for smooth carousel
  const handleTouchStart = (e) => {
    if (!isMobile) return

    touchStartX.current = e.touches[0].clientX
    isDragging.current = true
    startTranslate.current = currentTranslate.current

    if (carouselRef.current) {
      carouselRef.current.style.transition = "none"
    }
  }

  const handleTouchMove = (e) => {
    if (!isMobile || !isDragging.current) return

    const currentX = e.touches[0].clientX
    const diff = currentX - touchStartX.current

    // Calculate new position with boundaries
    const maxSlides = serviceFeatures.length - 1
    const newTranslate = startTranslate.current + diff

    // Apply boundaries
    currentTranslate.current = Math.max(Math.min(newTranslate, 0), -100 * maxSlides)

    // Apply the transform
    if (carouselRef.current) {
      carouselRef.current.style.transform = `translateX(${currentTranslate.current}%)`
    }
  }

  const handleTouchEnd = () => {
    if (!isMobile || !isDragging.current) return

    isDragging.current = false

    // Calculate which slide to snap to
    const slideWidth = 100
    const slideIndex = Math.round(Math.abs(currentTranslate.current) / slideWidth)

    setCurrentSlide(slideIndex)

    // Apply smooth transition for snap
    if (carouselRef.current) {
      carouselRef.current.style.transition = "transform 0.3s ease"
      carouselRef.current.style.transform = `translateX(-${slideIndex * 100}%)`
      currentTranslate.current = -slideIndex * 100
    }
  }

  // Update transform when slide changes
  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.style.transition = "transform 0.3s ease"
      carouselRef.current.style.transform = `translateX(-${currentSlide * 100}%)`
      currentTranslate.current = -currentSlide * 100
    }
  }, [currentSlide])

  return (
    <section className="full-services">
      {/* Desktop version */}
      <div className="full-services-container">
        <div className="service-feature">
          <div className="service-icon-circle">
            <img src="/icon/Delivery.svg" alt="Delivery Icon" />
          </div>
          <h3 className="service-feature-title">ENTREGA GRATUITA Y RÁPIDA</h3>
          <p className="service-feature-description">Entrega gratuita para todos los pedidos superiores a $140</p>
        </div>

        <div className="service-feature">
          <div className="service-icon-circle">
            <img src="/icon/Customer-service.svg" alt="Customer Service Icon" />
          </div>
          <h3 className="service-feature-title">SERVICIO AL CLIENTE 24/7</h3>
          <p className="service-feature-description">Atención amigable al cliente 24/7</p>
        </div>

        <div className="service-feature">
          <div className="service-icon-circle">
            <img src="/icon/Money-back.svg" alt="Secure Icon" />
          </div>
          <h3 className="service-feature-title">GARANTÍA DE DEVOLUCIÓN DE DINERO</h3>
          <p className="service-feature-description">Devolvemos el dinero en 60 días.</p>
        </div>
      </div>

      {/* Mobile carousel version */}
      <div className="full-services-mobile">
        <div
          className="full-services-mobile-carousel"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="full-services-mobile-wrapper" ref={carouselRef}>
            {serviceFeatures.map((feature) => (
              <div key={feature.id} className="full-services-mobile-slide">
                <div className="service-feature">
                  <div className="service-icon-circle">
                    <img src={feature.icon || "/placeholder.svg"} alt={`${feature.title} Icon`} />
                  </div>
                  <h3 className="service-feature-title">{feature.title}</h3>
                  <p className="service-feature-description">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Dots indicator */}
          <div className="full-services-dots">
            {serviceFeatures.map((_, index) => (
              <div
                key={index}
                className={`full-services-dot ${index === currentSlide ? "active" : ""}`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default FullServices
