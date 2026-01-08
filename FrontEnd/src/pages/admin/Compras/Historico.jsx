function Historico({ compras, prepararEdicao, handleEliminar }) {
  return (
    <>
      <h3>Histórico de Transações</h3>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Data</th>
            <th>Comprador</th>
            <th>Produto</th>
            <th>Qtd</th>
            <th>Total</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {compras.map((c) => (
            <tr key={c.id}>
              <td>{c.id}</td>
              <td>{new Date(c.data_compra).toLocaleString()}</td>
              <td>{c.comprador}</td>
              <td>{c.produto}</td>
              <td>{c.quantidade}</td>
              <td>R$ {c.total?.toFixed(2)}</td>
              <td>
                <button className="btn-edit" onClick={() => prepararEdicao(c)}>
                  Editar
                </button>
                <button
                  className="btn-delete"
                  onClick={() => handleEliminar(c.id)}
                >
                  Remover
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
export default Historico;
