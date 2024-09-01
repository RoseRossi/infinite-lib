const express = require('express');
const { registerUser, loginUser, getUserProfile } = require('../controllers/userController');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', getUserProfile);

router.get('/', (req, res) => {
    res.send('API de usuarios funcionando correctamente');
});


module.exports = router;

