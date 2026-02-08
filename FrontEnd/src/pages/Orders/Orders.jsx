import React, { useState, useEffect } from "react";
import api from "../../services/api";
import "./Orders.css";

function Orders() {
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);

  const getUserId = () => {
    const userStorage = localStorage.getItem("@Ecommerce:user");
    return userStorage ? JSON.parse(userStorage).id : null; //
  };

  useEffect(() => {
    const carregarHistorico = async () => {
      const idUsuario = getUserId();
      if (!idUsuario) return;
      try {
        const response = await api.get(`/compras/${idUsuario}`); //
        setPedidos(response.data);
      } catch (error) {
        console.error("Erro ao carregar histórico:", error);
      } finally {
        setLoading(false);
      }
    };

    carregarHistorico();
  }, []);

  if (loading) {
    return (
      <div className="loader-container">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="orders-page">
      <h2>Meus Pedidos</h2>

      {pedidos.length === 0 ? (
        <div className="empty-orders">
          <p>Você ainda não realizou nenhuma compra.</p>
        </div>
      ) : (
        <div className="orders-list">
          {pedidos.map((pedido) => (
            <div key={pedido.id} className="order-card">
              <div className="order-header">
                <span className="order-id">Pedido #{pedido.id}</span>
                <span className="order-date">
                  {new Date(pedido.data_pedido).toLocaleDateString("pt-BR")}
                </span>
              </div>
              <div className="order-body">
                <div>
                  <span className="order-total-label">Valor Total</span>
                  <span className="order-total-value">
                    R$ {parseFloat(pedido.valor_total).toFixed(2)}
                  </span>
                </div>
                <button className="view-details-btn" disabled>
                  Concluído
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Orders;
