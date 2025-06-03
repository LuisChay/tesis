module.exports = (connection) => {
  return {
    // Obtener todos los proyectos con info de grado y responsable
getProyectos: (req, res) => {
  const sql = `
    SELECT p.id, p.nombre AS titulo, p.objetivos AS objetivo, g.nombre AS grado,
           u.nombre_completo AS responsable,
           DATE_FORMAT(p.fecha_inicio, '%Y-%m-%d') AS fechaInicio,
           DATE_FORMAT(p.fecha_fin, '%Y-%m-%d') AS fechaFin
    FROM proyectos p
    LEFT JOIN grados g ON p.curso_id = g.id
    LEFT JOIN usuarios u ON p.responsable_id = u.id
    ORDER BY p.id DESC
  `;

  connection.query(sql, (err, results) => {
    if (err) {
      console.error("Error en getProyectos:", err);
      return res.status(500).json({ error: "Error al obtener proyectos" });
    }
    res.json(results);
  });
},

    // Crear nuevo proyecto
    createProyecto: (req, res) => {
      const { nombre, objetivos, curso_id, responsable_id, fecha_inicio, fecha_fin, actividades } = req.body;

      if (!nombre || !objetivos || !curso_id) {
        return res.status(400).json({ error: "Faltan campos obligatorios" });
      }

      const sql = `
        INSERT INTO proyectos (nombre, objetivos, curso_id, responsable_id, fecha_inicio, fecha_fin, actividades)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `;

      connection.query(
        sql,
        [nombre, objetivos, curso_id, responsable_id || null, fecha_inicio || null, fecha_fin || null, actividades || null],
        (err, result) => {
          if (err) return res.status(500).json({ error: "Error al crear proyecto" });
          res.status(201).json({ message: "Proyecto creado correctamente", id: result.insertId });
        }
      );
    },

    updateProyecto: (req, res) => {
    const { id } = req.params;
    const { nombre, objetivos, curso_id, responsable_id, fecha_inicio, fecha_fin, actividades } = req.body;
    if (!nombre || !objetivos || !curso_id) {
      return res.status(400).json({ error: "Faltan campos obligatorios" });
    }
    const sql = `
      UPDATE proyectos
      SET nombre = ?, objetivos = ?, curso_id = ?, responsable_id = ?, fecha_inicio = ?, fecha_fin = ?, actividades = ?
      WHERE id = ?
    `;
    connection.query(sql, [nombre, objetivos, curso_id, responsable_id || null, fecha_inicio || null, fecha_fin || null, actividades || null, id], (err) => {
      if (err) return res.status(500).json({ error: "Error al actualizar proyecto" });
      res.json({ message: "Proyecto actualizado correctamente" });
    });
  },

  deleteProyecto: (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM proyectos WHERE id = ?';
    connection.query(sql, [id], (err) => {
      if (err) return res.status(500).json({ error: "Error al eliminar proyecto" });
      res.json({ message: "Proyecto eliminado correctamente" });
    });
  },

    // Grados
    // Obtener todos los grados
    getGrados: (req, res) => {
      const sql = "SELECT * FROM grados ORDER BY nombre ASC";
      connection.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: "Error al obtener grados" });
        res.json(results);
      });
    },

    // Crear un nuevo grado
    createGrado: (req, res) => {
      const { nombre } = req.body;

      if (!nombre) {
        return res.status(400).json({ error: "El nombre del grado es obligatorio" });
      }

      const sql = "INSERT INTO grados (nombre) VALUES (?)";
      connection.query(sql, [nombre], (err, result) => {
        if (err) {
          if (err.code === "ER_DUP_ENTRY") {
            return res.status(409).json({ error: "El grado ya existe" });
          }
          return res.status(500).json({ error: "Error al crear grado" });
        }
        res.status(201).json({ message: "Grado creado correctamente", id: result.insertId });
      });
    },

      updateGrado: (req, res) => {
    const { id } = req.params;
    const { nombre } = req.body;
    if (!nombre) {
      return res.status(400).json({ error: "El nombre del grado es obligatorio" });
    }
    const sql = "UPDATE grados SET nombre = ? WHERE id = ?";
    connection.query(sql, [nombre, id], (err) => {
      if (err) return res.status(500).json({ error: "Error al actualizar grado" });
      res.json({ message: "Grado actualizado correctamente" });
    });
  },

  deleteGrado: (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM grados WHERE id = ?";
    connection.query(sql, [id], (err) => {
      if (err) return res.status(500).json({ error: "Error al eliminar grado" });
      res.json({ message: "Grado eliminado correctamente" });
    });
  },
  };
};
