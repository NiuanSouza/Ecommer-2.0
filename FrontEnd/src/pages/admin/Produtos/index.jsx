import React, { useEffect, useState } from "react";
import api from "../../../services/api.js";
import Historico from "./Historico.jsx";
import Cadastro from "./Cadastro.jsx";

function Produtos() {
  const [produtos, setProdutos] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [editandoId, setEditandoId] = useState(null);

  const [form, setForm] = useState({
    nome: "",
    preco: "",
    estoque: "",
    idVendedor: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [resProdutos, resUsuarios] = await Promise.all([
          api.get("/produtos"),
          api.get("/usuarios"),
        ]);
        setProdutos(resProdutos.data);
        setUsuarios(resUsuarios.data);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    fetchData();
  }, []);

  const recarregarProdutos = async () => {
    try {
      const response = await api.get("/produtos");
      setProdutos(response.data);
    } catch (error) {
      console.error("Erro ao recarregar produtos:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dados = {
      ...form,
      preco: parseFloat(form.preco),
      estoque: parseInt(form.estoque),
      id_usuario_vendedor: form.idVendedor,
    };

    try {
      if (editandoId) {
        await api.put(`/produtos/${editandoId}`, dados);
        alert("Produto atualizado com sucesso!");
      } else {
        await api.post("/produtoss", dados);
        alert("Produto cadastrado com sucesso!");
      }
      limparFormulario();
      recarregarProdutos();
    } catch (error) {
      alert(error.response?.data?.error || "Erro ao salvar produto");
    }
  };

  const handleDeletar = async (id) => {
    if (window.confirm("Tem certeza que deseja excluir este produto?")) {
      try {
        await api.delete(`/produtos/${id}`);
        recarregarProdutos();
      } catch (error) {
        alert(error.response?.data?.error || "Erro ao deletar");
      }
    }
  };

  const prepararEdicao = (produto) => {
    setEditandoId(produto.id);
    setForm({
      nome: produto.nome,
      preco: produto.preco,
      estoque: produto.estoque,
      idVendedor: produto.id_usuario_vendedor,
    });
  };

  const limparFormulario = () => {
    setEditandoId(null);
    setForm({
      nome: "",
      preco: "",
      estoque: "",
      idVendedor: "",
    });
  };

  return (
    <div>
      <h2>Gestão de Produtos</h2>

      <Cadastro
        handleSubmit={handleSubmit}
        form={form}
        setForm={setForm}
        usuarios={usuarios}
        editandoId={editandoId}
        limparFormulario={limparFormulario}
      />
      <Historico
        produtos={produtos}
        prepararEdicao={prepararEdicao}
        handleDeletar={handleDeletar}
      />
    </div>
  );
}

export default Produtos;
