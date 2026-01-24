const db = require('./src/database/connection');
const bcrypt = require('bcryptjs');

async function seedLarge() {
  try {
    // 1. Criar/Obter um Vendedor para os produtos
    const hash = await bcrypt.hash('123456', 10);
    const userRes = await db.query(`
      INSERT INTO ecommerce.Usuario (nome, email, senha, tipo) 
      VALUES ($1, $2, $3, $4) 
      ON CONFLICT (email) DO UPDATE SET email = EXCLUDED.email
      RETURNING id`,
      ['Vendedor Premium', 'vendedor_vendas@ecom.com', hash, 'vendedor']
    );
    const sellerId = userRes.rows[0].id;
    console.log("✅ Vendedor vinculado.");

    // 2. Criar Categorias diversas
    const categories = ['Eletrônicos', 'Moda', 'Casa & Decoração', 'Esportes', 'Beleza'];
    const catIds = [];
    for (const catName of categories) {
      const res = await db.query(
        "INSERT INTO ecommerce.Categoria (nome) VALUES ($1) ON CONFLICT (nome) DO UPDATE SET nome = EXCLUDED.nome RETURNING id",
        [catName]
      );
      catIds.push(res.rows[0].id);
    }
    console.log("✅ Categorias configuradas.");

    // 3. Gerador de Produtos
    const adjetivos = ['Premium', 'Ultra', 'Pro', 'Básico', 'Elegante', 'Moderno', 'Clássico', 'Slim', 'Master', 'Sport', 'Vintage', 'Edição Limitada'];
    const substantivos = ['Fone', 'Relógio', 'Camiseta', 'Tênis', 'Mochila', 'Luminária', 'Cadeira', 'Teclado', 'Mouse', 'Perfume', 'Monitor', 'Smartphone'];

    console.log("📦 Inserindo 200 produtos...");
    for (let i = 1; i <= 200; i++) {
      const adj = adjetivos[Math.floor(Math.random() * adjetivos.length)];
      const sub = substantivos[Math.floor(Math.random() * substantivos.length)];

      const nome = `${sub} ${adj} - Modelo #${1000 + i}`;
      const preco = (Math.random() * (1200 - 20) + 20).toFixed(2);
      const estoque = Math.floor(Math.random() * 100) + 5;
      const idCat = catIds[Math.floor(Math.random() * catIds.length)];

      // Imagem aleatória mas consistente usando o ID como semente
      const img = `https://picsum.photos/seed/${i + 50}/600/600`;
      const desc = `Este é o ${nome}. Um produto de alta qualidade, testado e aprovado para garantir a melhor experiência ao cliente. Ideal para o dia a dia.`;

      await db.query(
        `INSERT INTO ecommerce.Produto 
         (nome, preco, estoque, descricao, imagem_url, id_usuario_vendedor, id_categoria) 
         VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [nome, preco, estoque, desc, img, sellerId, idCat]
      );

      if (i % 50 === 0) console.log(`> ${i} produtos inseridos...`);
    }

    console.log("⭐ FINALIZADO: 200 produtos prontos para o seu portfólio!");
    process.exit();
  } catch (err) {
    console.error("❌ Erro no seed:", err.message);
    process.exit(1);
  }
}

seedLarge();