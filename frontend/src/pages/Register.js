import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8000/api/register/', { username, email, password });
            alert('Registro exitoso');
            window.location.href = '/';
        } catch (error) {
            alert('Error en el registro');
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
