import React, { useState, useEffect } from 'react';
import { FaSearch, FaCloudUploadAlt, FaEllipsisV } from 'react-icons/fa';
import { obtenerTodosLosVideosRequest, subirVideoRequest } from '../../api/videos';
import { obtenerCategoriasRequest } from '../../api/categorias';
import MuxPlayer from '@mux/mux-player-react';
import '../../styles/admin/adminVideos.css';

const AdminVideosPage = () => {
    const [videos, setVideos] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [busqueda, setBusqueda] = useState('');
    const [filtroCategoria, setFiltroCategoria] = useState('Todos los Videos');
    const [modalAbierto, setModalAbierto] = useState(false);
    const [subiendo, setSubiendo] = useState(false);
    const [nuevoVideo, setNuevoVideo] = useState({
        titulo: '',
        idCategoria: '',
        duracion: '',
        orden: '',
        archivo: null
    });

    useEffect(() => {
        cargarDatos();
    }, []);

    const cargarDatos = async () => {
        setCargando(true);
        try {
            const resVideos = await obtenerTodosLosVideosRequest();
            setVideos(resVideos.data);
            const categoriasData = await obtenerCategoriasRequest();
            setCategorias(categoriasData);

        } catch (error) {
            console.error("Error cargando datos:", error);
        } finally {
            setCargando(false);
        }
    };

    const handleArchivoChange = (e) => {
        setNuevoVideo({ ...nuevoVideo, archivo: e.target.files[0] });
    };

    const handleSubirVideo = async (e) => {
        e.preventDefault();
        if (!nuevoVideo.archivo || !nuevoVideo.titulo || !nuevoVideo.idCategoria) {
            alert("Por favor completa el título, la categoría y selecciona un archivo.");
            return;
        }

        setSubiendo(true);

        try {
            const formData = new FormData();
            formData.append('titulo', nuevoVideo.titulo);
            formData.append('idCategoria', nuevoVideo.idCategoria);
            formData.append('duracion', nuevoVideo.duracion || 0);
            formData.append('orden', nuevoVideo.orden || 1);
            formData.append('video', nuevoVideo.archivo);
            await subirVideoRequest(formData);
            alert('Video subido exitosamente');
            setModalAbierto(false);
            setNuevoVideo({ titulo: '', idCategoria: '', duracion: '', orden: '', archivo: null });
            cargarDatos();

        } catch (error) {
            console.error("Error completo:", error);
            const mensajeBackend = error.response?.data?.message || 'Error de red o del servidor';

            const mensajeFinal = Array.isArray(mensajeBackend)
                ? mensajeBackend.join('\n')
                : mensajeBackend;

            alert(`Error al subir: ${mensajeFinal}`);
        } finally {
            setSubiendo(false);
        }
    };
    const videosFiltrados = videos.filter(video => {
        const coincideBusqueda = video.titulo.toLowerCase().includes(busqueda.toLowerCase());
        const coincideCategoria = filtroCategoria === 'Todos los Videos' || video.categoria?.titulo === filtroCategoria;
        return coincideBusqueda && coincideCategoria;
    });

    return (
        <div className="contenedor-admin-videos">

            {/* CABECERA */}
            <div className="cabecera-videos">
                <div>
                    <h1 className="titulo-principal">Librería de Videos</h1>
                    <p className="subtitulo">Gestiona, organiza y publica el contenido de tus clases.</p>
                </div>
                <button className="btn-subir-nuevo" onClick={() => setModalAbierto(true)}>
                    <FaCloudUploadAlt size={20} /> Subir Nuevo Video
                </button>
            </div>

            {/* BARRA DE FILTROS */}
            <div className="barra-filtros">
                <div className="contenedor-buscador">
                    <FaSearch className="icono-buscar" />
                    <input
                        type="text"
                        placeholder="Buscar videos por título..."
                        value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)}
                        className="input-buscador"
                    />
                </div>

                {['Todos los Videos', ...categorias.map(c => c.titulo)].map(cat => (
                    <button
                        key={cat}
                        onClick={() => setFiltroCategoria(cat)}
                        className={`chip-filtro ${filtroCategoria === cat ? 'activo' : ''}`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* GRILLA DE VIDEOS */}
            {cargando ? (
                <p>Cargando librería...</p>
            ) : (
                <div className="grilla-videos">
                    {videosFiltrados.length === 0 ? (
                        <p>No se encontraron videos.</p>
                    ) : (
                        videosFiltrados.map(video => (
                            <div key={video.id} className="tarjeta-video">

                                {/* 👇 REPRODUCTOR DE MUX 👇 */}
                                <div className="miniatura-video" style={{ padding: 0, overflow: 'hidden', position: 'relative', paddingTop: '56.25%', backgroundColor: '#000' }}>

                                    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }}>
                                        {/* Usamos el playbackId que viene de la BD */}
                                        <MuxPlayer
                                            playbackId={video.playbackId}
                                            metadataVideoTitle={video.titulo}
                                            primaryColor="#D4F85E"
                                            style={{ width: '100%', height: '100%' }}
                                        />
                                    </div>

                                    {/* Etiquetas */}
                                    <span className="etiqueta-categoria" style={{ zIndex: 2, pointerEvents: 'none' }}>
                                        {video.categoria?.titulo || 'Sin categoría'}
                                    </span>
                                    <span className="etiqueta-duracion" style={{ zIndex: 2, pointerEvents: 'none' }}>
                                        {video.duracion || 0}:00
                                    </span>
                                </div>
                                {/* 👆 FIN DEL REPRODUCTOR 👆 */}

                                <div className="info-video">
                                    <div className="titulo-y-opciones">
                                        <h3 className="titulo-video">{video.titulo}</h3>
                                        <button className="btn-opciones"><FaEllipsisV /></button>
                                    </div>

                                    <p className="descripcion-video">Clase número {video.orden} del programa.</p>

                                    <div className="autor-video">
                                        <div className="avatar-autor"></div>
                                        <span className="nombre-autor">Cande Imbaud</span>
                                        <span className="fecha-publicacion">Publicado hace poco</span>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}

            {/* MODAL DE SUBIDA */}
            {modalAbierto && (
                <div className="overlay-modal">
                    <div className="contenedor-modal">
                        <h2 className="titulo-modal">Subir Nuevo Video</h2>

                        <form onSubmit={handleSubirVideo} className="formulario-subida">
                            <div className="grupo-form">
                                <label>Título de la Clase *</label>
                                <input
                                    type="text"
                                    required
                                    value={nuevoVideo.titulo}
                                    onChange={e => setNuevoVideo({ ...nuevoVideo, titulo: e.target.value })}
                                />
                            </div>

                            <div className="grupo-form">
                                <label>Categoría / Disciplina *</label>
                                <select
                                    required
                                    value={nuevoVideo.idCategoria}
                                    onChange={e => setNuevoVideo({ ...nuevoVideo, idCategoria: e.target.value })}
                                >
                                    <option value="">Selecciona una categoría...</option>
                                    {categorias.map(cat => (
                                        <option key={cat.id} value={cat.id}>{cat.titulo}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="fila-form">
                                <div className="grupo-form">
                                    <label>Duración (min)</label>
                                    <input
                                        type="number"
                                        value={nuevoVideo.duracion}
                                        onChange={e => setNuevoVideo({ ...nuevoVideo, duracion: e.target.value })}
                                    />
                                </div>
                                <div className="grupo-form">
                                    <label>N° de Orden</label>
                                    <input
                                        type="number"
                                        value={nuevoVideo.orden}
                                        onChange={e => setNuevoVideo({ ...nuevoVideo, orden: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="grupo-form archivo-upload">
                                <label>Archivo de Video (.mp4) *</label>
                                <input
                                    type="file"
                                    accept="video/mp4,video/x-m4v,video/*"
                                    required
                                    onChange={handleArchivoChange}
                                />
                            </div>

                            <div className="acciones-modal">
                                <button
                                    type="button"
                                    className="btn-cancelar"
                                    onClick={() => setModalAbierto(false)}
                                    disabled={subiendo}
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className="btn-guardar"
                                    disabled={subiendo}
                                >
                                    {subiendo ? 'Subiendo...' : 'Subir Video'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminVideosPage;