import React, { useState } from "react";
import "./Profile.css"; //
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";

function Profile({ usuarioLogado }) {
  const [dropdownAberto, setDropdownAberto] = useState(false);

  return (
    <div className="profile-container">
      <div
        className="user-profile-trigger"
        onClick={() => setDropdownAberto(!dropdownAberto)}
      >
        <div className="user-icon">
          <FaUser />
        </div>
        
        <div className="user-info-text hide-mobile">
          {usuarioLogado ? (
            <>
              <span className="welcome-text">Olá, {usuarioLogado.nome}</span>
              <span className="account-text">Minha Conta ▼</span>
            </>
          ) : (
            <Link to="/login" onClick={(e) => e.stopPropagation()}>
              <button className="login-btn">Logue-se</button>
            </Link>
          )}
        </div>
      </div>

      {dropdownAberto && (
        <div className="login-dropdown">
          {!usuarioLogado ? (
            <>
              <Link to="/login" onClick={() => setDropdownAberto(false)}>
                <button className="login-btn">Login</button>
              </Link>
              <Link to="/usuarios" onClick={() => setDropdownAberto(false)}>
                <button className="login-btn">Registre-se</button>
              </Link>
            </>
          ) : (
            <>
              <Link to="/perfil" onClick={() => setDropdownAberto(false)}>
                <button className="login-btn">Meu Perfil</button>
              </Link>
              <button 
                className="login-btn" 
                onClick={() => {
                  setDropdownAberto(false);
                }}
              >
                Sair
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default Profile;