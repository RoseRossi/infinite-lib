const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

const groqInstance = axios.create({
    baseURL: 'https://api.groq.com/openai/v1',  // Base URL corregida para las solicitudes de GroqCloud
    headers: { Authorization: `Bearer ${process.env.GROQ_API_KEY}` }  // Usa el token de GroqCloud
});

module.exports = groqInstance;
