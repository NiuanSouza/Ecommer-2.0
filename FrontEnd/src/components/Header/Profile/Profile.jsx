import React, { useState } from "react";
import "./Profile.css";
import { Link, useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import api from "../../../../src/services/api";

function Profile() {
  const navigate = useNavigate();
  const [dropdownAberto, setDropdownAberto] = useState(false);

  const [usuario, setUsuario] = useState(() => {
    const userStorage = localStorage.getItem("@Ecommerce:user");
    return userStorage ? JSON.parse(userStorage) : null;
  });

  const formatarNomeExibicao = (nome) => {
    if (!nome) return "";
    const partes = nome.trim().split(" ");
    if (partes.length === 1) return partes[0];
    return `${partes[0]} ${partes[partes.length - 1]}`;
  };

  const handleLogout = () => {
    localStorage.removeItem("@Ecommerce:token");
    localStorage.removeItem("@Ecommerce:user");
    delete api.defaults.headers.Authorization;
    setUsuario(null);
    setDropdownAberto(false);
    navigate("/");
    window.location.reload();
  };

  return (
    <div className="profile-container">
      <div
        className="user-profile-trigger"
        onClick={() => setDropdownAberto(!dropdownAberto)}
      >
        <div className="user-icon">
          {usuario?.foto_perfil ? (
            <img
              src={usuario.foto_perfil}
              alt="User"
              className="user-avatar-img"
            />
          ) : (
            <FaUser />
          )}
        </div>

        <div className="user-info-text hide-mobile">
          {usuario ? (
            <>
              <span className="welcome-text">
                Olá, {usuario.nome.split(" ")[0]}
              </span>
              <span className="account-text">Minha Conta ▼</span>
            </>
          ) : (
            <span className="account-text">Entre ou Cadastre-se ▼</span>
          )}
        </div>
      </div>

      {dropdownAberto && (
        <div className="login-dropdown">
          {!usuario ? (
            <>
              <Link to="/login" onClick={() => setDropdownAberto(false)}>
                <button className="login-btn">Login</button>
              </Link>
              <Link to="/register" onClick={() => setDropdownAberto(false)}>
                <button className="login-btn">Registre-se</button>
              </Link>
            </>
          ) : (
            <>
              <div className="user-details-header">
                <p className="user-full-name">
                  {formatarNomeExibicao(usuario.nome)}
                </p>
              </div>
              <hr />
              <Link to="/perfil" onClick={() => setDropdownAberto(false)}>
                <button className="login-btn">Meu Perfil</button>
              </Link>
              <Link to="/pedidos" onClick={() => setDropdownAberto(false)}>
                <button className="login-btn">Meus Pedidos</button>
              </Link>
              <button className="login-btn logout-style" onClick={handleLogout}>
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
