const db = require("./connection");

async function init() {
  try {
    await db.query(`CREATE SCHEMA IF NOT EXISTS ecommerce`);

    await db.query(`
      CREATE TABLE IF NOT EXISTS ecommerce.Usuario (
          id SERIAL PRIMARY KEY,
          nome TEXT NOT NULL,
          email TEXT UNIQUE NOT NULL,
          senha TEXT NOT NULL,
          foto_perfil TEXT DEFAULT 'https://i.imgur.com/6VBx3io.png',
          tipo TEXT DEFAULT 'cliente'
      );

      CREATE TABLE IF NOT EXISTS ecommerce.Categoria (
          id SERIAL PRIMARY KEY, nome TEXT NOT NULL UNIQUE
      );

      CREATE TABLE IF NOT EXISTS ecommerce.Produto (
          id SERIAL PRIMARY KEY,
          nome TEXT NOT NULL,
          descricao TEXT,
          preco DECIMAL(10,2) NOT NULL,
          estoque INTEGER DEFAULT 0,
          imagem_url TEXT,
          id_categoria INTEGER REFERENCES ecommerce.Categoria(id),
          id_usuario_vendedor INTEGER REFERENCES ecommerce.Usuario(id)
      );

      CREATE TABLE IF NOT EXISTS ecommerce.CarrinhoItem (
          id SERIAL PRIMARY KEY,
          id_usuario INTEGER REFERENCES ecommerce.Usuario(id),
          id_produto INTEGER REFERENCES ecommerce.Produto(id),
          quantidade INTEGER NOT NULL,
          UNIQUE(id_usuario, id_produto)
      );
    `);
    console.log("✅ Banco PostgreSQL configurado com sucesso!");
    process.exit();
  } catch (err) {
    console.error("❌ Erro:", err);
    process.exit(1);
  }
}
init();