const express = require('express');
const { registerUser, loginUser, getUserProfile } = require('../controllers/userController');
const protect = require('../middleware/auth');  // Middleware para proteger rutas

const router = express.Router();

// Ruta para registrar usuarios
router.post('/register', registerUser);

// Ruta para iniciar sesión
router.post('/login', loginUser);

// Ruta para obtener el perfil del usuario
router.get('/profile', protect, getUserProfile);  // Rutas protegidas por autenticación

module.exports = router;
