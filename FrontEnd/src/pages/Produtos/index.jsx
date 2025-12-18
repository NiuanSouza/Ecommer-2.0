import React, { useEffect, useState } from "react";
import api from "../../services/api";

function Produtos() {
  const [produtos, setProdutos] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");
  const [estoque, setEstoque] = useState("");
  const [idVendedor, setIdVendedor] = useState("");
  const [editandoId, setEditandoId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [resProdutos, resUsuarios] = await Promise.all([
          api.get("/produtos"),
          api.get("/usuarios"),
        ]);
        setProdutos(resProdutos.data);
        setUsuarios(resUsuarios.data);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    fetchData();
  }, []);

  const recarregarProdutos = async () => {
    try {
      const response = await api.get("/produtos");
      setProdutos(response.data);
    } catch (error) {
      console.error("Erro ao recarregar produtos:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dados = {
      nome,
      preco: parseFloat(preco),
      estoque: parseInt(estoque),
      id_usuario_vendedor: idVendedor,
    };

    try {
      if (editandoId) {
        await api.put(`/produtos/${editandoId}`, dados);
        alert("Produto atualizado com sucesso!");
      } else {
        await api.post("/produtoss", dados);
        alert("Produto cadastrado com sucesso!");
      }
      limparFormulario();
      recarregarProdutos();
    } catch (error) {
      alert(error.response?.data?.error || "Erro ao salvar produto");
    }
  };

  const handleDeletar = async (id) => {
    if (window.confirm("Tem certeza que deseja excluir este produto?")) {
      try {
        await api.delete(`/produtos/${id}`);
        recarregarProdutos();
      } catch (error) {
        alert(error.response?.data?.error || "Erro ao deletar");
      }
    }
  };

  const prepararEdicao = (produto) => {
    setEditandoId(produto.id);
    setNome(produto.nome);
    setPreco(produto.preco);
    setEstoque(produto.estoque);
    setIdVendedor(produto.id_usuario_vendedor);
  };

  const limparFormulario = () => {
    setEditandoId(null);
    setNome("");
    setPreco("");
    setEstoque("");
    setIdVendedor("");
  };

  return (
    <div>
      <h2>Gestão de Produtos</h2>

      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />
        <input
          type="number"
          step="0.01"
          placeholder="Preço"
          value={preco}
          onChange={(e) => setPreco(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Estoque"
          value={estoque}
          onChange={(e) => setEstoque(e.target.value)}
          required
        />

        <select
          value={idVendedor}
          onChange={(e) => setIdVendedor(e.target.value)}
          required
          disabled={!!editandoId}
        >
          <option value="">Selecione o Vendedor</option>
          {usuarios.map((u) => (
            <option key={u.id} value={u.id}>
              {u.nome}
            </option>
          ))}
        </select>

        <button type="submit">
          {editandoId ? "Atualizar Produto" : "Cadastrar Produto"}
        </button>
        {editandoId && (
          <button type="button" onClick={limparFormulario}>
            Cancelar
          </button>
        )}
      </form>

      <table border="1" style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Preço</th>
            <th>Estoque</th>
            <th>Vendedor (ID)</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {produtos.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.nome}</td>
              <td>R$ {p.preco.toFixed(2)}</td>
              <td>{p.estoque}</td>
              <td>{p.id_usuario_vendedor}</td>
              <td>
                <button className="btn-edit" onClick={() => prepararEdicao(p)}>
                  Editar
                </button>
                <button
                  className="btn-delete"
                  onClick={() => handleDeletar(p.id)}
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Produtos;
