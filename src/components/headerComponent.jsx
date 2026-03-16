import { Button, Container, Form, Nav, Navbar, NavDropdown, Offcanvas } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../styles/headerComponent.css";
import imagenMap from '../assets/ImagenMap.js';
import { ShoppingCart, CircleUser, Search, LogOut } from "lucide-react";
import { useAuthStore } from "../store/authStore";


function HeaderComponent() {

  const { usuario, estaAutenticado, cerrarSesion } = useAuthStore()
  const navigate = useNavigate();

  const handleLogout = () => {
    cerrarSesion();
    navigate("/login");
  }

  return (
    <>
      <Navbar expand="lg" fixed="top" className="custom-navbar bg-white shadow-sm">
        <Container fluid>

          <Navbar.Brand href="/">
            <img src={imagenMap.Logo} className='logo' alt="Logo" />
          </Navbar.Brand>

          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-lg`} className="border-0" />

          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-lg`}
            aria-labelledby={`offcanvasNavbarLabel-expand-lg`}
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-lg`}>
                <img src={imagenMap.Logo} className='logo' alt="Logo" />
              </Offcanvas.Title>
            </Offcanvas.Header>

            <Offcanvas.Body>
              <div className="d-flex flex-column flex-lg-row justify-content-end align-items-lg-center flex-grow-1 gap-3">

                <Nav className="align-items-center gap-3 gap-lg-4 mb-3 mb-lg-0">
                  <NavDropdown
                    title="Clases"
                    id={`offcanvasNavbarDropdown-expand-lg`}
                    className="custom-dropdown"
                  >
                    <NavDropdown.Item href="/deportistas">Deportistas</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="/progresivas">Progresivas Generales</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="/gimnastas">Gimnastas</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="/acrobatas">Acróbatas</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="/bailarinas">Bailarinas</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="/patinadoras">Patinadoras</NavDropdown.Item>
                  </NavDropdown>
                  {estaAutenticado ? (
                    // Si el usuario ESTÁ logueado, mostramos su nombre y un menú
                    <NavDropdown
                      title={<span><CircleUser size={23} className="me-1" /> Hola, {usuario?.nombre}</span>}id="usuario-dropdown" className="custom-dropdown">
                      <NavDropdown.Item href="/mi-perfil">Mi Perfil</NavDropdown.Item>
                      {usuario?.rol === "ADMIN" && (
                        <NavDropdown.Item href="/admin">Panel de Admin</NavDropdown.Item>
                      )}
                      <NavDropdown.Divider />
                  
                      <NavDropdown.Item onClick={handleLogout} className="text-danger">
                        <LogOut size={16} className="me-2"/> Cerrar Sesión
                      </NavDropdown.Item>
                    </NavDropdown>
                  ) : (
                    <>
                      <Nav.Link href="/login" className="d-flex align-items-center">
                        <CircleUser size={20} className="me-2" /> Login
                      </Nav.Link>
                      <Nav.Link href="/registro">Registrate</Nav.Link>
                    </>
                  )}

                  <Nav.Link href="/carrito" className="d-flex align-items-center">
                    Carrito <ShoppingCart size={20} className="ms-2" />
                  </Nav.Link>
                </Nav>

                <Form className="d-flex search-form" role="search">
                  <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-0 search-input"
                    aria-label="Search"
                  />
                  <Button variant="link" className="search-btn">
                    <Search size={20} />
                  </Button>
                </Form>

              </div>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
}

export default HeaderComponent;