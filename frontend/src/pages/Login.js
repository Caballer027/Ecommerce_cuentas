import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState(''); // Cambiar a username
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/token/', {
                username, // Ahora usa username
                password,
            });
            localStorage.setItem('token', response.data.access);
            alert('Login exitoso');
            window.location.href = '/dashboard';
        } catch (error) {
            alert('Error en el login: Credenciales inválidas.');
        }
    };

    return (
        <div className="login-page d-flex justify-content-center align-items-center vh-100">
            <div className="card p-4 shadow-sm">
                <h2 className="text-center mb-4">Iniciar Sesión</h2>
                <form onSubmit={handleLogin}>
                    <div className="form-group mb-3">
                        <label htmlFor="username">Nombre de Usuario</label>
                        <input
                            type="text"
                            id="username"
                            className="form-control"
                            placeholder="Ingresa tu nombre de usuario"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)} // Cambiar a username
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
                    <button type="submit" className="btn btn-primary w-100">
                        Ingresar
                    </button>
                </form>
                <p className="text-center mt-3">
                    ¿No tienes una cuenta?{' '}
                    <Link to="/register" className="text-primary">
                        Regístrate aquí
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
