import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Facturas from './pages/Facturas';
import ClientesProveedores from './pages/ClientesProveedores';
import Home from './pages/Home';
import Navbar from './components/Navbar'; // Navbar común

// Función para proteger rutas privadas
const PrivateRoute = ({ children }) => {
    const isAuthenticated = !!localStorage.getItem('token'); // Verifica si existe un token
    return isAuthenticated ? children : <Navigate to="/" />; // Redirige al login si no está autenticado
};

const AppRoutes = () => {
    const isAuthenticated = !!localStorage.getItem('token'); // Verificar si el usuario está autenticado

    return (
        <Router>
            {/* Navbar solo para rutas privadas */}
            {window.location.pathname !== '/' && window.location.pathname !== '/register' && <Navbar />}

            <Routes>
                {/* Rutas públicas */}
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Rutas privadas */}
                <Route
                    path="/home"
                    element={
                        isAuthenticated ? <Home /> : <Navigate to="/" /> // Redirigir a login si no está autenticado
                    }
                />
                <Route
                    path="/dashboard"
                    element={
                        <PrivateRoute>
                            <Dashboard />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/facturas"
                    element={
                        <PrivateRoute>
                            <Facturas />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/clientes-proveedores"
                    element={
                        <PrivateRoute>
                            <ClientesProveedores />
                        </PrivateRoute>
                    }
                />
            </Routes>
        </Router>
    );
};

export default AppRoutes;
