const jwt = require('jsonwebtoken');
require('dotenv').config();

// Middleware para autenticar el JWT
const authenticateJWT = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1]; // Obtener el token del encabezado Authorization

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403); // Token inválido
      }
      req.user = user; // Almacena los datos del usuario en la petición
      next();
    });
  } else {
    res.sendStatus(401); // No token proporcionado
  }
};

module.exports = authenticateJWT;