import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { crearCategoriaRequest } from '../../api/categorias'; // 👈 Asegúrate de que esta ruta sea correcta
import '../../styles/admin/categoriaEditor.css'; 

const CategoriaEditorPage = () => {
  const navigate = useNavigate();
  const [subiendo, setSubiendo] = useState(false);

  // --- 1. ESTADO INICIAL (Limpio y listo para cargar) ---
  const [borrador, setBorrador] = useState({
    titulo: '',
    subtituloRosa: '', 
    descripcionCard:'',
    descripcionBreve: '',
    descripcionDetallada: '',
    precio: 0,
    beneficios: [],
    // Archivos reales para mandar al backend
    archivoHero: null,
    archivoTarjeta: null,
    archivoVideoMuestra: null, 
    // URLs temporales para ver en tiempo real sin subir a internet
    imagenHeroPrevia: '',
    imagenTarjetaPrevia: '',
    videoMuestraPrevia: '' 
  });

  // --- 2. MANEJADORES DE TEXTO Y ARCHIVOS ---
  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setBorrador({ ...borrador, [name]: value });
  };

  const manejarArchivo = (e, tipo) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setBorrador({
        ...borrador,
        [`archivo${tipo}`]: file,
        [tipo === 'VideoMuestra' ? 'videoMuestraPrevia' : `imagen${tipo}Previa`]: previewUrl
      });
    }
  };

  // --- 3. GESTOR DE BENEFICIOS ---
  const agregarBeneficio = () => {
    setBorrador({
      ...borrador,
      beneficios: [...borrador.beneficios, { id: Date.now(), titulo: '', descripcion: '' }]
    });
  };

  const actualizarBeneficio = (id, campo, valor) => {
    const nuevosBeneficios = borrador.beneficios.map(b => 
      b.id === id ? { ...b, [campo]: valor } : b
    );
    setBorrador({ ...borrador, beneficios: nuevosBeneficios });
  };

  const eliminarBeneficio = (id) => {
    setBorrador({
      ...borrador,
      beneficios: borrador.beneficios.filter(b => b.id !== id)
    });
  };

  // --- 4. ENVÍO AL BACKEND ---
  const handleGuardarCategoria = async () => {
    // Validación básica para no enviar basura al backend
    if (!borrador.titulo || !borrador.archivoHero || !borrador.archivoTarjeta) {
      alert("⚠️ El título y las dos imágenes (Fondo y Miniatura) son obligatorios.");
      return;
    }

    try {
      setSubiendo(true);
      const formData = new FormData();
      
      // Unimos el título blanco con el rosa (Ej: "POLE SPORT | MASTERCLASS")
      const tituloFinal = borrador.subtituloRosa ? `${borrador.titulo} | ${borrador.subtituloRosa}` : borrador.titulo;

      // Adjuntamos los textos
      formData.append('titulo', tituloFinal);
      formData.append('descripcionCard', borrador.descripcionCard);
      formData.append('descripcionBreve', borrador.descripcionBreve);
      formData.append('descripcionDetallada', borrador.descripcionDetallada);
      formData.append('precio', borrador.precio);

      // Limpiamos los IDs temporales de los beneficios y los pasamos a texto JSON
      const beneficiosLimpios = borrador.beneficios.map(({ titulo, descripcion }) => ({ titulo, descripcion }));
      formData.append('beneficios', JSON.stringify(beneficiosLimpios));

      // Adjuntamos los 3 archivos pesados
      formData.append('imagenHero', borrador.archivoHero);
      formData.append('imagenTarjeta', borrador.archivoTarjeta);
      if (borrador.archivoVideoMuestra) {
        formData.append('videoMuestra', borrador.archivoVideoMuestra);
      }

      // Disparamos la petición a la API
      await crearCategoriaRequest(formData);
      
      alert('✅ ¡Categoría publicada con éxito!');
      navigate('/admin/categorias'); // Volvemos a la tabla
      
    } catch (error) {
      console.error("Error al guardar:", error);
      alert('❌ Hubo un error al guardar la categoría. Revisa la consola para más detalles.');
    } finally {
      setSubiendo(false); // Apagamos el estado de carga sin importar qué pase
    }
  };

  return (
    <div className="contenedor-editor-pantalla-dividida">
      
      {/* ==========================================
          LADO IZQUIERDO: CONTROLES DE EDICIÓN 
          ========================================== */}
      <aside className="panel-controles-izquierdo">
        <h2 className="titulo-editor">Crear Nueva Disciplina</h2>
        
        <div className="grupo-formulario">
          <label>Título Principal</label>
          <input type="text" name="titulo" value={borrador.titulo} onChange={manejarCambio} className="input-editor" placeholder="Ej: POLE SPORT" />
        </div>
        
        <div className="grupo-formulario">
          <label>Subtítulo (Resaltado en Rosa)</label>
          <input type="text" name="subtituloRosa" value={borrador.subtituloRosa} onChange={manejarCambio} className="input-editor" placeholder="Ej: MASTERCLASS" />
        </div>
        
        <div className="grupo-formulario">
            <label>Precio ($ USD)</label>
            <input type="number" name="precio" value={borrador.precio} onChange={manejarCambio} className="input-editor" />
        </div>

         <div className="grupo-formulario">
          <label>Descripción para la tarjeta de inicio</label>
          <textarea name="descripcionCard" value={borrador.descripcionCard} onChange={manejarCambio} className="input-editor" rows="2" placeholder="Un gancho comercial corto..." />
        </div>
        
        <div className="grupo-formulario">
          <label>Descripción Breve (Para el Hero)</label>
          <textarea name="descripcionBreve" value={borrador.descripcionBreve} onChange={manejarCambio} className="input-editor" rows="2" placeholder="Un gancho comercial corto..." />
        </div>
        
        <div className="grupo-formulario">
          <label>Descripción Detallada (Página general)</label>
          <textarea name="descripcionDetallada" value={borrador.descripcionDetallada} onChange={manejarCambio} className="input-editor" rows="4" placeholder="Explica en detalle de qué trata..." />
        </div>

        <hr className="divisor-editor" />

        <div className="grupo-formulario">
          <label>Imagen de Fondo (Banner Gigante) *</label>
          <input type="file" accept="image/*" onChange={(e) => manejarArchivo(e, 'Hero')} className="input-editor" />
        </div>
        
        <div className="grupo-formulario">
          <label>Imagen de Tarjeta (Miniatura Home) *</label>
          <input type="file" accept="image/*" onChange={(e) => manejarArchivo(e, 'Tarjeta')} className="input-editor" />
        </div>
        
        <div className="grupo-formulario">
          <label>Video de Muestra (Tráiler)</label>
          <input type="file" accept="video/*" onChange={(e) => manejarArchivo(e, 'VideoMuestra')} className="input-editor" />
        </div>

        <hr className="divisor-editor" />

        {/* Gestor de Beneficios */}
        <div className="editor-beneficios">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <label>Lo que incluye (Beneficios)</label>
            <button onClick={agregarBeneficio} className="btn-agregar-beneficio">+ Añadir</button>
          </div>
          
          {borrador.beneficios.map((beneficio) => (
            <div key={beneficio.id} className="tarjeta-beneficio-editor">
              <input 
                type="text" 
                placeholder="Ej: Certificado al finalizar" 
                value={beneficio.titulo}
                onChange={(e) => actualizarBeneficio(beneficio.id, 'titulo', e.target.value)}
                className="input-editor mb-2"
              />
              <textarea 
                placeholder="Descripción del beneficio..."
                value={beneficio.descripcion}
                onChange={(e) => actualizarBeneficio(beneficio.id, 'descripcion', e.target.value)}
                className="input-editor"
                rows="2"
              />
              <button onClick={() => eliminarBeneficio(beneficio.id)} className="btn-eliminar-beneficio">Eliminar</button>
            </div>
          ))}
        </div>

        <button 
          className="btn-guardar-gigante" 
          onClick={handleGuardarCategoria} 
          disabled={subiendo}
        >
          {subiendo ? 'SUBIENDO DATOS...' : 'PUBLICAR CATEGORÍA'}
        </button>
      </aside>

      {/* ==========================================
          LADO DERECHO: VISTA PREVIA EN VIVO
          ========================================== */}
      <main className="panel-vista-previa-derecho">
        
        {/* HERO */}
        <section 
          className="previa-hero-seccion" 
          style={{ 
            backgroundImage: borrador.imagenHeroPrevia ? `url(${borrador.imagenHeroPrevia})` : 'none',
            backgroundColor: borrador.imagenHeroPrevia ? 'transparent' : '#1a1a1a' 
          }}
        >
          <div className="previa-hero-capa-oscura"></div>
          <div className="previa-contenido-hero">
            <span className="previa-etiqueta">ELITE TRAINING PROGRAM</span>
            <h1 className="previa-titulo-principal">
              {borrador.titulo || 'TÍTULO'} <br />
              <span>{borrador.subtituloRosa || 'SUBTÍTULO'}</span>
            </h1>
            <p className="previa-descripcion-breve">
              {borrador.descripcionBreve || 'La descripción breve aparecerá aquí...'}
            </p>
            <button className="previa-precio-boton">
              COMPRAR AHORA ${borrador.precio || '0.00'}
            </button>
          </div>
        </section>

        {/* DESCRIPCIÓN DETALLADA */}
        {borrador.descripcionDetallada && (
          <section className="previa-descripcion-larga">
            <h3>Acerca de esta disciplina</h3>
            <p>{borrador.descripcionDetallada}</p>
          </section>
        )}

        {/* BENEFICIOS */}
        {borrador.beneficios.length > 0 && (
          <section className="previa-beneficios-seccion">
            <div className="previa-beneficios-header">
              <span className="previa-etiqueta">EXCLUSIVE ACCESS</span>
              <h2>QUÉ INCLUYE LA<br/>SUSCRIPCIÓN?</h2>
            </div>
            <div className="previa-grilla-beneficios">
              {borrador.beneficios.map((b) => (
                <div key={b.id} className="previa-tarjeta-beneficio">
                  <div className="icono-rosa">✦</div> 
                  <h4>{b.titulo || 'Beneficio'}</h4>
                  <p>{b.descripcion || 'Detalle...'}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* VIDEO DE MUESTRA */}
        {borrador.videoMuestraPrevia && (
          <section className="previa-video-muestra-seccion">
            <span className="previa-etiqueta">PREVIEW PERFORMANCE</span>
            <h2>VIDEO DE MUESTRA</h2>
            <div className="contenedor-mux-previa">
              <video 
                src={borrador.videoMuestraPrevia} 
                controls 
                style={{ width: '100%', aspectRatio: '16/9', borderRadius: '8px', outline: 'none', backgroundColor: '#000' }}
              />
            </div>
          </section>
        )}

      </main>
    </div>
  );
};

export default CategoriaEditorPage;