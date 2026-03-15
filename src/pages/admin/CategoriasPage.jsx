import { useState, useEffect } from 'react';
import { Search, Bell, HelpCircle, ChevronRight, Plus, Info, X, Image as ImageIcon, Edit2, Trash2 } from 'lucide-react';
import { obtenerCategoriasRequest, crearCategoriaRequest, actualizarCategoriaRequest, eliminarCategoriaRequest } from '../../api/categorias';
import toast, { Toaster } from 'react-hot-toast';
import '../../styles/admin/categoriasPage.css';

const CategoriasPage = () => {
    const [categorias, setCategorias] = useState([]);
    const [cargando, setCargando] = useState(true);
    
    // ESTADOS DEL MODAL
    const [mostrarModal, setMostrarModal] = useState(false);
    const [cargandoEnvio, setCargandoEnvio] = useState(false);
    const [categoriaAEditar, setCategoriaAEditar] = useState(null); 
    
    const [imagenFile, setImagenFile] = useState(null);
    const [formData, setFormData] = useState({ titulo: '', descripcion: '', precio: '' });

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

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const abrirModalCrear = () => {
        setCategoriaAEditar(null);
        setFormData({ titulo: '', descripcion: '', precio: '' });
        setImagenFile(null);
        setMostrarModal(true);
    };

    const abrirModalEditar = (categoria) => {
        setCategoriaAEditar(categoria.id);
        setFormData({
            titulo: categoria.titulo,
            descripcion: categoria.descripcion || '',
            precio: categoria.precio
        });
        setImagenFile(null); 
        setMostrarModal(true);
    };

    const handleEliminar = async (id) => {
        if (!window.confirm('¿Estás seguro de que deseas eliminar esta categoría? Esta acción no se puede deshacer.')) return;
        
        try {
            await eliminarCategoriaRequest(id);
            setCategorias(categorias.filter(cat => cat.id !== id));
            toast.success('Categoría eliminada exitosamente');
        } catch (error) {
            toast.error(error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.titulo || !formData.precio) {
            return toast.error('El título y el precio son obligatorios.');
        }

        setCargandoEnvio(true);
        try {
            const datosAEnviar = new FormData();
            datosAEnviar.append('titulo', formData.titulo);
            datosAEnviar.append('descripcion', formData.descripcion);
            datosAEnviar.append('precio', formData.precio);
            if (imagenFile) datosAEnviar.append('imagen', imagenFile);

            if (categoriaAEditar) {
                const catActualizada = await actualizarCategoriaRequest(categoriaAEditar, datosAEnviar);
                setCategorias(categorias.map(c => c.id === categoriaAEditar ? catActualizada : c));
                toast.success('¡Categoría actualizada!');
            } else {
                const nuevaCategoria = await crearCategoriaRequest(datosAEnviar);
                setCategorias([...categorias, nuevaCategoria]);
                toast.success('¡Categoría creada con éxito!');
            }
            
            setMostrarModal(false); 
        } catch (error) {
            toast.error(error);
        } finally {
            setCargandoEnvio(false);
        }
    };

    if (cargando) return <div style={{ padding: '40px' }}>Cargando categorías...</div>;

    return (
        <div className="contenedor-categorias">
            <Toaster position="top-right" />
            
            <div className="cabecera-principal">
                <div>
                    <h1 className="titulo-grande">Disciplinas Flex Studio</h1>
                    <p className="subtitulo">Administra las categorías de tu estudio.</p>
                </div>
                
                <button className="boton-primario" onClick={abrirModalCrear}>
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
                    <h2 className="numero-resumen">-</h2> 
                </div>
            </div>

            <div className="cuadricula-tarjetas" style={{ marginTop: '30px' }}>
                {categorias.map((cat, index) => (
                    <div key={cat.id} className="tarjeta-categoria" style={{ position: 'relative' }}>
                        
                        <div style={{ position: 'absolute', top: '10px', right: '10px', display: 'flex', gap: '8px' }}>
                            <button onClick={() => abrirModalEditar(cat)} style={{ background: '#fff', border: 'none', padding: '6px', borderRadius: '8px', cursor: 'pointer', boxShadow: '0 2px 5px rgba(0,0,0,0.2)' }}>
                                <Edit2 size={16} color="#333" />
                            </button>
                            <button onClick={() => handleEliminar(cat.id)} style={{ background: '#ff4d4f', border: 'none', padding: '6px', borderRadius: '8px', cursor: 'pointer', boxShadow: '0 2px 5px rgba(0,0,0,0.2)' }}>
                                <Trash2 size={16} color="#fff" />
                            </button>
                        </div>

                        <div className="imagen-categoria" style={{ 
                            backgroundImage: cat.imagenUrl ? `url(${cat.imagenUrl})` : 'none',
                            backgroundColor: cat.imagenUrl ? 'transparent' : colores[index % colores.length],
                            backgroundSize: 'cover', backgroundPosition: 'center'
                        }}></div>
                        
                        <div className="info-categoria">
                            <div>
                                <h4 className="nombre-categoria">{cat.titulo}</h4>
                                <span className="videos-categoria">{cat.videos ? cat.videos.length : 0} Videos</span>
                            </div>
                            <ChevronRight size={20} color="#ccc" />
                        </div>
                    </div>
                ))}
            </div>

            {mostrarModal && (
                <div className="modal-overlay">
                    <div className="modal-contenido">
                        <div className="modal-cabecera">
                            <h2>{categoriaAEditar ? 'Editar Categoría' : 'Crear Nueva Categoría'}</h2>
                            <button className="btn-cerrar-modal" onClick={() => setMostrarModal(false)}><X size={24} /></button>
                        </div>

                        <form onSubmit={handleSubmit} className="modal-formulario">
                            <div className="form-group">
                                <label>Título de la Categoría *</label>
                                <input type="text" name="titulo" value={formData.titulo} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label>Descripción</label>
                                <textarea name="descripcion" value={formData.descripcion} onChange={handleChange} rows="3"></textarea>
                            </div>
                            <div className="form-group">
                                <label>Precio Mensual ($) *</label>
                                <input type="number" step="0.01" name="precio" value={formData.precio} onChange={handleChange} />
                            </div>

                            <div className="form-group">
                                <label>Imagen de Portada {categoriaAEditar && '(Sube una nueva para reemplazar)'}</label>
                                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                                    <ImageIcon size={20} color="#888" />
                                    <input type="file" accept="image/*" onChange={(e) => setImagenFile(e.target.files[0])} style={{ flex: 1, padding: '8px', cursor: 'pointer' }} />
                                </div>
                            </div>

                            <div className="modal-acciones">
                                <button type="button" className="btn-cancelar" onClick={() => setMostrarModal(false)}>Cancelar</button>
                                <button type="submit" className="btn-guardar" disabled={cargandoEnvio}>
                                    {cargandoEnvio ? 'Guardando...' : (categoriaAEditar ? 'Guardar Cambios' : 'Crear Categoría')}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CategoriasPage;