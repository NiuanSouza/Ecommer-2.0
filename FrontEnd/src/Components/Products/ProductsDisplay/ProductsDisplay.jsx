import React, { useState, useEffect } from "react";
import axios from "axios";
import api from "../../../services/api"; //
import ProductBarSelection from "../ProductBarSelection/ProductBarSelection";
import "./ProductsDisplay.css";

function ProductsDisplay({
  busca,
  idUsuarioLogado,
  setPortal,
  setProdutoSelecionado,
}) {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [totalProdutos, setTotalProdutos] = useState(0);
  const itensPorPagina = 40;

  // 1. Busca de produtos com Paginação (DummyJSON API)
  useEffect(() => {
    const carregarProdutos = async () => {
      setLoading(true);
      try {
        const skip = (paginaAtual - 1) * itensPorPagina;

        // Define a URL: se houver busca usa o endpoint /search, senão o principal
        const url = busca?.trim()
          ? `https://dummyjson.com/products/search?q=${busca}&limit=${itensPorPagina}&skip=${skip}`
          : `https://dummyjson.com/products?limit=${itensPorPagina}&skip=${skip}`;

        const response = await axios.get(url);

        setProdutos(response.data.products);
        setTotalProdutos(response.data.total);
      } catch (error) {
        console.error("Erro ao carregar produtos:", error);
      } finally {
        setLoading(false);
      }
    };

    carregarProdutos();
  }, [busca, paginaAtual]);

  // 2. Resetar para a primeira página sempre que o usuário pesquisar algo novo
  useEffect(() => {
    setPaginaAtual(1);
  }, [busca]);

  // 3. Lógica de Compra (Salvando na sua API local)
  const handleComprar = async (produto) => {
    if (!idUsuarioLogado) return alert("Selecione um usuário primeiro!");

    try {
      await api.post("/compras", {
        id_usuario_comprador: parseInt(idUsuarioLogado),
        id_produto: produto.id,
        quantidade: 1,
      });
      alert(`"${produto.title}" adicionado ao carrinho local!`);
    } catch {
      alert("Erro ao processar compra no servidor local.");
    }
  };

  const numeroDePaginas = Math.ceil(totalProdutos / itensPorPagina);
  const abas = Array.from({ length: numeroDePaginas }, (_, i) => i + 1);

  return (
    <div className="cliente-portal">
      {loading ? (
        <div className="loader">Carregando catálogo...</div>
      ) : (
        <>
          <section className="vitrine">
            <div className="card-grid">
              {produtos.length > 0 ? (
                produtos.map((p) => (
                  <div
                    key={p.id}
                    className="portal-card"
                    onClick={() => {
                      setProdutoSelecionado(p);
                      setPortal("Product");
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    <h4>{p.title}</h4>
                    <img
                      className="productImage"
                      src={p.thumbnail}
                      alt={p.title}
                    />
                    <p className="price">R$ {(p.price * 5).toFixed(2)}</p>

                    <button
                      className="btn-edit"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleComprar(p);
                      }}
                    >
                      Adicionar ao Carrinho
                    </button>
                  </div>
                ))
              ) : (
                <p className="no-results">
                  Nenhum produto encontrado para "{busca}".
                </p>
              )}
            </div>
          </section>

          <ProductBarSelection
            numeroDePaginas={numeroDePaginas}
            abas={abas}
            paginaAtual={paginaAtual}
            setPaginaAtual={setPaginaAtual}
          />
        </>
      )}
    </div>
  );
}

export default ProductsDisplay;
