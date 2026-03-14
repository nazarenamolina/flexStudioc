import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Form, InputGroup, Alert, Image } from "react-bootstrap";
import { FaArrowLeft, FaEnvelope, FaLock } from "react-icons/fa";
import { loginRequest } from "../api/auth";
import { useAuthStore } from "../store/authStore";
import imagenMap from '../assets/ImagenMap.js';
import "../styles/loginComponent.css";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMensaje, setErrorMensaje] = useState(null);
  const navigate = useNavigate();
  const iniciarSesion = useAuthStore((state) => state.iniciarSesion);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMensaje(null);

    try {
      const respuesta = await loginRequest({
        correo: email,
        contrasena: password
      });
      const usuarioLogueado = respuesta.data.usuario;
      iniciarSesion(usuarioLogueado);

      setTimeout(() => {
        if (usuarioLogueado.rol === 'ADMIN') {
          navigate("/admin");
        } else {
          navigate("/");
        }
      }, 100);

    } catch (error) {
      console.error("Falló el login", error);
      setErrorMensaje(
        error.response?.data?.message || "Ocurrió un error al intentar iniciar sesión."
      );
    }
  };

  return (
    <main className="login-wrapper">
      <section className="login-image-side">
        <Link to="/" className="back-link">
          <FaArrowLeft /> VOLVER AL INICIO
        </Link>
      </section>
      <section className="login-form-side">
        <article className="login-card">
          <div className="login-header">
            <h3>Bienvenido/a<br/>de nuevo</h3>
          </div>
          <Form className="custom-form" onSubmit={handleSubmit}>
            {errorMensaje && (
              <Alert variant="danger" className="text-center py-2">
                {errorMensaje}
              </Alert>
            )}
            <Form.Group className="mb-4" controlId="formBasicEmail">
              <Form.Label>EMAIL</Form.Label>
              <InputGroup className="custom-input-group">
                <InputGroup.Text><FaEnvelope /></InputGroup.Text>
                <Form.Control 
                  type="email" 
                  placeholder="nombre@ejemplo.com" 
                  required 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                />
              </InputGroup>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>CONTRASEÑA</Form.Label>
              <InputGroup className="custom-input-group">
                <InputGroup.Text><FaLock /></InputGroup.Text>
                <Form.Control 
                  type="password" 
                  placeholder="........" 
                  required 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                />
              </InputGroup>
            </Form.Group>
            <div className="d-flex justify-content-between align-items-center options-row">
              <Form.Group controlId="formBasicCheckbox">
                <Form.Check 
                  type="checkbox" 
                  label="RECORDARME" 
                  className="custom-checkbox" 
                />
              </Form.Group>
              <Link to="/forgot-password" className="forgot-link">
                ¿Olvidaste tu contraseña?
              </Link>
            </div>
            <Button variant="primary" type="submit" className="login-btn">
              INICIAR SESIÓN
            </Button>
            <div className="form-footer">
              <p>¿Aún no tenés una cuenta? <Link to="/registro" className="create-account-link">CREAR CUENTA</Link></p>
            </div>
          </Form>
        </article>
      </section>

    </main>
  );
}

export default LoginPage;