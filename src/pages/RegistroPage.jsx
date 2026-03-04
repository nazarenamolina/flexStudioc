import { useRegistro } from '../hooks/useRegistro';
import '../styles/registroComponent.css';

const RegistroPage = () => {

  const { formData, handleChange, handleSubmit, mostrarContrasena, toggleMostrarContrasena, mostrarConfirmarContrasena, toggleMostrarConfirmarContrasena, cargando, validacionesContrasena } = useRegistro();


  return (
    <section className="registro-container">
      <h2>Crear Cuenta en Flex Studio</h2>
      <form onSubmit={handleSubmit} className="registro-form">
        <h3>Datos Personales</h3>
        <div className="form-group">
          <label htmlFor="nombre">Nombre *</label>
          <input type="text" id="nombre" name="nombre" value={formData.nombre} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="apellido">Apellido *</label>
          <input type="text" id="apellido" name="apellido" value={formData.apellido} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="correo">Correo Electrónico *</label>
          <input type="email" id="correo" name="correo" value={formData.correo} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="contrasena">Contraseña *</label>
          <div className="password-container">
            <input type={mostrarContrasena ? "text" : "password"} id="contrasena" name="contrasena" value={formData.contrasena} onChange={handleChange}
              className="input-password"/>

            <button type="button" onClick={toggleMostrarContrasena} className="btn-toggle-password">
              {mostrarContrasena ? 'Ocultar' : 'Ver'}
            </button>
            <ul className="password-rules">
              <li className={validacionesContrasena.longitud ? 'rule-pass' : 'rule-fail'}>
                {validacionesContrasena.longitud ? '✅' : '❌'} Mínimo 6 caracteres
              </li>
              <li className={validacionesContrasena.mayuscula ? 'rule-pass' : 'rule-fail'}>
                {validacionesContrasena.mayuscula ? '✅' : '❌'} Al menos una mayúscula
              </li>
              <li className={validacionesContrasena.minuscula ? 'rule-pass' : 'rule-fail'}>
                {validacionesContrasena.minuscula ? '✅' : '❌'} Al menos una minúscula
              </li>
              <li className={validacionesContrasena.numero ? 'rule-pass' : 'rule-fail'}>
                {validacionesContrasena.numero ? '✅' : '❌'} Al menos un número
              </li>
              <li className={validacionesContrasena.especial ? 'rule-pass' : 'rule-fail'}>
                {validacionesContrasena.especial ? '✅' : '❌'} Al menos un carácter especial (@, $, !, %, *, ?, &, _, -, etc.)
              </li>
            </ul>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="confirmarContrasena">Confirmar Contraseña *</label>
          <div className="password-container">
            <input
              type={mostrarConfirmarContrasena ? "text" : "password"}
              id="confirmarContrasena"
              name="confirmarContrasena"
              value={formData.confirmarContrasena}
              onChange={handleChange}
              className="input-password"
            />
            <button type="button" onClick={toggleMostrarConfirmarContrasena} className="btn-toggle-password">
              {mostrarConfirmarContrasena ? 'Ocultar' : 'Ver'}
            </button>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="telefono">Teléfono</label>
          <input type="text" id="telefono" name="telefono" value={formData.telefono} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label htmlFor="fechaNacimiento">Fecha de Nacimiento</label>
          <input type="date" id="fechaNacimiento" name="fechaNacimiento" value={formData.fechaNacimiento} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label htmlFor="pais">País</label>
          <input type="text" id="pais" name="pais" value={formData.pais} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label htmlFor="provincia">Provincia / Estado</label>
          <input type="text" id="provincia" name="provincia" value={formData.provincia} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label htmlFor="ciudad">Ciudad</label>
          <input type="text" id="ciudad" name="ciudad" value={formData.ciudad} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label htmlFor="direccion">Dirección</label>
          <input type="text" id="direccion" name="direccion" value={formData.direccion} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label htmlFor="codigoPostal">Código Postal</label>
          <input type="text" id="codigoPostal" name="codigoPostal" value={formData.codigoPostal} onChange={handleChange} />
        </div>

        <button type="submit" disabled={cargando} className="btn-submit">
          {cargando ? 'Registrando...' : 'Registrarme'}
        </button>
      </form>
    </section>
  );
};

export default RegistroPage;