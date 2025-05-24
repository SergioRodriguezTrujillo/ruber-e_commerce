import "./FullServices.css"

const FullServices = () => {
  return (
    <section className="full-services">
      <div className="full-services-container">
        <div className="service-feature">
          <div className="service-icon-circle">
            <img src="/public/icon/Delivery.svg" alt="Delivery Icon" />
          </div>
          <h3 className="service-feature-title">ENTREGA GRATUITA Y RÁPIDA</h3>
          <p className="service-feature-description">Entrega gratuita para todos los pedidos superiores a $140</p>
        </div>

        <div className="service-feature">
          <div className="service-icon-circle">
            <img src="/icon/Customer service.svg" alt="Customer Service Icon" />
          </div>
          <h3 className="service-feature-title">SERVICIO AL CLIENTE 24/7</h3>
          <p className="service-feature-description">Atención amigable al cliente 24/7</p>
        </div>

        <div className="service-feature">
          <div className="service-icon-circle">
            <img src="/icon/Money back.svg" alt="Secure Icon" />
          </div>
          <h3 className="service-feature-title">GARANTÍA DE DEVOLUCIÓN DE DINERO</h3>
          <p className="service-feature-description">Devolvemos el dinero en 60 días.</p>
        </div>
      </div>
    </section>
  )
}

export default FullServices
