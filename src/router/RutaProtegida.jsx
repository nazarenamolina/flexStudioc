import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

export const RutaProtegida = () => {
  const estaAutenticado = useAuthStore((state) => state.estaAutenticado);
  if (!estaAutenticado) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
};