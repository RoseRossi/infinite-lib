const jwt = require('jsonwebtoken');
const User = require('../models/User');  // Importa tu modelo de usuario

const protect = async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            // Obtener el token del header Authorization
            token = req.headers.authorization.split(' ')[1];
            
            // Decodificar el token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Buscar el usuario por su id en la base de datos y excluir el campo de la contraseña
            const user = await User.findById(decoded.id).select('-password');

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            // Almacenar el usuario encontrado en req.user con el campo 'username'
            req.user = {
                id: user._id,
                email: user.email,
                username: user.username  // Aquí usamos username
            };

            next();
        } catch (error) {
            console.error(error);
            return res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        return res.status(401).json({ message: 'Not authorized, no token' });
    }
};

module.exports = protect;
