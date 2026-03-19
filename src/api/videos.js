import axios from './axios'; 

export const obtenerTodosLosVideosRequest = async () => {
    return await axios.get('/videos');
};
export const obtenerVideoPorIdRequest = async (id) => {
    return await axios.get(`/videos/${id}`);
};
export const obtenerVideosPorCategoriaRequest = async (idCategoria) => {
    return await axios.get(`/videos/categoria/${idCategoria}`);
};
export const subirVideoRequest = async (formData) => {
    return await axios.post('/videos', formData);
};
export const eliminarVideoRequest = async (id) => {
    return await axios.delete(`/videos/${id}`);
};
export const actualizarVideoRequest = async (id, datos) => {
    return await axios.patch(`/videos/${id}`, datos);
};