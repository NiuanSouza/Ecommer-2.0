const db = require('./src/database/connection');
const bcrypt = require('bcryptjs');

async function seedLarge() {
  try {
    console.log("🧹 Limpando dados existentes...");

    // Remove itens do carrinho e produtos para evitar erros de chave estrangeira
    await db.query('DELETE FROM ecommerce.CarrinhoItem');
    await db.query('DELETE FROM ecommerce.PedidoItem');
    await db.query('DELETE FROM ecommerce.Pedido');
    await db.query('DELETE FROM ecommerce.Produto');
    await db.query('DELETE FROM ecommerce.Categoria');

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

    const adjetivos = ['Premium', 'Ultra', 'Pro', 'Básico', 'Elegante', 'Moderno', 'Clássico', 'Slim', 'Master', 'Sport', 'Vintage', 'Edição Limitada'];
    const substantivos = [
      { nome: 'Fone', keyword: 'headphone' },
      { nome: 'Relógio', keyword: 'watch' },
      { nome: 'Camiseta', keyword: 'tshirt' },
      { nome: 'Tênis', keyword: 'sneakers' },
      { nome: 'Mochila', keyword: 'backpack' },
      { nome: 'Luminária', keyword: 'lamp' },
      { nome: 'Cadeira', keyword: 'chair' },
      { nome: 'Teclado', keyword: 'keyboard' },
      { nome: 'Mouse', keyword: 'mouse' },
      { nome: 'Perfume', keyword: 'perfume' },
      { nome: 'Monitor', keyword: 'monitor' },
      { nome: 'Smartphone', keyword: 'phone' }
    ];

    console.log("📦 Inserindo 200 produtos...");
    for (let i = 1; i <= 200; i++) {
      const adj = adjetivos[Math.floor(Math.random() * adjetivos.length)];
      const subObj = substantivos[Math.floor(Math.random() * substantivos.length)];

      const nome = `${subObj.nome} ${adj} - Modelo #${1000 + i}`;
      const preco = (Math.random() * (1200 - 20) + 20).toFixed(2);
      const estoque = Math.floor(Math.random() * 100) + 5;
      const idCat = catIds[Math.floor(Math.random() * catIds.length)];

      const img = `https://loremflickr.com/600/600/${subObj.keyword}?lock=${i}`;
      const desc = `Este é o ${nome}. Um produto de alta qualidade, testado e aprovado para garantir a melhor experiência ao cliente. Ideal para o dia a dia.`;

      await db.query(
        `INSERT INTO ecommerce.Produto 
         (nome, preco, estoque, descricao, imagem_url, id_usuario_vendedor, id_categoria) 
         VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [nome, preco, estoque, desc, img, sellerId, idCat]
      );

      if (i % 50 === 0) console.log(`> ${i} produtos inseridos...`);
    }

    console.log("⭐ FINALIZADO: Banco resetado e 200 novos produtos inseridos!");
    process.exit();
  } catch (err) {
    console.error("❌ Erro no seed:", err.message);
    process.exit(1);
  }
}

seedLarge();