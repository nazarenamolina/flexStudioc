import { Button, Container, Form, Nav, Navbar, NavDropdown, Offcanvas } from "react-bootstrap";
import "../styles/headerComponent.css";
import imagenMap from '../assets/ImagenMap.js';
import {ShoppingCart, CircleUser} from "lucide-react";

function HeaderComponent() {

  return (
    <>
       <Navbar expand="lg" fixed="top" className="custom-navbar">
          <Container fluid>
            <Navbar.Brand href="/"><img src={imagenMap.Logo} className='logo' alt="Logo" width={100}/>Flex Studio
            </Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand`}
              aria-labelledby={`offcanvasNavbarLabel-expand`}
              placement="end">
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand`}>
                  Flex Studio
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <NavDropdown
                    title="Clases"
                    id={`offcanvasNavbarDropdown-expand`}>
                    <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                    <NavDropdown.Item href="#action4">
                      Another action
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action5">
                      Something else here
                    </NavDropdown.Item>
                  </NavDropdown>
                  <Nav.Link href="#action1"><CircleUser />Login</Nav.Link>
                  <Nav.Link href="#action2">Registrate</Nav.Link>
                        <Nav.Link href="#action1">Carrito<ShoppingCart />
                        </Nav.Link>
                </Nav>
                <Form className="d-flex">
                  <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                  />
                  <Button variant="outline-success">Search</Button>
                </Form>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
      </Navbar>
    </>
  );
}

export default HeaderComponent;