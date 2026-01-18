import React, { useEffect, useState } from "react";
import api from "../../../services/api";
import Historico from "./Historico";
import Cadastro from "./Cadastro";

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

      <Cadastro
        usuarios={usuarios}
        handleSubmit={handleSubmit}
        nome={nome}
        setNome={setNome}
        email={email}
        setEmail={setEmail}
        prepararEdicao={prepararEdicao}
        handleDeletar={handleDeletar}
      />
      <Historico
        handleSubmit={handleSubmit}
        nome={nome}
        setNome={setNome}
        email={email}
        setEmail={setEmail}
        usuarios={usuarios}
        editandoId={editandoId}
        limparFormulario={limparFormulario}
      />
    </div>
  );
}

export default Usuarios;
