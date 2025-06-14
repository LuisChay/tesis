module.exports = (connection) => {
  return {

    // PROYECTOS
    // Obtener todos los proyectos con info de grado y responsable
    getProyectos: (req, res) => {
      const sql = `
    SELECT p.id, p.nombre AS titulo, p.objetivos AS objetivo, g.nombre AS grado,
           p.responsable_id, u.nombre_completo AS responsable,
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
      const {
        nombre,
        objetivos,
        curso_id,
        responsable_id,
        fecha_inicio,
        fecha_fin,
        actividades,
      } = req.body;

      if (!nombre || !objetivos || !curso_id) {
        return res.status(400).json({ error: "Faltan campos obligatorios" });
      }

      const sql = `
        INSERT INTO proyectos (nombre, objetivos, curso_id, responsable_id, fecha_inicio, fecha_fin, actividades)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `;

      connection.query(
        sql,
        [
          nombre,
          objetivos,
          curso_id,
          responsable_id || null,
          fecha_inicio || null,
          fecha_fin || null,
          actividades || null,
        ],
        (err, result) => {
          if (err)
            return res.status(500).json({ error: "Error al crear proyecto" });
          res.status(201).json({
            message: "Proyecto creado correctamente",
            id: result.insertId,
          });
        }
      );
    },

    // Actualizar proyecto
    updateProyecto: (req, res) => {
      const { id } = req.params;
      const {
        nombre,
        objetivos,
        curso_id,
        responsable_id,
        fecha_inicio,
        fecha_fin,
        actividades,
      } = req.body;
      if (!nombre || !objetivos || !curso_id) {
        return res.status(400).json({ error: "Faltan campos obligatorios" });
      }
      const sql = `
      UPDATE proyectos
      SET nombre = ?, objetivos = ?, curso_id = ?, responsable_id = ?, fecha_inicio = ?, fecha_fin = ?, actividades = ?
      WHERE id = ?
    `;
      connection.query(
        sql,
        [
          nombre,
          objetivos,
          curso_id,
          responsable_id || null,
          fecha_inicio || null,
          fecha_fin || null,
          actividades || null,
          id,
        ],
        (err) => {
          if (err)
            return res
              .status(500)
              .json({ error: "Error al actualizar proyecto" });
          res.json({ message: "Proyecto actualizado correctamente" });
        }
      );
    },

    // Eliminar proyecto
    deleteProyecto: (req, res) => {
      const { id } = req.params;
      const sql = "DELETE FROM proyectos WHERE id = ?";
      connection.query(sql, [id], (err) => {
        if (err)
          return res.status(500).json({ error: "Error al eliminar proyecto" });
        res.json({ message: "Proyecto eliminado correctamente" });
      });
    },

    // GRADOS
    // Obtener todos los grados
    getGrados: (req, res) => {
      const sql = "SELECT * FROM grados ORDER BY nombre ASC";
      connection.query(sql, (err, results) => {
        if (err)
          return res.status(500).json({ error: "Error al obtener grados" });
        res.json(results);
      });
    },

    // Crear un nuevo grado
    createGrado: (req, res) => {
      const { nombre } = req.body;

      if (!nombre) {
        return res
          .status(400)
          .json({ error: "El nombre del grado es obligatorio" });
      }

      const sql = "INSERT INTO grados (nombre) VALUES (?)";
      connection.query(sql, [nombre], (err, result) => {
        if (err) {
          if (err.code === "ER_DUP_ENTRY") {
            return res.status(409).json({ error: "El grado ya existe" });
          }
          return res.status(500).json({ error: "Error al crear grado" });
        }
        res
          .status(201)
          .json({ message: "Grado creado correctamente", id: result.insertId });
      });
    },

    // Actualizar un grado
    updateGrado: (req, res) => {
      const { id } = req.params;
      const { nombre } = req.body;
      if (!nombre) {
        return res
          .status(400)
          .json({ error: "El nombre del grado es obligatorio" });
      }
      const sql = "UPDATE grados SET nombre = ? WHERE id = ?";
      connection.query(sql, [nombre, id], (err) => {
        if (err)
          return res.status(500).json({ error: "Error al actualizar grado" });
        res.json({ message: "Grado actualizado correctamente" });
      });
    },

    // Eliminar un grado
    deleteGrado: (req, res) => {
      const { id } = req.params;
      const sql = "DELETE FROM grados WHERE id = ?";
      connection.query(sql, [id], (err) => {
        if (err)
          return res.status(500).json({ error: "Error al eliminar grado" });
        res.json({ message: "Grado eliminado correctamente" });
      });
    },

    // REPORTES
    // Reporte: Cantidad de proyectos por grado
    getResumenProyectosPorGrado: (req, res) => {
      const sql = `
    SELECT g.nombre AS grado, COUNT(p.id) AS total_proyectos
    FROM grados g
    LEFT JOIN proyectos p ON p.curso_id = g.id
    GROUP BY g.id
    ORDER BY g.nombre;
  `;
      connection.query(sql, (err, results) => {
        if (err)
          return res
            .status(500)
            .json({ error: "Error al obtener resumen de proyectos" });
        res.json(results);
      });
    },

    // Reporte: Tareas completadas vs totales por grado
    getResumenTareasPorGrado: (req, res) => {
      const sql = `
    SELECT 
      g.nombre AS grado,
      COUNT(t.id) AS total_tareas,
      SUM(CASE WHEN t.estado = 'Culminado' THEN 1 ELSE 0 END) AS tareas_completadas
    FROM grados g
    LEFT JOIN backlog b ON b.curso_id = g.id
    LEFT JOIN tareas t ON t.backlog_id = b.id
    GROUP BY g.id
    ORDER BY g.nombre;
  `;
      connection.query(sql, (err, results) => {
        if (err)
          return res
            .status(500)
            .json({ error: "Error al obtener resumen de tareas" });
        res.json(results);
      });
    },

    // Reporte: Promedio de evaluaciones por grado
    getPromedioEvaluacionesPorGrado: (req, res) => {
      const sql = `
    SELECT 
      g.nombre AS grado,
      ROUND(AVG(e.nota), 2) AS promedio_nota
    FROM evaluaciones e
    LEFT JOIN backlog b ON e.tarea_id = b.id
    LEFT JOIN grados g ON b.curso_id = g.id
    GROUP BY g.id
    ORDER BY g.nombre;
  `;
      connection.query(sql, (err, results) => {
        if (err)
          return res
            .status(500)
            .json({ error: "Error al obtener promedios de evaluación" });
        res.json(results);
      });
    },
    
    // Reporte: Cantidad de retrospectivas por sprint
    getRetrospectivasPorSprint: (req, res) => {
      const sql = `
    SELECT 
      s.id AS sprint_id,
      s.nombre AS sprint,
      g.nombre AS grado,
      COUNT(r.id) AS total_retrospectivas
    FROM sprints s
    LEFT JOIN grados g ON s.curso_id = g.id
    LEFT JOIN retrospectivas r ON r.sprint_id = s.id
    GROUP BY s.id
    ORDER BY s.fecha_inicio DESC
  `;
      connection.query(sql, (err, results) => {
        if (err)
          return res
            .status(500)
            .json({ error: "Error al obtener retrospectivas" });
        res.json(results);
      });
    },

    // Reporte: Progreso del backlog por grado
    getProgresoBacklogPorGrado: (req, res) => {
      const sql = `
    SELECT 
      g.nombre AS grado,
      COUNT(t.id) AS total_tareas,
      SUM(CASE WHEN t.estado = 'Culminado' THEN 1 ELSE 0 END) AS tareas_completadas
    FROM grados g
    LEFT JOIN backlog b ON b.curso_id = g.id
    LEFT JOIN tareas t ON t.backlog_id = b.id
    GROUP BY g.id
    ORDER BY g.nombre;
  `;
      connection.query(sql, (err, results) => {
        if (err)
          return res
            .status(500)
            .json({ error: "Error al obtener progreso del backlog" });
        res.json(results);
      });
    },

    // Reporte: Estado de proyectos por grado
    getEstadoProyectosPorGrado: (req, res) => {
      const sql = `
    SELECT 
      g.nombre AS grado,
      SUM(CASE WHEN p.fecha_fin IS NULL OR p.fecha_fin >= CURDATE() THEN 1 ELSE 0 END) AS activos,
      SUM(CASE WHEN p.fecha_fin < CURDATE() THEN 1 ELSE 0 END) AS finalizados
    FROM grados g
    LEFT JOIN proyectos p ON p.curso_id = g.id
    GROUP BY g.id
    ORDER BY g.nombre;
  `;
      connection.query(sql, (err, results) => {
        if (err)
          return res
            .status(500)
            .json({ error: "Error al obtener estado de proyectos" });
        res.json(results);
      });
    },

    // Reporte: Ranking de desempeño por grado
    getRankingDesempenoPorGrado: (req, res) => {
      const sql = `
    SELECT 
      g.nombre AS grado,
      ROUND(AVG(e.nota), 2) AS promedio_nota
    FROM evaluaciones e
    LEFT JOIN backlog b ON e.tarea_id = b.id
    LEFT JOIN grados g ON b.curso_id = g.id
    GROUP BY g.id
    ORDER BY promedio_nota DESC;
  `;
      connection.query(sql, (err, results) => {
        if (err)
          return res
            .status(500)
            .json({ error: "Error al obtener ranking de desempeño" });
        res.json(results);
      });
    },

    // Reporte: Cumplimiento de tareas por sprint
    getCumplimientoPorSprint: (req, res) => {
      const sql = `
    SELECT 
      s.id AS sprint_id,
      s.nombre AS sprint,
      g.nombre AS grado,
      COUNT(t.id) AS tareas_totales,
      SUM(CASE WHEN t.estado = 'Culminado' THEN 1 ELSE 0 END) AS tareas_completadas
    FROM sprints s
    LEFT JOIN grados g ON s.curso_id = g.id
    LEFT JOIN tareas t ON t.sprint_id = s.id
    GROUP BY s.id
    ORDER BY s.fecha_inicio DESC
  `;
      connection.query(sql, (err, results) => {
        if (err)
          return res
            .status(500)
            .json({ error: "Error al obtener cumplimiento por sprint" });
        res.json(results);
      });
    },

    // Reporte: Evaluaciones con feedback por grado
    getEvaluacionesConFeedback: (req, res) => {
      const sql = `
    SELECT 
      g.nombre AS grado,
      COUNT(e.id) AS total_evaluaciones,
      SUM(CASE WHEN e.retroalimentacion IS NOT NULL AND e.retroalimentacion != '' THEN 1 ELSE 0 END) AS con_retroalimentacion
    FROM evaluaciones e
    LEFT JOIN backlog b ON e.tarea_id = b.id
    LEFT JOIN grados g ON b.curso_id = g.id
    GROUP BY g.id
    ORDER BY g.nombre;
  `;
      connection.query(sql, (err, results) => {
        if (err)
          return res
            .status(500)
            .json({ error: "Error al obtener retroalimentaciones" });
        res.json(results);
      });
    },

    // ASIGNACIONES
    // Obtener grados asignados a un usuario
    getGradosPorUsuario: (req, res) => {
      const { usuario_id } = req.params;

      const sql = `
        SELECT g.id, g.nombre
        FROM usuario_grado ug
        JOIN grados g ON ug.grado_id = g.id
        WHERE ug.usuario_id = ?
      `;
      connection.query(sql, [usuario_id], (err, results) => {
        if (err)
          return res.status(500).json({ error: "Error al obtener grados" });
        res.json(results);
      });
    },

    // Asignar grado a usuario
    asignarGrado: (req, res) => {
      const { usuario_id, grado_id } = req.body;

      if (!usuario_id || !grado_id)
        return res.status(400).json({ error: "Datos incompletos" });

      const checkSql = `SELECT id FROM usuario_grado WHERE usuario_id = ? AND grado_id = ?`;
      connection.query(checkSql, [usuario_id, grado_id], (err, rows) => {
        if (err)
          return res
            .status(500)
            .json({ error: "Error al verificar duplicado" });
        if (rows.length > 0)
          return res.status(409).json({ error: "Ya está asignado" });

        const insertSql = `INSERT INTO usuario_grado (usuario_id, grado_id) VALUES (?, ?)`;
        connection.query(insertSql, [usuario_id, grado_id], (err, result) => {
          if (err)
            return res.status(500).json({ error: "Error al asignar grado" });
          res
            .status(201)
            .json({ message: "Asignación exitosa", id: result.insertId });
        });
      });
    },

    // Eliminar asignación
    eliminarAsignacion: (req, res) => {
      const { usuario_id, grado_id } = req.params;
      const sql = `DELETE FROM usuario_grado WHERE usuario_id = ? AND grado_id = ?`;
      connection.query(sql, [usuario_id, grado_id], (err) => {
        if (err)
          return res
            .status(500)
            .json({ error: "Error al eliminar asignación" });
        res.json({ message: "Asignación eliminada" });
      });
    },
  };
};
