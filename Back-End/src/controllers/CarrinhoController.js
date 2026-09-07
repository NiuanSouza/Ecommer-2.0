const db = require("../database/connection"); //

module.exports = {
  // Listar itens do carrinho
  async index(req, res) {
    const { id_usuario } = req.params;
    try {
      const sql = `
        SELECT c.id_produto, p.nome, p.preco, c.quantidade, p.imagem_url 
        FROM ecommerce.CarrinhoItem c
        JOIN ecommerce.Produto p ON c.id_produto = p.id
        WHERE c.id_usuario = $1`;
      const result = await db.query(sql, [id_usuario]);
      return res.json(result.rows);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },

  // Adicionar ou atualizar quantidade (Incremento/Decremento)
  async add(req, res) {
    const { id_usuario, id_produto, quantidade } = req.body;
    try {
      const sql = `
        INSERT INTO ecommerce.CarrinhoItem (id_usuario, id_produto, quantidade)
        VALUES ($1, $2, $3)
        ON CONFLICT (id_usuario, id_produto) 
        DO UPDATE SET quantidade = ecommerce.CarrinhoItem.quantidade + $3
        RETURNING *`;
      const result = await db.query(sql, [id_usuario, id_produto, quantidade]);
      return res.json(result.rows[0]);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  },

  //Remover item completamente
  async delete(req, res) {
    const { id_usuario, id_produto } = req.params;
    try {
      await db.query(
        "DELETE FROM ecommerce.CarrinhoItem WHERE id_usuario = $1 AND id_produto = $2",
        [id_usuario, id_produto]
      );
      return res.status(204).send();
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
};