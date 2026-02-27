import axios from './axios';


export const loginRequest = (credenciales) => axios.post('/auth/login', credenciales);
export const registroRequest = (datosUsuario) => axios.post('/usuarios', datosUsuario);