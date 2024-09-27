// routes/users.js
const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users');
const authenticateJWT = require('../middlewares/auth');


// Ruta para insertar un usuario (protegida)
router.post('/users', usersController.insertarUsuario);

// Ruta para eliminar un usuario por ID (protegida)
router.delete('/users/:id', usersController.eliminarUsuario);

// Ruta para modificar un usuario (protegida)
router.put('/users/:id', usersController.modificarUsuarioDatos);

// Ruta para modificar el rol de un usuario por ID (protegida)
router.put('/users/:id/role', usersController.modificarUsuarioRol);

// Ruta para obtener la red de un usuario por ID (protegida)
router.get('/users/:id/red', usersController.obtenerRedUsuario);

const authController = require('../controllers/authController');
router.post('/login', authController.login);

module.exports = router;
