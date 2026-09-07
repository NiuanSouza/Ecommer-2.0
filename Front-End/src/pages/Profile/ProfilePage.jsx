import React, { useState, useEffect } from "react";
import api from "../../services/api";
import "./ProfilePage.css";

function ProfilePage() {
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);

  const carregarPerfil = async () => {
    try {
      setLoading(true);
      const resPerfil = await api.get(`/meu-perfil`);
      setUsuario(resPerfil.data);
    } catch (error) {
      console.error("Erro ao carregar dados do perfil:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarPerfil();
  }, []);

  if (loading) return <div className="prof-loader">Carregando...</div>;
  if (!usuario)
    return <div className="prof-error">Usuário não encontrado.</div>;

  return (
    <div className="prof-container">
      <div className="prof-card">
        <div className="prof-header">
          <div className="prof-avatar-wrapper">
            {usuario.foto_perfil ? (
              <img
                src={usuario.foto_perfil}
                alt="Avatar"
                className="prof-avatar"
              />
            ) : (
              <div className="prof-avatar-placeholder">
                {usuario.nome.charAt(0)}
              </div>
            )}
          </div>
          <div className="prof-info-main">
            <h1>{usuario.nome}</h1>
            <span className={`prof-badge ${usuario.tipo}`}>{usuario.tipo}</span>
          </div>
        </div>

        <div className="prof-details-grid">
          <div className="prof-detail-item">
            <label>E-mail</label>
            <p>{usuario.email}</p>
          </div>
          {/* Removido o campo Membro desde para bater com o seu banco original */}
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
