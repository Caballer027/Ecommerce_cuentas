import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AppRoutes from './routes';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

ReactDOM.render(
    <React.StrictMode>
        <AppRoutes />
    </React.StrictMode>,
    document.getElementById('root')
);
