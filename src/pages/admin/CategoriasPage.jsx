import { useState, useEffect } from 'react';
// 👇 Importamos Image como ImageIcon para que no haya conflictos de nombres
import { Search, Bell, HelpCircle, ChevronRight, Plus, Info, X, Image as ImageIcon } from 'lucide-react';
import { obtenerCategoriasRequest, crearCategoriaRequest } from '../../api/categorias';
import toast, { Toaster } from 'react-hot-toast';
import '../../styles/admin/categoriasPage.css';

const CategoriasPage = () => {
    const [categorias, setCategorias] = useState([]);
    const [cargando, setCargando] = useState(true);
    
    // 👇 ESTADOS PARA EL MODAL DE CREACIÓN 👇
    const [mostrarModal, setMostrarModal] = useState(false);
    const [cargandoEnvio, setCargandoEnvio] = useState(false);
    
    // 1. Añadimos un estado especial para el archivo de la foto
    const [imagenFile, setImagenFile] = useState(null);
    const [formData, setFormData] = useState({
        titulo: '',
        descripcion: '',
        precio: ''
    });

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

    useEffect(() => {
        cargarCategorias();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // 2. ENVIAR LOS DATOS Y LA IMAGEN AL BACKEND
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!formData.titulo || !formData.precio) {
            toast.error('El título y el precio son obligatorios.');
            return;
        }

        setCargandoEnvio(true);
        try {
            // 👇 Construimos el FormData (El único formato que soporta archivos)
            const datosAEnviar = new FormData();
            datosAEnviar.append('titulo', formData.titulo);
            datosAEnviar.append('descripcion', formData.descripcion);
            datosAEnviar.append('precio', formData.precio);
            
            // Si la clienta seleccionó una foto, la adjuntamos
            if (imagenFile) {
                datosAEnviar.append('imagen', imagenFile);
            }

            const nuevaCategoria = await crearCategoriaRequest(datosAEnviar);
            
            setCategorias([...categorias, nuevaCategoria]);
            
            toast.success('¡Categoría creada con éxito!');
            setMostrarModal(false); 
            
            // Limpiamos los estados
            setFormData({ titulo: '', descripcion: '', precio: '' }); 
            setImagenFile(null); 
        } catch (error) {
            toast.error(error);
        } finally {
            setCargandoEnvio(false);
        }
    };

    const limiteAlcanzado = categorias.length >= 6;

    if (cargando) return <div style={{ padding: '40px' }}>Cargando categorías...</div>;

    return (
        <div className="contenedor-categorias">
            <Toaster position="top-right" />
            
            <div className="cabecera-principal">
                <div>
                    <h1 className="titulo-grande">Disciplinas Flex Studio</h1>
                    <p className="subtitulo">Administra las categorías de tu estudio.</p>
                </div>
                
                {!limiteAlcanzado && (
                    <button className="boton-primario" onClick={() => setMostrarModal(true)}>
                        <Plus size={20} />
                        Añadir Nueva Categoría
                    </button>
                )}
            </div>

            <div className="cuadricula-resumen">
                <div className="tarjeta-resumen">
                    <span className="etiqueta-resumen">Categorías Registradas</span>
                    <h2 className="numero-resumen">{categorias.length} / 6</h2>
                </div>
                <div className="tarjeta-resumen">
                    <span className="etiqueta-resumen">Total Videos Subidos</span>
                    <h2 className="numero-resumen">-</h2> 
                </div>
            </div>

            <div className="cuadricula-tarjetas">
                {categorias.map((cat, index) => (
                    <div key={cat.id} className="tarjeta-categoria">
                        {/* 👇 Modificamos el fondo para que muestre la foto real de Cloudinary 👇 */}
                        <div 
                            className="imagen-categoria" 
                            style={{ 
                                backgroundImage: cat.imagenUrl ? `url(${cat.imagenUrl})` : 'none',
                                backgroundColor: cat.imagenUrl ? 'transparent' : colores[index % colores.length],
                                backgroundSize: 'cover',
                                backgroundPosition: 'center'
                            }}
                        ></div>
                        <div className="info-categoria">
                            <div>
                                <h4 className="nombre-categoria">{cat.titulo}</h4>
                                <span className="videos-categoria">
                                    {cat.videos ? cat.videos.length : 0} Videos
                                </span>
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
                            <h2>Crear Nueva Categoría</h2>
                            <button className="btn-cerrar-modal" onClick={() => setMostrarModal(false)}>
                                <X size={24} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="modal-formulario">
                            <div className="form-group">
                                <label>Título de la Categoría *</label>
                                <input type="text" name="titulo" value={formData.titulo} onChange={handleChange} placeholder="Ej. Clases de Yoga" />
                            </div>

                            <div className="form-group">
                                <label>Descripción</label>
                                <textarea name="descripcion" value={formData.descripcion} onChange={handleChange} placeholder="Describe brevemente esta disciplina..." rows="3"></textarea>
                            </div>

                            <div className="form-group">
                                <label>Precio Mensual ($) *</label>
                                <input type="number" step="0.01" name="precio" value={formData.precio} onChange={handleChange} placeholder="Ej. 15000.00" />
                            </div>

                            {/* 👇 NUEVO INPUT DE ARCHIVO (IMAGEN) 👇 */}
                            <div className="form-group">
                                <label>Imagen de Portada (Opcional)</label>
                                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                                    <ImageIcon size={20} color="#888" />
                                    <input 
                                        type="file" 
                                        accept="image/*"
                                        onChange={(e) => setImagenFile(e.target.files[0])} 
                                        style={{ flex: 1, padding: '8px', cursor: 'pointer' }}
                                    />
                                </div>
                            </div>

                            <div className="modal-acciones">
                                <button type="button" className="btn-cancelar" onClick={() => setMostrarModal(false)}>
                                    Cancelar
                                </button>
                                <button type="submit" className="btn-guardar" disabled={cargandoEnvio}>
                                    {cargandoEnvio ? 'Guardando...' : 'Crear Categoría'}
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