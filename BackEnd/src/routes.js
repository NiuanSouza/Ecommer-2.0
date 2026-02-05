// src/routes.js
const express = require("express");
const routes = express.Router();

const UsuarioController = require("./controllers/UsuarioController");
const ProdutoController = require("./controllers/ProdutoController");
const CarrinhoController = require("./controllers/CarrinhoController");
const CompraController = require("./controllers/CompraController");

// ADICIONE ESTA LINHA AQUI:
const authMiddleware = require("./middlewares/auth");

// Usuarios e Login
routes.post("/usuarios", UsuarioController.store);
routes.post("/login", UsuarioController.login);

// Produtos
routes.get("/produtos", ProdutoController.index);
routes.get("/produtos/:id", ProdutoController.show);
routes.post("/produtos", ProdutoController.store);

// Carrinho (Agora a variável authMiddleware existe!)
routes.get("/carrinho/:id_usuario", authMiddleware, CarrinhoController.index);
routes.post("/carrinho", authMiddleware, CarrinhoController.add);
routes.get("/meu-perfil", authMiddleware, UsuarioController.show);
routes.post("/carrinho", authMiddleware, CarrinhoController.add);
routes.delete("/carrinho/:id_usuario/:id_produto", authMiddleware, CarrinhoController.delete); // Adicione esta linha

// Finalizar Compra
routes.post("/compras", authMiddleware, CompraController.store);

module.exports = routes;