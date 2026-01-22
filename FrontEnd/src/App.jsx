import React, { useState } from "react";
import Header from "./Components/Header/Header.jsx";
import ProductsDisplay from "./Components/Products/ProductsDisplay/ProductsDisplay.jsx";
import Products from "./Components/Products/Products.jsx"; // O componente de detalhe
import Cart from "./Components/Cart/Cart.jsx"; // Ajustado caminho conforme contexto

import "./App.css";

function App() {
  const [portal, setPortal] = useState("home");
  const [busca, setBusca] = useState("");
  const [usuarios, setUsuarios] = useState([]);
  const [idUsuarioLogado, setIdUsuarioLogado] = useState("");
  const [produtoSelecionado, setProdutoSelecionado] = useState(null); // Novo estado

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
            <ProductsDisplay
              setPortal={setPortal}
              setProdutoSelecionado={setProdutoSelecionado}
              busca={busca}
              idUsuarioLogado={idUsuarioLogado}
            />
          )}

          {portal === "Product" && (
            <Products product={produtoSelecionado} setPortal={setPortal} />
          )}

          {portal === "cart" && <Cart idUsuarioLogado={idUsuarioLogado} />}
        </div>
      </main>
    </div>
  );
}

export default App;
