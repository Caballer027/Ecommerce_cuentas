import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const isLoggedIn = !!localStorage.getItem('token'); // Verifica si el usuario está autenticado

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/'; // Redirige al login
    };

    return (
        <header className="navbar navbar-expand-lg navbar-dark bg-primary shadow">
            <div className="container-fluid">
                {/* Logo y Título */}
                <Link to="/" className="navbar-brand d-flex align-items-center">
                    <i className="fas fa-clipboard-list fa-lg me-2"></i>
                    <span className="fs-4 fw-bold">Sistema de Gestión</span>
                </Link>

                {/* Botón de navegación responsive */}
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarContent"
                    aria-controls="navbarContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* Menú de navegación */}
                <div className="collapse navbar-collapse" id="navbarContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        {isLoggedIn ? (
                            <>
                                <li className="nav-item">
                                    <Link to="/dashboard" className="nav-link">
                                        <i className="fas fa-chart-pie me-2"></i> Dashboard
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/admin-dashboard" className="nav-link">
                                        <i className="fas fa-cogs me-2"></i> Admin Dashboard
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/notifications" className="nav-link">
                                        <i className="fas fa-bell me-2"></i> Notificaciones
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/facturas" className="nav-link">
                                        <i className="fas fa-file-invoice me-2"></i> Facturas
                                    </Link>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <Link to="/" className="nav-link">
                                        <i className="fas fa-sign-in-alt me-2"></i> Iniciar Sesión
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/register" className="nav-link">
                                        <i className="fas fa-user-plus me-2"></i> Registrarse
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>

                    {/* Información del usuario y cierre de sesión */}
                    {isLoggedIn && (
                        <div className="d-flex align-items-center">
                            <span className="badge bg-danger me-3">ADMIN</span>
                            <button className="btn btn-outline-light" onClick={handleLogout}>
                                <i className="fas fa-sign-out-alt me-2"></i> Cerrar sesión
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Navbar;
