import { Settings } from "lucide-react"
import "./ServiceItem.css"

const ServiceItem = ({ service }) => {
  return (
    <div className="service-item">
      <div className="service-image">
        <img src={service.image || "/placeholder.svg"} alt={service.title} />
      </div>
      <div className="service-footer">
        <div className="service-icon">
          <Settings size={20} strokeWidth={1.5} />
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
