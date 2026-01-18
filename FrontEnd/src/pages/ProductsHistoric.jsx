import React from "react";

function ProductsHistoric({ idUsuarioLogado, compras = [] }) {
  if (!idUsuarioLogado) return null;

  return (
    <section style={{ marginTop: "40px" }}>
      <hr />
      <h3 style={{ marginBottom: "15px" }}>Minhas Compras</h3>
      <table
        style={{ width: "100%", textAlign: "left", borderCollapse: "collapse" }}
      >
        <thead>
          <tr style={{ borderBottom: "2px solid #eee" }}>
            <th style={{ padding: "10px 0" }}>Produto</th>
            <th>Qtd</th>
            <th>Total</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          {compras.length > 0 ? (
            compras.map((c) => (
              <tr key={c.id} style={{ borderBottom: "1px solid #f5f5f5" }}>
                <td style={{ padding: "10px 0" }}>{c.produto}</td>
                <td>{c.quantidade}</td>
                <td style={{ fontWeight: "bold" }}>
                  R$ {Number(c.total || 0).toFixed(2)}
                </td>
                <td>
                  {c.data_compra
                    ? new Date(c.data_compra).toLocaleDateString()
                    : "-"}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="4"
                style={{ textAlign: "center", padding: "20px", color: "#666" }}
              >
                Nenhuma compra encontrada.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </section>
  );
}

export default ProductsHistoric;
