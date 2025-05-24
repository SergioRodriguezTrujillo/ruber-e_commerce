"use client"

import { useState } from "react"
import { X } from "lucide-react"
import "./QuoteModal.css"

const QuoteModal = ({ isOpen, onClose, productName }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    postalCode: "",
    comments: "",
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
    console.log("Quote request:", { ...formData, product: productName })
    // Aquí iría la lógica para enviar la cotización
    onClose()
    setFormData({ name: "", email: "", postalCode: "", comments: "" })
  }

  if (!isOpen) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Solicitar cotización</h2>
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
            <label htmlFor="postalCode">
              Código postal<span className="required">*</span>
            </label>
            <input
              type="text"
              id="postalCode"
              name="postalCode"
              placeholder="Introduzca aquí"
              value={formData.postalCode}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="comments">
              Preguntas y/o Comentarios<span className="required">*</span>
            </label>
            <textarea
              id="comments"
              name="comments"
              placeholder="Introduzca aquí"
              value={formData.comments}
              onChange={handleChange}
              rows="4"
              required
            />
          </div>

          <button type="submit" className="modal-submit-btn">
            Solicitar cotización
          </button>
        </form>
      </div>
    </div>
  )
}

export default QuoteModal
