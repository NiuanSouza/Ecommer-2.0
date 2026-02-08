# 🛒 E-commerce 2.0

Este é um projeto de E-commerce completo, desenvolvido com **React** no FrontEnd e **Node.js** no BackEnd, utilizando **PostgreSQL** como banco de dados. O sistema foi projetado para oferecer uma experiência de compra fluida, desde a navegação de produtos até a finalização do pedido.

**🔗 Acesse o site aqui:** [https://ecommer-2-0-1.onrender.com/](https://ecommer-2-0-1.onrender.com/)

---

## ✨ Novas Funcionalidades

- **Busca em Tempo Real**: Filtre produtos instantaneamente através da barra de pesquisa integrada ao cabeçalho.
- **Gestão Dinâmica de Carrinho**: Adicione, remova e ajuste a quantidade de itens com atualização automática de valores na interface do usuário.
- **Sistema de Autenticação JWT**: Login e cadastro de usuários seguros utilizando tokens JWT e criptografia de senhas.
- **Histórico de Pedidos**: Área exclusiva para o cliente visualizar e acompanhar todas as suas compras anteriores.
- **Interface Responsiva**: Design moderno e adaptável para diferentes dispositivos, focado na melhor experiência de uso.

---

## 🛠️ Tecnologias Utilizadas

### FrontEnd

- **React 19** com **Vite**.
- **React Router Dom** para gerenciamento de rotas e navegação.
- **Axios** para consumo da API REST.
- **React Icons** para elementos visuais e ícones da interface.

### BackEnd

- **Node.js** com framework **Express**.
- **PostgreSQL** (via biblioteca `pg`) para persistência de dados.
- **JSON Web Token (JWT)** para autenticação segura.
- **Bcryptjs** para garantir a segurança das senhas dos usuários.

---

## 🚀 Como Rodar o Projeto Localmente

### Pré-requisitos

- Node.js instalado.
- Instância do PostgreSQL configurada.

### 1. Configuração do Banco de Dados

Crie um banco de dados e configure as variáveis de ambiente em um arquivo `.env` dentro da pasta `BackEnd`:

```env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/nome_do_banco"
JWT_SECRET="sua_chave_secreta_aqui"
PORT=3000
```
### 2. Rodar o Seed (Popular o Banco)

Para inserir os produtos iniciais no sistema, execute o script de seed dentro da pasta `BackEnd`:

```bash
cd BackEnd
node seed.js
```

### 3. Iniciar o Servidor (BackEnd)

```
cd BackEnd
npm install
node src/server.js
```

### 4. Iniciar o FrontEnd

Em um novo terminal:

```
cd FrontEnd
npm install
npm run dev
```


## 📂 Estrutura do Projeto

**/BackEnd**: API REST contendo controladores de usuários, produtos, carrinho e compras.
 
**/FrontEnd**: Aplicação React com páginas de autenticação, vitrine, carrinho e perfil.
