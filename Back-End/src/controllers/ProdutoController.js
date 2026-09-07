const db = require("../database/connection");

module.exports = {
  // Lista todos os produtos (Vitrine)
  async index(req, res) {
    try {
      const { id_categoria } = req.query;
      let query = "SELECT * FROM ecommerce.Produto WHERE estoque > 0";
      let params = [];

      if (id_categoria) {
        query += " AND id_categoria = $1";
        params.push(id_categoria);
      }

      const result = await db.query(query, params);
      return res.json(result.rows);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },

  // Busca detalhes de UM produto (Página pd-detail-container)
  async show(req, res) {
    const { id } = req.params;
    try {
      const result = await db.query(
        "SELECT * FROM ecommerce.Produto WHERE id = $1",
        [id]
      );

      const produto = result.rows[0];

      if (!produto) {
        return res.status(404).json({ error: "Produto não encontrado." });
      }

      return res.json(produto);
    } catch (err) {
      return res.status(500).json({ error: "Erro ao buscar detalhes do produto." });
    }
  },

  // Cadastro de novos produtos
  async store(req, res) {
    const { nome, preco, estoque, descricao, imagem_url, id_usuario_vendedor, id_categoria } = req.body;
    try {
      const sql = `INSERT INTO ecommerce.Produto 
        (nome, preco, estoque, descricao, imagem_url, id_usuario_vendedor, id_categoria) 
        VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`;

      const result = await db.query(sql, [nome, preco, estoque, descricao, imagem_url, id_usuario_vendedor, id_categoria]);
      return res.status(201).json(result.rows[0]);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }
};