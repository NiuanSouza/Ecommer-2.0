import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header/Header.jsx";
import "./App.css";

function App() {
  const [busca, setBusca] = useState("");

  return (
    <div className="app-container">
      <Header busca={busca} setBusca={setBusca} />
      <main className="app-wrapper">
        <div className="content-card">
          <Outlet context={{ busca }} />
        </div>
      </main>
    </div>
  );
}

export default App;
