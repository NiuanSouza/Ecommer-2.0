import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";
import "./Products.css"; 

function Products() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  
  
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

  if (loading) return <div className="loader">Carregando detalhes...</div>;
  if (!product) return <p className="error-msg">Produto não encontrado.</p>;

  return (
    <div className="product-detail-container">
      <button onClick={() => navigate("/")} className="btn-back">
        ← Voltar para Vitrine
      </button>

      <div className="product-content">
        <div className="product-image-section">
          <img
            src={product.imagem_url}
            alt={product.nome}
            className="main-product-image"
          />
        </div>

        <div className="product-info-section">
          <h1 className="product-title">{product.nome}</h1>
          <p className="product-category">
            Categoria: {product.categoria || "Geral"}
          </p>

          <div className="price-tag">
            <span className="currency">R$</span>
            <span className="value">
              {parseFloat(product.preco).toFixed(2)}
            </span>
          </div>

          <div className="description-box">
            <h3>Descrição</h3>
            <p>{product.descricao}</p>
          </div>

          <button className="btn-buy-now">Comprar Agora</button>
        </div>
      </div>
    </div>
  );
}

export default Products;
