import "./ServiceItem.css"

const ServiceItem = ({ service }) => {
  return (
    <div className="service-item">
      <div className="service-image">
        <img src={service.image || "/placeholder.svg"} alt={service.title} />
      </div>
      <div className="service-footer">
        <div className="service-icon">
          <img src="/icon/avatar.svg" alt="Service Icon" width="48" height="48" />
        </div>
        <div className="service-text">
          <h3 className="service-title">{service.title}</h3>
          <p className="service-description">{service.description}</p>
        </div>
      </div>
    </div>
  )
}

export default ServiceItem
