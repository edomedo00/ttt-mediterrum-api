// controllers/users.js
const connection = require('../db/db');

// Obtener todos los usuarios
const obtenerDatos = (req, res) => {
  connection.query('SELECT * FROM usuarios', (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(results);
  });
};

// Insertar un nuevo usuario
const insertarUsuario = (req, res) => {
  const { nombre, email, telefono, rol, puntos_total, nivel, id_distribuidor, id_promotor } = req.body;

  const query = `CALL insertar_usuario(?, ?, ?, ?, ?, ?, ?, ?)`;

  connection.query(query, [nombre, email, telefono, rol, puntos_total, nivel, id_distribuidor, id_promotor], (err, results) => {
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
const modificarUsuario = (req, res) => {
    const id = req.params.id;
    const { nuevoNombre, nuevoEmail, nuevoTelefono } = req.body;
  
    // Validar que el id es un número
    if (isNaN(id)) {
      return res.status(400).json({ error: 'ID inválido.' });
    }
  
    // Construir la consulta SQL para actualización parcial
    let updates = [];
    let values = [];
  
    if (nuevoNombre) {
      updates.push('nombre = ?');
      values.push(nuevoNombre);
    }
    if (nuevoEmail) {
      updates.push('email = ?');
      values.push(nuevoEmail);
    }
    if (nuevoTelefono) {
      updates.push('telefono = ?');
      values.push(nuevoTelefono);
    }
  
    // Asegurarse de que al menos un campo se va a actualizar
    if (updates.length === 0) {
      return res.status(400).json({ error: 'No se proporcionaron datos para actualizar.' });
    }
  
    // Añadir el ID al final de los valores
    values.push(id);
  
    // Construir la consulta final
    const query = `UPDATE usuarios SET ${updates.join(', ')} WHERE id = ?`;
  
    connection.query(query, values, (err, results) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.status(200).json({ mensaje: `Datos de usuario con ID ${id} actualizados correctamente` });
    });
  };

  // Modificar el rol de un usuario
const modificarRolUsuario = (req, res) => {
    const id = req.params.id;
    const { nuevoRol } = req.body;
  
    // Validar el ID y el nuevo rol
    if (isNaN(id) || !['vendedor', 'promotor', 'distribuidor'].includes(nuevoRol)) {
      return res.status(400).json({ error: 'ID inválido o rol no válido.' });
    }
  
    const query = `CALL modificar_rol_usuario(?, ?)`;
  
    connection.query(query, [id, nuevoRol], (err, results) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.status(200).json({ mensaje: `Rol de usuario con ID ${id} actualizado a ${nuevoRol} correctamente` });
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
    obtenerDatos,
    insertarUsuario,
    eliminarUsuario,
    modificarUsuario,
    modificarRolUsuario,
    modificarRelacionesUsuario,
    obtenerRedUsuario,
  };