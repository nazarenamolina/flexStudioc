import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

export const RutaAdmin = () => {
  const { estaAutenticado, usuario } = useAuthStore();
  if (!estaAutenticado) {
    return <Navigate to="/login" replace />;
  }
  if (usuario?.rol !== 'ADMIN') {
    return <Navigate to="/" replace />; 
  }
  return <Outlet />;
};