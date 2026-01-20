import logoEcommerce from "../../assets/home.png";
import Account from "./Account/Account.jsx";
import Cart from "./Cart/Cart.jsx";
import SearchBar from "./SearchBar/SearchBar.jsx";
import React from "react";

import "./Header.css";

function Header({
  setPortal,
  busca,
  setBusca,
  idUsuarioLogado,
  usuarios,
  setIdUsuarioLogado,
}) {
  const usuarioLogado = usuarios.find(
    (u) => String(u.id) === String(idUsuarioLogado),
  );

  return (
    <header className="main-header">
      <section className="header-topbar">
        <div className="container-header">
          <div className="topbar-links">
            <span onClick={() => setPortal("admin")} className="topbar-link">
              Admin
            </span>
            <span onClick={() => setPortal("vendedor")} className="topbar-link">
              Vendedor
            </span>
            <span onClick={() => setPortal("cliente")} className="topbar-link">
              Minhas Compras
            </span>
          </div>
        </div>
      </section>

      <section className="header-main">
        <div className="container-header">
          <img
            src={logoEcommerce}
            className="logo-brand"
            alt="Logo"
            style={{ cursor: "pointer" }}
            onClick={() => setPortal("home")}
          />

          <SearchBar setBusca={setBusca} busca={busca} />

          <div className="header-actions">
            <Cart setPortal={setPortal} />

            <Account
              usuarioLogado={usuarioLogado}
              usuarios={usuarios}
              idUsuarioLogado={idUsuarioLogado}
              setIdUsuarioLogado={setIdUsuarioLogado}
            />
          </div>
        </div>
      </section>
    </header>
  );
}

export default Header;
