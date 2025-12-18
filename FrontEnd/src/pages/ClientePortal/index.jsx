import React, { useState, useEffect, useCallback } from "react";
import api from "../../services/api";

function ClientePortal() {
  const [produtos, setProdutos] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [compras, setCompras] = useState([]);
  const [idUsuarioLogado, setIdUsuarioLogado] = useState("");
  const [busca, setBusca] = useState("");
  const [quantidades, setQuantidades] = useState({});

  const buscarHistorico = useCallback(async (userId) => {
    if (!userId) {
      setCompras([]);
      return;
    }
    try {
      const res = await api.get("/compras");
      const filtradas = res.data.filter(
        (c) => Number(c.id_usuario_comprador) === Number(userId),
      );
      setCompras(filtradas);
    } catch {
      console.error("Erro ao buscar histórico");
    }
  }, []);

  useEffect(() => {
    async function carregarDadosBase() {
      try {
        const [resProd, resUser] = await Promise.all([
          api.get("/produtos"),
          api.get("/usuarios"),
        ]);
        setProdutos(resProd.data);
        setUsuarios(resUser.data);
      } catch {
        console.error("Erro ao carregar dados iniciais");
      }
    }
    carregarDadosBase();
  }, []);

  const handleUserChange = (e) => {
    const novoId = e.target.value;
    setIdUsuarioLogado(novoId);
    buscarHistorico(novoId);
  };

  const handleComprar = async (produto) => {
    const qtd = parseInt(quantidades[produto.id] || 1);
    if (!idUsuarioLogado) return alert("Selecione um usuário primeiro!");

    try {
      await api.post("/compras", {
        id_usuario_comprador: parseInt(idUsuarioLogado),
        id_produto: produto.id,
        quantidade: qtd,
      });

      alert("Compra realizada!");
      setQuantidades((prev) => ({ ...prev, [produto.id]: 1 }));

      const resProd = await api.get("/produtos");
      setProdutos(resProd.data);
      buscarHistorico(idUsuarioLogado);
    } catch {
      alert("Erro na compra.");
    }
  };

  const produtosDisponiveis = produtos.filter(
    (p) => p.nome.toLowerCase().includes(busca.toLowerCase()) && p.estoque > 0,
  );

  return (
    <div className="cliente-portal">
      <div
        className="cliente-header"
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <h2>Portal do Cliente</h2>
        <select value={idUsuarioLogado} onChange={handleUserChange}>
          <option value="">Simular Login</option>
          {usuarios.map((u) => (
            <option key={u.id} value={u.id}>
              {u.nome}
            </option>
          ))}
        </select>
      </div>

      <section className="vitrine">
        <input
          placeholder="Pesquisar produto..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          style={{ width: "100%", padding: "10px", marginBottom: "20px" }}
        />
        <div className="card-grid">
          {produtosDisponiveis.map((p) => (
            <div key={p.id} className="portal-card">
              <h4>{p.nome}</h4>
              <p
                className="price"
                style={{ color: "var(--secondary)", fontWeight: "bold" }}
              >
                R$ {p.preco.toFixed(2)}
              </p>
              <p>
                <small>Estoque: {p.estoque}</small>
              </p>
              <div style={{ display: "flex", gap: "5px" }}>
                <input
                  type="number"
                  min="1"
                  max={p.estoque}
                  value={quantidades[p.id] || 1}
                  onChange={(e) =>
                    setQuantidades({ ...quantidades, [p.id]: e.target.value })
                  }
                  style={{ width: "50px" }}
                />
                <button className="btn-edit" onClick={() => handleComprar(p)}>
                  Comprar
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {idUsuarioLogado && (
        <section style={{ marginTop: "40px" }}>
          <hr />
          <h3>Minhas Compras</h3>
          <table style={{ width: "100%", textAlign: "left" }}>
            <thead>
              <tr>
                <th>Produto</th>
                <th>Qtd</th>
                <th>Total</th>
                <th>Data</th>
              </tr>
            </thead>
            <tbody>
              {compras.length > 0 ? (
                compras.map((c) => (
                  <tr key={c.id}>
                    <td>{c.produto}</td>
                    <td>{c.quantidade}</td>
                    <td>R$ {Number(c.total).toFixed(2)}</td>
                    <td>{new Date(c.data_compra).toLocaleDateString()}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    style={{ textAlign: "center", padding: "10px" }}
                  >
                    Nenhuma compra encontrada.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </section>
      )}
    </div>
  );
}

export default ClientePortal;
