import { useState } from 'react';
import { registroRequest } from '../api/auth';
import toast from 'react-hot-toast';

export const useRegistro = () => {
    const [formData, setFormData] = useState({nombre: '', apellido: '', correo: '', contrasena: '', confirmarContrasena: '',telefono: '', fechaNacimiento: '', pais: '', provincia: '', ciudad: '', direccion: '', codigoPostal: ''});
    const [mostrarContrasena, setMostrarContrasena] = useState(false); 
    const [mostrarConfirmarContrasena, setMostrarConfirmarContrasena] = useState(false); 
    const [cargando, setCargando] = useState(false);
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const toggleMostrarContrasena = () => setMostrarContrasena(!mostrarContrasena);
    const toggleMostrarConfirmarContrasena = () => setMostrarConfirmarContrasena(!mostrarConfirmarContrasena);
    const validacionesContrasena = {
        longitud: formData.contrasena.length >= 6,
        mayuscula: /[A-Z]/.test(formData.contrasena),
        minuscula: /[a-z]/.test(formData.contrasena),
        numero: /\d/.test(formData.contrasena),
        especial: /[\W_]/.test(formData.contrasena)
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setCargando(true);

        if (!formData.nombre || !formData.apellido || !formData.correo || !formData.contrasena || !formData.confirmarContrasena) {
            toast.error('Por favor, completa los campos con asterisco (*).');
            setCargando(false);
            return;
        }
        const esContrasenaValida = Object.values(validacionesContrasena).every(Boolean);
        if (!esContrasenaValida) {
            toast.error('La contraseña no cumple con todos los requisitos de seguridad.');
            setCargando(false);
            return;
        }

        if (formData.contrasena !== formData.confirmarContrasena) {
            toast.error('Las contraseñas no coinciden. Revisa bien.');
            setCargando(false);
            return;
        }

        try {
            const { confirmarContrasena, ...datosParaBackend } = formData;
            await registroRequest(datosParaBackend);
            toast.success('¡Registro exitoso! Ya puedes iniciar sesión.');
            setFormData({nombre: '', apellido: '', correo: '', contrasena: '', confirmarContrasena: '', telefono: '', fechaNacimiento: '', pais: '', provincia: '', ciudad: '', direccion: '', codigoPostal: ''});
            setMostrarContrasena(false);
            setMostrarConfirmarContrasena(false);

        } catch (err) {
            toast.error(err);
        } finally {
            setCargando(false);
        }
    };

    return {
        formData,
        handleChange,
        handleSubmit,
        mostrarContrasena,
        toggleMostrarContrasena,
        mostrarConfirmarContrasena,
        toggleMostrarConfirmarContrasena,
        cargando,
        validacionesContrasena // 👈 Exportamos el evaluador
    };
};