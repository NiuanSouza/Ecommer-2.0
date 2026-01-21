import CartEcommerce from "../../../assets/cart.png";
import "./Cart.css";
import React, { useState, useEffect } from "react";

function Cart({ setPortal }) {
  const [cartStatus, setCartStatus] = useState(0);

  useEffect(() => {}, [cartStatus, setCartStatus]);

  return (
    <div className="cartContainer">
      <span id="cartStatus">{cartStatus}</span>

      <button id="btn_cart">
        <img
          src={CartEcommerce}
          className="logo-brand"
          alt="Logo"
          style={{ cursor: "pointer" }}
          onClick={() => setPortal("cart")}
        />
      </button>
    </div>
  );
}

export default Cart;
