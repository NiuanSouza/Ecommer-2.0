import React from "react";

function Products({ product, setPortal }) {
  if (!product) return null;

  return (
    <div className="product-detail">
      <div style={{ display: "flex", gap: "30px", textAlign: "left" }}>
        <img
          src={product.thumbnail}
          alt={product.title}
          style={{ width: "300px", borderRadius: "8px" }}
        />
        <div>
          <h1>{product.title}</h1>
          <p style={{ color: "var(--text-muted)", margin: "10px 0" }}>
            Categoria: {product.category}
          </p>
          <h2 style={{ color: "var(--secondary)" }}>
            R$ {(product.price * 5).toFixed(2)}
          </h2>
          <p style={{ marginTop: "20px" }}>{product.description}</p>
        </div>
      </div>

      <button
        className="btn-edit"
        onClick={() => setPortal("home")}
        style={{ marginBottom: "20px" }}
      >
        ← Voltar para Vitrine
      </button>
    </div>
  );
}

export default Products;
