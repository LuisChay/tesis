const express = require("express");

module.exports = (connection) => {
  const router = express.Router();
  const coordController = require("../controllers/coordController")(connection);

  // Backlog
  router.get("/get-backlog/:proyecto_id", coordController.getBacklogByProyecto);
  router.post("/create-backlog", coordController.createBacklog);
  router.put("/update-backlog/:id", coordController.updateBacklog);
  router.delete("/delete-backlog/:id", coordController.deleteBacklog);
  router.get("/get-backlog-by-user/:userId", coordController.getBacklogByUser);
  router.get("/get-backlog", coordController.getAllBacklog); // Obtener todas las actividades del backlog

  // Evaluaciones
  router.post("/create-evaluacion", coordController.createEvaluacion);
  router.get("/get-evaluaciones/:evaluadorId", coordController.getEvaluacionesByEvaluador);
router.delete("/delete-evaluacion/:id", coordController.deleteEvaluacion);
router.put("/update-evaluacion/:id", coordController.updateEvaluacion);





  return router;
};
