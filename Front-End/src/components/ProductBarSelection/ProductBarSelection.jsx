import React from "react";
import "./ProductBarSelection.css";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

function ProductBarSelection({
  numeroDePaginas,
  abas,
  paginaAtual,
  setPaginaAtual,
}) {
  if (numeroDePaginas <= 1) return null;

  function switchPage(valor) {
    const novaPagina = paginaAtual + valor;

    if (novaPagina >= 1 && novaPagina <= numeroDePaginas) {
      setPaginaAtual(novaPagina);
    }
  }

  return (
    <div className="pagination-container">
      <div className="pagination-tabs">
        <button
          className="nav-button"
          onClick={() => switchPage(-1)}
          hidden={paginaAtual === 1}
        >
          <FaArrowLeft className="nav-icon" />
        </button>

        {abas.map((num) => (
          <button
            key={num}
            className={`tab-button ${paginaAtual === num ? "active" : ""}`}
            onClick={() => {
              setPaginaAtual(num);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            {num}
          </button>
        ))}

        <button
          className="nav-button"
          onClick={() => switchPage(1)}
          hidden={paginaAtual === numeroDePaginas}
        >
          <FaArrowRight className="nav-icon" />
        </button>
      </div>
    </div>
  );
}

export default ProductBarSelection;
