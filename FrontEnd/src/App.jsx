import React, { useState } from "react";

import Usuarios from "./Components/admin/Usuarios";
import Produtos from "./Components/admin/Produtos";

import Header from "./Components/Header/Header.jsx";
import ClientePortal from "./Components/Products/Products.jsx";
import VendedorPortal from "./Components/VendedorPortal";

import "./App.css";

function App() {
  const [portal, setPortal] = useState("cliente");
  const [pagina, setPagina] = useState("usuarios");
  const [busca, setBusca] = useState("");
  const [usuarios, setUsuarios] = useState([]);
  const [idUsuarioLogado, setIdUsuarioLogado] = useState("");

  return (
    <div className="app-container">
      <Header
        setBusca={setBusca}
        busca={busca}
        setPortal={setPortal}
        portal={portal}
        idUsuarioLogado={idUsuarioLogado}
        usuarios={usuarios}
        setIdUsuarioLogado={setIdUsuarioLogado}
      />

      <main className="app-wrapper">
        <div className="content-card">
          {(portal === "home" || portal === "cliente") && (
            <ClientePortal
              usuarios={usuarios}
              setUsuarios={setUsuarios}
              idUsuarioLogado={idUsuarioLogado}
              setIdUsuarioLogado={setIdUsuarioLogado}
              busca={busca}
              setBusca={setBusca}
            />
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
          {portal === "vendedor" && (
            <VendedorPortal
              usuarios={usuarios}
              setUsuarios={setUsuarios}
              idUsuarioLogado={idUsuarioLogado}
              setIdUsuarioLogado={setIdUsuarioLogado}
              busca={busca}
              setBusca={setBusca}
            />
          )}

          {portal === "cart" && (
            <div className="admin-section">
              <nav className="internal-nav">
                <button onClick={() => setPagina("usuarios")}>Usuários</button>
                <button onClick={() => setPagina("produtos")}>Produtos</button>
              </nav>
              {pagina === "usuarios" ? <Usuarios /> : <Produtos />}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
