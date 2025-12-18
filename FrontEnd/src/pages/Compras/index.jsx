import React, { useEffect, useState } from "react";
import api from "../../services/api";

function Compras() {
  const [compras, setCompras] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [produtos, setProdutos] = useState([]);

  const [idUsuario, setIdUsuario] = useState("");
  const [idProduto, setIdProduto] = useState("");
  const [quantidade, setQuantidade] = useState(1);
  const [editandoId, setEditandoId] = useState(null); // Estado para Edição

  useEffect(() => {
    const carregarDadosIniciais = async () => {
      try {
        const [resCompras, resUsuarios, resProdutos] = await Promise.all([
          api.get("/compras"),
          api.get("/usuarios"),
          api.get("/produtos"),
        ]);
        setCompras(resCompras.data);
        setUsuarios(resUsuarios.data);
        setProdutos(resProdutos.data);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      }
    };

    carregarDadosIniciais();
  }, []);

  const atualizarListas = async () => {
    try {
      const [resCompras, resProdutos] = await Promise.all([
        api.get("/compras"),
        api.get("/produtos"),
      ]);
      setCompras(resCompras.data);
      setProdutos(resProdutos.data);
    } catch (error) {
      console.error("Erro ao atualizar dados:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dados = {
      id_usuario_comprador: idUsuario,
      id_produto: idProduto,
      quantidade: parseInt(quantidade),
    };

    try {
      if (editandoId) {
        await api.put(`/compras/${editandoId}`, dados);
        alert("Compra atualizada com sucesso!");
      } else {
        await api.post("/compras", dados);
        alert("Compra realizada com sucesso!");
      }

      limparFormulario();
      atualizarListas();
    } catch (error) {
      alert(error.response?.data?.error || "Erro ao processar transação");
    }
  };

  const prepararEdicao = (c) => {
    setEditandoId(c.id);
    setIdUsuario(c.id_usuario_comprador);
    setIdProduto(c.id_produto);
    setQuantidade(c.quantidade);
  };

  const limparFormulario = () => {
    setEditandoId(null);
    setIdUsuario("");
    setIdProduto("");
    setQuantidade(1);
  };

  const handleEliminar = async (id) => {
    if (
      window.confirm("Deseja cancelar esta compra? O estoque será devolvido.")
    ) {
      try {
        await api.delete(`/compras/${id}`);
        atualizarListas();
      } catch (error) {
        alert("Erro ao cancelar compra: " + error);
      }
    }
  };

  return (
    <div>
      <h2>Sistema de Compras</h2>

      <form onSubmit={handleSubmit} className="form-container">
        <h3>{editandoId ? "Editar Transação" : "Nova Transação"}</h3>

        <div
          style={{
            display: "flex",
            gap: "10px",
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          <label>Comprador: </label>
          <select
            value={idUsuario}
            onChange={(e) => setIdUsuario(e.target.value)}
            required
            disabled={!!editandoId} // Geralmente não se muda o comprador de uma nota fiscal
          >
            <option value="">Selecione comprador</option>
            {usuarios.map((u) => (
              <option key={u.id} value={u.id}>
                {u.nome}
              </option>
            ))}
          </select>

          <label> Produto: </label>
          <select
            value={idProduto}
            onChange={(e) => setIdProduto(e.target.value)}
            required
          >
            <option value="">Selecione o produto</option>
            {produtos.map((p) => (
              <option key={p.id} value={p.id}>
                {p.nome} (Estoque: {p.estoque})
              </option>
            ))}
          </select>

          <label> Qtd: </label>
          <input
            type="number"
            min="1"
            value={quantidade}
            onChange={(e) => setQuantidade(e.target.value)}
            style={{ width: "60px" }}
            required
          />

          <button type="submit" className="btn-success">
            {editandoId ? "Salvar Alterações" : "Finalizar Compra"}
          </button>

          {editandoId && (
            <button
              type="button"
              onClick={limparFormulario}
              className="btn-cancel"
            >
              Cancelar
            </button>
          )}
        </div>
      </form>

      <h3>Histórico de Transações</h3>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Data</th>
            <th>Comprador</th>
            <th>Produto</th>
            <th>Qtd</th>
            <th>Total</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {compras.map((c) => (
            <tr key={c.id}>
              <td>{c.id}</td>
              <td>{new Date(c.data_compra).toLocaleString()}</td>
              <td>{c.comprador}</td>
              <td>{c.produto}</td>
              <td>{c.quantidade}</td>
              <td>R$ {c.total?.toFixed(2)}</td>
              <td>
                <button className="btn-edit" onClick={() => prepararEdicao(c)}>
                  Editar
                </button>
                <button
                  className="btn-delete"
                  onClick={() => handleEliminar(c.id)}
                >
                  Remover
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Compras;
