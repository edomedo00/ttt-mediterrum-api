const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Contraseña encriptada almacenada en .env
const storedPassword = bcrypt.hashSync(process.env.JWT_PASSWORD, 10);

// Controlador para el login basado solo en la contraseña
const login = (req, res) => {
  const { password } = req.body;

  // Compara la contraseña enviada con la guardada encriptada
  const isMatch = bcrypt.compareSync(password, storedPassword);

  if (isMatch) {
    // Generar un token JWT solo usando la contraseña y el JWT_SECRET
    const token = jwt.sign({ password: process.env.JWT_PASSWORD }, process.env.JWT_SECRET, { expiresIn: '8h' });
    return res.json({ token });
  } else {
    return res.status(400).json({ message: 'Contraseña incorrecta' });
  }
};

module.exports = { login };