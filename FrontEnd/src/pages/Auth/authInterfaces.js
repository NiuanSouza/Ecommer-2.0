import api from "../../services/api";

export const authInterfaces = {
  login: {
    title: "Já tem uma conta?",
    subtitle: "Informe os seus dados abaixo para acessá-la.",
    buttonText: "Entrar",
    switchText: "Não tem uma conta? Registre-se.",
    path: "/register",
    fields: ["email", "senha"],
    onSubmit: async (data, showModal) => {
      try {
        const response = await api.post("/login", {
          email: data.email,
          senha: data.senha
        });

        if (response.data.token) {
          localStorage.setItem("@Ecommerce:token", response.data.token);
          localStorage.setItem("@Ecommerce:user", JSON.stringify(response.data.user));

          api.defaults.headers.Authorization = `Bearer ${response.data.token}`;

          showModal(`Bem-vindo, ${response.data.user.nome}!`, "success");
          return true;
        }
      } catch (error) {
        showModal(error.response?.data?.error || "Erro ao realizar login.", "error");
        return false;
      }
    }
  },

  register: {
    subtitle: "Informe os seus dados abaixo para criar sua conta.",
    buttonText: "Cadastrar",
    switchText: "Já tem uma conta? Logue-se.",
    path: "/login",
    fields: ["nome", "email", "senha"],
    onSubmit: async (data, showModal) => {
      try {
        const response = await api.post("/usuarios", data);
        if (response.status === 201) {
          showModal("Cadastro realizado com sucesso!", "success");
          return true;
        }
      } catch (error) {
        showModal(error.response?.data?.error || "Erro ao cadastrar.", "error");
        return false;
      }
    }
  }
};