const express = require('express');

module.exports = (connection) => {
  const router = express.Router();
  const usuarioController = require('../controllers/userController')(connection);

  // Login
  router.post('/login', usuarioController.login);


  // CRUD Usuarios
  router.get('/get-usuarios', usuarioController.getUsuarios);
  router.get('/get-usuario/:id', usuarioController.getUsuarioById);
  router.post('/create-usuario', usuarioController.createUsuario);
  router.put('/update-usuario/:id', usuarioController.updateUsuario);
  router.delete('/delete-usuario/:id', usuarioController.deleteUsuario);

  return router;
};
