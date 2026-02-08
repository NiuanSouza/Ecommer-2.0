const express = require("express");
const routes = express.Router();

const UsuarioController = require("./controllers/UsuarioController");
const ProdutoController = require("./controllers/ProdutoController");
const CarrinhoController = require("./controllers/CarrinhoController");
const CompraController = require("./controllers/CompraController");

const authMiddleware = require("./middlewares/auth");

// --- USUÁRIOS ---
routes.post("/usuarios", UsuarioController.store);
routes.post("/login", UsuarioController.login);
routes.get("/usuarios", authMiddleware, UsuarioController.index);
routes.get("/meu-perfil", authMiddleware, UsuarioController.show);

// --- PRODUTOS ---
routes.get("/produtos", ProdutoController.index);
routes.get("/produtos/:id", ProdutoController.show);
routes.post("/produtos", authMiddleware, ProdutoController.store);

// --- CARRINHO ---
routes.get("/carrinho/:id_usuario", authMiddleware, CarrinhoController.index);
routes.post("/carrinho", authMiddleware, CarrinhoController.add);
routes.delete("/carrinho/:id_usuario/:id_produto", authMiddleware, CarrinhoController.delete);

// --- COMPRAS ---
routes.post("/compras", CompraController.store);
routes.get("/compras/:id_usuario", authMiddleware, CompraController.index);

module.exports = routes;