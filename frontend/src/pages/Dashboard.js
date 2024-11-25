import React from 'react';

const Dashboard = () => {
    return (
        <div className="dashboard-page container py-5">
            <h2 className="text-center mb-4">Dashboard Contable</h2>
            <div className="row">
                <div className="col-md-4">
                    <div className="card shadow-sm border-primary mb-3">
                        <div className="card-body text-center">
                            <h5 className="card-title">Total por Cobrar</h5>
                            <p className="card-text display-4 text-primary">$10,000</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card shadow-sm border-success mb-3">
                        <div className="card-body text-center">
                            <h5 className="card-title">Total por Pagar</h5>
                            <p className="card-text display-4 text-success">$5,000</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card shadow-sm border-danger mb-3">
                        <div className="card-body text-center">
                            <h5 className="card-title">Facturas Vencidas</h5>
                            <p className="card-text display-4 text-danger">3</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
