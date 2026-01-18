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
              <p
                className="price"
                style={{ color: "var(--secondary)", fontWeight: "bold" }}
              >
                R$ {Number(p.preco || 0).toFixed(2)}
              </p>
              <p>
                <small>Estoque: {p.estoque}</small>
              </p>
              <div style={{ display: "flex", gap: "5px" }}>
                <input
                  type="number"
                  min="1"
                  max={p.estoque}
                  value={quantidades[p.id] || 1}
                  onChange={(e) =>
                    setQuantidades({ ...quantidades, [p.id]: e.target.value })
                  }
                  style={{ width: "50px" }}
                />
                <button className="btn-edit" onClick={() => handleComprar(p)}>
                  Comprar
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
