import "../styles/footerComponent.css";
import imagenMap from '../assets/ImagenMap.js';
import { FaFacebook, FaInstagram, FaTiktok } from "react-icons/fa";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'; // Agregué un botón para el form

function FooterComponent() {
  return (
    <footer className="footer-general">
      {/* Sección Principal con las 3 columnas */}
      <section className="ContainerF">
        
        {/* Columna 1: Marca */}
        <article className="columna-footer LogoF">
          <img src={imagenMap.Logo} className='logo' alt="Logo Flex Studio" />
          <p className="slogan">Aprende flexibilidad sin lesiones.</p>
          
          <div className="iconosRedes">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="icon-link"><FaFacebook /></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="icon-link"><FaInstagram /></a>
            <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="icon-link"><FaTiktok /></a>
          </div>
        </article>

        {/* Columna 2: Navegación */}
        <article className="columna-footer InfoF">
          <h3>Información</h3>
          <ul className="lista-links">
            <li><a href="/acerca-de">Acerca de nosotros</a></li>
            <li><a href="/cursos">Ver Cursos</a></li>
            <li><a href="/terminos-y-condiciones">Términos y Condiciones</a></li>
            <li><a href="/politica-de-privacidad">Política de Privacidad</a></li>
          </ul>
        </article>

        {/* Columna 3: Contacto (Formulario) */}
        <article className="columna-footer ContactoF">
          <h3>Contáctanos</h3>
          <Form className="formulario-footer">
            <Form.Group className="mb-3" controlId="emailInput">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="nombre@ejemplo.com" />
            </Form.Group>
            
            <Form.Group className="mb-3" controlId="mensajeInput">
              <Form.Label>Mensaje</Form.Label>
              <Form.Control as="textarea" rows={3} placeholder="¿En qué podemos ayudarte?" />
            </Form.Group>
            
            <Button type="submit" className="w-100 btn-custom">
              Enviar
            </Button>
          </Form>
        </article>
         <div className="copyright-bar">
        <p>© {new Date().getFullYear()} Flex Studio. Todos los derechos reservados.</p>
      </div>
      </section>
    </footer>
  );
}

export default FooterComponent;