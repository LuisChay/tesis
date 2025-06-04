module.exports = (connection) => {
  return {
    // Obtener backlog filtrado por proyecto y responsable (coordinador)
getBacklogByProyecto: (req, res) => {
  const { proyecto_id } = req.params;
  const { userId } = req.query;

  const sql = `
    SELECT 
      b.id, 
      b.titulo, 
      b.descripcion, 
      b.curso_id,
      DATE_FORMAT(b.fecha_creacion, '%Y-%m-%d') AS fecha_creacion,
      g.nombre AS grado
    FROM backlog b
    JOIN proyectos p ON b.proyecto_id = p.id
    LEFT JOIN grados g ON b.curso_id = g.id
    WHERE b.proyecto_id = ?
      AND b.creado_por = ?
      AND p.responsable_id = ?
    ORDER BY b.id DESC
  `;

  const params = [proyecto_id, userId, userId];

  connection.query(sql, params, (err, results) => {
    if (err) {
      console.error("Error al obtener backlog:", err);
      return res.status(500).json({ error: "Error al obtener actividades" });
    }
    res.json(results);
  });
},

getBacklogByUser: (req, res) => {
  const { userId } = req.params;

  const sql = `
    SELECT 
      b.id, 
      b.titulo, 
      b.descripcion, 
      b.curso_id, 
        b.proyecto_id,
      g.nombre AS grado,
      p.nombre AS proyecto,

      DATE_FORMAT(b.fecha_creacion, '%Y-%m-%d') AS fecha_creacion
    FROM backlog b
    LEFT JOIN grados g ON b.curso_id = g.id
    LEFT JOIN proyectos p ON b.proyecto_id = p.id
    WHERE b.creado_por = ?
    ORDER BY b.id DESC
  `;

  connection.query(sql, [userId], (err, results) => {
    if (err) {
      console.error("Error al obtener backlog:", err);
      return res.status(500).json({ error: "Error al obtener tareas del backlog" });
    }
    res.json(results);
  });
},

    // Crear una nueva tarea
    createBacklog: (req, res) => {
      const { titulo, descripcion, curso_id, creado_por, proyecto_id } = req.body;

      if (!titulo || !descripcion || !curso_id || !creado_por || !proyecto_id) {
        return res.status(400).json({ error: "Faltan campos obligatorios" });
      }

      const sql = `
        INSERT INTO backlog (titulo, descripcion, curso_id, creado_por, proyecto_id, fecha_creacion)
        VALUES (?, ?, ?, ?, ?, NOW())
      `;

      connection.query(
        sql,
        [titulo, descripcion, curso_id, creado_por, proyecto_id],
        (err, result) => {
          if (err) {
            console.error("Error en createBacklog:", err);
            return res.status(500).json({ error: "Error al crear actividad" });
          }
          res.status(201).json({ message: "Tarea creada", id: result.insertId });
        }
      );
    },

    // Actualizar tarea
    updateBacklog: (req, res) => {
      const { id } = req.params;
      const { titulo, descripcion, curso_id, proyecto_id } = req.body;

      if (!titulo || !descripcion || !curso_id || !proyecto_id) {
        return res.status(400).json({ error: "Faltan campos obligatorios" });
      }

      const sql = `
        UPDATE backlog
        SET titulo = ?, descripcion = ?, curso_id = ?, proyecto_id = ?
        WHERE id = ?
      `;

      connection.query(sql, [titulo, descripcion, curso_id, proyecto_id, id], (err) => {
        if (err) {
          console.error("Error en updateBacklog:", err);
          return res.status(500).json({ error: "Error al actualizar la tarea" });
        }
        res.json({ message: "Tarea actualizada" });
      });
    },

    // Eliminar tarea
    deleteBacklog: (req, res) => {
      const { id } = req.params;
      const sql = 'DELETE FROM backlog WHERE id = ?';

      connection.query(sql, [id], (err) => {
        if (err) {
          console.error("Error en deleteBacklog:", err);
          return res.status(500).json({ error: "Error al eliminar tarea" });
        }
        res.json({ message: "Tarea eliminada correctamente" });
      });
    },
  };
};
