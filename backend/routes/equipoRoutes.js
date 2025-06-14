const express = require('express');

module.exports = (connection) => {
  const router = express.Router();
  const equipoController = require('../controllers/equipoController')(connection);

  // Rutas para Sprints
  router.post("/create-sprint", equipoController.createSprint);   
  router.get("/get-sprints", equipoController.getSprints);        
  router.put("/close-sprint/:id", equipoController.closeSprint);  
  router.put("/update-sprint/:id", equipoController.updateSprint);    
  router.delete("/delete-sprint/:id", equipoController.deleteSprint); 
  router.get("/get-sprints-grado/:grado_id", equipoController.getSprintsByGrado);

  // Rutas para Dailys
  router.post("/create-daily", equipoController.createDaily); 
  router.get("/get-dailys/:usuario_id", equipoController.getDailysByUsuario);
  router.put("/update-daily/:id", equipoController.updateDaily);
  router.delete("/delete-daily/:id", equipoController.deleteDaily); 
  router.get("/get-dailys-usuario-grado/:usuario_id/:grado_id", equipoController.getDailysPorUsuarioYGrado);

  // Rutas para Retrospectivas
  router.post("/create-retrospectiva", equipoController.createRetrospectiva);
  router.get("/get-retrospectivas/:usuario_id", equipoController.getRetrospectivasByUsuario);
  router.put("/update-retrospectiva/:id", equipoController.updateRetrospectiva);
  router.delete("/delete-retrospectiva/:id", equipoController.deleteRetrospectiva);
  router.get("/get-retrospectivas-usuario-grado/:usuario_id/:grado_id", equipoController.getRetrosByUsuarioAndGrado);

  // Rutas para Tareas
  router.post("/create-tarea", equipoController.createTarea);
  router.get("/get-tareas/:curso_id", equipoController.getTareasByCurso);
  router.put("/update-tarea/:id", equipoController.updateTarea);
  router.delete("/delete-tarea/:id", equipoController.deleteTarea);
  router.put("/update-estado/:id", equipoController.updateEstadoTarea);
  router.put("/culminar-tarea/:id", equipoController.culminarTarea);

  // Rutas para reportes
  router.get("/reportes/tareas-por-grado/:curso_id", equipoController.getTareasPorGrado);
  router.get("/reportes/evaluaciones-promedio/:curso_id", equipoController.getEvaluacionesPorGrado);
  router.get("/reportes/reporte-dailys-grado/:grado_id", equipoController.getDailysPorGrado);
  router.get("/reportes/reporte-promedio-grado/:grado_id", equipoController.getPromedioPorSprintPorGrado);
  router.get("/reportes/retrospectivas-por-sprint/:curso_id", equipoController.getRetrospectivasPorSprint);
  router.get("/reportes/feedback-por-grado/:curso_id", equipoController.getFeedbackPorGrado);
  router.get("/reportes/sprints-finalizados/:curso_id", equipoController.getSprintsFinalizadosPorGrado);
  router.get("/reportes/tareas-antiguas/:curso_id", equipoController.getTareasAntiguasPendientes);
  router.get("/reportes/racha-dailys/:curso_id", equipoController.getDiasConsecutivosDailys);

  return router;
};
