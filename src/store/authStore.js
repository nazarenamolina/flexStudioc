import { create } from 'zustand';
import { persist } from 'zustand/middleware'; 

export const useAuthStore = create(
  persist(
    (set) => ({
      usuario: null,
      estaAutenticado: false,
      iniciarSesion: (datosUsuario) => set({
        usuario: datosUsuario,
        estaAutenticado: true
      }),

      cerrarSesion: () => set({
        usuario: null,
        estaAutenticado: false
      }),
    }),
    {
      name: 'flex-studio-auth', 
    }
  )
);