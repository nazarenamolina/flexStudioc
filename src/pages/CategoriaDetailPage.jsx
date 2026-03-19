import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { obtenerCategoriaPorIdRequest } from "../api/categorias";
import {
  FaPlay,
  FaVideo,
  FaHeadset,
  FaInfinity,
  FaMedal,
  FaCheckCircle,
} from "react-icons/fa";
import "../styles/categoriaDetail.css";

const CategoriaDetailPage = () => {
  const { id } = useParams();
  const [categoria, setCategoria] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cargarDetalle = async () => {
      try {
        const data = await obtenerCategoriaPorIdRequest(id);
        setCategoria(data);
      } catch (err) {
        setError("No se pudo encontrar la información de esta clase.");
      } finally {
        setCargando(false);
      }
    };
    cargarDetalle();
  }, [id]);

  if (cargando)
    return <div className="ps-loading">Cargando la masterclass...</div>;
  if (error) return <div className="ps-error">{error}</div>;
  if (!categoria) return null;

  // Para simular el título en dos partes como en la imagen ("POLE SPORT" "MASTERCLASS")
  const tituloPartes = categoria.titulo
    ? categoria.titulo.split(" ")
    : ["CLASE", "EXCLUSIVA"];
  const primeraParte = tituloPartes
    .slice(0, Math.ceil(tituloPartes.length / 2))
    .join(" ");
  const segundaParte = tituloPartes
    .slice(Math.ceil(tituloPartes.length / 2))
    .join(" ");

  return (
    <>
      <main className="ps-page-container">
        <section className="contenedorImg">
            <img src={categoria.imagenUrl} className="imgbanner"/>
          <div className="titulo">
            <span className="ps-badge">ELITE TRAINING PROGRAM</span>
            <h1 className="titulo-superpuesto">
              <span className="texto-cursiva">{primeraParte}</span>
              <br />
              <span className="texto-principal">{segundaParte}</span>
            </h1>
            <p className="ps-description">{categoria.descripcion}</p>
            <div className="ps-hero-actions">
              <button className="ps-btn-primary">
                COMPRAR AHORA ${categoria.precio}
              </button>
              <button className="ps-btn-secondary">VIEW TRAILER</button>
            </div>
          </div>
        </section>
        <section className="ps-features">
          <div className="ps-features-text">
            <span className="ps-badge">SUMATE!</span>
            <h2>
              QUÉ INCLUYE LA
              <br />
              SUSCRIPCIÓN?
            </h2>
            <p>
              Durante el programa vas a potenciar tu fuerza, flexibilidad y resistencia de forma integral. Mi objetivo es que logres una coordinación y técnica impecables, siempre desde un enfoque consciente y sostenible para tu cuerpo.
            </p>
          </div>
          <div className="ps-features-grid">
            <div className="ps-feature-card">
              <FaVideo className="ps-feature-icon" />
              <h3>Video - lecciones en alta definición</h3>
              <p>
                Step-by-step 4K tutorials focusing on biomechanics and artistry.
              </p>
            </div>
            <div className="ps-feature-card">
              <FaHeadset className="ps-feature-icon" />
              <h3>Soporte personalizado</h3>
              <p>
                Direct access to elite coaches for form correction and feedback.
              </p>
            </div>
            <div className="ps-feature-card">
              <FaInfinity className="ps-feature-icon" />
              <h3>Acceso de por vida</h3>
              <p>
                Learn at your own pace with permanent access to the curriculum.
              </p>
            </div>
            <div className="ps-feature-card">
              <FaMedal className="ps-feature-icon" />
              <h3>Certificado al finalizar</h3>
              <p>
                Formal recognition of your technical proficiency in Pole Sport.
              </p>
            </div>
          </div>
        </section>
        <section className="ps-preview">
          <span className="ps-badge">PREVIEW</span>
          <h2>VIDEO DE MUESTRA</h2>
          <div className="ps-video-player">
            {/* Aquí iría la etiqueta <video> real, usando un div de placeholder por ahora */}
            <div className="ps-video-placeholder">
              <button className="ps-play-btn">
                <FaPlay />
              </button>
              <div className="ps-video-controls">
                <div className="ps-progress-bar">
                  <div className="ps-progress-fill"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="ps-cta">
          <h2>
            LISTA PARA ELEVAR TU <br />
            POTENCIAL?
          </h2>
          <div className="ps-pricing-card">
            <span className="ps-offer-badge">OFERTA DE LANZAMIENTO</span>
            <div className="ps-price">${categoria.precio}</div>
            <button className="btnCompra">
              COMPRAR AHORA
            </button>
          </div>
          <div className="ps-guarantees">
            <span>
              <FaCheckCircle className="ps-icon-small" /> SECURE PAYMENT
            </span>
            <span>
              <FaCheckCircle className="ps-icon-small" /> INSTANT ACCESS
            </span>
            <span>
              <FaCheckCircle className="ps-icon-small" /> 30-DAY GUARANTEE
            </span>
          </div>
        </section>
      </main>
    </>
  );
};

export default CategoriaDetailPage;
