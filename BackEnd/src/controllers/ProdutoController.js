const db = require("../database/connection");

module.exports = {
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
  },

  // Adicione este método dentro do module.exports no ProdutoController.js
  async show(req, res) {
    try {
      const { id } = req.params;
      const query = "SELECT * FROM ecommerce.Produto WHERE id = $1";
      const result = await db.query(query, [id]);

      if (result.rows.length === 0) {
        return res.status(404).json({ error: "Produto não encontrado" });
      }

      return res.json(result.rows[0]);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },
};

