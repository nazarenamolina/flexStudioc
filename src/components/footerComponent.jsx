import "../styles/footerComponent.css"
import imagenMap from '../assets/ImagenMap.js';
import { FaFacebook, FaInstagram, FaTiktok } from "react-icons/fa";
import Form from 'react-bootstrap/Form';
  
function footerComponent() {

  return (
    <>
    <section className="ContainerF">
      <article className="LogoF">
        <img src={imagenMap.Logo} className='logo' alt="Logo" width={100}/>

        <p className="Slogan">Aprende flexibilidad sin lesiones</p>

        <div className="iconosRedes">
        <a href="https://facebook.com/tu-pagina" target="_blank" rel="noopener noreferrer" className="icon-link"><FaFacebook /></a>
        <a href="https://instagram.com/tu-pagina" target="_blank" rel="noopener noreferrer" className="icon-link"><FaInstagram /></a>
        <a href="https://tiktok.com/@tu-usuario" target="_blank" rel="noopener noreferrer" className="icon-link"><FaTiktok /></a>
        </div>

      </article>

      <article className="InfoF">
        <h3>Información</h3>
        <ul>
          <li><a href="/acerca-de">Acerca de</a></li>
          <li><a href="/terminos-y-condiciones">Términos y Condiciones</a></li>
          <li><a href="/politica-de-privacidad">Política de Privacidad</a></li>
        </ul>
      </article>

      <article className="ContactoF">
        <h3>Contacto</h3>
         <Form>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Direccion de email</Form.Label>
        <Form.Control type="email" placeholder="name@example.com" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Example textarea</Form.Label>
        <Form.Control as="textarea" rows={3} />
      </Form.Group>
    </Form>
      </article>
    </section>

    </>
  )
}

export default footerComponent