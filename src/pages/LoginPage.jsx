"use client"

import { useState } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import AuthHeader from "../components/AuthHeader"
import Footer from "../components/Footer"
import "./LoginPage.css"

const LoginPage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { login } = useAuth()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  // Obtener la página de donde vino el usuario
  const from = location.state?.from?.pathname || "/"

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Limpiar errores cuando el usuario empiece a escribir
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.email.trim()) {
      newErrors.email = "El correo o teléfono es requerido"
    }

    if (!formData.password.trim()) {
      newErrors.password = "La contraseña es requerida"
    } else if (formData.password.length < 6) {
      newErrors.password = "La contraseña debe tener al menos 6 caracteres"
    }

    return newErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const newErrors = validateForm()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setLoading(true)

    try {
      // Simular llamada a API
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Simular login exitoso
      const userData = {
        id: 1,
        name: "Ernesto",
        email: formData.email,
        avatar: "/avatar-placeholder.png",
      }

      login(userData)

      // Redirigir a donde estaba el usuario
      navigate(from, { replace: true })
    } catch (error) {
      setErrors({ general: "Error al iniciar sesión. Intenta nuevamente." })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-page">
      <AuthHeader />

      <div className="login-content">
        <div className="login-container">
          <div className="login-left">
            <img src="/side-image.png" alt="IT Live Solutions" className="login-illustration" />
          </div>

          <div className="login-right">
            <div className="login-header">
              <h1 className="login-title">Iniciar sesión en</h1>
              <h1 className="login-title-company">IT LIVE SOLUTIONS</h1>
              <p className="login-subtitle">Introduzca los detalles debajo</p>
            </div>

            <form onSubmit={handleSubmit} className="login-form">
              {errors.general && <div className="error-message">{errors.general}</div>}

              <div className="form-group">
                <input
                  type="text"
                  name="email"
                  placeholder="Correo o Número de Teléfono"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-input"
                />
                {errors.email && <div className="error-message">{errors.email}</div>}
              </div>

              <div className="form-group">
                <input
                  type="password"
                  name="password"
                  placeholder="Contraseña"
                  value={formData.password}
                  onChange={handleChange}
                  className="form-input"
                />
                {errors.password && <div className="error-message">{errors.password}</div>}
              </div>

              <div className="forgot-password">
                <Link to="/forgot-password">Olvidaste la Contraseña?</Link>
              </div>

              <button type="submit" className="login-button" disabled={loading}>
                {loading ? "Iniciando sesión..." : "Iniciar sesión"}
              </button>

              <div className="signup-link">
                ¿No tienes una cuenta? <Link to="/signup">Registrarse</Link>
              </div>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default LoginPage
