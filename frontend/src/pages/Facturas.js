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
        <div>
            <h2>Listado de Facturas</h2>
            <ul>
                {facturas.map((factura) => (
                    <li key={factura.id}>{factura.numero_factura} - {factura.monto_total}</li>
                ))}
            </ul>
        </div>
    );
};

export default Facturas;
