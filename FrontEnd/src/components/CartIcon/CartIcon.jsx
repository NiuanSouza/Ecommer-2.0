import CartEcommerce from "../../assets/cart.png";
import { Link } from "react-router-dom";
import "./CartIcon.css";
import React, { useState, useEffect } from "react";
import api from "../../services/api";

function CartIcon({ idUsuarioLogado }) {
  const [cartStatus, setCartStatus] = useState(0);

  useEffect(() => {
    async function fetchCartCount() {
      if (!idUsuarioLogado) {
        setCartStatus(0);
        return;
      }
      try {
        const response = await api.get(`/compras/${idUsuarioLogado}`);
        setCartStatus(response.data.length);
      } catch (error) {
        console.error("Erro ao buscar contagem do carrinho:", error);
      }
    }

    fetchCartCount();
  }, [idUsuarioLogado]);

  return (
    <Link to="/cart" className="cartContainer">
      {cartStatus > 0 && <span id="cartStatus">{cartStatus}</span>}

      <div id="btn_cart">
        <img src={CartEcommerce} className="cart-icon-img" alt="Carrinho" />
      </div>
    </Link>
  );
}

export default CartIcon;
