"use client"

import { useState } from "react"
import { Phone, Mail, MapPin } from "lucide-react"
import "./ContactPage.css"

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
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

    if (!formData.subject.trim()) {
      errors.subject = "El asunto es requerido"
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
      subject: "",
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
        <h1 className="contact-title">Contacto</h1>

        <div className="contact-content">
          <div className="contact-info">
            <div className="contact-card">
              <div className="contact-icon">
                <Phone size={24} strokeWidth={1.5} />
              </div>
              <h3>Teléfono</h3>
              <p>+1 (470) 502 3412</p>
            </div>

            <div className="contact-card">
              <div className="contact-icon">
                <Mail size={24} strokeWidth={1.5} />
              </div>
              <h3>Email</h3>
              <p>miranda@itlivesolutions.com</p>
            </div>

            <div className="contact-card">
              <div className="contact-icon">
                <MapPin size={24} strokeWidth={1.5} />
              </div>
              <h3>Dirección</h3>
              <p>8200 MALL PKWY NUM</p>
              <p>A120-131</p>
              <p>LITHONIA, GA 30038</p>
            </div>
          </div>

          <div className="contact-form-container">
            <h2>Envíanos un mensaje</h2>

            {formSubmitted && (
              <div className="form-success">¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.</div>
            )}

            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Nombre</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={formErrors.name ? "error" : ""}
                />
                {formErrors.name && <span className="error-message">{formErrors.name}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={formErrors.email ? "error" : ""}
                />
                {formErrors.email && <span className="error-message">{formErrors.email}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="subject">Asunto</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className={formErrors.subject ? "error" : ""}
                />
                {formErrors.subject && <span className="error-message">{formErrors.subject}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="message">Mensaje</label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  className={formErrors.message ? "error" : ""}
                ></textarea>
                {formErrors.message && <span className="error-message">{formErrors.message}</span>}
              </div>

              <button type="submit" className="submit-btn">
                Enviar Mensaje
              </button>
            </form>
          </div>
        </div>

        <div className="contact-map">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3316.2834890574!2d-84.1!3d33.7!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzPCsDQyJzAwLjAiTiA4NMKwMDYnMDAuMCJX!5e0!3m2!1sen!2sus!4v1620000000000!5m2!1sen!2sus"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            title="Ubicación de IT LIVE SOLUTIONS"
          ></iframe>
        </div>
      </div>
    </div>
  )
}

export default ContactPage
