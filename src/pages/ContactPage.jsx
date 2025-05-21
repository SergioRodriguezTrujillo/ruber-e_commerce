"use client"

import { useState } from "react"
import { Phone, Mail } from "lucide-react"
import "./ContactPage.css"

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })

  const [formErrors, setFormErrors] = useState({})
  const [formSubmitted, setFormSubmitted] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Limpiar error cuando el usuario comienza a escribir
    if (formErrors[name]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: "",
      }))
    }
  }

  const validateForm = () => {
    const errors = {}

    if (!formData.name.trim()) {
      errors.name = "El nombre es requerido"
    }

    if (!formData.email.trim()) {
      errors.email = "El email es requerido"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email inválido"
    }

    if (!formData.message.trim()) {
      errors.message = "El mensaje es requerido"
    }

    return errors
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const errors = validateForm()

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors)
      return
    }

    // Aquí iría la lógica para enviar el formulario
    console.log("Formulario enviado:", formData)

    // Mostrar mensaje de éxito
    setFormSubmitted(true)

    // Resetear formulario
    setFormData({
      name: "",
      email: "",
      phone: "",
      message: "",
    })

    // Ocultar mensaje después de 5 segundos
    setTimeout(() => {
      setFormSubmitted(false)
    }, 5000)
  }

  return (
    <div className="contact-page">
      <div className="container">
        <h1 className="contact-title">Contáctanos</h1>

        <div className="contact-content">
          <div className="contact-info">
            <div className="contact-card">
              <div className="contact-icon">
                <Phone size={20} strokeWidth={2} />
              </div>
              <h3>Llámanos</h3>
              <p>Estamos disponibles 24 horas al día, 7 días a la semana.</p>
              <div className="contact-divider"></div>
              <p>Teléfono: +000000000000</p>
            </div>

            <div className="contact-card">
              <div className="contact-icon">
                <Mail size={20} strokeWidth={2} />
              </div>
              <h3>Escríbenos</h3>
              <p>Llene nuestro formulario y nos pondremos en contacto con usted en 24 horas.</p>
              <div className="contact-divider"></div>
              <p>Correo: servicio@correo.com</p>
            </div>
          </div>

          <div className="contact-form-container">
            {formSubmitted && (
              <div className="form-success">¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.</div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <input
                    type="text"
                    name="name"
                    placeholder="Tu Nombre *"
                    value={formData.name}
                    onChange={handleChange}
                    className={formErrors.name ? "error" : ""}
                  />
                  {formErrors.name && <span className="error-message">{formErrors.name}</span>}
                </div>

                <div className="form-group">
                  <input
                    type="email"
                    name="email"
                    placeholder="Tu Correo *"
                    value={formData.email}
                    onChange={handleChange}
                    className={formErrors.email ? "error" : ""}
                  />
                  {formErrors.email && <span className="error-message">{formErrors.email}</span>}
                </div>

                <div className="form-group">
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Tu Teléfono *"
                    value={formData.phone}
                    onChange={handleChange}
                    className={formErrors.phone ? "error" : ""}
                  />
                  {formErrors.phone && <span className="error-message">{formErrors.phone}</span>}
                </div>
              </div>

              <div className="form-group">
                <textarea
                  name="message"
                  placeholder="Escribe aquí el mensaje"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  className={formErrors.message ? "error" : ""}
                ></textarea>
                {formErrors.message && <span className="error-message">{formErrors.message}</span>}
              </div>

              <button type="submit" className="submit-btn">
                Enviar mensaje
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactPage
