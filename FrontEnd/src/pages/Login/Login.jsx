import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./Login.css";

function Login() {
  const [login, setLogin] = useState({
    email: "",
    senha: "",
  });

  const navigate = useNavigate();

  function IniciarSessao(e) {
    e.preventDefault();
    console.log("Dados enviados:", login);
    alert("Logado com sucesso");
  }

  return (


    <div className="login-container">
      <h2>Já tem uma conta?</h2>
      <p>Informe os seus dados abaixo para acessá-la.</p>

      <form className="login-form" onSubmit={IniciarSessao}>
        <input
          type="email"
          className="login-input"
          placeholder="Digite seu email:"
          value={login.email}
          required
          onChange={(e) => setLogin({ ...login, email: e.target.value })}
        />

        <input
          type="password"
          className="login-input"
          placeholder="Digite sua Senha:"
          value={login.senha}
          required
          onChange={(e) => setLogin({ ...login, senha: e.target.value })}
        />

        <button type="submit" className="btn_login">
          Entrar
        </button>

        <Link className="link_login" to="/recuperar-senha">Esqueceu sua senha?</Link>
      </form>

      <button onClick={() => navigate("/register")} className="btn-back">
        Não tem uma uma conta? Registre-se.
      </button>
    </div>
  );
}

export default Login;