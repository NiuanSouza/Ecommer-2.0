import React, { useState } from "react";
import logoEcommerce from "./assets/ecommerce.png";

import Usuarios from "./pages/admin/Usuarios";
import Produtos from "./pages/admin/Produtos";
import Compras from "./pages/admin/Compras";
import ClientePortal from "./pages/ClientePortal";
import VendedorPortal from "./pages/VendedorPortal";

import "./App.css";

function App() {
  const [portal, setPortal] = useState("cliente");
  const [pagina, setPagina] = useState("usuarios");
  const [busca, setBusca] = useState("");

  return (
    <div className="app-container">
      <header className="main-header">
        <section className="header-topbar">
          <div className="container-header">
            <div className="topbar-links">
              <span onClick={() => setPortal("admin")} className="topbar-link">
                Admin
              </span>
              <span
                onClick={() => setPortal("vendedor")}
                className="topbar-link"
              >
                Vendedor
              </span>
              <span
                onClick={() => setPortal("cliente")}
                className="topbar-link"
              >
                Minhas Compras
              </span>
            </div>
            <div className="topbar-links hide-mobile"></div>
          </div>
        </section>

        <section className="header-main">
          <div className="container-header">
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
              <button className="search-btn" type="submit">
                <svg
                  viewBox="0 0 24 24"
                  width="20"
                  height="20"
                  stroke="white"
                  strokeWidth="2"
                  fill="none"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </button>
            </form>

            <div className="header-actions">
              <div className="cart-icon"></div>
              <img
                src={logoEcommerce}
                className="logo-brand"
                alt="Logo"
                onClick={() => setPortal("home")}
              />
            </div>
          </div>
        </section>
      </header>

      <main className="app-wrapper">
        <div className="content-card">
          {portal === "home" && (
            <ClientePortal busca={"busca"} setBusca={"setBusca"} />
          )}

          {portal === "admin" && (
            <div className="admin-section">
              <nav className="internal-nav">
                <button onClick={() => setPagina("usuarios")}>Usuários</button>
                <button onClick={() => setPagina("produtos")}>Produtos</button>
              </nav>
              {pagina === "usuarios" ? <Usuarios /> : <Produtos />}
            </div>
          )}

          {portal === "vendedor" && <VendedorPortal />}
          {portal === "cliente" && (
            <ClientePortal busca={"busca"} setBusca={"setBusca"} />
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
