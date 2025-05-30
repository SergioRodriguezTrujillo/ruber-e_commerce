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
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rerum minima corporis velit natus laborum. Necessitatibus, quisquam omnis numquam harum fuga tempore nesciunt voluptatibus perferendis, deleniti quos quidem ducimus unde aperiam!
            </p>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus ea atque iste laboriosam nemo mollitia autem doloribus esse eveniet maxime eos tempore soluta perspiciatis molestiae laborum consectetur natus, libero eaque?
            </p>
          </div>
          <div className="about-image">
            <img src="/nuesta-historia.jpg" alt="Nuestra Historia" />
          </div>
        </div>

        <div className="about-section reverse">
          <div className="about-content">
            <h2>Nuestra Misión</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis et consequuntur, dolores id necessitatibus soluta qui libero quo veritatis hic iure accusamus corrupti numquam excepturi vel ad omnis minus aspernatur.
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
            <img src="/nuestra-mision.jpg" alt="Nuestra Misión" />
          </div>
        </div>

        <div className="about-section">
          <div className="about-content">
            <h2>Nuestro Equipo</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Error ut a placeat alias doloremque odit magnam, voluptas, totam assumenda voluptatem accusamus, dolorum modi nesciunt quae et? Eius nobis sunt iure?
            </p>
            <p>
             Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus harum provident quis unde corrupti ullam perspiciatis ex omnis, amet voluptatibus sint id voluptas deleniti quo fugit. Asperiores dolorem ipsa quam.
            </p>
          </div>
          <div className="about-image">
            <img src="/nuestro-equipo.jpg" alt="Nuestro Equipo" />
          </div>
        </div>

        <div className="values-section">
          <h2>Nuestros Valores</h2>
          <div className="values-grid">
            <div className="value-card">
              <h3>Calidad</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque, non iste. Iure nostrum natus blanditiis sequi saepe soluta eius corporis impedit tempora voluptates, similique nisi necessitatibus inventore quo sunt illum.
              </p>
            </div>
            <div className="value-card">
              <h3>Innovación</h3>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quae, odio soluta asperiores atque voluptas architecto cupiditate mollitia enim nulla explicabo provident in quasi, debitis perferendis quas eum illo fugiat ab.
              </p>
            </div>
            <div className="value-card">
              <h3>Integridad</h3>
              <p>
               Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore voluptate dolor iste, perferendis non assumenda nobis recusandae laboriosam dolore at quaerat ullam. Possimus illo sapiente velit ratione esse id perspiciatis.
              </p>
            </div>
            <div className="value-card">
              <h3>Servicio</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident hic at animi vitae nam obcaecati molestiae. Necessitatibus, quam ex ab laborum quae eaque iusto ullam molestiae doloribus aut repellendus adipisci?
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutPage
