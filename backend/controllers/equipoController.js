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
    // Actualizar un sprint
updateSprint: (req, res) => {
  const { id } = req.params;
  const { nombre, fechaInicio, fechaFin, meta, curso_id } = req.body;

  if (!nombre || !fechaInicio || !fechaFin || !curso_id) {
    return res.status(400).json({ error: "Faltan campos obligatorios" });
  }

  const sql = `
    UPDATE sprints
    SET nombre = ?, fecha_inicio = ?, fecha_fin = ?, objetivo = ?, curso_id = ?
    WHERE id = ?
  `;

  connection.query(sql, [nombre, fechaInicio, fechaFin, meta, curso_id, id], (err) => {
    if (err) {
      console.error("Error al actualizar el sprint:", err);
      return res.status(500).json({ error: "Error al actualizar el sprint" });
    }

    res.json({ message: "Sprint actualizado correctamente" });
  });
},

// Eliminar un sprint
deleteSprint: (req, res) => {
  const { id } = req.params;

  const sql = `DELETE FROM sprints WHERE id = ?`;

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
  const { fecha, usuario_id, ayer, avances, bloqueos, sprint_id } = req.body;
  
  console.log("body:", req.body);  // Verifica los datos recibidos
  
  // Validación de campos obligatorios
  if (!fecha || !usuario_id || !ayer || !avances || !bloqueos || !sprint_id) {
    return res.status(400).json({ error: "Faltan campos obligatorios" });
  }

  // Crear la entrada diaria sin validar el grado
  const sql = `
    INSERT INTO dailys (fecha, usuario_id, ayer, avances, bloqueos, sprint_id)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  
  connection.query(
    sql,
    [fecha, usuario_id, ayer, avances, bloqueos, sprint_id],
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
    SELECT d.id, d.fecha, d.ayer, d.avances, d.bloqueos, g.nombre AS grado
    FROM dailys d
    LEFT JOIN sprints s ON d.sprint_id = s.id
    LEFT JOIN grados g ON s.curso_id = g.id
    WHERE d.usuario_id = ?
    ORDER BY d.fecha DESC
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
  const { fecha, usuario_id, ayer, avances, bloqueos, sprint_id } = req.body;

  if (!fecha || !usuario_id || !ayer || !avances || !bloqueos || !sprint_id) {
    return res.status(400).json({ error: "Faltan campos obligatorios" });
  }

  const sql = `
    UPDATE dailys
    SET fecha = ?, usuario_id = ?, ayer = ?, avances = ?, bloqueos = ?, sprint_id = ?
    WHERE id = ?
  `;

  const values = [fecha, usuario_id, ayer, avances, bloqueos, sprint_id, id];

  connection.query(sql, values, (err) => {
    if (err) {
      console.error("Error al actualizar la entrada diaria:", err);
      return res.status(500).json({ error: "Error al actualizar la entrada diaria" });
    }
    res.json({ message: "Entrada diaria actualizada correctamente" });
  });
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


    //RETROSPECTIVAS

// Crear retrospectiva (ahora extrae curso_id directamente del sprint)
createRetrospectiva: (req, res) => {
  const { sprint_id, usuario_id, puntos_buenos, puntos_mejorar, acciones_mejora, fecha } = req.body;

  if (!sprint_id || !usuario_id || !puntos_buenos || !puntos_mejorar || !acciones_mejora || !fecha) {
    return res.status(400).json({ error: "Faltan campos obligatorios" });
  }

  // No pedimos curso_id, lo obtenemos desde el sprint
  const sql = `
    INSERT INTO retrospectivas (sprint_id, usuario_id, puntos_buenos, puntos_mejorar, acciones_mejora, fecha)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  connection.query(
    sql,
    [sprint_id, usuario_id, puntos_buenos, puntos_mejorar, acciones_mejora, fecha],
    (err, result) => {
      if (err) {
        console.error("Error al registrar la retrospectiva:", err);
        return res.status(500).json({ error: "Error al registrar la retrospectiva" });
      }

      res.status(201).json({ message: "Retrospectiva registrada correctamente", id: result.insertId });
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
    WHERE r.usuario_id = ?
    ORDER BY r.fecha DESC
  `;

  connection.query(sql, [usuario_id], (err, results) => {
    if (err) {
      console.error("Error al obtener retrospectivas:", err);
      return res.status(500).json({ error: "Error al obtener retrospectivas" });
    }
    res.json(results);
  });
},

updateRetrospectiva: (req, res) => {
  const { id } = req.params;
  const { puntos_buenos, puntos_mejorar, acciones_mejora, fecha } = req.body;

  console.log("Actualizar retrospectiva ID:", id);
  console.log("Datos recibidos:", req.body);

  if (!puntos_buenos || !puntos_mejorar || !acciones_mejora || !fecha) {
    return res.status(400).json({ error: "Faltan campos obligatorios" });
  }

  const sql = `
    UPDATE retrospectivas
    SET puntos_buenos = ?, puntos_mejorar = ?, acciones_mejora = ?, fecha = ?
    WHERE id = ?
  `;

  connection.query(sql, [puntos_buenos, puntos_mejorar, acciones_mejora, fecha, id], (err) => {
    if (err) {
      console.error("Error al actualizar la retrospectiva:", err);
      return res.status(500).json({ error: "Error al actualizar la retrospectiva" });
    }

    res.json({ message: "Retrospectiva actualizada correctamente" });
  });
},

deleteRetrospectiva: (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM retrospectivas WHERE id = ?";

  connection.query(sql, [id], (err) => {
    if (err) {
      console.error("Error al eliminar la retrospectiva:", err);
      return res.status(500).json({ error: "Error al eliminar la retrospectiva" });
    }

    res.json({ message: "Retrospectiva eliminada correctamente" });
  });
},

// TAREAS
 // Crear tarea Kanban
createTarea: (req, res) => {
  const { titulo, descripcion, prioridad, estado, backlog_id, sprint_id, asignado_a } = req.body;

  if (!titulo || !prioridad || !backlog_id) {
    return res.status(400).json({ error: "Faltan campos obligatorios" });
  }

  const sql = `
    INSERT INTO tareas (titulo, descripcion, prioridad, estado, backlog_id, sprint_id, asignado_a)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  connection.query(
    sql,
    [
      titulo,
      descripcion || "",
      prioridad,
      estado || "Por hacer",
      backlog_id,
      sprint_id || null,
      asignado_a || null,
    ],
    (err, result) => {
      if (err) {
        console.error("Error al insertar tarea:", err);
        return res.status(500).json({ error: "Error al crear la tarea" });
      }
      res.status(201).json({ id: result.insertId, message: "Tarea creada correctamente" });
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
        WHERE b.curso_id = ? AND estado != 'Culminado'

      `;

      connection.query(sql, [curso_id], (err, results) => {
        if (err) return res.status(500).json({ error: "Error al obtener tareas por curso" });
        res.json(results);
      });
    },

    // Actualizar tarea Kanban
    updateTarea: (req, res) => {
      const { id } = req.params;
      const { titulo, descripcion, prioridad, estado } = req.body;

      const sql = `
        UPDATE tareas
        SET titulo = ?, descripcion = ?, prioridad = ?, estado = ?
        WHERE id = ?
      `;

      connection.query(sql, [titulo, descripcion, prioridad, estado, id], (err) => {
        if (err) return res.status(500).json({ error: "Error al actualizar la tarea" });
        res.json({ message: "Tarea actualizada correctamente" });
      });
    },

    // Eliminar tarea Kanban
    deleteTarea: (req, res) => {
      const { id } = req.params;

      const sql = `DELETE FROM tareas WHERE id = ?`;

      connection.query(sql, [id], (err) => {
        if (err) return res.status(500).json({ error: "Error al eliminar la tarea" });
        res.json({ message: "Tarea eliminada correctamente" });
      });
    },

    updateEstadoTarea: (req, res) => {
  const { id } = req.params;
  const { estado } = req.body;

  if (!estado) {
    return res.status(400).json({ error: "El estado es requerido" });
  }

  const sql = `UPDATE tareas SET estado = ? WHERE id = ?`;

  connection.query(sql, [estado, id], (err) => {
    if (err) {
      console.error("Error al actualizar estado de la tarea:", err);
      return res.status(500).json({ error: "Error al actualizar estado" });
    }
    res.json({ message: "Estado actualizado correctamente" });
  });
},
culminarTarea: (req, res) => {
  const { id } = req.params;

  const sql = `
    UPDATE tareas
    SET estado = 'Culminado'
    WHERE id = ?
  `;

  connection.query(sql, [id], (err) => {
    if (err) {
      console.error("Error al actualizar estado:", err);
      return res.status(500).json({ error: "Error al marcar como culminada" });
    }
    res.json({ message: "Tarea marcada como culminada" });
  });
}





  };
};
