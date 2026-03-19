import { useState, useEffect } from 'react';
import { Carousel, Image, Form, Card, Button, OverlayTrigger, Popover } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import imagenMap from '../assets/ImagenMap.js';
import "../styles/homePage.css";
import { FaUser, FaEnvelope, FaClock, FaArrowRight } from 'react-icons/fa';
import { obtenerCategoriasRequest } from '../api/categorias';

function HomePage() {
  const [categorias, setCategorias] = useState([]);
  const [cargando, setCargando] = useState(true);
  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const data = await obtenerCategoriasRequest();
        setCategorias(data);
      } catch (error) {
        console.error("Error al cargar las categorías:", error);
      } finally {
        setCargando(false);
      }
    };

    cargarDatos();
  }, []);

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
          <Image src={imagenMap.titulo} className='ExplorarClases' />

          <article className="articleflexible">
            {cargando ? (
              <div className="text-center w-100 my-5">
                <h4>Cargando clases disponibles...</h4>
              </div>
            ) : categorias.length === 0 ? (
              <div className="text-center w-100 my-5">
                <p>Aún no hay categorías disponibles.</p>
              </div>
            ) : (
              categorias.map((servicio) => (
                <Card key={servicio.id} className="course-card border-0 text-white">
                  <div className="card-background" style={{ backgroundImage: `url(${servicio.imagenTarjeta || 'holder.js/300x500'})` }}>
                    <div className="card-overlay"></div>
                  </div>

                  <Card.Body className="card-body p-4">
                    <div className="badge-container">
                      <span className="badge-trend">PLAN MENSUAL</span>
                      <span className="badge-time"><FaClock className="me-1" />1h 15min </span>
                    </div>
                    <div className="mt-4">
                      <Card.Title className="display-6 fw-bold mb-3 lh-1">
                        {servicio.titulo}
                      </Card.Title>
                      <div className="description-box mb-4">
                        <Card.Text className="mb-0 text-light opacity-75">
                          {servicio.descripcionCard}
                        </Card.Text>
                      </div>
                      <OverlayTrigger
                        trigger={['hover', 'focus']}
                        placement="bottom"
                        overlay={
                          <Popover id={`popover-${servicio.id}`}>
                            <Popover.Body className="popover-flex-studio">
                              ¡Diseñado para ayudarte a alcanzar tus metas! Descubre más sobre esta disciplina.
                            </Popover.Body>
                          </Popover>
                        }
                      >
                        <Button
                          as={Link}
                          to={`/categorias/${servicio.id}`}
                          className="btn-animado btn-card"
                        >
                          <span className="fw-bold texto-oculto">Ver Más</span>
                          <span className="icon-circle"><FaArrowRight /></span>
                        </Button>
                      </OverlayTrigger>
                    </div>
                  </Card.Body>
                </Card>
              ))
            )}
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