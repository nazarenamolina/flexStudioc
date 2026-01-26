import { Carousel, Image, Form, Card, Button, OverlayTrigger, Popover} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import imagenMap from '../assets/ImagenMap.js';
import "../styles/homePage.css";
import { FaUser, FaEnvelope, FaClock, FaArrowRight} from 'react-icons/fa';

function HomePage() {
  const serviciosData = [
    {
      id: 1,
      titulo: "Clases para patinadoras",
      bagde: "PLAN MENSUAL",
      descripcion: "Con este entrenamiento especializado, vas a mejorar tu flexibilidad, conseguir mayor amplitud en tus figuras y trompos, y sentir más control en la pista.",
      popover: "Diseñado para patinadoras que buscan resultados reales. ¡Junt@s vamos a lograr tus metas!",
      link: "/clases-patin",
      image: imagenMap.prueba
    },
    {
      id: 2,
      titulo: "Clases Progresivas Generales",
      bagde: "PLAN MENSUAL",
      descripcion: "Si nunca entrenaste tu flexibilidad o querés llevarla al siguiente nivel, este entrenamiento progresivo está diseñado especialmente para vos. Trabajaremos con métodos efectivos y adaptados a tu nivel.",
      popover: "Alcanzarás tus metas de manera segura y divertida. ¡Junt@s vamos a lograrlo!",
      link: "/progresivas",
      image: imagenMap.prueba
    },
    {
      id: 3,
      titulo: "Clases para Deportistas",
      bagde: "PLAN MENSUAL",
      descripcion: "Con este entrenamiento especializado, vas a potenciar tu rendimiento deportivo, ganar agilidad y sentirte mas seguro en cada movimiento de tu deporte.",
      popover: "Diseñado para deportistas que buscan resultados reales. ¡Junt@s vamos a lograr tus metas! ",
      link: "/deportistas",
      image: imagenMap.prueba
    }
  ];

  return (
    <>
      <main className='main-content'>
        <section>
          <Carousel>
            <Carousel.Item>
              <Image src={imagenMap.Banner} rounded className='carrusel' />
            </Carousel.Item>
            <Carousel.Item>
              <Image src={imagenMap.QuienSoy} rounded className='carrusel' />
            </Carousel.Item>
          </Carousel>
        </section>
        <section>
        <h1><strong>EXPLORAR CURSOS</strong></h1>
        <article className="articleflexible">
            
            {serviciosData.map((servicio) => (
              
              <Card key={servicio.id} className="course-card border-0 text-white">
                {/* La imagen ahora es un fondo con filtro */}
                <div 
                  className="card-background" 
                  style={{ backgroundImage: `url(${servicio.image || 'holder.js/300x500'})` }}
                >
                  <div className="card-overlay"></div>
                </div>

                <Card.Body className="card-body p-4">
                  <div className="badge-container">
                    <span className="badge-trend">{servicio.bagde}</span>
                    <span className="badge-time"><FaClock className="me-1"/>1 hora</span>
                  </div>
                  <div className="mt-4">
                    <Card.Title className="display-6 fw-bold mb-3 lh-1">
                      {servicio.titulo}
                    </Card.Title>
                    <div className="description-box mb-4">
                      <Card.Text className="mb-0 text-light opacity-75">
                         {servicio.descripcion}
                      </Card.Text>
                    </div>
                    <OverlayTrigger
                      trigger="hover"
                      placement="bottom"
                      overlay={
                        <Popover id={`popover-${servicio.id}`}>
                          <Popover.Body className="popover-flex-studio">
                            {servicio.popover}
                          </Popover.Body>
                        </Popover>
                      }
                    >
                      <Button 
                        as={Link} 
                        to={servicio.link} 
                        className="btn-animado btn-card"
                      >
                        <span className="fw-bold texto-oculto">Ver Más</span>
                        <span className="icon-circle"><FaArrowRight /></span>
                      </Button>
                    </OverlayTrigger>
                  </div>
                </Card.Body>
              </Card>
            ))}
          </article>
          <article className="articleflexible p-4 mt-5 mb-5">
            <Card className="contact-card border-0">
              <Card.Body className="p-4 p-md-5">
                <h3 className="tituloconsulta">¿Tenés una consulta?</h3>
                <p className="pconsulta">
                  Completa con tus datos y te respondo lo antes posible.
                </p>
                <Form>
                  <Form.Group className="mb-3" controlId="formNombre">
                    <Form.Label className="fw-semibold">Nombre</Form.Label>
                    <div className="input-with-icon">
                        <FaUser className="input-icon" />
                        <Form.Control type="text" placeholder="Nombre" className="ps-5" />
                    </div>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Label className="fw-semibold">E-mail</Form.Label>
                    <div className="input-with-icon">
                        <FaEnvelope className="input-icon" />
                        <Form.Control type="email" placeholder="correo@ejemplo.com" className="ps-5" />
                    </div>
                  </Form.Group>
                  <Form.Group className="mb-4" controlId="formConsulta">
                    <Form.Label className="fw-semibold">Consulta</Form.Label>
                    <Form.Control 
                        as="textarea" 
                        rows={3} 
                        placeholder="Mensaje" 
                    />
                  </Form.Group>
                </Form>
                <Button variant="primary" className="w-100 py-2 fw-bold btn-custom">
                  Enviar
                </Button>

              </Card.Body>
            </Card>
          </article>
             <h2><strong>SEGUIME EN INSTAGRAM:<a href="https://www.instagram.com/flex_studioc/" target="_blank" className='link'> @FLEX_STUDIOC</a></strong></h2>
        </section>
      </main>
    </>
  )
}

export default HomePage;