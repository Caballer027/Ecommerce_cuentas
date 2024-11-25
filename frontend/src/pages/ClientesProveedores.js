import React from 'react';

const ClientesProveedores = () => {
    return (
        <div className="clientes-proveedores-page container py-5">
            <h2 className="text-center mb-4">Gestión de Clientes y Proveedores</h2>
            <div className="row">
                <div className="col-md-6">
                    <div className="card shadow-sm border-info mb-3">
                        <div className="card-body text-center">
                            <h5 className="card-title">Clientes</h5>
                            <p className="card-text">
                                Registra, edita o elimina información de tus clientes.
                            </p>
                            <button className="btn btn-info">Gestionar Clientes</button>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="card shadow-sm border-warning mb-3">
                        <div className="card-body text-center">
                            <h5 className="card-title">Proveedores</h5>
                            <p className="card-text">
                                Registra, edita o elimina información de tus proveedores.
                            </p>
                            <button className="btn btn-warning">Gestionar Proveedores</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClientesProveedores;
