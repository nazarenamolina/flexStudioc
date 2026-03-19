import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { obtenerCategoriaPorIdRequest } from "../api/categorias";
import MuxPlayer from "@mux/mux-player-react"; // 👈 Importamos Mux para el video
import {
  FaCheckCircle, // Usaremos este icono genérico para los beneficios dinámicos
  FaStar
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

  if (cargando) return <div className="ps-loading">Cargando la masterclass...</div>;
  if (error) return <div className="ps-error">{error}</div>;
  if (!categoria) return null;

  // 👇 LÓGICA DE TÍTULO MEJORADA: Buscamos el separador "|" que guardamos desde el Admin
  let primeraParte = "CLASE";
  let segundaParte = "EXCLUSIVA";

  if (categoria.titulo) {
    if (categoria.titulo.includes('|')) {
      const partes = categoria.titulo.split('|');
      primeraParte = partes[0].trim();
      segundaParte = partes[1].trim();
    } else {
      // Fallback por si hay categorías viejas sin el "|"
      const partes = categoria.titulo.split(" ");
      primeraParte = partes.slice(0, Math.ceil(partes.length / 2)).join(" ");
      segundaParte = partes.slice(Math.ceil(partes.length / 2)).join(" ");
    }
  }

  return (
    <>
      <main className="ps-page-container">
        
        {/* === SECCIÓN HERO === */}
        <section className="contenedorImg">
          {/* 👇 Usamos imagenHero en lugar de imagenUrl vieja */}
          <img src={categoria.imagenHero} className="imgbanner" alt={categoria.titulo} />
          
          <div className="titulo">
            <span className="ps-badge">ELITE TRAINING PROGRAM</span>
            <h1 className="titulo-superpuesto">
              <span className="texto-cursiva">{primeraParte}</span>
              <br />
              <span className="texto-principal">{segundaParte}</span>
            </h1>
            
            {/* 👇 Usamos la descripción corta */}
            <p className="ps-description">{categoria.descripcionBreve}</p>
            
            <div className="ps-hero-actions">
              <button className="ps-btn-primary">
                COMPRAR AHORA ${categoria.precio}
              </button>
              {categoria.playbackIdMuestra && (
                <button 
                  className="ps-btn-secondary" 
                  onClick={() => document.getElementById('video-muestra').scrollIntoView({ behavior: 'smooth' })}
                >
                  VIEW TRAILER
                </button>
              )}
            </div>
          </div>
        </section>


        {/* === SECCIÓN QUÉ INCLUYE (BENEFICIOS) === */}
        <section className="ps-features">
          <div className="ps-features-text">
            <span className="ps-badge">SUMATE!</span>
            <h2>
              QUÉ INCLUYE LA
              <br />
              SUSCRIPCIÓN?
            </h2>
            {/* 👇 Usamos la descripción detallada de la base de datos */}
            <p>
              {categoria.descripcionDetallada || 
                "Durante el programa vas a potenciar tu fuerza, flexibilidad y resistencia de forma integral."}
            </p>
          </div>
          
          <div className="ps-features-grid">
            {/* 👇 Renderizamos los beneficios dinámicamente con un map */}
            {categoria.beneficios && categoria.beneficios.length > 0 ? (
              categoria.beneficios.map((beneficio, index) => (
                <div key={index} className="ps-feature-card">
                  {/* Alternamos entre dos iconos para darle variedad visual */}
                  {index % 2 === 0 ? <FaCheckCircle className="ps-feature-icon" /> : <FaStar className="ps-feature-icon" />}
                  <h3>{beneficio.titulo}</h3>
                  <p>{beneficio.descripcion}</p>
                </div>
              ))
            ) : (
              <p style={{color: '#888'}}>No hay beneficios detallados para esta clase aún.</p>
            )}
          </div>
        </section>


        {/* === SECCIÓN VIDEO DE MUESTRA (MUX) === */}
        <section className="ps-preview" id="video-muestra">
          <span className="ps-badge">PREVIEW</span>
          <h2>VIDEO DE MUESTRA</h2>
          
          <div className="ps-video-player">
            {/* 👇 Magia de Mux activada */}
            {categoria.playbackIdMuestra ? (
              <MuxPlayer
                playbackId={categoria.playbackIdMuestra}
                primaryColor="#d4f85e" /* Tu color verde lima espectacular */
                style={{ width: '100%', aspectRatio: '16/9', borderRadius: '10px', overflow: 'hidden' }}
              />
            ) : (
              <div className="ps-video-placeholder" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#111', aspectRatio: '16/9' }}>
                <p style={{ color: '#666' }}>Tráiler no disponible de momento.</p>
              </div>
            )}
          </div>
        </section>


        {/* === SECCIÓN LLAMADO A LA ACCIÓN (CTA) === */}
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
            <span><FaCheckCircle className="ps-icon-small" /> SECURE PAYMENT</span>
            <span><FaCheckCircle className="ps-icon-small" /> INSTANT ACCESS</span>
            <span><FaCheckCircle className="ps-icon-small" /> 30-DAY GUARANTEE</span>
          </div>
        </section>
        
      </main>
    </>
  );
};

export default CategoriaDetailPage;