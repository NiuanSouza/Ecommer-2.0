const db = require("../database/connection");

module.exports = {
  // Listar histórico geral (Read)
  index(req, res) {
    const sql = `
            SELECT C.id, C.data_compra, C.quantidade, 
                   U.nome as comprador, P.nome as produto, (C.quantidade * P.preco) as total
            FROM Compra C
            JOIN Usuario U ON C.id_usuario_comprador = U.id
            JOIN Produto P ON C.id_produto = P.id
            ORDER BY C.data_compra DESC
        `;
    db.all(sql, (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    });
  },

  // Buscar compra específica (Read)
  show(req, res) {
    const { id } = req.params;
    db.get("SELECT * FROM Compra WHERE id = ?", [id], (err, row) => {
      if (err) return res.status(500).json({ error: err.message });
      if (!row) return res.status(404).json({ error: "Compra não encontrada" });
      res.json(row);
    });
  },

  // Registrar nova compra com baixa de estoque (Create) [cite: 9, 13, 19]
  store(req, res) {
    const { id_usuario_comprador, id_produto, quantidade } = req.body;

    db.get(
      "SELECT estoque FROM Produto WHERE id = ?",
      [id_produto],
      (err, produto) => {
        if (!produto || produto.estoque < quantidade) {
          return res.status(400).json({ error: "Estoque insuficiente" });
        }

        const data = new Date().toISOString();
        db.run(
          "INSERT INTO Compra (id_usuario_comprador, id_produto, quantidade, data_compra) VALUES (?, ?, ?, ?)",
          [id_usuario_comprador, id_produto, quantidade, data],
          function (err) {
            if (err) return res.status(400).json({ error: err.message });

            // Baixa automática de estoque
            db.run("UPDATE Produto SET estoque = estoque - ? WHERE id = ?", [
              quantidade,
              id_produto,
            ]);
            res
              .status(201)
              .json({ id: this.lastID, status: "Venda realizada" });
          },
        );
      },
    );
  },

  // Atualizar quantidade de uma compra (Update)
  // Nota: Esta lógica ajusta o estoque proporcionalmente à diferença da nova quantidade
  update(req, res) {
    const { id } = req.params;
    const { quantidade } = req.body;

    db.get(
      "SELECT id_produto, quantidade FROM Compra WHERE id = ?",
      [id],
      (err, compra) => {
        if (!compra)
          return res.status(404).json({ error: "Compra não encontrada" });

        const diferenca = quantidade - compra.quantidade;

        db.get(
          "SELECT estoque FROM Produto WHERE id = ?",
          [compra.id_produto],
          (err, produto) => {
            if (produto.estoque < diferenca) {
              return res
                .status(400)
                .json({ error: "Estoque insuficiente para alteração" });
            }

            db.run(
              "UPDATE Compra SET quantidade = ? WHERE id = ?",
              [quantidade, id],
              function (err) {
                if (err) return res.status(400).json({ error: err.message });

                // Ajusta o estoque baseando-se na diferença
                db.run(
                  "UPDATE Produto SET estoque = estoque - ? WHERE id = ?",
                  [diferenca, compra.id_produto],
                );
                res.json({
                  message: "Quantidade da compra atualizada e estoque ajustado",
                });
              },
            );
          },
        );
      },
    );
  },

  // Deletar compra (Delete)
  // Nota: Deletar a compra devolve os itens ao estoque
  delete(req, res) {
    const { id } = req.params;

    db.get(
      "SELECT id_produto, quantidade FROM Compra WHERE id = ?",
      [id],
      (err, compra) => {
        if (!compra)
          return res.status(404).json({ error: "Compra não encontrada" });

        db.run("DELETE FROM Compra WHERE id = ?", [id], function (err) {
          if (err) return res.status(400).json({ error: err.message });

          // Devolve a quantidade ao estoque do produto
          db.run("UPDATE Produto SET estoque = estoque + ? WHERE id = ?", [
            compra.quantidade,
            compra.id_produto,
          ]);
          res.json({ message: "Compra removida e estoque restaurado" });
        });
      },
    );
  },
};
