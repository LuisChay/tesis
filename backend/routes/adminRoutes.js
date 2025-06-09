const express = require("express");

module.exports = (connection) => {
  const router = express.Router();
  const adminController = require("../controllers/adminController")(connection);

  // Proyectos
  router.get("/get-proyectos", adminController.getProyectos);
  router.post("/create-proyecto", adminController.createProyecto);
  router.put("/update-proyecto/:id", adminController.updateProyecto);
  router.delete("/delete-proyecto/:id", adminController.deleteProyecto);

  // Grados
  router.get("/get-grados", adminController.getGrados);
  router.post("/create-grado", adminController.createGrado);
  router.put("/update-grado/:id", adminController.updateGrado);
  router.delete("/delete-grado/:id", adminController.deleteGrado);

  // Reportes
  router.get("/reporte-proyectos", adminController.getResumenProyectosPorGrado);
  router.get("/reporte-tareas", adminController.getResumenTareasPorGrado);
  router.get("/reporte-evaluaciones", adminController.getPromedioEvaluacionesPorGrado);
  router.get("/reporte-retrospectivas", adminController.getRetrospectivasPorSprint);
  router.get("/reporte-backlog", adminController.getProgresoBacklogPorGrado);
  router.get("/reporte-proyectos-estado", adminController.getEstadoProyectosPorGrado);
  router.get("/reporte-desempeno", adminController.getRankingDesempenoPorGrado);
  router.get("/reporte-cumplimiento-sprint", adminController.getCumplimientoPorSprint);
  router.get("/reporte-feedback", adminController.getEvaluacionesConFeedback);


  // Asignaciones
  router.get("/get-grados-usuario/:usuario_id", adminController.getGradosPorUsuario);
  router.post("/asignar-grado", adminController.asignarGrado);
  router.delete("/eliminar-asignacion/:usuario_id/:grado_id", adminController.eliminarAsignacion);


  return router;
};
