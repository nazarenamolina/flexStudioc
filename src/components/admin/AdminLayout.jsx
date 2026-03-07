// 1. Añadimos NavLink a la importación
import { Outlet, useNavigate, NavLink } from 'react-router-dom'; 
import { useAuthStore } from '../../store/authStore';
import { logoutRequest } from '../../api/auth';
import { LayoutDashboard, Users, Tags, Video, PlusCircle, LogOut } from 'lucide-react';
import '../../styles/admin/adminLayout.css';

const AdminLayout = () => {
    const navigate = useNavigate();
    const usuario = useAuthStore((state) => state.usuario);
    const cerrarSesion = useAuthStore((state) => state.cerrarSesion);

    const handleLogout = async () => {
        try {
            await logoutRequest();
            cerrarSesion(); 
            navigate('/login');
        } catch (error) {
            console.error('Error al cerrar sesión', error);
        }
    };

    return (
        <div className="admin-layout-container">
            <aside className="sidebar">
                
                <div className="sidebar-header">
                    <div className="logo-placeholder">FS</div>
                    <h2>Flex Studio</h2>
                </div>

                {/* 👇 MENÚ CON NAVLINKS 👇 */}
                <nav className="sidebar-nav">
                    <ul>
                        <li>
                            {/* 'end' asegura que solo se marque si la ruta es exactamente '/admin' */}
                            <NavLink to="/admin" end className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                                <LayoutDashboard size={20} />
                                <span>Dashboard</span>
                            </NavLink>
                        </li>
                        <li>
                            {/* Por ahora lo dejamos sin ruta real hasta que la crees */}
                            <NavLink to="/admin/clientes" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                                <Users size={20} />
                                <span>Clientes</span>
                            </NavLink>
                        </li>
                        <li>
                            {/* 👈 AQUÍ ENLAZAMOS A CATEGORÍAS */}
                            <NavLink to="/admin/categorias" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                                <Tags size={20} />
                                <span>Categorías</span>
                            </NavLink>
                        </li>
                        <li>
                            {/* Por ahora lo dejamos sin ruta real hasta que la crees */}
                            <NavLink to="/admin/videos" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                                <Video size={20} />
                                <span>Videos</span>
                            </NavLink>
                        </li>
                    </ul>
                </nav>

                <div className="sidebar-footer">
                    <div className="user-profile">
                        {/* ESPACIO PARA PONER UN AVATAR O IMAGEN DE USUARIO */}
                        <div className="avatar-placeholder">
                            {usuario?.nombre?.charAt(0).toUpperCase() || 'A'}
                        </div>
                        <div className="user-info">
                            <span className="user-name">{usuario?.nombre} {usuario?.apellido}</span>
                            <span className="user-role">{usuario?.rol || 'Super Admin'}</span>
                        </div>
                        
                        <button className="btn-logout" onClick={handleLogout} title="Cerrar sesión">
                            <LogOut size={20} color="#dc3545" />
                        </button>
                    </div>
                </div>
                
            </aside>

            <main className="main-content">
                <Outlet /> 
            </main>
        </div>
    );
};

export default AdminLayout;