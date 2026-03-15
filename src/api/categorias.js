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
        // 👇 Le avisamos a Axios que enviaremos un formulario con archivos 👇
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