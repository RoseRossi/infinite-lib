const express = require('express');
const {
    createStory,
    getStories,
    getStoryById,
    generateStory  
} = require('../controllers/storyController');
const protect = require('../middleware/auth');  // Importar el middleware

const router = express.Router();

router.post('/', protect, createStory); // Rutas para crear historias manualmente
router.post('/generate', protect, generateStory);  // Ruta para generar historias con IA
router.get('/', getStories);  // Obtener todas las historias
router.get('/:id', getStoryById);  // Obtener una historia por ID

module.exports = router;
