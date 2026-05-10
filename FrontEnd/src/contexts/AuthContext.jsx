import React, { createContext, useState, useEffect } from "react";
import api from "../services/api";

export const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [usuarioLogado, setUsuarioLogado] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem("@Ecommerce:user");
    const token = localStorage.getItem("@Ecommerce:token");

    if (user && token) {
      setUsuarioLogado(JSON.parse(user));
      api.defaults.headers.Authorization = `Bearer ${token}`;
    }
  }, []);

  const login = (userData, token) => {
    localStorage.setItem("@Ecommerce:user", JSON.stringify(userData));
    localStorage.setItem("@Ecommerce:token", token);
    api.defaults.headers.Authorization = `Bearer ${token}`;
    setUsuarioLogado(userData);
  };

  const logout = () => {
    localStorage.removeItem("@Ecommerce:user");
    localStorage.removeItem("@Ecommerce:token");
    api.defaults.headers.Authorization = "";
    setUsuarioLogado(null);
  };

  return (
    <AuthContext.Provider
      value={{
        usuarioLogado,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
