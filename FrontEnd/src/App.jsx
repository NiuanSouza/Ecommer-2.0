import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header/Header.jsx"; // Corrigido caminho para PascalCase
import api from "./services/api"; // Importe sua instância do axios
import "./App.css";

function App() {
  const [busca, setBusca] = useState("");
  const [usuarios, setUsuarios] = useState([]);
  const [idUsuarioLogado, setIdUsuarioLogado] = useState("");

  // Busca usuários do banco de dados (SQLite) ao iniciar
  useEffect(() => {
    async function carregarUsuarios() {
      try {
        const response = await api.get("/usuarios"); // Rota definida no seu BackEnd
        setUsuarios(response.data);
      } catch (error) {
        console.error("Erro ao carregar usuários:", error);
      }
    }
    carregarUsuarios();
  }, []);

  return (
    <div className="app-container">
      <Header
        busca={busca}
        setBusca={setBusca}
        idUsuarioLogado={idUsuarioLogado}
        usuarios={usuarios}
        setIdUsuarioLogado={setIdUsuarioLogado}
      />
      <main className="app-wrapper">
        <div className="content-card">
          <Outlet context={{ busca, idUsuarioLogado, setUsuarios }} />
        </div>
      </main>
    </div>
  );
}

export default App;
