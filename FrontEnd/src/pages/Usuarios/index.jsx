import React, { useEffect, useState } from "react";
import api from "../../services/api";

function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [editandoId, setEditandoId] = useState(null); // Estado para o Update

  const carregarUsuarios = async () => {
    try {
      const response = await api.get("/usuarios");
      setUsuarios(response.data);
    } catch (error) {
      console.error("Erro ao carregar utilizadores:", error);
    }
  };

  useEffect(() => {
    let montado = true;

    const fetchUsers = async () => {
      try {
        const response = await api.get("/usuarios");
        if (montado) {
          setUsuarios(response.data);
        }
      } catch (error) {
        console.error("Erro ao carregar utilizadores:", error);
      }
    };

    fetchUsers();

    return () => {
      montado = false;
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editandoId) {
        await api.put(`/usuarios/${editandoId}`, { nome, email });
        alert("Utilizador atualizado!");
      } else {
        await api.post("/usuarios", { nome, email });
        alert("Utilizador cadastrado!");
      }

      limparFormulario();
      carregarUsuarios();
    } catch (error) {
      alert(error.response?.data?.error || "Erro na operação");
    }
  };

  const handleDeletar = async (id) => {
    if (window.confirm("Tem a certeza que deseja remover este utilizador?")) {
      try {
        await api.delete(`/usuarios/${id}`);
        carregarUsuarios();
      } catch (error) {
        alert(error.response?.data?.error || "Erro ao deletar");
      }
    }
  };

  const prepararEdicao = (user) => {
    setEditandoId(user.id);
    setNome(user.nome);
    setEmail(user.email);
  };

  const limparFormulario = () => {
    setEditandoId(null);
    setNome("");
    setEmail("");
  };

  return (
    <div>
      <h2>Gestão de Utilizadores</h2>

      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">{editandoId ? "Atualizar" : "Cadastrar"}</button>
        {editandoId && <button onClick={limparFormulario}>Cancelar</button>}
      </form>

      <table border="1" style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>E-mail</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.nome}</td>
              <td>{user.email}</td>
              <td>
                <button
                  className="btn-edit"
                  onClick={() => prepararEdicao(user)}
                >
                  Editar
                </button>
                <button
                  className="btn-delete"
                  onClick={() => handleDeletar(user.id)}
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Usuarios;
