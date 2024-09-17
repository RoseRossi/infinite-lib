const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();
connectDB();

const app = express();

// Configuración de CORS
app.use(cors({
    origin: 'http://localhost:3000',  // El frontend corre en localhost:3000
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,  // Permitir envío de cookies y credenciales
}));

app.use(express.json());

// Rutas de la API
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/stories', require('./routes/storyRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
