import React, { useEffect, useState } from "react";
import Historico from "./Historico.jsx";
import Cadastro from "./Cadastro.jsx";
import api from "../../../services/api";

function Compras() {
  const [compras, setCompras] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [produtos, setProdutos] = useState([]);

  const [idUsuario, setIdUsuario] = useState("");
  const [idProduto, setIdProduto] = useState("");
  const [quantidade, setQuantidade] = useState(1);
  const [editandoId, setEditandoId] = useState(null); // Estado para Edição

  useEffect(() => {
    const carregarDadosIniciais = async () => {
      try {
        const [resCompras, resUsuarios, resProdutos] = await Promise.all([
          api.get("/compras"),
          api.get("/usuarios"),
          api.get("/produtos"),
        ]);
        setCompras(resCompras.data);
        setUsuarios(resUsuarios.data);
        setProdutos(resProdutos.data);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      }
    };

    carregarDadosIniciais();
  }, []);

  const atualizarListas = async () => {
    try {
      const [resCompras, resProdutos] = await Promise.all([
        api.get("/compras"),
        api.get("/produtos"),
      ]);
      setCompras(resCompras.data);
      setProdutos(resProdutos.data);
    } catch (error) {
      console.error("Erro ao atualizar dados:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dados = {
      id_usuario_comprador: idUsuario,
      id_produto: idProduto,
      quantidade: parseInt(quantidade),
    };

    try {
      if (editandoId) {
        await api.put(`/compras/${editandoId}`, dados);
        alert("Compra atualizada com sucesso!");
      } else {
        await api.post("/compras", dados);
        alert("Compra realizada com sucesso!");
      }

      limparFormulario();
      atualizarListas();
    } catch (error) {
      alert(error.response?.data?.error || "Erro ao processar transação");
    }
  };

  const prepararEdicao = (c) => {
    setEditandoId(c.id);
    setIdUsuario(c.id_usuario_comprador);
    setIdProduto(c.id_produto);
    setQuantidade(c.quantidade);
  };

  const limparFormulario = () => {
    setEditandoId(null);
    setIdUsuario("");
    setIdProduto("");
    setQuantidade(1);
  };

  const handleEliminar = async (id) => {
    if (
      window.confirm("Deseja cancelar esta compra? O estoque será devolvido.")
    ) {
      try {
        await api.delete(`/compras/${id}`);
        atualizarListas();
      } catch (error) {
        alert("Erro ao cancelar compra: " + error);
      }
    }
  };

  return (
    <div>
      <h2>Sistema de Compras</h2>
      <Cadastro
        usuarios={usuarios}
        produtos={produtos}
        editandoId={editandoId}
        limparFormulario={limparFormulario}
        idUsuario={idUsuario}
        idProduto={idProduto}
        setQuantidade={setQuantidade}
        handleSubmit={handleSubmit}
        quantidade={quantidade}
        setIdUsuario={setIdUsuario}
        setIdProduto={setIdProduto}
      />
      <Historico
        compras={compras}
        prepararEdicao={prepararEdicao}
        handleEliminar={handleEliminar}
      />{" "}
    </div>
  );
}

export default Compras;
