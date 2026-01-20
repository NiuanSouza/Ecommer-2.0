import CartEcommerce from "../../../assets/cart.png";
import "./Cart.css";

function Cart({ setPortal }) {
  return (
    <div className="cartContainer">
      <span id="cartSpan">1</span>
      <img
        src={CartEcommerce}
        className="logo-brand"
        alt="Logo"
        style={{ cursor: "pointer" }}
        onClick={() => setPortal("cart")}
      />
    </div>
  );
}

export default Cart;
