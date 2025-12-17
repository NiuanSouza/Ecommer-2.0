const db = require("../database/connection");

module.exports = {
  // Listar todos os produtos(Read)
  index(req, res) {
    db.all("SELECT * FROM Produto", (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    });
  },

  // Buscar um produto específico (Read)
  async show(req, res) {
    const { id } = req.params;
    db.get("SELECT * FROM Produto WHERE id = ?", [id], (err, row) => {
      if (err) return res.status(500).json({ error: err.message });
      if (!row)
        return res.status(404).json({ error: "Produto não encontrado" });
      res.json(row);
    });
  },

  // Cria um produto (Create)
  store(req, res) {
    const { nome, preco, estoque, id_usuario_vendedor } = req.body;
    const sql =
      "INSERT INTO Produto (nome, preco, estoque, id_usuario_vendedor) VALUES (?, ?, ?, ?)";
    db.run(sql, [nome, preco, estoque, id_usuario_vendedor], function (err) {
      if (err) return res.status(400).json({ error: err.message });
      res.status(201).json({ id: this.lastID, nome });
    });
  },

  // Atualizar as informações de um produto(Update)
  update(req, res) {
    const { id } = req.params;
    const { nome, preco, estoque } = req.body;
    const sql =
      "UPDATE Produto SET nome = ?, preco = ?, estoque = ? WHERE id = ?";
    db.run(sql, [nome, preco, estoque, id], function (err) {
      if (err) return res.status(400).json({ error: err.message });
      res.json({ message: "Produto atualizado" });
    });
  },

  // Deletar um produto(Delete)
  delete(req, res) {
    const { id } = req.params;
    db.run("DELETE FROM Produto WHERE id = ?", [id], function (err) {
      if (err)
        return res.status(400).json({
          error: "Produto vinculado a uma compra não pode ser excluído.",
        });
      res.json({ message: "Produto removido" });
    });
  },
};
