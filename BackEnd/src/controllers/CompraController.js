const db = require("../database/connection");

module.exports = {
  // Finalizar a compra (Checkout)
  async store(req, res) {
    const { id_usuario_comprador } = req.body;

    try {
      // 1. Buscar itens do carrinho
      const carrinho = await db.query(
        "SELECT * FROM ecommerce.CarrinhoItem WHERE id_usuario = $1",
        [id_usuario_comprador]
      );

      if (carrinho.rows.length === 0) {
        return res.status(400).json({ error: "Carrinho vazio." });
      }

      // 2. Calcular valor total (Join com tabela Produto para pegar preços atuais)
      const valores = await db.query(
        `SELECT SUM(p.preco * c.quantidade) as total 
         FROM ecommerce.CarrinhoItem c 
         JOIN ecommerce.Produto p ON c.id_produto = p.id 
         WHERE c.id_usuario = $1`,
        [id_usuario_comprador]
      );
      const valorTotal = valores.rows[0].total;

      // 3. Criar o Pedido
      const pedidoResult = await db.query(
        "INSERT INTO ecommerce.Pedido (id_usuario_comprador, valor_total) VALUES ($1, $2) RETURNING id",
        [id_usuario_comprador, valorTotal]
      );
      const id_pedido = pedidoResult.rows[0].id;

      // 4. Mover itens para PedidoItem e baixar estoque
      for (const item of carrinho.rows) {
        // Pegar preço atual do produto
        const prod = await db.query("SELECT preco FROM ecommerce.Produto WHERE id = $1", [item.id_produto]);

        await db.query(
          `INSERT INTO ecommerce.PedidoItem (id_pedido, id_produto, quantidade, preco_unitario_venda) 
           VALUES ($1, $2, $3, $4)`,
          [id_pedido, item.id_produto, item.quantidade, prod.rows[0].preco]
        );

        // Baixar estoque
        await db.query(
          "UPDATE ecommerce.Produto SET estoque = estoque - $1 WHERE id = $2",
          [item.quantidade, item.id_produto]
        );
      }

      // 5. Limpar carrinho
      await db.query("DELETE FROM ecommerce.CarrinhoItem WHERE id_usuario = $1", [id_usuario_comprador]);

      return res.status(201).json({ message: "Compra realizada com sucesso!", id_pedido });

    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },

  // Listar histórico de compras de um usuário
  async index(req, res) {
    const { id_usuario } = req.params;
    try {
      const result = await db.query(
        "SELECT * FROM ecommerce.Pedido WHERE id_usuario_comprador = $1 ORDER BY data_pedido DESC",
        [id_usuario]
      );
      return res.json(result.rows);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
};