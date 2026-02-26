import { Link } from "react-router-dom";
import { Button, Form, InputGroup } from "react-bootstrap";
import { FaEnvelope, FaLock, FaSpa } from "react-icons/fa"; 
import "../styles/loginComponent.css";

function LoginPage() {
  return (
    <div className="login-wrapper">
      <section className="login-content">
        <article className="login-card">
          <div className="login-header">
            <div className="icon-circlelogin">
              <FaSpa size={24} />
            </div>
            <h1>Bienvenido de nuevo</h1>
            <p className="subtitle">Accede a tu panel para gestionar tus turnos y continuar tu progreso.</p>
          </div>
          <Form className="custom-form">
            <Form.Group className="mb-4" controlId="formBasicEmail">
              <Form.Label>EMAIL</Form.Label>
              <InputGroup className="custom-input-group">
                <InputGroup.Text><FaEnvelope /></InputGroup.Text>
                <Form.Control type="email" placeholder="nombre@ejemplo.com" />
              </InputGroup>
            </Form.Group>
            <Form.Group className="mb-4" controlId="formBasicPassword">
              <Form.Label>CONTRASEÑA</Form.Label>
              <InputGroup className="custom-input-group">
                <InputGroup.Text><FaLock /></InputGroup.Text>
                <Form.Control type="password" placeholder="........" />
              </InputGroup>
            </Form.Group>
            <div className="d-flex justify-content-between align-items-center mb-4 options-row">
              <Form.Group controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Recordarme" className="custom-checkbox" />
              </Form.Group>
              <Link to="/forgot-password" className="forgot-link">
                ¿Olvidaste tu contraseña?
              </Link>
            </div>
            <Button variant="primary" type="submit" className="login-btn">
              INICIAR SESIÓN
            </Button>
            <div className="form-footer mt-4">
              <p>¿Aún no tienes una cuenta? <Link to="/register" className="create-account-link">CREAR CUENTA</Link></p>
            </div>
          </Form>
        </article>
      </section>
    </div>
  );
}

export default LoginPage;
