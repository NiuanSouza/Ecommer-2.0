const express = require("express");
const routes = express.Router();

const UsuarioController = require("./controllers/UsuarioController");
const ProdutoController = require("./controllers/ProdutoController");
const CompraController = require("./controllers/CompraController");

// Rotas de Usuário
routes.get("/usuarios", UsuarioController.index);
routes.get("/usuarios/:id", UsuarioController.show);
routes.post("/usuarios", UsuarioController.store);
routes.put("/usuarios/:id", UsuarioController.update);
routes.delete("/usuarios/:id", UsuarioController.delete);

// Rotas de Produtos
routes.get("/produtos", ProdutoController.index);
routes.get("/produtos/:id", ProdutoController.show);
routes.post("/produtoss", ProdutoController.store);
routes.put("/produtos/:id", ProdutoController.update);
routes.delete("/produtos/:id", ProdutoController.delete);

routes.get("/compras", CompraController.index);
routes.get("/compras/:id", CompraController.show);
routes.post("/compras", CompraController.store);
routes.put("/compras/:id", CompraController.update);
routes.delete("/compras/:id", CompraController.delete);

module.exports = routes;
