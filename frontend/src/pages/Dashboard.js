import React, { useEffect, useState } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import axios from 'axios';

// Registrar los componentes de Chart.js
ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const Dashboard = () => {
    const [barData, setBarData] = useState({
        labels: [],
        datasets: []
    });
    const [pieData, setPieData] = useState({
        labels: [],
        datasets: []
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/dashboard-data/');
                const { flujo_caja = [], estado_facturas = [] } = response.data;

                const barLabels = flujo_caja.map(item => item.nombre_mes);
                const totalPorCobrar = flujo_caja.map(item => item.total_por_cobrar || 0);
                const totalPorPagar = flujo_caja.map(item => item.total_por_pagar || 0);

                setBarData({
                    labels: barLabels,
                    datasets: [
                        {
                            label: 'Por Cobrar (S/.)',
                            data: totalPorCobrar,
                            backgroundColor: 'rgba(93, 173, 226, 0.6)',
                            borderColor: 'rgba(93, 173, 226, 1)',
                            borderWidth: 2,
                            borderRadius: 5,
                        },
                        {
                            label: 'Por Pagar (S/.)',
                            data: totalPorPagar,
                            backgroundColor: 'rgba(72, 201, 176, 0.6)',
                            borderColor: 'rgba(72, 201, 176, 1)',
                            borderWidth: 2,
                            borderRadius: 5,
                        },
                    ],
                });

                const pieLabels = estado_facturas.map(item => item.estado);
                const pieValues = estado_facturas.map(item => item.cantidad);

                setPieData({
                    labels: pieLabels,
                    datasets: [
                        {
                            data: pieValues,
                            backgroundColor: ['#5DADE2', '#F7DC6F', '#E74C3C'],
                            hoverBackgroundColor: ['#3498DB', '#F1C40F', '#C0392B'],
                            borderWidth: 2,
                            hoverOffset: 10,
                        },
                    ],
                });

                setLoading(false);
            } catch (error) {
                console.error('Error al obtener los datos del Dashboard:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="container py-5">
            <h1 className="text-center mb-5" style={{ color: '#34495E', fontWeight: '700' }}>
                <i className="fas fa-chart-bar me-2"></i>Dashboard de Finanzas
            </h1>
            {loading ? (
                <div className="d-flex justify-content-center align-items-center" style={{ height: '300px' }}>
                    <div className="spinner-grow text-secondary" role="status">
                        <span className="visually-hidden">Cargando...</span>
                    </div>
                </div>
            ) : (
                <div className="row g-5">
                    <div className="col-md-6">
                        <div
                            className="p-4 shadow rounded"
                            style={{ backgroundColor: '#FDFEFE', borderLeft: '5px solid #3498DB' }}
                        >
                            <h5 className="text-center" style={{ color: '#2E86C1', fontWeight: '600' }}>
                                Flujo de Caja Mensual
                            </h5>
                            <div style={{ height: '300px' }}>
                                <Bar data={barData} options={{ responsive: true, maintainAspectRatio: false }} />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div
                            className="p-4 shadow rounded"
                            style={{ backgroundColor: '#FDFEFE', borderLeft: '5px solid #1ABC9C' }}
                        >
                            <h5 className="text-center" style={{ color: '#16A085', fontWeight: '600' }}>
                                Distribución de Facturas
                            </h5>
                            <div style={{ height: '300px' }}>
                                <Pie data={pieData} options={{ responsive: true, maintainAspectRatio: false }} />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
