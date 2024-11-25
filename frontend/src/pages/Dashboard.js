import React from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
} from 'chart.js';

// Registrar los componentes necesarios
ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const Dashboard = () => {
    // Datos del gráfico de barras
    const barData = {
        labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
        datasets: [
            {
                label: 'Total por Cobrar ($)',
                data: [1200, 1900, 800, 1500, 2000, 2500],
                backgroundColor: 'rgba(54, 162, 235, 0.6)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
            },
            {
                label: 'Total por Pagar ($)',
                data: [900, 1200, 600, 1100, 1800, 2100],
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    // Datos del gráfico de pastel
    const pieData = {
        labels: ['Pagadas', 'Pendientes', 'Vencidas'],
        datasets: [
            {
                data: [50, 30, 20],
                backgroundColor: ['#36A2EB', '#FFCE56', '#FF6384'],
                hoverBackgroundColor: ['#36A2EB', '#FFCE56', '#FF6384'],
            },
        ],
    };

    return (
        <div className="dashboard-page container py-5">
            <h2 className="text-center mb-4">Dashboard Contable</h2>
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
        </div>
    );
};

export default Dashboard;
