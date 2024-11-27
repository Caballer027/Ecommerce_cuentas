import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Facturas = () => {
    const [facturas, setFacturas] = useState([]);

    useEffect(() => {
        const fetchFacturas = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/facturas/', {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                });
                setFacturas(Array.isArray(response.data) ? response.data : []);
            } catch (error) {
                console.error('Error al obtener las facturas:', error);
            }
        };
        fetchFacturas();
    }, []);

    return (
        <div className="container py-5">
            <h2 className="text-center mb-5 fw-bold text-primary">
                <i className="fas fa-file-invoice-dollar me-2"></i>Listado de Facturas
            </h2>
            <div className="table-responsive shadow-sm rounded bg-light">
                <table className="table table-hover align-middle">
                    <thead className="bg-primary text-white">
                        <tr>
                            <th scope="col" className="text-center">#</th>
                            <th scope="col">Número de Factura</th>
                            <th scope="col">Monto</th>
                            <th scope="col">Estado</th>
                            <th scope="col">Fecha de Vencimiento</th>
                        </tr>
                    </thead>
                    <tbody>
                        {facturas.length > 0 ? (
                            facturas.map((factura, index) => {
                                const montoTotal = parseFloat(factura.monto_total);
                                const montoFormateado = isNaN(montoTotal) ? '0.00' : montoTotal.toFixed(2);

                                return (
                                    <tr key={factura.id} className="border-bottom">
                                        <td className="text-center">{index + 1}</td>
                                        <td>{factura.numero_factura}</td>
                                        <td>${montoFormateado}</td>
                                        <td>
                                            <span
                                                className={`badge px-3 py-2 ${
                                                    factura.estado === 'Pagada'
                                                        ? 'bg-success'
                                                        : factura.estado === 'Pendiente'
                                                        ? 'bg-warning text-dark'
                                                        : 'bg-danger'
                                                }`}
                                                style={{ fontSize: '0.9rem' }}
                                            >
                                                {factura.estado}
                                            </span>
                                        </td>
                                        <td>{factura.fecha_vencimiento}</td>
                                    </tr>
                                );
                            })
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center py-4">
                                    <i className="fas fa-exclamation-circle me-2 text-secondary"></i>No hay facturas disponibles
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Facturas;
