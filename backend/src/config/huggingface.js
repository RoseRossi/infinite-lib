const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();  

const huggingFaceInstance = axios.create({
    baseURL: 'https://api-inference.huggingface.co/models/',  // Base URL para las solicitudes
    headers: { Authorization: `Bearer ${process.env.HUGGING_FACE_API_KEY}` }  // Usa el token de Hugging Face
});

module.exports = huggingFaceInstance;
