import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx'; // Importar la librería XLSX para manejar archivos Excel
import { jsPDF } from 'jspdf'; // Importar jsPDF para manejar la creación de PDFs

const Facturas = () => {
    const [facturas, setFacturas] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null); // Estado para manejar el archivo seleccionado

    // Obtener las facturas desde el backend (API)
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

    // Función para exportar a Excel
    const exportToExcel = () => {
        const ws = XLSX.utils.json_to_sheet(facturas);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Facturas');
        XLSX.writeFile(wb, 'facturas.xlsx');
    };

    // Función para exportar a PDF
    const exportToPDF = () => {
        const doc = new jsPDF();
        doc.text('Listado de Facturas', 20, 20);
        facturas.forEach((factura, index) => {
            doc.text(`Factura #${factura.numero_factura} - Monto: $${factura.monto_total}`, 20, 30 + index * 10);
        });
        doc.save('facturas.pdf');
    };

    // Función para manejar la carga de archivos (importar CSV o Excel)
    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file); // Actualiza el archivo seleccionado
        const reader = new FileReader();
        reader.onload = (evt) => {
            const binaryStr = evt.target.result;
            const wb = XLSX.read(binaryStr, { type: 'binary' });
            const ws = wb.Sheets[wb.SheetNames[0]]; // Asumimos que el archivo tiene una sola hoja
            const data = XLSX.utils.sheet_to_json(ws); // Convierte la hoja a JSON
            console.log(data); // Aquí tienes los datos del archivo
            setFacturas(data); // Actualiza el estado con los datos importados
        };
        reader.readAsBinaryString(file);
    };

    // Función para deseleccionar el archivo
    const clearFileSelection = () => {
        setSelectedFile(null);
        document.getElementById('fileInput').value = null; // Reinicia el valor del input de archivo
    };

    return (
        <div className="container py-5">
            <h2 className="text-center mb-5 fw-bold text-primary">
                <i className="fas fa-file-invoice-dollar me-2"></i>Listado de Facturas
            </h2>

            {/* Botones para exportar a Excel y PDF */}
            <div className="mb-4">
                <button className="btn btn-success me-2" onClick={exportToExcel}>
                    Exportar a Excel
                </button>
                <button className="btn btn-danger" onClick={exportToPDF}>
                    Exportar a PDF
                </button>
            </div>

            {/* Botón estilizado para cargar un archivo */}
            <div className="mb-4 d-flex align-items-center">
                <label htmlFor="fileInput" className="btn btn-primary me-2">
                    Seleccionar archivo
                </label>
                <input
                    id="fileInput"
                    type="file"
                    accept=".xlsx, .xls, .csv"
                    onChange={handleFileUpload}
                    style={{ display: 'none' }} // Oculta el input original
                />
                {selectedFile && (
                    <span className="text-muted me-3">{selectedFile.name}</span>
                )}
                {selectedFile && (
                    <button className="btn btn-secondary" onClick={clearFileSelection}>
                        Deseleccionar archivo
                    </button>
                )}
            </div>

            {/* Tabla de facturas */}
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
