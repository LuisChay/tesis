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

  return router;
};
