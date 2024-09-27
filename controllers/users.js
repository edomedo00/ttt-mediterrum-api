// controllers/users.js
const connection = require('../db/db');

// Insertar un nuevo usuario
const insertarUsuario = (req, res) => {
  const { nombre, email, telefono, locacion, rol, puntos_total, nivel, id_distribuidor, id_vendedor, contrasena, id_creador } = req.body;

  const query = `CALL insertar_usuario(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  connection.query(query, [nombre, email, telefono, locacion, rol, puntos_total, nivel, id_distribuidor, id_vendedor, contrasena, id_creador], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(201).json({ mensaje: 'Usuario insertado correctamente' });
  });
};

// Eliminar un usuario por su ID
const eliminarUsuario = (req, res) => {
    const { id } = req.params;
  
    const query = `CALL eliminar_usuario(?)`;
  
    connection.query(query, [id], (err, results) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.status(200).json({ mensaje: `Usuario con ID ${id} eliminado correctamente` });
    });
};

// Modificar los datos de un usuario (actualización parcial)
const modificarUsuarioDatos = (req, res) => {
  const id = req.params.id;
  const { nuevoNombre, nuevoEmail, nuevoTelefono, nuevaLocacion } = req.body;

  if (isNaN(id)) {
      return res.status(400).json({ error: 'ID inválido.' });
  }

  const query = `CALL modificar_usuario_datos(?, ?, ?, ?, ?)`;
  const values = [
      id,
      nuevoNombre || null,
      nuevoEmail || null,
      nuevoTelefono || null,
      nuevaLocacion || null
  ];

  connection.query(query, values, (err, results) => {
      if (err) {
          return res.status(500).send(err);
      }
      res.status(200).json({ mensaje: `Datos de usuario con ID ${id} actualizados correctamente` });
  });
};

  // Modificar el rol de un usuario
const modificarUsuarioRol = (req, res) => {
    const id = req.params.id;
    const { nuevoRol } = req.body;
  
    // Validar el ID y el nuevo rol
    if (isNaN(id) || !['vendedor', 'promotor', 'distribuidor'].includes(nuevoRol)) {
      return res.status(400).json({ error: 'ID inválido o rol no válido.' });
    }
  
    const query = `CALL modificar_usuario_rol(?, ?)`;
  
    connection.query(query, [id, nuevoRol], (err, results) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.status(200).json({ mensaje: `Rol de usuario con ID ${id} actualizado a ${nuevoRol} correctamente.` });
    });
  };


// Modificar las relaciones de un usuario basadas en su rol
const modificarRelacionesUsuario = (req, res) => {
  const id = req.params.id;
  const { nuevoValor } = req.body;

  // Validar el ID y el nuevo valor
  if (isNaN(id) || isNaN(nuevoValor)) {
    return res.status(400).json({ error: 'ID o valor inválidos.' });
  }

  const query = `CALL modificar_relaciones_usuario(?, ?)`;

  connection.query(query, [id, nuevoValor], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(200).json({ mensaje: `Relaciones de usuario con ID ${id} actualizadas correctamente` });
  });
};

// Obtener la red de un usuario
const obtenerRedUsuario = (req, res) => {
    const id = req.params.id;
  
    const query = `CALL obtener_red_usuario(?)`;
  
    connection.query(query, [id], (err, results) => {
      if (err) {
        return res.status(500).send(err);
      }
      if (results.length === 0) {
        return res.status(404).json({ mensaje: `Usuario con ID ${id} no encontrado o no tiene red asociada` });
      }
      res.status(200).json(results);
    });
  };
  
  module.exports = {
    insertarUsuario,
    eliminarUsuario,
    modificarUsuarioDatos,
    modificarUsuarioRol,
    modificarRelacionesUsuario,
    obtenerRedUsuario,
  };