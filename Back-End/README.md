# Back-End

> API REST responsável por gerenciar os dados, regras de negócio, autenticação de usuários e processamento do carrinho/compras do E-commerce 2.0.

## ⚙️ Arquitetura e Modelagem
O servidor foi construído utilizando Node.js com o framework Express, fornecendo rotas RESTful para comunicação com o Front-End. O banco de dados escolhido foi o PostgreSQL, acessado nativamente via a biblioteca `pg`. O sistema conta com tabelas e relacionamentos para Usuários, Produtos, Itens do Carrinho e Histórico de Pedidos. A segurança é implementada utilizando senhas criptografadas e autenticação via JSON Web Tokens (JWT).

## 🛠 Tecnologias Usadas
- Node.js
- Express
- PostgreSQL (via `pg`)
- JSON Web Token (JWT)
- Bcryptjs (criptografia de senhas)

## 🚀 Como Rodar o Back-End
1. Configure uma instância do PostgreSQL e crie o banco de dados.
2. Na raiz da pasta `Back-End`, crie um arquivo `.env` baseado nas seguintes chaves:
   ```env
   DATABASE_URL="postgresql://usuario:senha@localhost:5432/nome_do_banco"
   JWT_SECRET="sua_chave_secreta_aqui"
   PORT=3000
   ```
3. Instale as dependências:
   ```bash
   npm install
   ```
4. Popule o banco de dados com os dados iniciais usando o seed:
   ```bash
   node seed.js
   ```
5. Inicie o servidor:
   ```bash
   npm start
   ```
   *Ou `node src/server.js` se preferir.*
