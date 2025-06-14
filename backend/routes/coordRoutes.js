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
  router.get("/get-backlog-grado/:grado_id", coordController.getBacklogByGrado);

  // Evaluaciones
  router.post("/create-evaluacion", coordController.createEvaluacion);
  router.get("/get-evaluaciones/:evaluadorId", coordController.getEvaluacionesByEvaluador);
  router.delete("/delete-evaluacion/:id", coordController.deleteEvaluacion);
  router.put("/update-evaluacion/:id", coordController.updateEvaluacion);

  // Reportes
  router.get("/reporte-tareas-estado/:coordinador_id", coordController.getTareasPorGradoYEstado);
  router.get("/reporte-participacion-dailys/:coordinador_id", coordController.getParticipacionDailys);
  router.get("/reporte-promedio-estudiantes/:coordinador_id", coordController.getPromedioEvaluacionPorGrado);
  router.get("/reporte-retrospectivas/:coordinador_id", coordController.getRetrospectivasPorSprint);
  router.get("/reporte-actividad-backlog/:coordinador_id", coordController.getActividadBacklog);
  router.get("/reporte-ranking-estudiantes/:coordinador_id", coordController.getRankingGrados);
  router.get("/reporte-participacion-grado", coordController.getParticipacionDailysPorGrado);
  router.get("/reporte-cumplimiento-tareas/:coordinador_id", coordController.getCumplimientoTareas);
  router.get("/reporte-tareas-antiguas/:coordinador_id", coordController.getTareasAntiguasPendientes);

  return router;
};
