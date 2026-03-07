import { Search, Bell, HelpCircle, Plus, ChevronRight } from 'lucide-react';
import '../../styles/admin/categoriasPage.css';

const CategoriasPage = () => {
    // Datos de prueba para simular la base de datos
    const categorias = [
        { id: 1, nombre: 'Yoga', totalVideos: 24, colorFondo: '#fdeee9' },
        { id: 2, nombre: 'Pilates', totalVideos: 18, colorFondo: '#f4f5f7' },
        { id: 3, nombre: 'Danza', totalVideos: 12, colorFondo: '#1a202c' },
        { id: 4, nombre: 'Cardio', totalVideos: 30, colorFondo: '#e2ece9' },
        { id: 5, nombre: 'Fuerza', totalVideos: 42, colorFondo: '#2c524b' },
        { id: 6, nombre: 'Meditación', totalVideos: 15, colorFondo: '#f4f5f7' },
        { id: 7, nombre: 'HIIT', totalVideos: 56, colorFondo: '#50bda4' },
    ];

    return (
        <div className="contenedor-categorias">
            
            {/* --- BARRA SUPERIOR (Buscador y Notificaciones) --- */}
            <header className="cabecera-top">
                <div className="titulo-seccion">
                    <h3>Gestión de Categorías</h3>
                </div>
                <div className="acciones-top">
                    <div className="caja-busqueda">
                        <Search size={18} color="#888" />
                        <input type="text" placeholder="Buscar categorías..." />
                    </div>
                    <button className="boton-icono"><Bell size={20} /></button>
                    <button className="boton-icono"><HelpCircle size={20} /></button>
                </div>
            </header>

            {/* --- CABECERA PRINCIPAL --- */}
            <div className="cabecera-principal">
                <div>
                    <h1 className="titulo-grande">Clases y Categorías</h1>
                    <p className="subtitulo">Administra y organiza las ofertas de tu estudio por tipo de entrenamiento.</p>
                </div>
                <button className="boton-primario">
                    <Plus size={20} />
                    Añadir Nueva Categoría
                </button>
            </div>

            {/* --- TARJETAS DE RESUMEN (Métricas) --- */}
            <div className="cuadricula-resumen">
                <div className="tarjeta-resumen">
                    <span className="etiqueta-resumen">Total Categorías</span>
                    <h2 className="numero-resumen">12</h2>
                </div>
                <div className="tarjeta-resumen">
                    <span className="etiqueta-resumen">Total Videos</span>
                    <h2 className="numero-resumen">284</h2>
                </div>
                <div className="tarjeta-resumen">
                    <span className="etiqueta-resumen">Usuarios Activos</span>
                    <h2 className="numero-resumen">1.2k</h2>
                </div>
            </div>

            {/* --- CUADRÍCULA DE CATEGORÍAS --- */}
            <div className="cuadricula-tarjetas">
                
                {/* Mapeamos el arreglo de categorías */}
                {categorias.map((cat) => (
                    <div key={cat.id} className="tarjeta-categoria">
                        <div 
                            className="imagen-categoria" 
                            style={{ backgroundColor: cat.colorFondo }}
                        >
                            {/* Aquí en el futuro irá la etiqueta <img /> real */}
                        </div>
                        <div className="info-categoria">
                            <div>
                                <h4 className="nombre-categoria">{cat.nombre}</h4>
                                <span className="videos-categoria">{cat.totalVideos} Videos</span>
                            </div>
                            <ChevronRight size={20} color="#ccc" />
                        </div>
                    </div>
                ))}


            </div>
        </div>
    );
};

export default CategoriasPage;