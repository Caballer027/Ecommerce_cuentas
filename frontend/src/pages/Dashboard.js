import React, { useEffect, useState } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import axios from 'axios';

// Registrar los componentes de Chart.js
ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const Dashboard = () => {
    const [barData, setBarData] = useState({});
    const [pieData, setPieData] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Función para obtener datos desde el backend
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/dashboard-data/');
                const { flujo_caja, estado_facturas } = response.data;

                // Preparar datos para el gráfico de barras
                const barLabels = flujo_caja.map(item => item.nombre_mes); // Usamos el nombre del mes
                const totalPorCobrar = flujo_caja.map(item => item.total_por_cobrar || 0);
                const totalPorPagar = flujo_caja.map(item => item.total_por_pagar || 0);

                setBarData({
                    labels: barLabels,
                    datasets: [
                        {
                            label: 'Total por Cobrar (S/.)',
                            data: totalPorCobrar,
                            backgroundColor: 'rgba(54, 162, 235, 0.6)',
                            borderColor: 'rgba(54, 162, 235, 1)',
                            borderWidth: 1,
                        },
                        {
                            label: 'Total por Pagar (S/.)',
                            data: totalPorPagar,
                            backgroundColor: 'rgba(75, 192, 192, 0.6)',
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 1,
                        },
                    ],
                });

                // Preparar datos para el gráfico de pastel
                const pieLabels = estado_facturas.map(item => item.estado);
                const pieValues = estado_facturas.map(item => item.cantidad);

                setPieData({
                    labels: pieLabels,
                    datasets: [
                        {
                            data: pieValues,
                            backgroundColor: ['#36A2EB', '#FFCE56', '#FF6384'],
                            hoverBackgroundColor: ['#36A2EB', '#FFCE56', '#FF6384'],
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
        <div className="dashboard-page container py-5">
            <h2 className="text-center mb-4">Dashboard Contable</h2>
            {loading ? (
                <p className="text-center">Cargando datos...</p>
            ) : (
                <div className="row">
                    <div className="col-md-6 mb-4">
                        <div className="card shadow-sm">
                            <div className="card-body">
                                <h5 className="card-title text-center">Flujo de Caja por Mes</h5>
                                <Bar data={barData} />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 mb-4">
                        <div className="card shadow-sm">
                            <div className="card-body">
                                <h5 className="card-title text-center">Estado de las Facturas</h5>
                                <Pie data={pieData} />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
