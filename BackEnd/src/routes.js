const express = require("express");
const routes = express.Router();

const UsuarioController = require("./controllers/UsuarioController");

// Rotas de Usuário
routes.get("/usuarios", UsuarioController.index);
routes.get("/usuarios/:id", UsuarioController.show);
routes.post("/usuarios", UsuarioController.store);
routes.put("/usuarios/:id", UsuarioController.update);
routes.delete("/usuarios/:id", UsuarioController.delete);

module.exports = routes;
