import React, { useState } from "react";
import Usuarios from "./pages/admin/Usuarios";
import Produtos from "./pages/admin/Produtos";
import Compras from "./pages/admin/Compras";
import HomePortal from "./HomePortal.jsx";
import ClientePortal from "./pages/ClientePortal";
import VendedorPortal from "./pages/VendedorPortal";
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
        {portal === "cliente" && <ClientePortal />}
        {portal === "vendedor" && <VendedorPortal />}
      </main>
    </div>
  );
}

export default App;
