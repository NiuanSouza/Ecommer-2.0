// src/routes.js
const express = require("express");
const routes = express.Router();

const UsuarioController = require("./controllers/UsuarioController");
const ProdutoController = require("./controllers/ProdutoController");
const CarrinhoController = require("./controllers/CarrinhoController");
const CompraController = require("./controllers/CompraController");

// Usuarios e Login
routes.post("/usuarios", UsuarioController.store);
routes.post("/login", UsuarioController.login);

// Produtos
routes.get("/produtos", ProdutoController.index);
routes.post("/produtos", ProdutoController.store);

// Carrinho
routes.get("/carrinho/:id_usuario", CarrinhoController.index);
routes.post("/carrinho", CarrinhoController.add);

// Finalizar Compra
routes.post("/compras", CompraController.store);

module.exports = routes;