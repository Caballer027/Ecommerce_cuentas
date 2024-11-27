import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AlertasFacturas = () => {
    const [alertas, setAlertas] = useState({ proximas_vencer: [], vencidas: [] });

    useEffect(() => {
        const fetchAlertas = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/alertas-facturas/');
                setAlertas(response.data);
            } catch (error) {
                console.error('Error al obtener alertas:', error);
            }
        };

        fetchAlertas();
    }, []);

    return (
        <div className="alertas-facturas container py-5">
            <h2 className="text-center mb-4">Alertas de Facturas</h2>
            <div className="row">
                <div className="col-md-6">
                    <h4>Próximas a Vencer</h4>
                    <ul>
                        {alertas.proximas_vencer.map((factura) => (
                            <li key={factura.id}>
                                {factura.numero_factura} - Vence el {factura.fecha_vencimiento}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="col-md-6">
                    <h4>Vencidas</h4>
                    <ul>
                        {alertas.vencidas.map((factura) => (
                            <li key={factura.id}>
                                {factura.numero_factura} - Venció el {factura.fecha_vencimiento}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default AlertasFacturas;
