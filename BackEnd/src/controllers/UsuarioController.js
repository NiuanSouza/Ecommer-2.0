const db = require("../database/connection");

module.exports = {
  // Listar todos os usuários git(Select)
  async index(req, res) {
    db.all("SELECT * FROM Usuario", (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    });
  },

  // Buscar um usuário específico por ID (Select)
  async show(req, res) {
    const { id } = req.params;
    db.get("SELECT * FROM Usuario WHERE id = ?", [id], (err, row) => {
      if (err) return res.status(500).json({ error: err.message });
      if (!row)
        return res.status(404).json({ error: "Usuário não encontrado" });
      res.json(row);
    });
  },

  // Criar (Create)
  store(req, res) {
    const { nome, email } = req.body;
    db.run(
      "INSERT INTO Usuario (nome, email) VALUES (?, ?)",
      [nome, email],
      function (err) {
        if (err) return res.status(400).json({ error: "Email já cadastrado." });
        res.status(201).json({ id: this.lastID, nome, email });
      },
    );
  },

  // Atualizar (Update)
  update(req, res) {
    const { id } = req.params;
    const { nome, email } = req.body;
    db.run(
      "UPDATE Usuario SET nome = ?, email = ? WHERE id = ?",
      [nome, email, id],
      function (err) {
        if (err) return res.status(400).json({ error: err.message });
        res.json({ message: "Usuário atualizado com sucesso" });
      },
    );
  },

  // Deletar (Delete)
  delete(req, res) {
    const { id } = req.params;
    db.run("DELETE FROM Usuario WHERE id = ?", [id], function (err) {
      if (err)
        return res.status(400).json({
          error:
            "Não é possível deletar usuário com produtos ou compras vinculadas.",
        });
      res.json({ message: "Usuário removido" });
    });
  },
};
