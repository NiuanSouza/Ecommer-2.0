import React from "react";

function HomePortal({ onSelectPortal }) {
  return (
    <div className="portal-selection">
      <h2>Escolha seu acesso:</h2>
      <div className="card-grid">
        <div className="portal-card" onClick={() => onSelectPortal("admin")}>
          <h3>🔑 Administrador</h3>
          <p>Gestão total do sistema, usuários e auditoria.</p>
        </div>
        <div className="portal-card" onClick={() => onSelectPortal("cliente")}>
          <h3>🛍️ Cliente</h3>
          <p>Veja produtos, pesquise e acompanhe seus pedidos.</p>
        </div>
        <div className="portal-card" onClick={() => onSelectPortal("vendedor")}>
          <h3>🏪 Vendedor</h3>
          <p>Cadastre seus produtos e veja o desempenho de vendas.</p>
        </div>
      </div>
    </div>
  );
}

export default HomePortal;
