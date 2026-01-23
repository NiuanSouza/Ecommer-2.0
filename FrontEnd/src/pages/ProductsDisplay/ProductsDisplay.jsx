import React, { useState, useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import api from "../../services/api";
import "./ProductsDisplay.css";

function ProductsDisplay() {
  const { busca, idUsuarioLogado } = useOutletContext();
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
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
      } catch (error) {
        console.error("Erro ao carregar vitrine:", error);
      } finally {
        setLoading(false);
      }
    };
    carregarProdutos();
  }, [busca]);

  const handleComprar = async (e, produto) => {
    e.stopPropagation();
    if (!idUsuarioLogado) return alert("Selecione um usuário primeiro!");

    try {
      await api.post("/compras", {
        id_usuario_comprador: parseInt(idUsuarioLogado),
        id_produto: produto.id,
        quantidade: 1,
      });
      alert(`"${p.nome}" adicionado ao carrinho!`);
    } catch {
      alert("Erro ao processar compra.");
    }
  };

  if (loading) return <div className="loader">Carregando catálogo...</div>;

  return (
    <section className="vitrine">
      <div className="card-grid">
        {produtos.map((p) => (
          <div
            key={p.id}
            className="portal-card"
            onClick={() => navigate(`/product/${p.id}`)}
          >
            <div className="card-content">
              <img className="productImage" src={p.imagem_url} alt={p.nome} />
              <h4>{p.nome}</h4>
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
    </section>
  );
}

export default ProductsDisplay;
