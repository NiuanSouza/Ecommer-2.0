import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authInterfaces } from "./authInterfaces";
import "./Auth.css";

function AuthPage({ mode }) {
  const navigate = useNavigate();
  const config = authInterfaces[mode];

  const [values, setValues] = useState({ nome: "", email: "", senha: "" });

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleAction = async (e) => {
    e.preventDefault();
    const success = await config.onSubmit(values);
    if (success && mode === "register") navigate("/login");
    if (success && mode === "login") window.location.href = "/";
  };

  return (
    <div className="auth-container">
      <h2>{config.title}</h2>
      <p>{config.subtitle}</p>

      <form className="auth-form" onSubmit={handleAction}>
        {config.fields.includes("nome") && (
          <input
            name="nome"
            type="text"
            className="auth-input"
            placeholder="Nome:"
            required
            onChange={handleChange}
          />
        )}
        <input
          name="email"
          type="email"
          className="auth-input"
          placeholder="Email:"
          required
          onChange={handleChange}
        />
        <input
          name="senha"
          type="password"
          className="auth-input"
          placeholder="Senha:"
          required
          onChange={handleChange}
        />
        <button type="submit" className="btn-auth">
          {config.buttonText}
        </button>
      </form>

      <button onClick={() => navigate(config.path)} className="btn-switch">
        {config.switchText}
      </button>
    </div>
  );
}

export default AuthPage;
