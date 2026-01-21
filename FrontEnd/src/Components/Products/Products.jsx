import React, { useState, useEffect, useCallback } from "react";
import api from "../../services/api";
import Historic from "./ProductsHistoric";
import "./Products.css";

function ClientePortal({ busca, setUsuarios, idUsuarioLogado }) {
  const [produtos, setProdutos] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [compras, setCompras] = useState([]);
  const [quantidades, setQuantidades] = useState({});

  const buscarHistorico = useCallback(async (userId) => {
    if (!userId) {
      setCompras([]);
      return;
    }
    try {
      const res = await api.get("/compras");
      const filtradas = res.data.filter(
        (c) => Number(c.id_usuario_comprador) === Number(userId),
      );
      setCompras(filtradas);
    } catch {
      console.error("Erro ao buscar histórico");
    }
  }, []);

  useEffect(() => {
    let active = true;
    async function carregarDadosBase() {
      try {
        const [resProd, resUser] = await Promise.all([
          api.get("/produtos"),
          api.get("/usuarios"),
        ]);
        if (active) {
          setProdutos(resProd.data);
          setUsuarios(resUser.data);
        }
      } catch {
        console.error("Erro ao carregar dados iniciais");
      }
    }
    carregarDadosBase();
    return () => {
      active = false;
    };
  }, [setUsuarios]);

  useEffect(() => {
    if (idUsuarioLogado) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      buscarHistorico(idUsuarioLogado);
    } else {
      setCompras([]);
    }
  }, [idUsuarioLogado, buscarHistorico]);

  const handleComprar = async (produto) => {
    const qtd = parseInt(quantidades[produto.id] || 1);
    if (!idUsuarioLogado) return alert("Selecione um usuário primeiro!");

    try {
      await api.post("/compras", {
        id_usuario_comprador: parseInt(idUsuarioLogado),
        id_produto: produto.id,
        quantidade: qtd,
      });

      alert("Compra realizada!");
      setQuantidades((prev) => ({ ...prev, [produto.id]: 1 }));

      const resProd = await api.get("/produtos");
      setProdutos(resProd.data);

      await buscarHistorico(idUsuarioLogado);
    } catch {
      alert("Erro na compra.");
    }
  };

  const produtosDisponiveis = produtos.filter(
    (p) =>
      (p.nome || "").toLowerCase().includes((busca || "").toLowerCase()) &&
      p.estoque > 0,
  );

  return (
    <div className="cliente-portal">
      <section className="vitrine">
        <div className="card-grid">
          {produtosDisponiveis.map((p) => (
            <div key={p.id} className="portal-card">
              <h4>{p.nome}</h4>

              <img
                className="productImage"
                src="https://http2.mlstatic.com/D_NQ_NP_2X_671673-MLA81578619819_122024-W.webp"
                alt="Imagem não disponivel"
              />
              <p
                className="price"
                style={{ color: "var(--secondary)", fontWeight: "bold" }}
              >
                R$ {Number(p.preco || 0).toFixed(2)}
              </p>

              <div style={{ display: "flex", gap: "5px" }}>
                <button className="btn-edit" onClick={() => handleComprar(p)}>
                  Adicionar ao Carrinho
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/*<Historic idUsuarioLogado={idUsuarioLogado} compras={compras} />*/}
    </div>
  );
}

export default ClientePortal;
