import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom'; // Importa BrowserRouter

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter> {/* Envuelve tu aplicación dentro del Router */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// Si deseas medir el rendimiento de tu aplicación, puedes pasar una función a reportWebVitals
reportWebVitals();
