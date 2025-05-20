import { CheckCircle } from "lucide-react"
import "./AboutPage.css"

const AboutPage = () => {
  return (
    <div className="about-page">
      <div className="container">
        <h1 className="about-title">Acerca de</h1>

        <div className="about-section">
          <div className="about-content">
            <h2>Nuestra Historia</h2>
            <p>
              IT LIVE SOLUTIONS nació en 2020 con la misión de proporcionar soluciones tecnológicas de alta calidad a
              precios accesibles. Desde nuestros humildes comienzos, hemos crecido hasta convertirnos en un referente en
              el mercado de hardware y accesorios informáticos.
            </p>
            <p>
              Nuestra pasión por la tecnología y el compromiso con la satisfacción del cliente nos ha permitido expandir
              nuestra oferta de productos y servicios, manteniendo siempre los más altos estándares de calidad.
            </p>
          </div>
          <div className="about-image">
            <img src="/about-image.jpg" alt="Nuestra Historia" />
          </div>
        </div>

        <div className="about-section reverse">
          <div className="about-content">
            <h2>Nuestra Misión</h2>
            <p>
              En IT LIVE SOLUTIONS, nuestra misión es proporcionar productos tecnológicos innovadores y de alta calidad
              que mejoren la vida digital de nuestros clientes. Nos esforzamos por ofrecer un servicio excepcional y
              soluciones personalizadas que satisfagan las necesidades específicas de cada cliente.
            </p>
            <ul className="mission-list">
              <li>
                <CheckCircle className="check-icon" size={18} strokeWidth={1.5} /> Ofrecer productos de la más alta
                calidad
              </li>
              <li>
                <CheckCircle className="check-icon" size={18} strokeWidth={1.5} /> Proporcionar un servicio al cliente
                excepcional
              </li>
              <li>
                <CheckCircle className="check-icon" size={18} strokeWidth={1.5} /> Mantenernos a la vanguardia de la
                innovación tecnológica
              </li>
              <li>
                <CheckCircle className="check-icon" size={18} strokeWidth={1.5} /> Contribuir positivamente a nuestra
                comunidad
              </li>
            </ul>
          </div>
          <div className="about-image">
            <img src="/mission-image.jpg" alt="Nuestra Misión" />
          </div>
        </div>

        <div className="about-section">
          <div className="about-content">
            <h2>Nuestro Equipo</h2>
            <p>
              Nuestro equipo está formado por apasionados de la tecnología con amplia experiencia en el sector. Desde
              expertos en hardware hasta especialistas en atención al cliente, cada miembro de IT LIVE SOLUTIONS está
              comprometido con proporcionar la mejor experiencia posible a nuestros clientes.
            </p>
            <p>
              Invertimos continuamente en la formación y desarrollo de nuestro equipo para mantenernos actualizados con
              las últimas tendencias y avances tecnológicos, asegurando que podamos ofrecer siempre las mejores
              soluciones.
            </p>
          </div>
          <div className="about-image">
            <img src="/team-image.jpg" alt="Nuestro Equipo" />
          </div>
        </div>

        <div className="values-section">
          <h2>Nuestros Valores</h2>
          <div className="values-grid">
            <div className="value-card">
              <h3>Calidad</h3>
              <p>
                Nos comprometemos a ofrecer productos y servicios de la más alta calidad, seleccionando cuidadosamente
                cada artículo de nuestro catálogo.
              </p>
            </div>
            <div className="value-card">
              <h3>Innovación</h3>
              <p>
                Buscamos constantemente nuevas tecnologías y soluciones para mantenernos a la vanguardia del mercado y
                ofrecer lo mejor a nuestros clientes.
              </p>
            </div>
            <div className="value-card">
              <h3>Integridad</h3>
              <p>
                Actuamos con honestidad y transparencia en todas nuestras operaciones, construyendo relaciones de
                confianza con clientes y proveedores.
              </p>
            </div>
            <div className="value-card">
              <h3>Servicio</h3>
              <p>
                Nos esforzamos por superar las expectativas de nuestros clientes, ofreciendo un servicio personalizado y
                atento a sus necesidades.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutPage
