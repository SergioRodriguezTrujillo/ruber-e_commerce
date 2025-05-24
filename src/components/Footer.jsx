"use client"

import { Link } from "react-router-dom"
import "./Footer.css"

const Footer = () => {
  const handleSubscribe = (e) => {
    e.preventDefault()
    // Implementar lógica de suscripción
    console.log("Subscribed with email:", e.target.email.value)
  }

  return (
    <footer>
      <div className="footer-main">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-column">
              <h3 className="footer-title">IT LIVE SOLUTIONS</h3>
              <div className="footer-subscribe">
                <p>Subscríbete</p>
                <form onSubmit={handleSubscribe} className="subscribe-form">
                  <input type="email" name="email" placeholder="Introduzca su correo" required />
                  <button type="submit">
                    <span className="material-icons-outlined">send</span>
                  </button>
                </form>
              </div>
            </div>

            <div className="footer-column">
              <h3 className="footer-title">Soporte</h3>
              <div className="footer-info">
                <p>8200 MALL PKWY NUM</p>
                <p>A120-131</p>
                <p>LITHONIA, GA 30038</p>
                <p>miranda@itlivesolutions.com</p>
                <p>+1 (470) 502 3412</p>
              </div>
            </div>

            <div className="footer-column">
              <h3 className="footer-title">Cuenta</h3>
              <ul className="footer-links">
                <li>
                  <Link to="/account">Mi Cuenta</Link>
                </li>
                <li>
                  <Link to="/login">Iniciar / Registrarse</Link>
                </li>
                <li>
                  <Link to="/cart">Carro de Compras</Link>
                </li>
                <li>
                  <Link to="/wishlist">Lista de Deseos</Link>
                </li>
                <li>
                  <Link to="/shop">Tienda</Link>
                </li>
              </ul>
            </div>

            <div className="footer-column">
              <h3 className="footer-title">Accesos directos</h3>
              <ul className="footer-links">
                <li>
                  <Link to="/privacy">Políticas de Privacidad</Link>
                </li>
                <li>
                  <Link to="/terms">Términos de Uso</Link>
                </li>
                <li>
                  <Link to="/faq">Preguntas y respuestas</Link>
                </li>
                <li>
                  <Link to="/contact">Contacto</Link>
                </li>
              </ul>
            </div>

            <div className="footer-column">
              <h3 className="footer-title">Descargar App</h3>
              <p className="app-description">Descargar App desde las Tiendas</p>
              <p className="app-description">Escanea el código QR</p>
              <div className="app-download-container">
                <div className="qr-code">
                  <img src="/qr-code.png" alt="QR Code" />
                </div>
                <div className="app-stores">
                  <a href="#" className="app-store-link google-play">
                    <img src="/playstore.png" alt="Google Play Icon" />
                    <div className="store-text">
                      <span className="store-get">GET IT ON</span>
                      <span className="store-name">Google Play</span>
                    </div>
                  </a>
                  <a href="#" className="app-store-link apple-store">
                    <img src="/apple.png" alt="App Store Icon" />
                    <div className="store-text">
                      <span className="store-get">Download on the</span>
                      <span className="store-name">App Store</span>
                    </div>
                  </a>
                </div>
              </div>
              <div className="social-links">
                <a href="#" className="social-link">
                  <img src="/icon/Icon-Facebook (1).svg" alt="Facebook" />
                </a>
                <a href="#" className="social-link">
                  <img src="/icon/Icon-Twitter.svg" alt="Twitter" />
                </a>
                <a href="#" className="social-link">
                  <img src="/icon/icon-instagram.svg" alt="Instagram" />
                </a>
                <a href="#" className="social-link">
                  <img src="/icon/Icon-Linkedin.svg" alt="LinkedIn" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <p>© Copyright Ruber 2025. All right reserved</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
