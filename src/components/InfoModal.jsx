"use client"

import { useState } from "react"
import { X } from "lucide-react"
import "./InfoModal.css"

const InfoModal = ({ isOpen, onClose, productName }) => {
  const [formData, setFormData] = useState({
    name: "",
    companyName: "",
    email: "",
    phone: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Info request:", { ...formData, product: productName })
    // Aquí iría la lógica para enviar la solicitud de información
    onClose()
    setFormData({ name: "", companyName: "", email: "", phone: "" })
  }

  if (!isOpen) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Solicitar más información</h2>
          <button className="modal-close" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label htmlFor="name">
              Nombre<span className="required">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Introduzca aquí"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="companyName">
              Nombre Empresa<span className="required">*</span>
            </label>
            <input
              type="text"
              id="companyName"
              name="companyName"
              placeholder="Introduzca aquí"
              value={formData.companyName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">
              Correo<span className="required">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Introduzca aquí"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">
              Número Teléfono<span className="required">*</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="Introduzca aquí"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="modal-submit-btn">
            Entregar
          </button>
        </form>
      </div>
    </div>
  )
}

export default InfoModal
