const db = require("./connection");

async function init() {
  try {
    console.log("⏳ Iniciando a configuração do banco de dados...");

    await db.query(`CREATE SCHEMA IF NOT EXISTS ecommerce`);

    await db.query(`
      CREATE TABLE ecommerce.Usuario (
          id SERIAL PRIMARY KEY,
          nome TEXT NOT NULL,
          email TEXT UNIQUE NOT NULL,
          senha TEXT NOT NULL,
          foto_perfil TEXT DEFAULT 'https://i.imgur.com/6VBx3io.png',
          tipo TEXT DEFAULT 'cliente'
      );

      CREATE TABLE ecommerce.Categoria (
          id SERIAL PRIMARY KEY, 
          nome TEXT NOT NULL UNIQUE
      );

      CREATE TABLE ecommerce.Produto (
          id SERIAL PRIMARY KEY,
          nome TEXT NOT NULL,
          descricao TEXT,
          preco DECIMAL(10,2) NOT NULL,
          estoque INTEGER DEFAULT 0,
          imagem_url TEXT,
          id_categoria INTEGER REFERENCES ecommerce.Categoria(id),
          id_usuario_vendedor INTEGER REFERENCES ecommerce.Usuario(id)
      );

      CREATE TABLE ecommerce.CarrinhoItem (
          id SERIAL PRIMARY KEY,
          id_usuario INTEGER REFERENCES ecommerce.Usuario(id),
          id_produto INTEGER REFERENCES ecommerce.Produto(id),
          quantidade INTEGER NOT NULL,
          UNIQUE(id_usuario, id_produto)
      );

      CREATE TABLE ecommerce.Pedido (
          id SERIAL PRIMARY KEY,
          id_usuario_comprador INTEGER REFERENCES ecommerce.Usuario(id),
          data_pedido TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          valor_total DECIMAL(10,2) NOT NULL
      );

      CREATE TABLE ecommerce.PedidoItem (
          id SERIAL PRIMARY KEY,
          id_pedido INTEGER REFERENCES ecommerce.Pedido(id),
          id_produto INTEGER REFERENCES ecommerce.Produto(id),
          quantidade INTEGER NOT NULL,
          preco_unitario_venda DECIMAL(10,2) NOT NULL
      );
    `);

    console.log("✅ Banco de dados reiniciado e configurado com sucesso!");
    process.exit();
  } catch (err) {
    console.error("❌ Erro ao configurar banco:", err);
    process.exit(1);
  }
}

init();