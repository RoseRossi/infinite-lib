const express = require('express');
const {
    createStory,
    getStories,
    getStoryById,
    generateStory,
    updateStory  // Importar la nueva función para actualizar historias
} = require('../controllers/storyController');
const protect = require('../middleware/auth');  // Importar el middleware

const router = express.Router();

// Proteger las rutas que requieren autenticación
router.post('/', protect, createStory); // Crear historias manualmente
router.post('/generate', protect, generateStory);  // Generar historias con IA
router.get('/', protect, getStories);  // Obtener todas las historias del usuario autenticado
router.get('/:id', protect, getStoryById);  // Obtener una historia por ID (protegida)
router.put('/:id', protect, updateStory);  // Ruta para actualizar una historia existente por ID

module.exports = router;
