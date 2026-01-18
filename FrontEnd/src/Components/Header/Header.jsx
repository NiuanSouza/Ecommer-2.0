import logoEcommerce from "../../assets/home.png";
import CartEcommerce from "../../assets/ecommerce.png";
import React, { useState } from "react";
import { BsSearch } from "react-icons/bs";
import { FaUser } from "react-icons/fa";

import "./Header.css";

function Header({
  setPortal,
  busca,
  setBusca,
  idUsuarioLogado,
  usuarios,
  setIdUsuarioLogado,
}) {
  const [dropdownAberto, setDropdownAberto] = useState(false);
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
          <form
            className="search-container"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="text"
              className="search-input"
              placeholder="O que você procura?"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
            />
            <button type="submit" className="search-btn">
              <BsSearch />
            </button>
          </form>

          <div className="header-actions">
            <img
              src={CartEcommerce}
              className="logo-brand"
              alt="Logo"
              style={{ cursor: "pointer" }}
              onClick={() => setPortal("cart")}
            />

            <div className="login-container">
              <div
                className="user-profile-trigger"
                onClick={() => setDropdownAberto(!dropdownAberto)}
              >
                <div className="user-icon">
                  <FaUser />
                </div>
                <div className="user-info-text hide-mobile">
                  <span className="welcome-text">
                    Olá, {usuarioLogado ? usuarioLogado.nome : "Entrar"}
                  </span>
                  <span className="account-text">Minha Conta ▼</span>
                </div>
              </div>

              {dropdownAberto && (
                <div className="login-dropdown">
                  <p className="dropdown-title">Simular Login</p>
                  <div className="user-list">
                    {usuarios.map((u) => (
                      <div
                        key={u.id}
                        className={`user-item ${idUsuarioLogado === String(u.id) ? "active" : ""}`}
                        onClick={() => {
                          setIdUsuarioLogado(String(u.id));
                          setDropdownAberto(false);
                        }}
                      >
                        {u.nome}
                      </div>
                    ))}
                    {usuarios.length === 0 && (
                      <div className="user-item">Nenhum usuário carregado</div>
                    )}
                  </div>
                  {idUsuarioLogado && (
                    <button
                      className="logout-btn"
                      onClick={() => {
                        setIdUsuarioLogado("");
                        setDropdownAberto(false);
                      }}
                    >
                      Sair da conta
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </header>
  );
}

export default Header;
