import CartEcommerce from "../../../assets/cart.png";
import { Link } from "react-router-dom";
import "./CartIcon.css";
import React, { useState, useEffect, useCallback } from "react";
import api from "../../../../src/services/api";

function CartIcon() {
  const [cartStatus, setCartStatus] = useState(0);

  const getUserId = () => {
    const userStorage = localStorage.getItem("@Ecommerce:user");
    return userStorage ? JSON.parse(userStorage).id : null;
  };

  const fetchCartCount = useCallback(async () => {
    const idUsuarioLogado = getUserId();
    if (!idUsuarioLogado) {
      setCartStatus(0);
      return;
    }

    try {
      const response = await api.get(`/carrinho/${idUsuarioLogado}`);

      const totalItens = response.data.reduce(
        (acc, item) => acc + item.quantidade,
        0,
      );
      setCartStatus(totalItens);
    } catch (error) {
      console.error("Erro ao buscar contagem do carrinho:", error);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      if (isMounted) {
        await fetchCartCount();
      }
    };

    loadData();

    window.addEventListener("carrinhoAtualizado", fetchCartCount);

    return () => {
      isMounted = false;
      window.removeEventListener("carrinhoAtualizado", fetchCartCount);
    };
  }, [fetchCartCount]);

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
