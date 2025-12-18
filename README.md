# 🛒 Fullstack eCommerce System

Um sistema de eCommerce completo desenvolvido com **Node.js** no backend e **React** no frontend. O projeto simula três níveis de acesso: Administrador, Vendedor e Cliente, permitindo a gestão total de produtos, usuários e fluxo de compras com baixa automática de estoque.

## 🚀 Funcionalidades

### 🔐 Portal Administrativo

- Gestão de Usuários (CRUD completo).
- Gestão de Produtos (CRUD completo).
- Visualização de todas as compras realizadas no sistema.

### 🏪 Portal do Vendedor

- Cadastro de novos produtos vinculados ao perfil do vendedor.
- Visualização de catálogo de produtos próprios.

### 🛍️ Portal do Cliente

- Vitrine de produtos com filtro de busca e ocultação de itens sem estoque.
- Simulação de compra com atualização de estoque em tempo real.
- Histórico de pedidos personalizado por usuário.

## 🛠️ Tecnologias Utilizadas

- **Frontend:** React, Axios, CSS3.
- **Backend:** Node.js, Express.
- **Banco de Dados:** SQLite3 (Persistência local).

## 📦 Como Executar o Projeto

### Pré-requisitos

- Node.js instalado.
- Gerenciador de pacotes (npm ou yarn).

### Configuração do Backend

1. Navegue até a pasta `BackEnd`.
2. Instale as dependências: `npm install`.
3. Popular o banco de dados com dados iniciais: `sqlite3 ecommerce.db < seeds.sql`
4. Inicie o servidor: `npm start`.
   _O servidor rodará em http://localhost:3333_

### Configuração do Frontend

1. Navegue até a pasta `FrontEnd`.
2. Instale as dependências: `npm install`.
3. Inicie a aplicação: `npm run dev`.
   _Acesse http://localhost:5173 no navegador_

---

Desenvolvido por [Niuan Souza](https://github.com/NiuanSouza)
