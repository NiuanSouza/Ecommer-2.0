import React, { useState, useEffect, useCallback } from "react";
import api from "../../services/api";

function VendedorPortal({
  busca = "",
  setBusca,
  setUsuarios,
  idUsuarioLogado,
}) {
  const [produtosVendedor, setProdutosVendedor] = useState([]);
  const [novoProduto, setNovoProduto] = useState({
    nome: "",
    preco: "",
    estoque: "",
  });

  // 1. Função memorizada para buscar produtos
  const carregarProdutosDoVendedor = useCallback(async (vendedorId) => {
    if (!vendedorId) {
      setProdutosVendedor([]);
      return;
    }
    try {
      // Filtra os produtos onde o id_usuario_vendedor é o logado
      const res = await api.get("/produtos");
      const filtrados = res.data.filter(
        (p) => Number(p.id_usuario_vendedor) === Number(vendedorId),
      );
      setProdutosVendedor(filtrados);
    } catch {
      console.error("Erro ao carregar produtos do vendedor");
    }
  }, []);

  useEffect(() => {
    api
      .get("/usuarios")
      .then((res) => setUsuarios(res.data))
      .catch(() => console.error("Erro ao carregar usuários"));
  }, [setUsuarios]);

  useEffect(() => {
    if (idUsuarioLogado) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      carregarProdutosDoVendedor(idUsuarioLogado);
    }
  }, [idUsuarioLogado, carregarProdutosDoVendedor]);

  const handleCadastrarProduto = async (e) => {
    e.preventDefault();
    if (!idUsuarioLogado) return alert("Selecione um vendedor primeiro!");

    try {
      await api.post("/produtos", {
        nome: novoProduto.nome,
        preco: parseFloat(novoProduto.preco),
        estoque: parseInt(novoProduto.estoque),
        id_usuario_vendedor: parseInt(idUsuarioLogado),
      });

      alert("Produto cadastrado com sucesso!");
      setNovoProduto({ nome: "", preco: "", estoque: "" });

      // Recarrega a lista após cadastrar
      carregarProdutosDoVendedor(idUsuarioLogado);
    } catch {
      alert("Erro ao cadastrar produto.");
    }
  };

  const produtosFiltrados = produtosVendedor.filter((p) =>
    (p.nome || "").toLowerCase().includes((busca || "").toLowerCase()),
  );

  return (
    <div className="vendedor-portal">
      <div
        className="cliente-header"
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <h2>Painel do Vendedor</h2>
      </div>

      {idUsuarioLogado && (
        <>
          <section
            className="portal-card"
            style={{
              background: "#f9f9f9",
              padding: "20px",
              marginBottom: "30px",
              borderRadius: "8px",
            }}
          >
            <h3>📦 Anunciar Novo Produto</h3>
            <form
              onSubmit={handleCadastrarProduto}
              style={{
                display: "flex",
                gap: "10px",
                marginTop: "15px",
                flexWrap: "wrap",
              }}
            >
              <input
                placeholder="Nome do Produto"
                value={novoProduto.nome}
                onChange={(e) =>
                  setNovoProduto({ ...novoProduto, nome: e.target.value })
                }
                required
                style={{ flex: 2, padding: "8px" }}
              />
              <input
                type="number"
                step="0.01"
                placeholder="Preço R$"
                value={novoProduto.preco}
                onChange={(e) =>
                  setNovoProduto({ ...novoProduto, preco: e.target.value })
                }
                required
                style={{ flex: 1, padding: "8px" }}
              />
              <input
                type="number"
                placeholder="Estoque"
                value={novoProduto.estoque}
                onChange={(e) =>
                  setNovoProduto({ ...novoProduto, estoque: e.target.value })
                }
                required
                style={{ flex: 1, padding: "8px" }}
              />
              <button type="submit" className="btn-edit" style={{ flex: 1 }}>
                Anunciar
              </button>
            </form>
          </section>

          <section className="vitrine">
            <h3>Meus Produtos Anunciados</h3>
            <input
              placeholder="Pesquisar entre meus anúncios..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                marginBottom: "20px",
                borderRadius: "4px",
                border: "1px solid #ddd",
              }}
            />

            <div className="card-grid">
              {produtosFiltrados.length > 0 ? (
                produtosFiltrados.map((p) => (
                  <div key={p.id} className="portal-card">
                    <h4>{p.nome}</h4>
                    <p
                      className="price"
                      style={{ color: "var(--secondary)", fontWeight: "bold" }}
                    >
                      R$ {Number(p.preco || 0).toFixed(2)}
                    </p>
                    <p>
                      <small>Em estoque: {p.estoque} unidades</small>
                    </p>
                  </div>
                ))
              ) : (
                <p
                  style={{
                    textAlign: "center",
                    gridColumn: "1 / -1",
                    padding: "20px",
                    color: "#666",
                  }}
                >
                  Nenhum produto encontrado.
                </p>
              )}
            </div>
          </section>
        </>
      )}
    </div>
  );
}

export default VendedorPortal;
