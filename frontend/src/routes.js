import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Facturas from './pages/Facturas';
import ClientesProveedores from './pages/ClientesProveedores';

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/facturas" element={<Facturas />} />
                <Route path="/clientes-proveedores" element={<ClientesProveedores />} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;
