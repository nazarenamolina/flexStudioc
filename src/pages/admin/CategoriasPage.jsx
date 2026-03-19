import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { Plus, Edit2, Trash2, ChevronRight } from 'lucide-react';
import { obtenerCategoriasRequest, eliminarCategoriaRequest } from '../../api/categorias';
import toast, { Toaster } from 'react-hot-toast';
import '../../styles/admin/categoriasPage.css';

const CategoriasPage = () => {
    const [categorias, setCategorias] = useState([]);
    const [cargando, setCargando] = useState(true);
    const navigate = useNavigate(); // 👈 Instanciamos navigate

    const colores = ['#e2ece9', '#2c524b', '#50bda4', '#d4f85e', '#f4f5f7', '#1a202c'];

    const cargarCategorias = async () => {
        try {
            const data = await obtenerCategoriasRequest();
            setCategorias(data);
        } catch (error) {
            toast.error('No se pudieron cargar las categorías.');
        } finally {
            setCargando(false);
        }
    };

    useEffect(() => { cargarCategorias(); }, []);

    const handleEliminar = async (id) => {
        if (!window.confirm('¿Estás seguro de que deseas eliminar esta categoría? Se borrarán sus imágenes y videos de la base de datos.')) return;
        
        try {
            await eliminarCategoriaRequest(id);
            setCategorias(categorias.filter(cat => cat.id !== id));
            toast.success('Categoría eliminada exitosamente');
        } catch (error) {
            toast.error('Ocurrió un error al eliminar la categoría');
        }
    };

    // Calculamos el total de videos sumando los arrays de videos de cada categoría
    const totalVideosSubidos = categorias.reduce((total, cat) => total + (cat.videos?.length || 0), 0);

    if (cargando) return <div style={{ padding: '40px' }}>Cargando categorías...</div>;

    return (
        <div className="contenedor-categorias">
            <Toaster position="top-right" />
            
            <div className="cabecera-principal">
                <div>
                    <h1 className="titulo-grande">Disciplinas Flex Studio</h1>
                    <p className="subtitulo">Administra las categorías de tu estudio.</p>
                </div>
                
                {/* 👇 Ahora este botón te lleva a la nueva pantalla dividida */}
                <button className="boton-primario" onClick={() => navigate('/admin/categorias/nueva')}>
                    <Plus size={20} /> Añadir Nueva Categoría
                </button>
            </div>

            <div className="cuadricula-resumen">
                <div className="tarjeta-resumen">
                    <span className="etiqueta-resumen">Categorías Registradas</span>
                    <h2 className="numero-resumen">{categorias.length}</h2>
                </div>
                <div className="tarjeta-resumen">
                    <span className="etiqueta-resumen">Total Videos Subidos</span>
                    {/* 👇 Ahora esto es dinámico y real */}
                    <h2 className="numero-resumen">{totalVideosSubidos}</h2> 
                </div>
            </div>

            <div className="cuadricula-tarjetas" style={{ marginTop: '30px' }}>
                {categorias.map((cat, index) => {
                    // Como en la BD guardamos "TITULO | SUBTITULO", aquí lo separamos 
                    // para mostrar solo la primera parte en la tarjeta pequeña
                    const tituloMostrar = cat.titulo.includes('|') 
                        ? cat.titulo.split('|')[0].trim() 
                        : cat.titulo;

                    return (
                        <div key={cat.id} className="tarjeta-categoria" style={{ position: 'relative' }}>
                            
                            <div style={{ position: 'absolute', top: '10px', right: '10px', display: 'flex', gap: '8px' }}>
                                {/* 👇 El botón editar te llevará a la ruta de edición (que crearemos luego) */}
                                <button onClick={() => navigate(`/admin/categorias/editar/${cat.id}`)} style={{ background: '#fff', border: 'none', padding: '6px', borderRadius: '8px', cursor: 'pointer', boxShadow: '0 2px 5px rgba(0,0,0,0.2)' }}>
                                    <Edit2 size={16} color="#333" />
                                </button>
                                <button onClick={() => handleEliminar(cat.id)} style={{ background: '#ff4d4f', border: 'none', padding: '6px', borderRadius: '8px', cursor: 'pointer', boxShadow: '0 2px 5px rgba(0,0,0,0.2)' }}>
                                    <Trash2 size={16} color="#fff" />
                                </button>
                            </div>

                            {/* 👇 Actualizamos imagenUrl a imagenTarjeta (nuestra nueva variable) */}
                            <div className="imagen-categoria" style={{ 
                                backgroundImage: cat.imagenTarjeta ? `url(${cat.imagenTarjeta})` : 'none',
                                backgroundColor: cat.imagenTarjeta ? 'transparent' : colores[index % colores.length],
                                backgroundSize: 'cover', backgroundPosition: 'center'
                            }}></div>
                            
                            <div className="info-categoria">
                                <div>
                                    <h4 className="nombre-categoria">{tituloMostrar}</h4>
                                    <span className="videos-categoria">{cat.videos ? cat.videos.length : 0} Videos</span>
                                </div>
                                <ChevronRight size={20} color="#ccc" />
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default CategoriasPage;