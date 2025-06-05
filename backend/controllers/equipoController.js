module.exports = (connection) => {
  return {
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
          return res.status(500).json({ error: "Error al obtener los sprints" });
        }
        res.json(results);
      });
    },

    // Crear un nuevo sprint
createSprint: (req, res) => {
  const { nombre, fechaInicio, fechaFin, meta, curso_id } = req.body;
  console.log("nombre:", nombre);
  console.log("fechaInicio:", fechaInicio);
  console.log("fechaFin:", fechaFin);
  console.log("meta:", meta);
  console.log("curso_id:", curso_id);

  // Validación básica
  if (!nombre || !fechaInicio || !fechaFin || !curso_id) {
    return res.status(400).json({ error: "Faltan campos obligatorios" });
  }

  const sql = `
    INSERT INTO sprints (nombre, fecha_inicio, fecha_fin, objetivo, curso_id)
    VALUES (?, ?, ?, ?, ?)
  `;

  connection.query(
    sql,
    [nombre, fechaInicio, fechaFin, meta, curso_id],
    (err, result) => {
      if (err) {
        console.error("Error al crear el sprint:", err);
        return res.status(500).json({ error: "Error al crear el sprint" });
      }

      res.status(201).json({ id: result.insertId, message: "Sprint creado correctamente" });
    }
  );
},

    // Cerrar un sprint
    closeSprint: (req, res) => {
      const { id } = req.params;

      const sql = `
        UPDATE sprints
        SET estado = 'Cerrado'
        WHERE id = ?
      `;

      connection.query(sql, [id], (err, result) => {
        if (err) {
          console.error("Error al cerrar el sprint:", err);
          return res.status(500).json({ error: "Error al cerrar el sprint" });
        }

        res.json({ message: "Sprint cerrado correctamente" });
      });
    },

    // DAILYS
      // Obtener todos los sprints por grado
getSprintsByGrado: (req, res) => {
  const { grado_id } = req.params;

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
    WHERE g.id = ?
    ORDER BY s.fecha_inicio DESC
  `;

  connection.query(sql, [grado_id], (err, results) => {
    if (err) {
      console.error("Error al obtener los sprints:", err);
      return res.status(500).json({ error: "Error al obtener los sprints" });
    }
    res.json(results);
  });
},

    // Crear una nueva entrada en Dailys con validación del grado
createDaily: (req, res) => {
  const { fecha, usuario_id, ayer, hoy, bloqueos, sprint_id } = req.body;
  
  console.log("body:", req.body);  // Verifica los datos recibidos
  
  // Validación de campos obligatorios
  if (!fecha || !usuario_id || !ayer || !hoy || !bloqueos || !sprint_id) {
    return res.status(400).json({ error: "Faltan campos obligatorios" });
  }

  // Crear la entrada diaria sin validar el grado
  const sql = `
    INSERT INTO dailys (fecha, usuario_id, ayer, avances, bloqueos, sprint_id)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  
  connection.query(
    sql,
    [fecha, usuario_id, ayer, hoy, bloqueos, sprint_id],
    (err, result) => {
      if (err) {
        console.error("Error al crear la entrada diaria:", err);
        return res.status(500).json({ error: "Error al crear la entrada diaria" });
      }
      res.status(201).json({ id: result.insertId, message: "Entrada diaria registrada correctamente" });
    }
  );
},

    // Obtener las entradas de Dailys por usuario
    getDailysByUsuario: (req, res) => {
      const { usuario_id } = req.params;

      const sql = `
        SELECT id, fecha, ayer, avances, bloqueos
        FROM dailys
        WHERE usuario_id = ?
        ORDER BY fecha DESC
      `;

      connection.query(sql, [usuario_id], (err, results) => {
        if (err) {
          console.error("Error al obtener las entradas diarias:", err);
          return res.status(500).json({ error: "Error al obtener las entradas diarias" });
        }
        res.json(results);
      });
    },

    // Actualizar una entrada de Dailys
    updateDaily: (req, res) => {
      const { id } = req.params;
      const { fecha, usuario_id, avances, bloqueos, sprint_id } = req.body;

      if (!fecha || !usuario_id || !avances || !bloqueos || !sprint_id) {
        return res.status(400).json({ error: "Faltan campos obligatorios" });
      }

      const sql = `
        UPDATE dailys
        SET fecha = ?, usuario_id = ?, ayer = ?, avances = ?, bloqueos = ?, sprint_id = ?
        WHERE id = ?
      `;

      connection.query(
        sql,
        [fecha, usuario_id, avances, bloqueos, sprint_id, id],
        (err, result) => {
          if (err) {
            console.error("Error al actualizar la entrada diaria:", err);
            return res.status(500).json({ error: "Error al actualizar la entrada diaria" });
          }
          res.json({ message: "Entrada diaria actualizada correctamente" });
        }
      );
    },

    // Eliminar una entrada de Dailys
    deleteDaily: (req, res) => {
      const { id } = req.params;

      const sql = "DELETE FROM dailys WHERE id = ?";

      connection.query(sql, [id], (err) => {
        if (err) {
          console.error("Error al eliminar la entrada diaria:", err);
          return res.status(500).json({ error: "Error al eliminar la entrada diaria" });
        }
        res.json({ message: "Entrada diaria eliminada correctamente" });
      });
    },
  };
};
