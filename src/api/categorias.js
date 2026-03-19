import axios from './axios';

export const obtenerCategoriasRequest = async () => {
    try {
        const respuesta = await axios.get('/categorias');
        return respuesta.data;
    } catch (error) {
        throw error.response?.data?.message || 'Error al conectar con el servidor';
    }
};

export const crearCategoriaRequest = async (datosCategoria) => {
    try {
        const respuesta = await axios.post('/categorias', datosCategoria, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return respuesta.data;
    } catch (error) {
        throw error.response?.data?.message || 'Error al crear la categoría';
    }
    
};

export const actualizarCategoriaRequest = async (id, datosCategoria) => {
    try {
        const respuesta = await axios.patch(`/categorias/${id}`, datosCategoria, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        return respuesta.data;
    } catch (error) {
        throw error.response?.data?.message || 'Error al actualizar la categoría';
    }
};

export const eliminarCategoriaRequest = async (id) => {
    try {
        const respuesta = await axios.delete(`/categorias/${id}`);
        return respuesta.data;
    } catch (error) {
        throw error.response?.data?.message || 'Error al eliminar la categoría';
    }
};

export const obtenerCategoriaPorIdRequest = async (id) => {
    try {
        const respuesta = await axios.get(`/categorias/${id}`);
        return respuesta.data;
    } catch (error) {
        throw error.response?.data?.message || 'Error al cargar los detalles de la categoría';
    }
};