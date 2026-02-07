import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header/Header.jsx";
import api from "./services/api";
import "./App.css";

function App() {
  const [busca, setBusca] = useState("");
  const [usuarios, setUsuarios] = useState([]);
  const [idUsuarioLogado, setIdUsuarioLogado] = useState("");

  useEffect(() => {
    async function carregarUsuarios() {
      try {
        const response = await api.get("/usuarios");
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
