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
          TO_CHAR(b.fecha_creacion, 'YYYY-MM-DD') AS fecha_creacion,
          g.nombre AS grado
        FROM backlog b
        JOIN proyectos p ON b.proyecto_id = p.id
        LEFT JOIN grados g ON b.curso_id = g.id
        WHERE b.proyecto_id = $1
          AND b.creado_por = $2
          AND p.responsable_id = $3
        ORDER BY b.id DESC
      `;

      const params = [proyecto_id, userId, userId];

      connection.query(sql, params, (err, results) => {
        if (err) {
          return res
            .status(500)
            .json({ error: "Error al obtener actividades" });
        }
        res.json(results.rows);
      });
    },

    // Obtener backlog por usuario (coordinador)
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
          TO_CHAR(b.fecha_creacion, 'YYYY-MM-DD') AS fecha_creacion
        FROM backlog b
        LEFT JOIN grados g ON b.curso_id = g.id
        LEFT JOIN proyectos p ON b.proyecto_id = p.id
        WHERE b.creado_por = $1
        ORDER BY b.id DESC
      `;

      connection.query(sql, [userId], (err, results) => {
        if (err) {
          return res
            .status(500)
            .json({ error: "Error al obtener tareas del backlog" });
        }
        res.json(results.rows);
      });
    },

    // Obtener backlog por grado
    getBacklogByGrado: (req, res) => {
      const { grado_id } = req.params;

      const sql = `
        SELECT 
          b.id, 
          b.titulo, 
          b.descripcion, 
          b.curso_id,
          b.proyecto_id,
          TO_CHAR(b.fecha_creacion, 'YYYY-MM-DD') AS fecha_creacion,
          g.nombre AS grado,
          p.nombre AS proyecto
        FROM backlog b
        LEFT JOIN grados g ON b.curso_id = g.id
        LEFT JOIN proyectos p ON b.proyecto_id = p.id
        WHERE b.curso_id = $1
        ORDER BY b.id DESC
      `;

      connection.query(sql, [grado_id], (err, results) => {
        if (err) {
          return res
            .status(500)
            .json({ error: "Error al obtener backlog por grado" });
        }
        res.json(results.rows);
      });
    },

    // Obtener todas las tareas del backlog
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
        res.json(results.rows);
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
        VALUES ($1, $2, $3, $4, $5, CURRENT_DATE)
        RETURNING id
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
            .json({ message: "Tarea creada", id: result.rows[0].id });
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
        SET titulo = $1, descripcion = $2, curso_id = $3, proyecto_id = $4
        WHERE id = $5
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
      const sql = "DELETE FROM backlog WHERE id = $1";

      connection.query(sql, [id], (err) => {
        if (err) {
          return res.status(500).json({ error: "Error al eliminar tarea" });
        }
        res.json({ message: "Tarea eliminada correctamente" });
      });
    },

    // EVALUACIONES
    // Crear evaluación
    createEvaluacion: (req, res) => {
      const { tarea_id, usuario_id, nota, retroalimentacion, evaluado_por } =
        req.body;

      if (!tarea_id || !usuario_id || !nota || !evaluado_por) {
        return res.status(400).json({ error: "Campos obligatorios faltantes" });
      }

      // Verificar si el tarea_id existe en la tabla 'backlog'
      const sqlCheckBacklog = `SELECT id FROM backlog WHERE id = $1`;
      connection.query(sqlCheckBacklog, [tarea_id], (err, results) => {
        if (err) {
          return res
            .status(500)
            .json({ error: "Error interno al verificar backlog" });
        }

        if (results.rows.length === 0) {
          return res
            .status(400)
            .json({ error: "El backlog seleccionado no existe" });
        }

        // Si el backlog_id existe, proceder con la inserción de la evaluación
        const sql = `
          INSERT INTO evaluaciones (tarea_id, usuario_id, nota, retroalimentacion, evaluado_por, fecha)
          VALUES ($1, $2, $3, $4, $5, CURRENT_DATE)
          RETURNING id
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
            res.status(201).json({
              id: result.rows[0].id,
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
        WHERE e.evaluado_por = $1
        ORDER BY e.fecha DESC
      `;

      connection.query(sql, [evaluadorId], (err, results) => {
        if (err) {
          return res
            .status(500)
            .json({ error: "Error al cargar evaluaciones" });
        }
        res.json(results.rows);
      });
    },

    // Eliminar evaluación
    deleteEvaluacion: (req, res) => {
      const { id } = req.params;
      const sql = "DELETE FROM evaluaciones WHERE id = $1";

      connection.query(sql, [id], (err) => {
        if (err) {
          return res
            .status(500)
            .json({ error: "Error al eliminar evaluación" });
        }
        res.json({ message: "Evaluación eliminada correctamente" });
      });
    },

    // Actualizar evaluación
    updateEvaluacion: (req, res) => {
      const { id } = req.params;
      const { tarea_id, nota, retroalimentacion } = req.body;

      if (!tarea_id || !nota || !retroalimentacion) {
        return res.status(400).json({ error: "Faltan campos obligatorios" });
      }

      const sql = `
        UPDATE evaluaciones
        SET tarea_id = $1, nota = $2, retroalimentacion = $3
        WHERE id = $4
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
    // Reporte: Tareas por grado y estado
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
        WHERE p.responsable_id = $1
        GROUP BY g.id, g.nombre, t.estado
      `;

      connection.query(sql, [coordinador_id], (err, results) => {
        if (err)
          return res.status(500).json({ error: "Error al obtener tareas" });
        res.json(results.rows);
      });
    },

    // Reporte: Participación en dailys por coordinador
    getParticipacionDailys: (req, res) => {
      const { coordinador_id } = req.params;

      const sql = `
        SELECT u.nombre_completo AS estudiante, COUNT(d.id) AS total_dailys
        FROM dailys d
        LEFT JOIN usuarios u ON d.usuario_id = u.id
        LEFT JOIN sprints s ON d.sprint_id = s.id
        LEFT JOIN proyectos p ON s.curso_id = p.curso_id
        WHERE p.responsable_id = $1
        GROUP BY d.usuario_id, u.nombre_completo
      `;

      connection.query(sql, [coordinador_id], (err, results) => {
        if (err)
          return res
            .status(500)
            .json({ error: "Error al obtener participación" });
        res.json(results.rows);
      });
    },
    
    // Reporte: Participación en dailys por grado
    getParticipacionDailysPorGrado: (req, res) => {
      const sql = `
        SELECT g.nombre AS grado, COUNT(d.id) AS total_dailys
        FROM dailys d
        JOIN usuarios u ON d.usuario_id = u.id
        JOIN usuario_grado ug ON u.id = ug.usuario_id
        JOIN grados g ON ug.grado_id = g.id
        GROUP BY g.nombre
      `;

      connection.query(sql, (err, results) => {
        if (err) {
          return res
            .status(500)
            .json({ error: "Error al obtener participación por grado" });
        }
        res.json(results.rows);
      });
    },

    // Reporte: Estado de proyectos por grado
    getPromedioEvaluacionPorGrado: (req, res) => {
      const { coordinador_id } = req.params;

      const sql = `
        SELECT 
          g.nombre AS grado,
          ROUND(AVG(e.nota), 2) AS promedio
        FROM evaluaciones e
        LEFT JOIN backlog b ON e.tarea_id = b.id
        LEFT JOIN grados g ON b.curso_id = g.id
        WHERE e.evaluado_por = $1
        GROUP BY g.id, g.nombre
      `;

      connection.query(sql, [coordinador_id], (err, results) => {
        if (err)
          return res
            .status(500)
            .json({ error: "Error al obtener promedios por grado" });
        res.json(results.rows);
      });
    },
    
    // Reporte: Ranking de desempeño por grado
    getRetrospectivasPorSprint: (req, res) => {
      const { coordinador_id } = req.params;

      const sql = `
        SELECT s.nombre AS sprint, COUNT(r.id) AS total_retrospectivas
        FROM retrospectivas r
        LEFT JOIN sprints s ON r.sprint_id = s.id
        LEFT JOIN proyectos p ON s.curso_id = p.curso_id
        WHERE p.responsable_id = $1
        GROUP BY s.id, s.nombre
      `;

      connection.query(sql, [coordinador_id], (err, results) => {
        if (err)
          return res
            .status(500)
            .json({ error: "Error al obtener retrospectivas" });
        res.json(results.rows);
      });
    },

    // Reporte: Cumplimiento de tareas por sprint
    getActividadBacklog: (req, res) => {
      const { coordinador_id } = req.params;

      const sql = `
        SELECT g.nombre AS grado, COUNT(b.id) AS tareas_creadas
        FROM backlog b
        LEFT JOIN grados g ON b.curso_id = g.id
        WHERE b.creado_por = $1
        GROUP BY g.id, g.nombre
      `;

      connection.query(sql, [coordinador_id], (err, results) => {
        if (err)
          return res
            .status(500)
            .json({ error: "Error al obtener actividad de backlog" });
        res.json(results.rows);
      });
    },

    // Reporte: Evaluaciones con feedback por grado
    getRankingGrados: (req, res) => {
      const { coordinador_id } = req.params;

      const sql = `
        SELECT 
          g.nombre AS grado,
          ROUND(AVG(e.nota), 2) AS promedio
        FROM evaluaciones e
        LEFT JOIN backlog b ON e.tarea_id = b.id
        LEFT JOIN grados g ON b.curso_id = g.id
        WHERE e.evaluado_por = $1
        GROUP BY g.id, g.nombre
        ORDER BY promedio DESC
      `;

      connection.query(sql, [coordinador_id], (err, results) => {
        if (err)
          return res
            .status(500)
            .json({ error: "Error al obtener ranking por grado" });
        res.json(results.rows);
      });
    },

    // Reporte: Cumplimiento de tareas por coordinador
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
        WHERE p.responsable_id = $1
        GROUP BY u.id, u.nombre_completo
      `;

      connection.query(sql, [coordinador_id], (err, results) => {
        if (err)
          return res
            .status(500)
            .json({ error: "Error al obtener cumplimiento" });
        res.json(results.rows);
      });
    },

    // Reporte: Tareas antiguas pendientes
    getTareasAntiguasPendientes: (req, res) => {
      const { coordinador_id } = req.params;

      const sql = `
        SELECT t.titulo, g.nombre AS grado, b.fecha_creacion
        FROM tareas t
        LEFT JOIN backlog b ON t.backlog_id = b.id
        LEFT JOIN proyectos p ON b.proyecto_id = p.id
        LEFT JOIN grados g ON b.curso_id = g.id
        WHERE t.estado != 'Culminado' AND p.responsable_id = $1
        ORDER BY b.fecha_creacion ASC
        LIMIT 10
      `;

      connection.query(sql, [coordinador_id], (err, results) => {
        if (err)
          return res
            .status(500)
            .json({ error: "Error al obtener tareas antiguas" });
        res.json(results.rows);
      });
    },
  };
};