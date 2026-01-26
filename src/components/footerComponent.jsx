import "../styles/footerComponent.css";
import imagenMap from '../assets/ImagenMap.js'; 
import { FaFacebookF, FaInstagram, FaTiktok, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
function FooterComponent() {
  return (
    <footer className="footer-general">
      <div className="main-content">
        
        {/* Columna 1: Logo y Descripción */}
        <article className="columna-footer logo-col">
          <img src={imagenMap.logofooter} className='logofooter' alt="Logo Flex Studio" />
        </article>

        {/* Columna 2: Redes Sociales */}
        <article className="columna-footer">
          <h3 className="titulo-footer">Redes Sociales</h3>
          <div className="lista-redes">
            <a href="https://www.instagram.com/flex_studioc/" target="_blank" rel="noopener noreferrer" className="item-red">
              <span className="icono-circulo"><FaInstagram /></span> Instagram
            </a>
            <a href="https://www.tiktok.com/@flexstudioc" target="_blank" rel="noopener noreferrer" className="item-red">
              <span className="icono-circulo"><FaTiktok /></span> Tiktok
            </a>
          </div>
        </article>

        {/* Columna 3: Información */}
        <article className="columna-footer">
          <h3 className="titulo-footer">Información</h3>
          <ul className="lista-links">
            <li><a href="/acerca-de">Acerca de mí</a></li>
            <li><a href="/cursos">Ver Cursos</a></li>
            <li><a href="/terminos-y-condiciones">Términos y Condiciones</a></li>
            <li><a href="/politica-de-privacidad">Política de Privacidad</a></li>
          </ul>
        </article>

        {/* Columna 4: Contacto */}
        <article className="columna-footer">
          <h3 className="titulo-footer">Contacto</h3>
          <div className="info-contacto">
            <div className="item-contacto">
              <FaEnvelope className="icono-contacto" />
              <p>candeimbo@gmail.com</p>
            </div>
            <div className="item-contacto">
              <FaMapMarkerAlt className="icono-contacto" />
              <p>Yerba Buena<br />Tucumán, Argentina</p>
            </div>
          </div>
        </article>

      </div>

      {/* Barra inferior de Copyright */}
      <div className="copyright-bar">
        <div className="copyright-content">
            <p>© {new Date().getFullYear()} Flex Studio. Todos los derechos reservados.</p>
            <div className="legales">
                <a href="/aviso-legal">Aviso Legal</a>
                <a href="/cookies">Cookies</a>
            </div>
        </div>
      </div>
    </footer>
  );
}

export default FooterComponent;