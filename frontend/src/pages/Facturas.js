import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Facturas = () => {
    const [facturas, setFacturas] = useState([]);

    useEffect(() => {
        const fetchFacturas = async () => {
            const response = await axios.get('http://localhost:8000/api/facturas/', {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });
            setFacturas(response.data);
        };
        fetchFacturas();
    }, []);

    return (
        <div className="facturas-page container py-5">
            <h2 className="text-center mb-4">Listado de Facturas</h2>
            <table className="table table-striped">
                <thead className="thead-dark">
                    <tr>
                        <th>#</th>
                        <th>Número de Factura</th>
                        <th>Monto</th>
                        <th>Estado</th>
                        <th>Fecha de Vencimiento</th>
                    </tr>
                </thead>
                <tbody>
                    {facturas.map((factura, index) => (
                        <tr key={factura.id}>
                            <td>{index + 1}</td>
                            <td>{factura.numero_factura}</td>
                            <td>${factura.monto_total.toFixed(2)}</td>
                            <td>{factura.estado}</td>
                            <td>{factura.fecha_vencimiento}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Facturas;
