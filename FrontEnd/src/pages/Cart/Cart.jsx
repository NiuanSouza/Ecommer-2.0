import React, { useState, useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import api from "../../services/api";
import { FaPlus, FaMinus, FaTrash } from "react-icons/fa";
import "./Cart.css";

function Cart() {
  const { busca } = useOutletContext();
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const getUserId = () => {
    const userStorage = localStorage.getItem("@Ecommerce:user");
    return userStorage ? JSON.parse(userStorage).id : null;
  };

  const carregarCarrinho = async () => {
    const idUsuario = getUserId();
    if (!idUsuario) return;
    try {
      const response = await api.get(`/carrinho/${idUsuario}`);
      let lista = response.data;
      if (busca?.trim()) {
        lista = lista.filter((p) =>
          p.nome.toLowerCase().includes(busca.toLowerCase()),
        );
      }
      setProdutos(lista);
    } catch (error) {
      console.error("Erro:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarCarrinho();
  }, [busca]);

  const handleUpdateQtd = async (idProd, delta) => {
    try {
      await api.post("/carrinho", {
        id_usuario: getUserId(),
        id_produto: idProd,
        quantidade: delta,
      });
      carregarCarrinho();
      window.dispatchEvent(new Event("carrinhoAtualizado"));
    } catch {
      alert("Erro ao atualizar.");
    }
  };

  const handleRemover = async (idProd) => {
    try {
      await api.delete(`/carrinho/${getUserId()}/${idProd}`);
      carregarCarrinho();
      window.dispatchEvent(new Event("carrinhoAtualizado"));
    } catch {
      alert("Erro ao remover.");
    }
  };

  const handleFinalizarCompra = async () => {
    const userStorage = localStorage.getItem("@Ecommerce:user");
    if (!userStorage) return;

    const { id, token } = JSON.parse(userStorage);

    try {
      const response = await api.post(
        "/compras",
        { id_usuario_comprador: id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      alert(response.data.message || "Compra realizada com sucesso!");
      window.dispatchEvent(new Event("carrinhoAtualizado"));
      navigate("/");
    } catch (error) {
      console.error("Erro na compra:", error.response?.data);
      alert(error.response?.data?.error || "Erro ao processar o pedido.");
    }
  };

  const total = produtos.reduce((acc, p) => acc + p.preco * p.quantidade, 0);

  if (loading) return <div className="loader">Carregando...</div>;
  if (produtos.length === 0) return <div className="empty">Carrinho Vazio</div>;

  return (
    <section className="cart-page">
      <div className="cart-list">
        {produtos.map((p) => (
          <div
            key={p.id_produto}
            className="cart-item-small"
            onClick={() => navigate(`/product/${p.id_produto}`)}
          >
            <img src={p.imagem_url} alt={p.nome} />
            <div className="item-info">
              <h4>{p.nome}</h4>
              <span>R$ {parseFloat(p.preco).toFixed(2)}</span>
            </div>

            <div className="qty-controls" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleUpdateQtd(p.id_produto, -1);
                }}
                disabled={p.quantidade <= 1}
              >
                <FaMinus />
              </button>
              <span>{p.quantidade}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleUpdateQtd(p.id_produto, 1);
                }}
              >
                <FaPlus />
              </button>
            </div>

            <button
              className="remove-btn"
              onClick={(e) => {
                e.stopPropagation();
                handleRemover(p.id_produto);
              }}
            >
              <FaTrash />
            </button>
          </div>
        ))}
      </div>
      <div className="cart-summary">
        <h3>Total: R$ {total.toFixed(2)}</h3>
        <button className="checkout-btn" onClick={handleFinalizarCompra}>
          Finalizar
        </button>
      </div>
    </section>
  );
}
export default Cart;
