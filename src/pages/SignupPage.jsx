"use client"

import { useState } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import AuthHeader from "../components/AuthHeader"
import Footer from "../components/Footer"
import "./SignupPage.css"

const SignupPage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { signup } = useAuth()
  const [formData, setFormData] = useState({
    name: "",
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

    if (!formData.name.trim()) {
      newErrors.name = "El nombre es requerido"
    }

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

      // Simular registro exitoso
      const userData = {
        id: Date.now(),
        name: formData.name,
        email: formData.email,
        avatar: "/avatar-placeholder.png",
      }

      signup(userData)

      // Redirigir a donde estaba el usuario
      navigate(from, { replace: true })
    } catch (error) {
      setErrors({ general: "Error al crear la cuenta. Intenta nuevamente." })
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSignup = () => {
    // Implementar registro con Google
    console.log("Registro con Google")
    alert("Funcionalidad de Google será implementada próximamente")
  }

  return (
    <div className="signup-page">
      <AuthHeader />

      <div className="signup-content">
        <div className="signup-container">
          <div className="signup-left">
            <img src="/side-image.png" alt="IT Live Solutions" className="signup-illustration" />
          </div>

          <div className="signup-right">
            <div className="signup-header">
              <h1 className="signup-title">Crear Cuenta</h1>
              <p className="signup-subtitle">Introduzca los detalles debajo</p>
            </div>

            <form onSubmit={handleSubmit} className="signup-form">
              {errors.general && <div className="error-message">{errors.general}</div>}

              <div className="form-group">
                <input
                  type="text"
                  name="name"
                  placeholder="Nombre"
                  value={formData.name}
                  onChange={handleChange}
                  className="form-input"
                />
                {errors.name && <div className="error-message">{errors.name}</div>}
              </div>

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

              <button type="submit" className="signup-button" disabled={loading}>
                {loading ? "Creando cuenta..." : "Crear Cuenta"}
              </button>

              <button type="button" className="google-signup-button" onClick={handleGoogleSignup}>
                <svg className="google-icon" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Registrarse con Google
              </button>

              <div className="login-link">
                Ya tienes una Cuenta? <Link to="/login">Iniciar Sesión</Link>
              </div>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default SignupPage
