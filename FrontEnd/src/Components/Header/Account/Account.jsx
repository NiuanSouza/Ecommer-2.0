import React, { useState } from "react";
import "./Account.css";
import { FaUser } from "react-icons/fa";

function Account({
  usuarioLogado,
  usuarios,
  idUsuarioLogado,
  setIdUsuarioLogado,
}) {
  const [dropdownAberto, setDropdownAberto] = useState(false);
  return (
    <div className="login-container">
      <div
        className="user-profile-trigger"
        onClick={() => setDropdownAberto(!dropdownAberto)}
      >
        <div className="user-icon">
          <FaUser />
        </div>
        <div className="user-info-text hide-mobile">
          <span className="welcome-text">
            Olá, {usuarioLogado ? usuarioLogado.nome : "Entrar"}
          </span>
          <span className="account-text">Minha Conta ▼</span>
        </div>
      </div>

      {dropdownAberto && (
        <div className="login-dropdown">
          <p className="dropdown-title">Simular Login</p>
          <div className="user-list">
            {usuarios.map((u) => (
              <div
                key={u.id}
                className={`user-item ${idUsuarioLogado === String(u.id) ? "active" : ""}`}
                onClick={() => {
                  setIdUsuarioLogado(String(u.id));
                  setDropdownAberto(false);
                }}
              >
                {u.nome}
              </div>
            ))}
            {usuarios.length === 0 && (
              <div className="user-item">Nenhum usuário carregado</div>
            )}
          </div>
          {idUsuarioLogado && (
            <button
              className="logout-btn"
              onClick={() => {
                setIdUsuarioLogado("");
                setDropdownAberto(false);
              }}
            >
              Sair da conta
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default Account;
