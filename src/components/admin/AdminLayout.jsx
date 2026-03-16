import { Outlet, useNavigate, NavLink } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import { logoutRequest } from "../../api/auth";
import {
  LayoutDashboard,
  Users,
  Tags,
  Video,
  LogOut,
} from "lucide-react";
import "../../styles/admin/adminLayout.css";
import { Navbar} from "react-bootstrap";

const AdminLayout = () => {
  const navigate = useNavigate();
  const usuario = useAuthStore((state) => state.usuario);
  const cerrarSesion = useAuthStore((state) => state.cerrarSesion);

  const handleLogout = async () => {
    try {
      await logoutRequest();
      cerrarSesion();
      navigate("/login");
    } catch (error) {
      console.error("Error al cerrar sesión", error);
    }
  };

  return (
    <div className="admin-layout-container">
      <aside className="sidebar">
          <Navbar.Brand href="/" className="sidebar-header">
          <img
            src="https://res.cloudinary.com/dmp7mcwie/image/upload/v1773614067/logofooter_sctdgg.png"
            className="logo-placeholder"
            alt="Logo"
          /> </Navbar.Brand>
        <nav className="sidebar-nav">
          <ul>
            <li>
              <NavLink
                to="/admin"
                end
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                <LayoutDashboard size={20} />
                <span>Dashboard</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/clientes"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                <Users size={20} />
                <span>Clientes</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/categorias"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                <Tags size={20} />
                <span>Categorías</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/videos"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                <Video size={20} />
                <span>Videos</span>
              </NavLink>
            </li>
          </ul>
        </nav>

        <div className="sidebar-footer">
          <div className="user-profile">
            <div className="avatar-placeholder">
              {usuario?.nombre?.charAt(0).toUpperCase() || "A"}
            </div>
            <div className="user-info">
              <span className="user-name">
                {usuario?.nombre} {usuario?.apellido}
              </span>
              <span className="user-role">{usuario?.rol || "Super Admin"}</span>
            </div>

            <button
              className="btn-logout"
              onClick={handleLogout}
              title="Cerrar sesión"
            >
              <LogOut size={20} color="#dc3545" />
            </button>
          </div>
        </div>
      </aside>

      <main className="main-contentSideBar">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
