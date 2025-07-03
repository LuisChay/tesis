module.exports = (connection) => {
  return {
    // SPRINTS
    // Obtener todos los sprints
    getSprints: (req, res) => {
      const sql = `
        SELECT 
          s.id, 
          s.nombre, 
          s.fecha_inicio, 
          s.fecha_fin, 
          s.objetivo,
          s.curso_id,
          g.nombre AS grado
        FROM sprints s
        LEFT JOIN grados g ON s.curso_id = g.id
        ORDER BY s.fecha_inicio DESC
      `;
      connection.query(sql, (err, results) => {
        if (err) {
          console.error("Error al obtener los sprints:", err);
          return res
            .status(500)
            .json({ error: "Error al obtener los sprints" });
        }
        res.json(results.rows);
      });
    },

    // Crear un nuevo sprint
    createSprint: (req, res) => {
      const { nombre, fechaInicio, fechaFin, meta, curso_id } = req.body;
      // Validación básica
      if (!nombre || !fechaInicio || !fechaFin || !curso_id) {
        return res.status(400).json({ error: "Faltan campos obligatorios" });
      }

      const sql = `
        INSERT INTO sprints (nombre, fecha_inicio, fecha_fin, objetivo, curso_id)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING id
      `;

      connection.query(
        sql,
        [nombre, fechaInicio, fechaFin, meta, curso_id],
        (err, result) => {
          if (err) {
            console.error("Error al crear el sprint:", err);
            return res.status(500).json({ error: "Error al crear el sprint" });
          }

          res.status(201).json({
            id: result.rows[0].id,
            message: "Sprint creado correctamente",
          });
        }
      );
    },

    // Cerrar un sprint
    closeSprint: (req, res) => {
      const { id } = req.params;

      const sql = `
        UPDATE sprints
        SET estado = 'Cerrado'
        WHERE id = $1
      `;

      connection.query(sql, [id], (err, result) => {
        if (err) {
          console.error("Error al cerrar el sprint:", err);
          return res.status(500).json({ error: "Error al cerrar el sprint" });
        }

        res.json({ message: "Sprint cerrado correctamente" });
      });
    },

    // Actualizar un sprint
    updateSprint: (req, res) => {
      const { id } = req.params;
      const { nombre, fechaInicio, fechaFin, meta, curso_id } = req.body;

      if (!nombre || !fechaInicio || !fechaFin || !curso_id) {
        return res.status(400).json({ error: "Faltan campos obligatorios" });
      }

      const sql = `
        UPDATE sprints
        SET nombre = $1, fecha_inicio = $2, fecha_fin = $3, objetivo = $4, curso_id = $5
        WHERE id = $6
      `;

      connection.query(
        sql,
        [nombre, fechaInicio, fechaFin, meta, curso_id, id],
        (err) => {
          if (err) {
            console.error("Error al actualizar el sprint:", err);
            return res
              .status(500)
              .json({ error: "Error al actualizar el sprint" });
          }

          res.json({ message: "Sprint actualizado correctamente" });
        }
      );
    },

    // Eliminar un sprint
    deleteSprint: (req, res) => {
      const { id } = req.params;

      const sql = `DELETE FROM sprints WHERE id = $1`;

      connection.query(sql, [id], (err) => {
        if (err) {
          console.error("Error al eliminar el sprint:", err);
          return res.status(500).json({ error: "Error al eliminar el sprint" });
        }

        res.json({ message: "Sprint eliminado correctamente" });
      });
    },

    // DAILYS
    // Obtener todos los sprints por grado
    getSprintsByGrado: (req, res) => {
      const { grado_id } = req.params;
      const sql = `
        SELECT s.*, g.nombre AS grado
        FROM sprints s
        LEFT JOIN grados g ON s.curso_id = g.id
        WHERE s.curso_id = $1
        ORDER BY s.fecha_inicio DESC
      `;

      connection.query(sql, [grado_id], (err, results) => {
        if (err) {
          console.error("Error al obtener sprints por grado:", err);
          return res.status(500).json({ error: "Error al obtener sprints" });
        }
        res.json(results.rows);
      });
    },

    getSprintsPorGrado: (req, res) => {
      const { grado_id } = req.params;

      const sql = `
        SELECT id, nombre
        FROM sprints
        WHERE curso_id = $1
        ORDER BY fecha_inicio DESC
      `;

      connection.query(sql, [grado_id], (err, results) => {
        if (err) {
          console.error("Error al obtener sprints por grado:", err);
          return res
            .status(500)
            .json({ error: "Error al obtener sprints por grado" });
        }
        res.json(results.rows);
      });
    },

    // Crear una nueva entrada en Dailys con validación del grado
    createDaily: (req, res) => {
      const { fecha, usuario_id, ayer, avances, bloqueos, sprint_id } =
        req.body;

      if (
        !fecha ||
        !usuario_id ||
        !ayer ||
        !avances ||
        !bloqueos ||
        !sprint_id
      ) {
        return res.status(400).json({ error: "Faltan campos obligatorios" });
      }

      const sql = `
        INSERT INTO dailys (fecha, usuario_id, ayer, avances, bloqueos, sprint_id)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING id
      `;

      connection.query(
        sql,
        [fecha, usuario_id, ayer, avances, bloqueos, sprint_id],
        (err, result) => {
          if (err) {
            console.error("Error al crear la entrada diaria:", err);
            return res
              .status(500)
              .json({ error: "Error al crear la entrada diaria" });
          }
          res.status(201).json({
            id: result.rows[0].id,
            message: "Entrada diaria registrada correctamente",
          });
        }
      );
    },

    // Obtener las entradas de Dailys por usuario
    getDailysByUsuario: (req, res) => {
      const { usuario_id } = req.params;

      const sql = `
        SELECT d.id, d.fecha, d.ayer, d.avances, d.bloqueos, g.nombre AS grado
        FROM dailys d
        LEFT JOIN sprints s ON d.sprint_id = s.id
        LEFT JOIN grados g ON s.curso_id = g.id
        WHERE d.usuario_id = $1
        ORDER BY d.fecha DESC
      `;

      connection.query(sql, [usuario_id], (err, results) => {
        if (err) {
          console.error("Error al obtener las entradas diarias:", err);
          return res
            .status(500)
            .json({ error: "Error al obtener las entradas diarias" });
        }
        res.json(results.rows);
      });
    },

    // Actualizar una entrada de Dailys
    updateDaily: (req, res) => {
      const { id } = req.params;
      const { fecha, usuario_id, ayer, avances, bloqueos, sprint_id } =
        req.body;

      if (
        !fecha ||
        !usuario_id ||
        !ayer ||
        !avances ||
        !bloqueos ||
        !sprint_id
      ) {
        return res.status(400).json({ error: "Faltan campos obligatorios" });
      }

      const sql = `
        UPDATE dailys
        SET fecha = $1, usuario_id = $2, ayer = $3, avances = $4, bloqueos = $5, sprint_id = $6
        WHERE id = $7
      `;

      const values = [
        fecha,
        usuario_id,
        ayer,
        avances,
        bloqueos,
        sprint_id,
        id,
      ];

      connection.query(sql, values, (err) => {
        if (err) {
          console.error("Error al actualizar la entrada diaria:", err);
          return res
            .status(500)
            .json({ error: "Error al actualizar la entrada diaria" });
        }
        res.json({ message: "Entrada diaria actualizada correctamente" });
      });
    },

    // Eliminar una entrada de Dailys
    deleteDaily: (req, res) => {
      const { id } = req.params;

      const sql = "DELETE FROM dailys WHERE id = $1";

      connection.query(sql, [id], (err) => {
        if (err) {
          console.error("Error al eliminar la entrada diaria:", err);
          return res
            .status(500)
            .json({ error: "Error al eliminar la entrada diaria" });
        }
        res.json({ message: "Entrada diaria eliminada correctamente" });
      });
    },

    getDailysPorUsuarioYGrado: (req, res) => {
      const { usuario_id, grado_id } = req.params;

      const sql = `
        SELECT d.id, d.fecha, d.ayer, d.avances, d.bloqueos,
               g.nombre AS grado,
               s.nombre AS sprint
        FROM dailys d
        INNER JOIN sprints s ON d.sprint_id = s.id
        INNER JOIN grados g ON s.curso_id = g.id
        WHERE d.usuario_id = $1 AND g.id = $2
        ORDER BY d.fecha DESC
      `;

      connection.query(sql, [usuario_id, grado_id], (err, results) => {
        if (err) {
          console.error("Error al obtener entradas diarias:", err);
          return res
            .status(500)
            .json({ error: "Error al obtener entradas diarias" });
        }
        res.json(results.rows);
      });
    },

    //RETROSPECTIVAS
    // Crear retrospectiva (ahora extrae curso_id directamente del sprint)
    createRetrospectiva: (req, res) => {
      const {
        sprint_id,
        usuario_id,
        puntos_buenos,
        puntos_mejorar,
        acciones_mejora,
        fecha,
      } = req.body;

      if (
        !sprint_id ||
        !usuario_id ||
        !puntos_buenos ||
        !puntos_mejorar ||
        !acciones_mejora ||
        !fecha
      ) {
        return res.status(400).json({ error: "Faltan campos obligatorios" });
      }

      const sql = `
        INSERT INTO retrospectivas (sprint_id, usuario_id, puntos_buenos, puntos_mejorar, acciones_mejora, fecha)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING id
      `;

      connection.query(
        sql,
        [
          sprint_id,
          usuario_id,
          puntos_buenos,
          puntos_mejorar,
          acciones_mejora,
          fecha,
        ],
        (err, result) => {
          if (err) {
            console.error("Error al registrar la retrospectiva:", err);
            return res
              .status(500)
              .json({ error: "Error al registrar la retrospectiva" });
          }

          res.status(201).json({
            message: "Retrospectiva registrada correctamente",
            id: result.rows[0].id,
          });
        }
      );
    },

    // Obtener retrospectivas por usuario
    getRetrospectivasByUsuario: (req, res) => {
      const { usuario_id } = req.params;

      const sql = `
        SELECT r.*, s.nombre AS sprint, g.nombre AS grado
        FROM retrospectivas r
        LEFT JOIN sprints s ON r.sprint_id = s.id
        LEFT JOIN grados g ON s.curso_id = g.id
        WHERE r.usuario_id = $1
        ORDER BY r.fecha DESC
      `;

      connection.query(sql, [usuario_id], (err, results) => {
        if (err) {
          console.error("Error al obtener retrospectivas:", err);
          return res
            .status(500)
            .json({ error: "Error al obtener retrospectivas" });
        }
        res.json(results.rows);
      });
    },

    // Actualizar retrospectiva
    updateRetrospectiva: (req, res) => {
      const { id } = req.params;
      const { puntos_buenos, puntos_mejorar, acciones_mejora, fecha } =
        req.body;

      if (!puntos_buenos || !puntos_mejorar || !acciones_mejora || !fecha) {
        return res.status(400).json({ error: "Faltan campos obligatorios" });
      }

      const sql = `
        UPDATE retrospectivas
        SET puntos_buenos = $1, puntos_mejorar = $2, acciones_mejora = $3, fecha = $4
        WHERE id = $5
      `;

      connection.query(
        sql,
        [puntos_buenos, puntos_mejorar, acciones_mejora, fecha, id],
        (err) => {
          if (err) {
            console.error("Error al actualizar la retrospectiva:", err);
            return res
              .status(500)
              .json({ error: "Error al actualizar la retrospectiva" });
          }

          res.json({ message: "Retrospectiva actualizada correctamente" });
        }
      );
    },

    // Eliminar retrospectiva
    deleteRetrospectiva: (req, res) => {
      const { id } = req.params;

      const sql = "DELETE FROM retrospectivas WHERE id = $1";

      connection.query(sql, [id], (err) => {
        if (err) {
          console.error("Error al eliminar la retrospectiva:", err);
          return res
            .status(500)
            .json({ error: "Error al eliminar la retrospectiva" });
        }

        res.json({ message: "Retrospectiva eliminada correctamente" });
      });
    },

    // Obtener retrospectivas por usuario y grado
    getRetrosByUsuarioAndGrado: (req, res) => {
      const { usuario_id, grado_id } = req.params;

      const sql = `
        SELECT r.*, g.nombre AS grado
        FROM retrospectivas r
        LEFT JOIN sprints s ON r.sprint_id = s.id
        LEFT JOIN grados g ON s.curso_id = g.id
        WHERE r.usuario_id = $1 AND g.id = $2
        ORDER BY r.fecha DESC
      `;

      connection.query(sql, [usuario_id, grado_id], (err, results) => {
        if (err) {
          console.error("Error al obtener retrospectivas por grado:", err);
          return res
            .status(500)
            .json({ error: "Error al obtener retrospectivas" });
        }
        res.json(results.rows);
      });
    },

    // TAREAS
    // Crear tarea Kanban
    createTarea: (req, res) => {
      const {
        titulo,
        descripcion,
        prioridad,
        backlog_id,
        sprint_id,
        asignado_a,
      } = req.body;

      if (!titulo || !backlog_id) {
        return res
          .status(400)
          .json({ error: "Título y backlog_id son obligatorios" });
      }

      const sql = `
        INSERT INTO tareas (titulo, descripcion, prioridad, estado, backlog_id, sprint_id, asignado_a)
        VALUES ($1, $2, $3, 'Por hacer', $4, $5, $6)
        RETURNING id
      `;

      connection.query(
        sql,
        [
          titulo,
          descripcion,
          prioridad,
          backlog_id,
          sprint_id || null,
          asignado_a || null,
        ],
        (err, result) => {
          if (err) {
            console.error("Error al crear tarea:", err);
            return res.status(500).json({ error: "Error al crear tarea" });
          }
          res.status(201).json({
            message: "Tarea creada correctamente",
            id: result.rows[0].id,
          });
        }
      );
    },

    // Obtener tareas por curso (vía backlog → curso)
    getTareasByCurso: (req, res) => {
      const { curso_id } = req.params;

      const sql = `
        SELECT 
          t.id, t.titulo, t.descripcion, t.prioridad, t.estado, 
          b.curso_id AS grado_id,
          b.titulo AS padre
        FROM tareas t
        LEFT JOIN backlog b ON t.backlog_id = b.id
        WHERE b.curso_id = $1 AND estado != 'Culminado'
      `;

      connection.query(sql, [curso_id], (err, results) => {
        if (err)
          return res
            .status(500)
            .json({ error: "Error al obtener tareas por curso" });
        res.json(results.rows);
      });
    },

    // Actualizar tarea Kanban
    updateTarea: (req, res) => {
      const { id } = req.params;
      const { titulo, descripcion, prioridad, estado } = req.body;

      const sql = `
        UPDATE tareas
        SET titulo = $1, descripcion = $2, prioridad = $3, estado = $4
        WHERE id = $5
      `;

      connection.query(
        sql,
        [titulo, descripcion, prioridad, estado, id],
        (err) => {
          if (err)
            return res
              .status(500)
              .json({ error: "Error al actualizar la tarea" });
          res.json({ message: "Tarea actualizada correctamente" });
        }
      );
    },

    // Eliminar tarea Kanban
    deleteTarea: (req, res) => {
      const { id } = req.params;

      const sql = `DELETE FROM tareas WHERE id = $1`;

      connection.query(sql, [id], (err) => {
        if (err)
          return res.status(500).json({ error: "Error al eliminar la tarea" });
        res.json({ message: "Tarea eliminada correctamente" });
      });
    },

    // Actualizar estado de tarea Kanban
    updateEstadoTarea: (req, res) => {
      const { id } = req.params;
      const { estado } = req.body;

      if (!estado) {
        return res.status(400).json({ error: "El estado es requerido" });
      }

      const sql = `UPDATE tareas SET estado = $1 WHERE id = $2`;

      connection.query(sql, [estado, id], (err) => {
        if (err) {
          console.error("Error al actualizar estado de la tarea:", err);
          return res.status(500).json({ error: "Error al actualizar estado" });
        }
        res.json({ message: "Estado actualizado correctamente" });
      });
    },

    // Marcar tarea como culminada
    culminarTarea: (req, res) => {
      const { id } = req.params;

      const sql = `
        UPDATE tareas
        SET estado = 'Culminado'
        WHERE id = $1
      `;

      connection.query(sql, [id], (err) => {
        if (err) {
          console.error("Error al actualizar estado:", err);
          return res
            .status(500)
            .json({ error: "Error al marcar como culminada" });
        }
        res.json({ message: "Tarea marcada como culminada" });
      });
    },

    // REPORTES
    // 1. Progreso de tareas por grado
    getTareasPorGrado: (req, res) => {
      const curso_id = req.params.curso_id;
      const sql = `
        SELECT estado, COUNT(*) AS total
        FROM tareas t
        JOIN backlog b ON t.backlog_id = b.id
        WHERE b.curso_id = $1
        GROUP BY estado;
      `;
      connection.query(sql, [curso_id], (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results.rows);
      });
    },

    // 2. Evaluaciones promedio por grado
    getEvaluacionesPorGrado: (req, res) => {
      const curso_id = req.params.curso_id;
      const sql = `
        SELECT g.nombre AS grado, ROUND(AVG(e.nota), 2) AS promedio_nota
        FROM grados g
        JOIN backlog b ON b.curso_id = g.id
        JOIN evaluaciones e ON e.tarea_id = b.id
        WHERE g.id = $1
        GROUP BY g.nombre;
      `;
      connection.query(sql, [curso_id], (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results.rows);
      });
    },

    // 3. Participación en dailys por usuario
    getDailysPorGrado: (req, res) => {
      const grado_id = req.params.grado_id;

      const sql = `
        SELECT g.nombre AS grado, COUNT(d.id) AS total_dailys
        FROM dailys d
        JOIN usuarios u ON d.usuario_id = u.id
        JOIN usuario_grado ug ON ug.usuario_id = u.id
        JOIN grados g ON ug.grado_id = g.id
        WHERE g.id = $1
        GROUP BY g.nombre;
      `;

      connection.query(sql, [grado_id], (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results.rows);
      });
    },

    // 4. Promedio por sprint
    getPromedioPorSprintPorGrado: (req, res) => {
      const grado_id = req.params.grado_id;

      const sql = `
        SELECT g.nombre AS grado, ROUND(AVG(e.nota), 2) AS promedio
        FROM evaluaciones e
        JOIN backlog b ON e.tarea_id = b.id
        JOIN grados g ON b.curso_id = g.id
        WHERE b.curso_id = $1
        GROUP BY g.nombre;
      `;

      connection.query(sql, [grado_id], (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results.rows);
      });
    },

    // 6. Retrospectivas por sprint
    getRetrospectivasPorSprint: (req, res) => {
      const curso_id = req.params.curso_id;
      const sql = `
        SELECT s.nombre AS sprint, COUNT(r.id) AS total_retrospectivas
        FROM retrospectivas r
        JOIN sprints s ON r.sprint_id = s.id
        WHERE s.curso_id = $1
        GROUP BY s.nombre;
      `;
      connection.query(sql, [curso_id], (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results.rows);
      });
    },

    // 7. Feedback recibido por grado
    getFeedbackPorGrado: (req, res) => {
      const curso_id = req.params.curso_id;
      const sql = `
        SELECT 
          g.nombre AS grado,
          COUNT(e.id) AS total_evaluaciones,
          COUNT(e.retroalimentacion) AS con_retroalimentacion
        FROM evaluaciones e
        JOIN backlog b ON e.tarea_id = b.id
        JOIN grados g ON b.curso_id = g.id
        WHERE g.id = $1
        GROUP BY g.nombre;
      `;
      connection.query(sql, [curso_id], (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results.rows[0] || {});
      });
    },

    // 8. Sprints finalizados
    getSprintsFinalizadosPorGrado: (req, res) => {
      const curso_id = req.params.curso_id;
      const sql = `
        SELECT id, nombre, fecha_fin
        FROM sprints
        WHERE curso_id = $1 AND fecha_fin < CURRENT_DATE
        ORDER BY fecha_fin DESC;
      `;
      connection.query(sql, [curso_id], (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results.rows);
      });
    },

    // 9. Tareas antiguas pendientes
    getTareasAntiguasPendientes: (req, res) => {
      const curso_id = req.params.curso_id;
      const sql = `
        SELECT t.id, t.titulo, b.fecha_creacion
        FROM tareas t
        JOIN backlog b ON t.backlog_id = b.id
        WHERE b.curso_id = $1 AND t.estado NOT IN ('Hecho', 'Culminado')
        ORDER BY b.fecha_creacion ASC
        LIMIT 5;
      `;
      connection.query(sql, [curso_id], (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results.rows);
      });
    },

    // 10. Racha de participación en dailys
    getDiasConsecutivosDailys: (req, res) => {
      const curso_id = req.params.curso_id;
      const sql = `
        SELECT u.id, u.nombre_completo, COUNT(*) AS total_dailys
        FROM usuarios u
        JOIN dailys d ON u.id = d.usuario_id
        WHERE u.curso_id = $1
        GROUP BY u.id, u.nombre_completo
        ORDER BY total_dailys DESC
        LIMIT 1;
      `;
      connection.query(sql, [curso_id], (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results.rows[0] || { dias_consecutivos: 0 });
      });
    },
  };
};