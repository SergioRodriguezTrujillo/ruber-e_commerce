"use client"

import { useState, useRef } from "react"
import "./FullServices.css"

const FullServices = () => {
  // Estados para el carrusel móvil de full services
  const [currentFullServicesSlide, setCurrentFullServicesSlide] = useState(0)
  const [isFullServicesTouch, setIsFullServicesTouch] = useState(false)
  const [fullServicesStartX, setFullServicesStartX] = useState(0)
  const [fullServicesCurrentX, setFullServicesCurrentX] = useState(0)
  const [isFullServicesDragging, setIsFullServicesDragging] = useState(false)
  const fullServicesCarouselRef = useRef(null)

  const services = [
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

  const totalFullServicesSlides = services.length

  // Funciones para el carrusel móvil de full services
  const handleFullServicesTouchStart = (e) => {
    setIsFullServicesTouch(true)
    setFullServicesStartX(e.touches[0].clientX)
    setFullServicesCurrentX(e.touches[0].clientX)
    setIsFullServicesDragging(true)
  }

  const handleFullServicesTouchMove = (e) => {
    if (!isFullServicesDragging) return
    setFullServicesCurrentX(e.touches[0].clientX)
  }

  const handleFullServicesTouchEnd = () => {
    if (!isFullServicesDragging) return

    const diffX = fullServicesStartX - fullServicesCurrentX
    const threshold = 50

    if (Math.abs(diffX) > threshold) {
      if (diffX > 0 && currentFullServicesSlide < totalFullServicesSlides - 1) {
        setCurrentFullServicesSlide(currentFullServicesSlide + 1)
      } else if (diffX < 0 && currentFullServicesSlide > 0) {
        setCurrentFullServicesSlide(currentFullServicesSlide - 1)
      }
    }

    setIsFullServicesDragging(false)
    setIsFullServicesTouch(false)
  }

  const handleFullServicesMouseStart = (e) => {
    setIsFullServicesTouch(false)
    setFullServicesStartX(e.clientX)
    setFullServicesCurrentX(e.clientX)
    setIsFullServicesDragging(true)
  }

  const handleFullServicesMouseMove = (e) => {
    if (!isFullServicesDragging || isFullServicesTouch) return
    setFullServicesCurrentX(e.clientX)
  }

  const handleFullServicesMouseEnd = () => {
    if (!isFullServicesDragging || isFullServicesTouch) return

    const diffX = fullServicesStartX - fullServicesCurrentX
    const threshold = 50

    if (Math.abs(diffX) > threshold) {
      if (diffX > 0 && currentFullServicesSlide < totalFullServicesSlides - 1) {
        setCurrentFullServicesSlide(currentFullServicesSlide + 1)
      } else if (diffX < 0 && currentFullServicesSlide > 0) {
        setCurrentFullServicesSlide(currentFullServicesSlide - 1)
      }
    }

    setIsFullServicesDragging(false)
  }

  const goToFullServicesSlide = (slideIndex) => {
    setCurrentFullServicesSlide(slideIndex)
  }

  return (
    <section className="full-services">
      {/* Contenedor normal para desktop y tablet */}
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

      {/* Carrusel móvil para pantallas menores a 480px */}
      <div className="mobile-full-services-carousel">
        <div
          className="mobile-full-services-track"
          ref={fullServicesCarouselRef}
          style={{ transform: `translateX(-${currentFullServicesSlide * 100}%)` }}
          onTouchStart={handleFullServicesTouchStart}
          onTouchMove={handleFullServicesTouchMove}
          onTouchEnd={handleFullServicesTouchEnd}
          onMouseDown={handleFullServicesMouseStart}
          onMouseMove={handleFullServicesMouseMove}
          onMouseUp={handleFullServicesMouseEnd}
          onMouseLeave={handleFullServicesMouseEnd}
        >
          {services.map((service, index) => (
            <div key={service.id} className="mobile-full-services-slide">
              <div className="service-feature">
                <div className="service-icon-circle">
                  <img src={service.icon || "/placeholder.svg"} alt={`${service.title} Icon`} />
                </div>
                <h3 className="service-feature-title">{service.title}</h3>
                <p className="service-feature-description">{service.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mobile-full-services-indicators">
          {Array.from({ length: totalFullServicesSlides }, (_, index) => (
            <div
              key={index}
              className={`mobile-full-services-dot ${index === currentFullServicesSlide ? "active" : ""}`}
              onClick={() => goToFullServicesSlide(index)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default FullServices
