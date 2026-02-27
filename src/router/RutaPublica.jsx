import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

export const RutaPublica = () => {
  const estaAutenticado = useAuthStore((state) => state.estaAutenticado);
  if (estaAutenticado) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
};