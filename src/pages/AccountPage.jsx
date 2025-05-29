"use client"

import { useState } from "react"
import { Link, useLocation, Navigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import "./AccountPage.css"

const AccountPage = () => {
  const location = useLocation()
  const { user, isAuthenticated } = useAuth()
  const [formData, setFormData] = useState({
    firstName: user?.name || "",
    lastName: "",
    email: user?.email || "",
    address: "una dirección ...",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  // Redirigir a login si no está autenticado
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Saving profile changes:", formData)
    // Aquí iría la lógica para guardar los cambios
  }

  const handleCancel = () => {
    // Resetear formulario o redirigir
    setFormData({
      firstName: user?.name || "",
      lastName: "",
      email: user?.email || "",
      address: "una dirección ...",
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    })
  }

  const isActive = (path) => {
    return location.pathname === path
  }

  return (
    <div className="account-page">
      <div className="container">
        <div className="account-welcome">
          <span className="account-welcome-text">
            Bienvenido! <span className="account-welcome-name">{user?.name || "Usuario"}</span>
          </span>
        </div>

        <div className="account-container">
          <div className="account-sidebar">
            <h2 className="account-sidebar-title">Administrar mi cuenta</h2>
            <ul className="account-menu">
              <li className="account-menu-item">
                <Link to="/account" className={`account-menu-link ${isActive("/account") ? "active" : ""}`}>
                  Mi Perfil
                </Link>
              </li>
              <ul className="account-submenu">
                <li className="account-menu-item">
                  <Link to="/account/addresses" className="account-menu-link">
                    Libreta de direcciones
                  </Link>
                </li>
                <li className="account-menu-item">
                  <Link to="/account/payment" className="account-menu-link">
                    Mis opciones de pago
                  </Link>
                </li>
              </ul>
              <li className="account-menu-item">
                <span className="account-menu-link" style={{ fontWeight: "600", color: "#333" }}>
                  Mis pedidos
                </span>
                <ul className="account-submenu">
                  <li className="account-submenu-item">
                    <Link to="/account/returns" className="account-submenu-link">
                      Mis devoluciones
                    </Link>
                  </li>
                  <li className="account-submenu-item">
                    <Link to="/account/cancellations" className="account-submenu-link">
                      Mis cancelaciones
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="account-menu-item">
                <span className="account-menu-link" style={{ fontWeight: "600", color: "#333" }}>
                  Mi lista de deseos
                </span>
              </li>
            </ul>
          </div>

          <div className="account-main-content">
            <h1 className="account-content-title">Edita Tu Perfil</h1>

            <form onSubmit={handleSubmit} className="account-form">
              <div className="account-form-row">
                <div className="account-form-group">
                  <label htmlFor="firstName" className="account-form-label">
                    Nombre
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="account-form-input"
                    placeholder="Nombre"
                  />
                </div>
                <div className="account-form-group">
                  <label htmlFor="lastName" className="account-form-label">
                    Apellido(s)
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="account-form-input"
                    placeholder="Apellido"
                  />
                </div>
              </div>

              <div className="account-form-row">
                <div className="account-form-group">
                  <label htmlFor="email" className="account-form-label">
                    Correo
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="account-form-input"
                    placeholder="correo@ejemplo.com"
                  />
                </div>
                <div className="account-form-group">
                  <label htmlFor="address" className="account-form-label">
                    Dirección
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="account-form-input"
                    placeholder="una dirección ..."
                  />
                </div>
              </div>

              <div className="account-password-section">
                <h3 className="account-password-title">Cambiar contraseña</h3>

                <div className="account-form-group full-width">
                  <label htmlFor="currentPassword" className="account-form-label">
                    Contraseña actual
                  </label>
                  <input
                    type="password"
                    id="currentPassword"
                    name="currentPassword"
                    value={formData.currentPassword}
                    onChange={handleChange}
                    className="account-form-input"
                    placeholder="Contraseña actual"
                  />
                </div>

                <div className="account-form-group full-width">
                  <label htmlFor="newPassword" className="account-form-label">
                    Nueva contraseña
                  </label>
                  <input
                    type="password"
                    id="newPassword"
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleChange}
                    className="account-form-input"
                    placeholder="Nueva contraseña"
                  />
                </div>

                <div className="account-form-group full-width">
                  <label htmlFor="confirmPassword" className="account-form-label">
                    Confirmar nueva contraseña
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="account-form-input"
                    placeholder="Confirmar nueva contraseña"
                  />
                </div>
              </div>

              <div className="account-form-actions">
                <button type="button" onClick={handleCancel} className="account-btn-cancel">
                  Cancelar
                </button>
                <button type="submit" className="account-btn-save">
                  Guardar cambios
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AccountPage
