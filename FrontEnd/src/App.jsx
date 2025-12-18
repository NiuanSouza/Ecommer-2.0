import React, { useState } from "react";
import Usuarios from "./pages/Usuarios";
import Produtos from "./pages/Produtos";
import Compras from "./pages/Compras";
import HomePortal from "./HomePortal.jsx";
import logoEcommerce from "./assets/ecommerce.png";

import "./App.css";

function App() {
  const [portal, setPortal] = useState("home");

  const [pagina, setPagina] = useState("usuarios");

  return (
    <div className="app-wrapper">
      <nav>
        <img
          id="ecommercePhoto"
          src={logoEcommerce}
          alt="Logo"
          onClick={() => {
            setPortal("home");
            setPagina("");
          }}
        />

        {}
        {portal === "admin" && (
          <>
            <button
              className={pagina === "usuarios" ? "active" : ""}
              onClick={() => setPagina("usuarios")}
            >
              Usuários
            </button>
            <button
              className={pagina === "produtos" ? "active" : ""}
              onClick={() => setPagina("produtos")}
            >
              Produtos
            </button>
            <button
              className={pagina === "compras" ? "active" : ""}
              onClick={() => setPagina("compras")}
            >
              Compras
            </button>
          </>
        )}

        {}
        {portal !== "home" && (
          <button
            className="btn-delete"
            onClick={() => setPortal("home")}
            style={{ marginLeft: "auto" }}
          >
            Sair do Portal
          </button>
        )}
      </nav>

      <main className="container">
        {}
        {portal === "home" && (
          <HomePortal
            onSelectPortal={(p) => {
              setPortal(p);
              if (p === "admin") setPagina("usuarios");
              if (p === "cliente") setPagina("vitrine");
            }}
          />
        )}

        {portal === "admin" && (
          <>
            {pagina === "usuarios" && <Usuarios />}
            {pagina === "produtos" && <Produtos />}
            {pagina === "compras" && <Compras />}
          </>
        )}

        {}
        {portal === "cliente" && (
          <h2>Portal do Cliente (Em desenvolvimento)</h2>
        )}
        {portal === "vendedor" && (
          <h2>Portal do Vendedor (Em desenvolvimento)</h2>
        )}
      </main>
    </div>
  );
}

export default App;
