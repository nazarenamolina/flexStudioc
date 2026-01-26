import { Button, Container, Form, Nav, Navbar, NavDropdown, Offcanvas } from "react-bootstrap";
import "../styles/headerComponent.css";
import imagenMap from '../assets/ImagenMap.js';
import { ShoppingCart, CircleUser, Search } from "lucide-react";

function HeaderComponent() {

  return (
    <>
      <Navbar expand="lg" fixed="top" className="custom-navbar bg-white shadow-sm">
        <Container fluid>

          <Navbar.Brand href="/">
            <img src={imagenMap.Logo} className='logo' alt="Logo"/>
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
                    <NavDropdown.Item href="#action3">Deportistas</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action4">Progresivas Generales</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action3">Gimnastas</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action3">Acróbatas</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action3">Bailarinas</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action5">Patinadoras</NavDropdown.Item>
                  </NavDropdown>

                  <Nav.Link href="#login" className="d-flex align-items-center">
                    <CircleUser size={20} className="me-2" /> Login
                  </Nav.Link>
                  
                  <Nav.Link href="#registro">Registrate</Nav.Link>
                  
                  <Nav.Link href="#carrito" className="d-flex align-items-center">
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