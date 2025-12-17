import React, { useEffect, useState } from "react";
import api from "../../services/api";

function Compras() {
  const [compras, setCompras] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [produtos, setProdutos] = useState([]);

  const [idUsuario, setIdUsuario] = useState("");
  const [idProduto, setIdProduto] = useState("");
  const [quantidade, setQuantidade] = useState(1);

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

  const handleComprar = async (e) => {
    e.preventDefault();
    try {
      await api.post("/compras", {
        id_usuario_comprador: idUsuario,
        id_produto: idProduto,
        quantidade: parseInt(quantidade),
      });

      alert("Compra realizada com sucesso!");
      setIdProduto("");
      setQuantidade(1);
      atualizarListas();
    } catch (error) {
      alert(error.response?.data?.error || "Erro ao processar compra");
    }
  };

  const handleEliminar = async (id) => {
    if (
      window.confirm("Deseja cancelar esta compra? O estoque será devolvido.")
    ) {
      try {
        await api.delete(`/compras/${id}`);
        atualizarListas();
      } catch (error) {
        alert("Erro ao cancelar compra");
      }
    }
  };

  return (
    <div>
      <h2>Sistema de Compras</h2>

      <form
        onSubmit={handleComprar}
        style={{
          marginBottom: "30px",
          padding: "10px",
          border: "1px solid #ccc",
        }}
      >
        <h3>Nova Transação</h3>

        <label>Comprador: </label>
        <select
          value={idUsuario}
          onChange={(e) => setIdUsuario(e.target.value)}
          required
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
          style={{ width: "50px" }}
          required
        />

        <button type="submit" style={{ marginLeft: "10px" }}>
          Finalizar Compra
        </button>
      </form>

      <h3>Histórico de Transações</h3>
      <table border="1" style={{ width: "100%", borderCollapse: "collapse" }}>
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
                <button onClick={() => handleEliminar(c.id)}>Remover</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Compras;
