import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";
import "./Products.css";
import { useModal } from "../../hooks/useModal";
import Modal from "../../components/Modal/Modal";

function Products() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const { modalConfig, showModal, closeModal } = useModal();

  const obterUsuarioLogado = () => {
    const userStorage = localStorage.getItem("@Ecommerce:user");
    return userStorage ? JSON.parse(userStorage) : null;
  };

  useEffect(() => {
    async function getProduto() {
      try {
        const response = await api.get(`/produtos/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error("Erro ao buscar produto:", error);
      } finally {
        setLoading(false);
      }
    }
    if (id) getProduto();
  }, [id]);

  const adicionarCarrinho = async (e, produto, redirecionar = false) => {
    if (e) e.stopPropagation();

    const usuario = obterUsuarioLogado();

    if (!usuario || !usuario.id) {
      return showModal(
        "Você precisa estar logado para adicionar itens ao carrinho!",
      );
    }

    try {
      await api.post("/carrinho", {
        id_usuario: parseInt(usuario.id),
        id_produto: produto.id,
        quantidade: 1,
      });

      window.dispatchEvent(new Event("carrinhoAtualizado"));

      if (redirecionar) {
        navigate("/cart");
      } else {
        showModal(`"${produto.nome}" adicionado ao carrinho!`);
      }
    } catch (error) {
      console.error("Erro ao adicionar ao carrinho:", error);
      showModal("Erro ao adicionar o item ao carrinho.");
    }
  };

  if (loading) return <div className="pd-loader">Carregando detalhes...</div>;
  if (!product) return <p className="pd-error-msg">Produto não encontrado.</p>;

  return (
    <div className="pd-detail-container">
      <button onClick={() => navigate("/")} className="pd-btn-back">
        ← Voltar para Vitrine
      </button>

      <div className="pd-content-wrapper">
        <div className="pd-image-section">
          <img
            src={product.imagem_url}
            alt={product.nome}
            className="pd-main-image"
          />
        </div>

        <div className="pd-info-section">
          <h1 className="pd-title">{product.nome}</h1>
          <p className="pd-category-label">
            Categoria: {product.categoria || "Geral"}
          </p>

          <div className="pd-price-container">
            <span className="pd-currency-symbol">R$</span>
            <span className="pd-price-value">
              {parseFloat(product.preco).toFixed(2)}
            </span>
          </div>

          <div className="pd-description-area">
            <h3 className="pd-description-title">Descrição</h3>
            <p className="pd-description-text">{product.descricao}</p>
          </div>

          <div className="pd-actions-group">
            <button
              className="pd-btn-buy-now"
              onClick={(e) => adicionarCarrinho(e, product, true)}
            >
              Comprar Agora
            </button>

            <button
              className="pd-btn-add-cart"
              onClick={(e) => adicionarCarrinho(e, product, false)}
            >
              Adicionar ao Carrinho
            </button>
          </div>
        </div>
      </div>

      <Modal config={modalConfig} onClose={closeModal} />
    </div>
  );
}

export default Products;
