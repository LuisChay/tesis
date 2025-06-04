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


  return router;
};
