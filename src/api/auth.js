import axios from './axios';

export const loginRequest = (credenciales) => axios.post('/auth/login', credenciales);
export const registroRequest = (datosUsuario) => axios.post('/auth/registro', datosUsuario);
export const logoutRequest = () => axios.post('/auth/logout');