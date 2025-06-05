const express = require('express');

module.exports = (connection) => {
  const router = express.Router();
  const equipoController = require('../controllers/equipoController')(connection);

  // Rutas para Sprints
  router.post("/create-sprint", equipoController.createSprint);   // Ruta para crear un sprint
  router.get("/get-sprints", equipoController.getSprints);        // Ruta para obtener los sprints
  router.put("/close-sprint/:id", equipoController.closeSprint);  // Ruta para cerrar un sprint

    // Rutas para Dailys
  router.post("/create-daily", equipoController.createDaily); // Crear nueva entrada
  router.get("/get-dailys/:usuario_id", equipoController.getDailysByUsuario); // Obtener las entradas por usuario y sprint
  router.put("/update-daily/:id", equipoController.updateDaily); // Actualizar entrada
  router.delete("/delete-daily/:id", equipoController.deleteDaily); // Eliminar entrada

  return router;
};
