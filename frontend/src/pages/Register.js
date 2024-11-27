import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [username, setUsername] = useState('');
    const [role, setRole] = useState(''); // Estado para el rol

    const handleRegister = async (e) => {
        e.preventDefault();

        // Validar que las contraseñas coincidan
        if (password !== password2) {
            alert('Las contraseñas no coinciden.');
            return;
        }

        try {
            await axios.post('http://localhost:8000/api/register/', {
                username,
                email,
                password,
                password2,
                role,
            });
            alert('Registro exitoso, ahora puedes iniciar sesión.');
            window.location.href = '/';
        } catch (error) {
            if (error.response && error.response.data) {
                const errors = error.response.data;
                if (errors.username) {
                    alert(`Error: ${errors.username}`);
                } else if (errors.email) {
                    alert(`Error: ${errors.email}`);
                } else {
                    alert('Error: Intenta nuevamente.');
                }
            } else {
                alert('Error en el servidor.');
            }
        }
        
    };
    const verificarDisponibilidad = async (username) => {
        try {
            const response = await axios.get(`http://localhost:8000/api/verificar-username/?username=${username}`);
            return response.data.disponible;
        } catch (error) {
            console.error('Error al verificar disponibilidad:', error);
            return false;
        }
    };
    
    return (
        <div className="register-page d-flex justify-content-center align-items-center vh-100">
            <div className="card p-4 shadow-sm">
                <h2 className="text-center mb-4">Registro</h2>
                <form onSubmit={handleRegister}>
                    <div className="form-group mb-3">
                        <label htmlFor="username">Nombre de Usuario</label>
                        <input
                            type="text"
                            id="username"
                            className="form-control"
                            placeholder="Ingresa tu nombre de usuario"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="email">Correo Electrónico</label>
                        <input
                            type="email"
                            id="email"
                            className="form-control"
                            placeholder="Ingresa tu correo"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="password">Contraseña</label>
                        <input
                            type="password"
                            id="password"
                            className="form-control"
                            placeholder="Ingresa tu contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="password2">Confirma tu Contraseña</label>
                        <input
                            type="password"
                            id="password2"
                            className="form-control"
                            placeholder="Confirma tu contraseña"
                            value={password2}
                            onChange={(e) => setPassword2(e.target.value)}
                        />
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="role">Selecciona tu Rol</label>
                        <select
                            id="role"
                            className="form-control"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                        >
                            <option value="">Selecciona un rol</option>
                            <option value="Administrador">Administrador</option>
                            <option value="Contador">Contador</option>
                            <option value="Gerente">Gerente</option>
                        </select>
                    </div>
                    <button type="submit" className="btn btn-success w-100">
                        Registrar
                    </button>
                </form>
                <p className="text-center mt-3">
                    ¿Ya tienes una cuenta?{' '}
                    <Link to="/" className="text-success">
                        Inicia sesión aquí
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
