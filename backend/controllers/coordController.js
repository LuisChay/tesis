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
          return res.status(500).json({ error: "Error al obtener tareas del backlog" });
        }
        res.json(results);
      });
    },

    // Crear una nueva tarea (backlog)
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
            return res.status(500).json({ error: "Error al crear actividad" });
          }
          res.status(201).json({ message: "Tarea creada", id: result.insertId });
        }
      );
    },

    // Actualizar tarea (backlog)
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
          return res.status(500).json({ error: "Error al actualizar la tarea" });
        }
        res.json({ message: "Tarea actualizada" });
      });
    },

    // Eliminar tarea (backlog)
    deleteBacklog: (req, res) => {
      const { id } = req.params;
      const sql = 'DELETE FROM backlog WHERE id = ?';

      connection.query(sql, [id], (err) => {
        if (err) {
          return res.status(500).json({ error: "Error al eliminar tarea" });
        }
        res.json({ message: "Tarea eliminada correctamente" });
      });
    },

    // Crear evaluación continua (ahora asociada a backlog_id en lugar de tarea_id o sprint_id)
    createEvaluacion: (req, res) => {
      const { tarea_id, usuario_id, nota, retroalimentacion, evaluado_por } = req.body;

      if (!tarea_id || !usuario_id || !nota || !evaluado_por) {
        return res.status(400).json({ error: "Campos obligatorios faltantes" });
      }

      // Verificar si el tarea_id existe en la tabla 'backlog'
      const sqlCheckBacklog = `SELECT id FROM backlog WHERE id = ?`;
      connection.query(sqlCheckBacklog, [tarea_id], (err, results) => {
        if (err) {
          return res.status(500).json({ error: "Error interno al verificar backlog" });
        }

        if (results.length === 0) {
          return res.status(400).json({ error: "El backlog seleccionado no existe" });
        }

        // Si el backlog_id existe, proceder con la inserción de la evaluación
        const sql = `
          INSERT INTO evaluaciones (tarea_id, usuario_id, nota, retroalimentacion, evaluado_por, fecha)
          VALUES (?, ?, ?, ?, ?, CURDATE())
        `;

        connection.query(sql, [tarea_id, usuario_id, nota, retroalimentacion, evaluado_por], (err, result) => {
          if (err) {
            return res.status(500).json({ error: "Error interno al guardar evaluación" });
          }
          res.status(201).json({ id: result.insertId, message: "Evaluación guardada correctamente" });
        });
      });
    },

    // Obtener evaluaciones por evaluador
    getEvaluacionesByEvaluador: (req, res) => {
      const { evaluadorId } = req.params;

      const sql = `
        SELECT 
          e.id, 
          e.nota, 
          e.retroalimentacion, 
          e.fecha,
          u.nombre_completo AS estudiante,
          b.titulo AS backlog
        FROM evaluaciones e
        LEFT JOIN usuarios u ON e.usuario_id = u.id
        LEFT JOIN backlog b ON e.tarea_id = b.id
        WHERE e.evaluado_por = ?
        ORDER BY e.fecha DESC
      `;

      connection.query(sql, [evaluadorId], (err, results) => {
        if (err) {
          return res.status(500).json({ error: "Error al cargar evaluaciones" });
        }
        res.json(results);
      });
    },
    deleteEvaluacion: (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM evaluaciones WHERE id = ?';

  connection.query(sql, [id], (err) => {
    if (err) {
      return res.status(500).json({ error: "Error al eliminar evaluación" });
    }
    res.json({ message: "Evaluación eliminada correctamente" });
  });
},

updateEvaluacion: (req, res) => {
  const { id } = req.params;
  const { tarea_id, nota, retroalimentacion } = req.body;

  console.log("Actualizar evaluación con ID:", id);
  console.log("Datos de evaluación:", req.body);

  if (!tarea_id || !nota || !retroalimentacion) {
    return res.status(400).json({ error: "Faltan campos obligatorios" });
  }

  const sql = `
    UPDATE evaluaciones
    SET tarea_id = ?, nota = ?, retroalimentacion = ?
    WHERE id = ?
  `;

  connection.query(sql, [tarea_id, nota, retroalimentacion, id], (err) => {
    if (err) {
      return res.status(500).json({ error: "Error al actualizar evaluación" });
    }
    res.json({ message: "Evaluación actualizada correctamente" });
  });
}


  };
};
