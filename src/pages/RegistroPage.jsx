import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { useRegistro } from "../hooks/useRegistro";
import imagenMap from "../assets/ImagenMap.js";
import "../styles/registroComponent.css";

const RegistroPage = () => {
  const {
    formData,
    handleChange,
    handleSubmit,
    mostrarContrasena,
    toggleMostrarContrasena,
    mostrarConfirmarContrasena,
    toggleMostrarConfirmarContrasena,
    cargando,
    validacionesContrasena,
  } = useRegistro();

  return (
    <main className="registro-wrapper">
      <section
        className="registro-image-side"
        style={{
          backgroundImage: `url(${imagenMap.fondologin || imagenMap.Banner})`,
        }}
      >
        <Link to="/" className="back-link">
          <FaArrowLeft /> VOLVER AL INICIO
        </Link>
      </section>
      <section className="registro-form-side">
        <div className="registro-form-container">
          <div className="registro-header">
            <h3>Crear Cuenta</h3>
            <p className="subtitle">
              Únete a Flex Studio y comenzá tu entrenamiento.
            </p>
          </div>
          <form onSubmit={handleSubmit} className="custom-form">
            <h3 className="section-title">Datos Personales</h3>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="nombre">NOMBRE *</label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  className="custom-input"
                  value={formData.nombre}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="apellido">APELLIDO *</label>
                <input
                  type="text"
                  id="apellido"
                  name="apellido"
                  className="custom-input"
                  value={formData.apellido}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="correo">EMAIL *</label>
              <input
                type="email"
                id="correo"
                name="correo"
                className="custom-input"
                placeholder="nombre@ejemplo.com"
                value={formData.correo}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="contrasena">CONTRASEÑA *</label>
              <div className="password-input-row">
                <input
                  type={mostrarContrasena ? "text" : "password"}
                  id="contrasena"
                  name="contrasena"
                  className="custom-input"
                  placeholder="........"
                  value={formData.contrasena}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  onClick={toggleMostrarContrasena}
                  className="btn-toggle-password"
                >
                  {mostrarContrasena ? "Ocultar" : "Ver"}
                </button>
              </div>
              <div className="password-rules-badges">
                <span
                  className={`badge-rule ${validacionesContrasena.longitud ? "met" : ""}`}
                >
                  6+ Caracteres
                </span>
                <span
                  className={`badge-rule ${validacionesContrasena.mayuscula ? "met" : ""}`}
                >
                  Mayúscula
                </span>
                <span
                  className={`badge-rule ${validacionesContrasena.minuscula ? "met" : ""}`}
                >
                  Minúscula
                </span>
                <span
                  className={`badge-rule ${validacionesContrasena.numero ? "met" : ""}`}
                >
                  Número
                </span>
                <span
                  className={`badge-rule ${validacionesContrasena.especial ? "met" : ""}`}
                >
                  carácter especial
                </span>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="confirmarContrasena">
                CONFIRMAR CONTRASEÑA *
              </label>
              <div className="password-input-row">
                <input
                  type={mostrarConfirmarContrasena ? "text" : "password"}
                  id="confirmarContrasena"
                  name="confirmarContrasena"
                  className="custom-input"
                  placeholder="........"
                  value={formData.confirmarContrasena}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  onClick={toggleMostrarConfirmarContrasena}
                  className="btn-toggle-password"
                >
                  {mostrarConfirmarContrasena ? "Ocultar" : "Ver"}
                </button>
              </div>
            </div>
            <h3 className="section-title">Datos de Contacto</h3>

            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="telefono">TELÉFONO</label>
                <input
                  type="text"
                  id="telefono"
                  name="telefono"
                  className="custom-input"
                  value={formData.telefono}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="fechaNacimiento">FECHA DE NACIMIENTO</label>
                <input
                  type="date"
                  id="fechaNacimiento"
                  name="fechaNacimiento"
                  className="custom-input"
                  value={formData.fechaNacimiento}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="pais">PAÍS</label>
                <input
                  type="text"
                  id="pais"
                  name="pais"
                  className="custom-input"
                  value={formData.pais}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="provincia">PROVINCIA / ESTADO</label>
                <input
                  type="text"
                  id="provincia"
                  name="provincia"
                  className="custom-input"
                  value={formData.provincia}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="ciudad">CIUDAD</label>
                <input
                  type="text"
                  id="ciudad"
                  name="ciudad"
                  className="custom-input"
                  value={formData.ciudad}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="codigoPostal">CÓDIGO POSTAL</label>
                <input
                  type="text"
                  id="codigoPostal"
                  name="codigoPostal"
                  className="custom-input"
                  value={formData.codigoPostal}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="direccion">DIRECCIÓN</label>
              <input
                type="text"
                id="direccion"
                name="direccion"
                className="custom-input"
                value={formData.direccion}
                onChange={handleChange}
              />
            </div>

            <button
              type="submit"
              disabled={cargando}
              className="btn-primary login-btn mt-3"
            >
              {cargando ? "REGISTRANDO..." : "CREAR CUENTA"}
            </button>

            <div className="form-footer">
              <p>
                ¿Ya tienes una cuenta?{" "}
                <Link to="/login" className="create-account-link">
                  INICIAR SESIÓN
                </Link>
              </p>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
};

export default RegistroPage;
