import React, { useState } from "react";
import Usuarios from "./pages/Usuarios";
import Produtos from "./pages/Produtos";
import Compras from "./pages/Compras";
import logoEcommerce from "./assets/ecommerce.png";

import "./App.css";

function App() {
  const [pagina, setPagina] = useState("usuarios");

  return (
    <div className="app-wrapper">
      {}
      <nav>
        <img id="ecommercePhoto" src={logoEcommerce} alt="Logo" />{" "}
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
      </nav>

      {}
      <main className="container">
        {pagina === "usuarios" && <Usuarios />}
        {pagina === "produtos" && <Produtos />}
        {pagina === "compras" && <Compras />}
      </main>
    </div>
  );
}

export default App;
