import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api";
import "./Register.css";

function Register() {
  const [registerData, setregisterData] = useState({
    nome: "",
    email: "",
    senha: "",
  });

  const navigate = useNavigate();

  async function CriarCadastro(e) {
    e.preventDefault();

    try {
      const response = await api.post("/usuarios", registerData);

      if (response.status === 201) {
        alert("Cadastro realizado com sucesso!");
        navigate("/login");
      }
    } catch (error) {
      const mensagemErro =
        error.response?.data?.error || "Erro ao cadastrar usuário.";
      alert(mensagemErro);
      console.error("Erro ao cadastrar:", error);
    }
  }

  return (
    <div className="register-container">
      <h2>Criar minha conta</h2>
      <p>Informe os seus dados abaixo para criar sua conta.</p>

      <form className="register-form" onSubmit={CriarCadastro}>
        <input
          type="text"
          className="register-input"
          placeholder="Nome:"
          value={registerData.nome}
          required
          onChange={(e) =>
            setregisterData({ ...registerData, nome: e.target.value })
          }
        />

        <input
          type="email"
          className="register-input"
          placeholder="Email:"
          value={registerData.email}
          required
          onChange={(e) =>
            setregisterData({ ...registerData, email: e.target.value })
          }
        />

        <input
          type="password"
          className="register-input"
          placeholder="Senha:"
          value={registerData.senha}
          required
          onChange={(e) =>
            setregisterData({ ...registerData, senha: e.target.value })
          }
        />

        <button type="submit" className="btn_register">
          Cadastrar
        </button>

        <Link className="link_register" to="/recuperar-senha">
          Esqueceu sua senha?
        </Link>
      </form>

      <button onClick={() => navigate("/login")} className="btn-back">
        Já tem uma conta? Logue-se.
      </button>
    </div>
  );
}

export default Register;
