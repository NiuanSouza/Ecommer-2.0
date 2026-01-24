import React, { useState, useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import api from "../../services/api";
import ProductBarSelection from "../../components/ProductBarSelection/ProductBarSelection";
import "./ProductsDisplay.css";

function ProductsDisplay() {
  const { busca, idUsuarioLogado } = useOutletContext();
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [paginaAtual, setPaginaAtual] = useState(1);
  const produtosPorPagina = 40; 

  const navigate = useNavigate();

  useEffect(() => {
    const carregarProdutos = async () => {
      setLoading(true);
      try {
        const response = await api.get("/produtos");
        let lista = response.data;

        if (busca?.trim()) {
          lista = lista.filter((p) =>
            p.nome.toLowerCase().includes(busca.toLowerCase()),
          );
        }
        setProdutos(lista);
        setPaginaAtual(1); 
      } catch (error) {
        console.error("Erro ao carregar vitrine:", error);
      } finally {
        setLoading(false);
      }
    };
    carregarProdutos();
  }, [busca]);

  const totalPaginas = Math.ceil(produtos.length / produtosPorPagina);
  const indiceUltimoProd = paginaAtual * produtosPorPagina;
  const indicePrimeiroProd = indiceUltimoProd - produtosPorPagina;
  const produtosExibidos = produtos.slice(indicePrimeiroProd, indiceUltimoProd);

  const abas = Array.from({ length: totalPaginas }, (_, i) => i + 1);

  const handleComprar = async (e, produto) => {
    e.stopPropagation();
    if (!idUsuarioLogado) return alert("Selecione um usuário primeiro!");

    try {
      await api.post("/compras", {
        id_usuario_comprador: parseInt(idUsuarioLogado),
        id_produto: produto.id,
        quantidade: 1,
      });
      alert(`"${produto.nome}" adicionado ao carrinho!`);
    } catch {
      alert("Erro ao processar compra.");
    }
  };

  if (loading) return <div className="loader">Carregando catálogo...</div>;

  if (produtosExibidos.length === 0) return <div>Nenhum produto encontrado.</div>;


  return (
    <section className="vitrine-container">
      <div className="card-grid">
        {produtosExibidos.map((p) => (
          <div
            key={p.id}
            className="portal-card"
            onClick={() => navigate(`/product/${p.id}`)}
          >
            <div className="card-content">
              <div className="img-container">
                <img className="productImage" src={p.imagem_url} alt={p.nome} />
              </div>
              <h4 title={p.nome}>{p.nome}</h4>
              <p className="price">R$ {parseFloat(p.preco).toFixed(2)}</p>
            </div>

            <button
              className="btn-add-cart"
              onClick={(e) => handleComprar(e, p)}
            >
              Adicionar ao Carrinho
            </button>
          </div>
        ))}
      </div>

      <ProductBarSelection 
        numeroDePaginas={totalPaginas}
        abas={abas}
        paginaAtual={paginaAtual}
        setPaginaAtual={setPaginaAtual}
      />
    </section>
  );
}

export default ProductsDisplay;