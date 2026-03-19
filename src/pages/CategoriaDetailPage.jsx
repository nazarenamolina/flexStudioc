import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { obtenerCategoriaPorIdRequest } from '../api/categorias';
import { FaArrowLeft, FaPlayCircle } from 'react-icons/fa';
// 👇 1. Importamos MuxPlayer
import MuxPlayer from '@mux/mux-player-react';
import '../styles/categoriaDetail.css';

const CategoriaDetailPage = () => {
    // 1. Extraemos el ID de la URL
    const { id } = useParams();

    // 2. Estados
    const [categoria, setCategoria] = useState(null);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    // 3. Traer los datos al montar el componente
    useEffect(() => {
        const cargarDetalle = async () => {
            try {
                // Aquí usamos tu función limpia de la API de categorías
                const data = await obtenerCategoriaPorIdRequest(id);
                setCategoria(data);
            } catch (err) {
                setError('No se pudo encontrar la información de esta clase.');
            } finally {
                setCargando(false);
            }
        };
        cargarDetalle();
    }, [id]);

    if (cargando) return <div className="cd-loading">Cargando detalles de la clase...</div>;
    if (error) return <div className="cd-error">{error}</div>;
    if (!categoria) return null;

    return (
        <main className="cd-main-container">
            {/* --- SECCIÓN HERO (Cabecera) --- */}
            <section
                className="cd-hero-section"
                style={{ backgroundImage: `url(${categoria.imagenUrl || 'https://via.placeholder.com/1200x400'})` }}
            >
                <div className="cd-hero-overlay"></div>
                <div className="cd-hero-content">
                    <Link to="/" className="cd-btn-volver">
                        <FaArrowLeft /> Volver al inicio
                    </Link>
                    <span className="cd-badge">PLAN MENSUAL</span>
                    <h1 className="cd-title">{categoria.titulo}</h1>
                    <p className="cd-description">{categoria.descripcion}</p>
                    <div className="cd-price-tag">
                        ${categoria.precio} <span className="cd-price-month">/ mes</span>
                    </div>
                    <button className="cd-btn-comprar">Inscribirme ahora</button>
                </div>
            </section>

            {/* --- SECCIÓN DE VIDEOS --- */}
            <section className="cd-videos-section">
                <h2 className="cd-section-title">Contenido de la disciplina</h2>
                <p className="cd-section-subtitle">Lo que vas a encontrar al suscribirte a este plan.</p>

                {categoria.videos && categoria.videos.length > 0 ? (
                    <div className="cd-videos-grid">
                        {categoria.videos.map((video, index) => {

                            return (
                                <div key={video.id} className="cd-video-card">

                                    {/* 👇 REPRODUCTOR DE MUX 👇 */}
                                    <div
                                        className="cd-video-thumbnail"
                                        style={{
                                            padding: 0,
                                            overflow: 'hidden',
                                            backgroundColor: '#000',
                                            position: 'relative',
                                            paddingTop: '56.25%' // Mantiene ratio 16:9
                                        }}
                                    >
                                        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
                                            {/* MuxPlayer reemplaza el viejo ReactPlayer */}
                                            <MuxPlayer
                                                playbackId={video.playbackId}
                                                metadataVideoTitle={video.titulo}
                                                primaryColor="#D4F85E" // Color verde lima
                                                style={{ width: '100%', height: '100%' }}
                                            />
                                        </div>
                                    </div>
                                    {/* 👆 FIN DEL REPRODUCTOR 👆 */}

                                    <div className="cd-video-info">
                                        <span className="cd-video-number">Clase {index + 1}</span>
                                        <h4 className="cd-video-title">{video.titulo}</h4>
                                        <p className="cd-video-duration">Duración: {video.duracion || 'N/A'} min</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="cd-empty-videos">
                        <FaPlayCircle size={40} color="#ccc" />
                        <p>Aún no hay videos subidos para esta categoría.</p>
                        <span>¡Pronto agregaremos nuevo contenido!</span>
                    </div>
                )}
            </section>
        </main>
    );
};

export default CategoriaDetailPage;