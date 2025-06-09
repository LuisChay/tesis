module.exports = (connection) => {
  return {
    // BACKLOG
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
          return res
            .status(500)
            .json({ error: "Error al obtener actividades" });
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
          return res
            .status(500)
            .json({ error: "Error al obtener tareas del backlog" });
        }
        res.json(results);
      });
    },

    getAllBacklog: (req, res) => {
      const sql = `
    SELECT 
      b.id,
      b.titulo,
      b.descripcion,
      b.curso_id,
      g.nombre AS grado,
      p.nombre AS proyecto
    FROM backlog b
    LEFT JOIN grados g ON b.curso_id = g.id
    LEFT JOIN proyectos p ON b.proyecto_id = p.id
    ORDER BY b.id DESC
  `;

      connection.query(sql, (err, results) => {
        if (err) {
          return res.status(500).json({ error: "Error al obtener backlog" });
        }
        res.json(results);
      });
    },

    // Crear una nueva tarea (backlog)
    createBacklog: (req, res) => {
      const { titulo, descripcion, curso_id, creado_por, proyecto_id } =
        req.body;

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
          res
            .status(201)
            .json({ message: "Tarea creada", id: result.insertId });
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

      connection.query(
        sql,
        [titulo, descripcion, curso_id, proyecto_id, id],
        (err) => {
          if (err) {
            return res
              .status(500)
              .json({ error: "Error al actualizar la tarea" });
          }
          res.json({ message: "Tarea actualizada" });
        }
      );
    },

    // Eliminar tarea (backlog)
    deleteBacklog: (req, res) => {
      const { id } = req.params;
      const sql = "DELETE FROM backlog WHERE id = ?";

      connection.query(sql, [id], (err) => {
        if (err) {
          return res.status(500).json({ error: "Error al eliminar tarea" });
        }
        res.json({ message: "Tarea eliminada correctamente" });
      });
    },

    // EVALUACIONES
    createEvaluacion: (req, res) => {
      const { tarea_id, usuario_id, nota, retroalimentacion, evaluado_por } =
        req.body;

      if (!tarea_id || !usuario_id || !nota || !evaluado_por) {
        return res.status(400).json({ error: "Campos obligatorios faltantes" });
      }

      // Verificar si el tarea_id existe en la tabla 'backlog'
      const sqlCheckBacklog = `SELECT id FROM backlog WHERE id = ?`;
      connection.query(sqlCheckBacklog, [tarea_id], (err, results) => {
        if (err) {
          return res
            .status(500)
            .json({ error: "Error interno al verificar backlog" });
        }

        if (results.length === 0) {
          return res
            .status(400)
            .json({ error: "El backlog seleccionado no existe" });
        }

        // Si el backlog_id existe, proceder con la inserción de la evaluación
        const sql = `
          INSERT INTO evaluaciones (tarea_id, usuario_id, nota, retroalimentacion, evaluado_por, fecha)
          VALUES (?, ?, ?, ?, ?, CURDATE())
        `;

        connection.query(
          sql,
          [tarea_id, usuario_id, nota, retroalimentacion, evaluado_por],
          (err, result) => {
            if (err) {
              return res
                .status(500)
                .json({ error: "Error interno al guardar evaluación" });
            }
            res
              .status(201)
              .json({
                id: result.insertId,
                message: "Evaluación guardada correctamente",
              });
          }
        );
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
      b.titulo AS backlog,
      g.nombre AS grado
    FROM evaluaciones e
    LEFT JOIN usuarios u ON e.usuario_id = u.id
    LEFT JOIN backlog b ON e.tarea_id = b.id
    LEFT JOIN grados g ON b.curso_id = g.id
    WHERE e.evaluado_por = ?
    ORDER BY e.fecha DESC
  `;

      connection.query(sql, [evaluadorId], (err, results) => {
        if (err) {
          return res
            .status(500)
            .json({ error: "Error al cargar evaluaciones" });
        }
        res.json(results);
      });
    },

    deleteEvaluacion: (req, res) => {
      const { id } = req.params;
      const sql = "DELETE FROM evaluaciones WHERE id = ?";

      connection.query(sql, [id], (err) => {
        if (err) {
          return res
            .status(500)
            .json({ error: "Error al eliminar evaluación" });
        }
        res.json({ message: "Evaluación eliminada correctamente" });
      });
    },

    updateEvaluacion: (req, res) => {
      const { id } = req.params;
      const { tarea_id, nota, retroalimentacion } = req.body;

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
          return res
            .status(500)
            .json({ error: "Error al actualizar evaluación" });
        }
        res.json({ message: "Evaluación actualizada correctamente" });
      });
    },

    // REPORTES
    getTareasPorGradoYEstado: (req, res) => {
      const { coordinador_id } = req.params;

      const sql = `
    SELECT 
      g.nombre AS grado,
      t.estado,
      COUNT(t.id) AS total
    FROM tareas t
    LEFT JOIN backlog b ON t.backlog_id = b.id
    LEFT JOIN grados g ON b.curso_id = g.id
    LEFT JOIN proyectos p ON b.proyecto_id = p.id
    WHERE p.responsable_id = ?
    GROUP BY g.id, t.estado
  `;

      connection.query(sql, [coordinador_id], (err, results) => {
        if (err)
          return res.status(500).json({ error: "Error al obtener tareas" });
        res.json(results);
      });
    },

    getParticipacionDailys: (req, res) => {
      const { coordinador_id } = req.params;

      const sql = `
    SELECT u.nombre_completo AS estudiante, COUNT(d.id) AS total_dailys
    FROM dailys d
    LEFT JOIN usuarios u ON d.usuario_id = u.id
    LEFT JOIN sprints s ON d.sprint_id = s.id
    LEFT JOIN proyectos p ON s.curso_id = p.curso_id
    WHERE p.responsable_id = ?
    GROUP BY d.usuario_id
  `;

      connection.query(sql, [coordinador_id], (err, results) => {
        if (err)
          return res
            .status(500)
            .json({ error: "Error al obtener participación" });
        res.json(results);
      });
    },
getParticipacionDailysPorGrado: (req, res) => {
  const sql = `
    SELECT g.nombre AS grado, COUNT(d.id) AS total_dailys
    FROM dailys d
    JOIN usuarios u ON d.usuario_id = u.id
    JOIN usuario_grado ug ON u.id = ug.usuario_id
    JOIN grados g ON ug.grado_id = g.id
    GROUP BY g.nombre;
  `;

  connection.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Error al obtener participación por grado" });
    }
    res.json(results);
  });
},
    
    getPromedioEvaluacionPorGrado: (req, res) => {
      const { coordinador_id } = req.params;

      const sql = `
    SELECT 
      g.nombre AS grado,
      ROUND(AVG(e.nota), 2) AS promedio
    FROM evaluaciones e
    LEFT JOIN backlog b ON e.tarea_id = b.id
    LEFT JOIN grados g ON b.curso_id = g.id
    WHERE e.evaluado_por = ?
    GROUP BY g.id
  `;

      connection.query(sql, [coordinador_id], (err, results) => {
        if (err)
          return res
            .status(500)
            .json({ error: "Error al obtener promedios por grado" });
        res.json(results);
      });
    },

    getRetrospectivasPorSprint: (req, res) => {
      const { coordinador_id } = req.params;

      const sql = `
    SELECT s.nombre AS sprint, COUNT(r.id) AS total_retrospectivas
    FROM retrospectivas r
    LEFT JOIN sprints s ON r.sprint_id = s.id
    LEFT JOIN proyectos p ON s.curso_id = p.curso_id
    WHERE p.responsable_id = ?
    GROUP BY s.id
  `;

      connection.query(sql, [coordinador_id], (err, results) => {
        if (err)
          return res
            .status(500)
            .json({ error: "Error al obtener retrospectivas" });
        res.json(results);
      });
    },

    getActividadBacklog: (req, res) => {
      const { coordinador_id } = req.params;

      const sql = `
    SELECT g.nombre AS grado, COUNT(b.id) AS tareas_creadas
    FROM backlog b
    LEFT JOIN grados g ON b.curso_id = g.id
    WHERE b.creado_por = ?
    GROUP BY g.id
  `;

      connection.query(sql, [coordinador_id], (err, results) => {
        if (err)
          return res
            .status(500)
            .json({ error: "Error al obtener actividad de backlog" });
        res.json(results);
      });
    },

    getRankingGrados: (req, res) => {
      const { coordinador_id } = req.params;

      const sql = `
    SELECT 
      g.nombre AS grado,
      ROUND(AVG(e.nota), 2) AS promedio
    FROM evaluaciones e
    LEFT JOIN backlog b ON e.tarea_id = b.id
    LEFT JOIN grados g ON b.curso_id = g.id
    WHERE e.evaluado_por = ?
    GROUP BY g.id
    ORDER BY promedio DESC
  `;

      connection.query(sql, [coordinador_id], (err, results) => {
        if (err)
          return res
            .status(500)
            .json({ error: "Error al obtener ranking por grado" });
        res.json(results);
      });
    },

    getCumplimientoTareas: (req, res) => {
      const { coordinador_id } = req.params;

      const sql = `
    SELECT u.nombre_completo AS estudiante,
      COUNT(t.id) AS tareas_asignadas,
      SUM(CASE WHEN t.estado = 'Culminado' THEN 1 ELSE 0 END) AS tareas_cumplidas
    FROM tareas t
    LEFT JOIN usuarios u ON t.asignado_a = u.id
    LEFT JOIN backlog b ON t.backlog_id = b.id
    LEFT JOIN proyectos p ON b.proyecto_id = p.id
    WHERE p.responsable_id = ?
    GROUP BY u.id
  `;

      connection.query(sql, [coordinador_id], (err, results) => {
        if (err)
          return res
            .status(500)
            .json({ error: "Error al obtener cumplimiento" });
        res.json(results);
      });
    },

    getTareasAntiguasPendientes: (req, res) => {
      const { coordinador_id } = req.params;

      const sql = `
    SELECT t.titulo, g.nombre AS grado, b.fecha_creacion
    FROM tareas t
    LEFT JOIN backlog b ON t.backlog_id = b.id
    LEFT JOIN proyectos p ON b.proyecto_id = p.id
    LEFT JOIN grados g ON b.curso_id = g.id
    WHERE t.estado != 'Culminado' AND p.responsable_id = ?
    ORDER BY b.fecha_creacion ASC
    LIMIT 10
  `;

      connection.query(sql, [coordinador_id], (err, results) => {
        if (err)
          return res
            .status(500)
            .json({ error: "Error al obtener tareas antiguas" });
        res.json(results);
      });
    },
  };
};
