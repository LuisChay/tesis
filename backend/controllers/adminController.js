module.exports = (connection) => {
  return {

    // PROYECTOS
    // Obtener todos los proyectos con info de grado y responsable
    getProyectos: (req, res) => {
      const sql = `
    SELECT p.id, p.nombre AS titulo, p.objetivos AS objetivo, g.nombre AS grado,
           p.responsable_id, u.nombre_completo AS responsable,
           TO_CHAR(p.fecha_inicio, 'YYYY-MM-DD') AS fechaInicio,
           TO_CHAR(p.fecha_fin, 'YYYY-MM-DD') AS fechaFin
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
        const data = results.rows ? results.rows : results;
        res.json(data);
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
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING id
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
            id: result.rows[0].id,
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
      SET nombre = $1, objetivos = $2, curso_id = $3, responsable_id = $4, fecha_inicio = $5, fecha_fin = $6, actividades = $7
      WHERE id = $8
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
      const sql = "DELETE FROM proyectos WHERE id = $1";
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
        const data = results.rows ? results.rows : results;
        res.json(data);
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

      const sql = "INSERT INTO grados (nombre) VALUES ($1) RETURNING id";
      connection.query(sql, [nombre], (err, result) => {
        if (err) {
          if (err.code === "23505") { // UNIQUE_VIOLATION en PostgreSQL
            return res.status(409).json({ error: "El grado ya existe" });
          }
          return res.status(500).json({ error: "Error al crear grado" });
        }
        res
          .status(201)
          .json({ message: "Grado creado correctamente", id: result.rows[0].id });
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
      const sql = "UPDATE grados SET nombre = $1 WHERE id = $2";
      connection.query(sql, [nombre, id], (err) => {
        if (err)
          return res.status(500).json({ error: "Error al actualizar grado" });
        res.json({ message: "Grado actualizado correctamente" });
      });
    },

    // Eliminar un grado
    deleteGrado: (req, res) => {
      const { id } = req.params;
      const sql = "DELETE FROM grados WHERE id = $1";
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
    GROUP BY g.id, g.nombre
    ORDER BY g.nombre;
  `;
      connection.query(sql, (err, results) => {
        if (err)
          return res
            .status(500)
            .json({ error: "Error al obtener resumen de proyectos" });
        const data = results.rows ? results.rows : results;
        res.json(data);
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
    GROUP BY g.id, g.nombre
    ORDER BY g.nombre;
  `;
      connection.query(sql, (err, results) => {
        if (err)
          return res
            .status(500)
            .json({ error: "Error al obtener resumen de tareas" });
        const data = results.rows ? results.rows : results;
res.json(data);
      });
    },

    // Reporte: Promedio de evaluaciones por grado
    getPromedioEvaluacionesPorGrado: (req, res) => {
      const sql = `
    SELECT 
      g.nombre AS grado,
      ROUND(AVG(e.nota)::numeric, 2) AS promedio_nota
    FROM evaluaciones e
    LEFT JOIN backlog b ON e.tarea_id = b.id
    LEFT JOIN grados g ON b.curso_id = g.id
    GROUP BY g.id, g.nombre
    ORDER BY g.nombre;
  `;
      connection.query(sql, (err, results) => {
        if (err)
          return res
            .status(500)
            .json({ error: "Error al obtener promedios de evaluación" });
        const data = results.rows ? results.rows : results;
res.json(data);
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
    GROUP BY s.id, s.nombre, g.nombre
    ORDER BY s.fecha_inicio DESC
  `;
      connection.query(sql, (err, results) => {
        if (err)
          return res
            .status(500)
            .json({ error: "Error al obtener retrospectivas" });
        const data = results.rows ? results.rows : results;
        res.json(data);
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
    GROUP BY g.id, g.nombre
    ORDER BY g.nombre;
  `;
      connection.query(sql, (err, results) => {
        if (err)
          return res
            .status(500)
            .json({ error: "Error al obtener progreso del backlog" });
        const data = results.rows ? results.rows : results;
        res.json(data);
      });
    },

    // Reporte: Estado de proyectos por grado
    getEstadoProyectosPorGrado: (req, res) => {
      const sql = `
    SELECT 
      g.nombre AS grado,
      SUM(CASE WHEN p.fecha_fin IS NULL OR p.fecha_fin >= CURRENT_DATE THEN 1 ELSE 0 END) AS activos,
      SUM(CASE WHEN p.fecha_fin < CURRENT_DATE THEN 1 ELSE 0 END) AS finalizados
    FROM grados g
    LEFT JOIN proyectos p ON p.curso_id = g.id
    GROUP BY g.id, g.nombre
    ORDER BY g.nombre;
  `;
      connection.query(sql, (err, results) => {
        if (err)
          return res
            .status(500)
            .json({ error: "Error al obtener estado de proyectos" });
        const data = results.rows ? results.rows : results;
        res.json(data);
      });
    },

    // Reporte: Ranking de desempeño por grado
    getRankingDesempenoPorGrado: (req, res) => {
      const sql = `
    SELECT 
      g.nombre AS grado,
      ROUND(AVG(e.nota)::numeric, 2) AS promedio_nota
    FROM evaluaciones e
    LEFT JOIN backlog b ON e.tarea_id = b.id
    LEFT JOIN grados g ON b.curso_id = g.id
    GROUP BY g.id, g.nombre
    ORDER BY promedio_nota DESC;
  `;
      connection.query(sql, (err, results) => {
        if (err)
          return res
            .status(500)
            .json({ error: "Error al obtener ranking de desempeño" });
        const data = results.rows ? results.rows : results;
        res.json(data);
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
    GROUP BY s.id, s.nombre, g.nombre
    ORDER BY s.fecha_inicio DESC
  `;
      connection.query(sql, (err, results) => {
        if (err)
          return res
            .status(500)
            .json({ error: "Error al obtener cumplimiento por sprint" });
        const data = results.rows ? results.rows : results;
        res.json(data);
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
    GROUP BY g.id, g.nombre
    ORDER BY g.nombre;
  `;
      connection.query(sql, (err, results) => {
        if (err)
          return res
            .status(500)
            .json({ error: "Error al obtener retroalimentaciones" });
        const data = results.rows ? results.rows : results;
        res.json(data);
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
        WHERE ug.usuario_id = $1
      `;
      connection.query(sql, [usuario_id], (err, results) => {
        if (err)
          return res.status(500).json({ error: "Error al obtener grados" });
        const data = results.rows ? results.rows : results;
        res.json(data);
      });
    },

    // Asignar grado a usuario
    asignarGrado: (req, res) => {
      const { usuario_id, grado_id } = req.body;

      if (!usuario_id || !grado_id)
        return res.status(400).json({ error: "Datos incompletos" });

      const checkSql = `SELECT id FROM usuario_grado WHERE usuario_id = $1 AND grado_id = $2`;
      connection.query(checkSql, [usuario_id, grado_id], (err, rows) => {
        if (err)
          return res
            .status(500)
            .json({ error: "Error al verificar duplicado" });
        if (rows.length > 0)
          return res.status(409).json({ error: "Ya está asignado" });

        const insertSql = `INSERT INTO usuario_grado (usuario_id, grado_id) VALUES ($1, $2) RETURNING id`;
        connection.query(insertSql, [usuario_id, grado_id], (err, result) => {
          if (err)
            return res.status(500).json({ error: "Error al asignar grado" });
          res
            .status(201)
            .json({ message: "Asignación exitosa", id: result.rows[0].id });
        });
      });
    },

    // Eliminar asignación
    eliminarAsignacion: (req, res) => {
      const { usuario_id, grado_id } = req.params;
      const sql = `DELETE FROM usuario_grado WHERE usuario_id = $1 AND grado_id = $2`;
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