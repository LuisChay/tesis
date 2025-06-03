const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const jwtsecret = process.env.JWT_SECRET;
const jwtexpire = process.env.JWT_EXPIRES_IN;
const jwtmaxage = process.env.JWT_MAX_AGE;
const jwtRenewalWindow = process.env.JWT_RENEWAL_WINDOW;

module.exports = (connection) => {
  return {
login: (req, res) => {
  const { correo, contrasena } = req.body;

  if (!correo || !contrasena) {
    return res.status(400).json({ error: "Campos incompletos" });
  }

  const sql = 'SELECT * FROM usuarios WHERE correo = ?';
  connection.query(sql, [correo], async (err, results) => {
    if (err) return res.status(500).json({ error: "Error interno del servidor" });

    if (results.length === 0) {
      // Usuario no existe
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    const usuario = results[0];
    const match = await bcrypt.compare(contrasena, usuario.contrasena);

    if (!match) {
      // Contraseña no coincide
      return res.status(401).json({ error: "Contraseña incorrecta" });
    }

    const token = jwt.sign(
      { id: usuario.id, rol_id: usuario.rol_id, correo: usuario.correo },
      jwtsecret,
      { expiresIn: jwtexpire }
    );

    res.json({
      token,
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre_completo,
        rol_id: usuario.rol_id
      }
    });
  });
},


createUsuario: async (req, res) => {
  const { nombre_completo, correo, contrasena, rol_id } = req.body;

  // Validación básica
  if (!nombre_completo || !correo || !contrasena || !rol_id) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  try {
    const hashedPassword = await bcrypt.hash(contrasena, 10);

    const sql = 'INSERT INTO usuarios (nombre_completo, correo, contrasena, rol_id) VALUES (?, ?, ?, ?)';
    connection.query(sql, [nombre_completo, correo, hashedPassword, rol_id], (err, result) => {
      if (err) {
        // Error típico por correo duplicado
        if (err.code === 'ER_DUP_ENTRY') {
          return res.status(409).json({ error: "El correo ya está registrado" });
        }
        // Otros errores SQL
        return res.status(500).json({ error: "Error al guardar el usuario" });
      }

      res.status(201).json({ id: result.insertId, message: "Usuario creado correctamente" });
    });
  } catch (err) {
    // Error en el hash o inesperado
    res.status(500).json({ error: "Error interno del servidor" });
  }
},

    getUsuarios: (req, res) => {
      const sql = 'SELECT id, nombre_completo, correo, rol_id FROM usuarios';
      connection.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
      });
    },

    getUsuarioById: (req, res) => {
      const { id } = req.params;
      const sql = 'SELECT id, nombre_completo, correo, rol_id FROM usuarios WHERE id = ?';
      connection.query(sql, [id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ error: "Usuario no encontrado" });
        res.json(results[0]);
      });
    },

    deleteUsuario: (req, res) => {
      const { id } = req.params;
      const sql = "DELETE FROM usuarios WHERE id = ?";
      connection.query(sql, [id], (err) => {
        if (err)
          return res.status(500).json({ error: "Error eliminando usuario: " + err.message });
        res.json({ message: "Usuario eliminado correctamente" });
      });
    },

    updateUsuario: (req, res) => {
      const { id } = req.params;
      const { nombre_completo, correo, rol_id } = req.body;

      if (!nombre_completo || !correo || !rol_id) {
        return res.status(400).json({ error: "Todos los campos son obligatorios" });
      }

      const sql = "UPDATE usuarios SET nombre_completo = ?, correo = ?, rol_id = ? WHERE id = ?";
      connection.query(sql, [nombre_completo, correo, rol_id, id], (err) => {
        if (err)
          return res.status(500).json({ error: "Error actualizando usuario: " + err.message });
        res.json({ message: "Usuario actualizado correctamente" });
      });
    },
  };
}
