import logoEcommerce from "../../assets/home.png";
import { Link } from "react-router-dom";
import Account from "./Profile/Profile.jsx";
import CartIcon from "./CartIcon/CartIcon.jsx";
import SearchBar from "./SearchBar/SearchBar.jsx";
import React, { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext.jsx";

import "./Header.css";

function Header({ busca, setBusca }) {
  return (
    <header className="main-header">
      <section className="header-topbar">
        <div className="container-header">
          <div className="topbar-links">
            <span className="topbar-link">Admin</span>
            <span className="topbar-link">Minhas Compras</span>
          </div>
        </div>
      </section>

      <section className="header-main">
        <div className="container-header">
          <Link to="/">
            <img src={logoEcommerce} className="logo-brand" alt="Logo Home" />
          </Link>

          <SearchBar setBusca={setBusca} busca={busca} />

          <div className="header-actions">
            <CartIcon />
            <Account />
          </div>
        </div>
      </section>
    </header>
  );
}

export default Header;
