function Historico({ produtos, prepararEdicao, handleDeletar }) {
  return (
    <table border="1" style={{ width: "100%", borderCollapse: "collapse" }}>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nome</th>
          <th>Preço</th>
          <th>Estoque</th>
          <th>Vendedor (ID)</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {produtos.map((p) => (
          <tr key={p.id}>
            <td>{p.id}</td>
            <td>{p.nome}</td>
            <td>R$ {p.preco.toFixed(2)}</td>
            <td>{p.estoque}</td>
            <td>{p.id_usuario_vendedor}</td>
            <td>
              <button className="btn-edit" onClick={() => prepararEdicao(p)}>
                Editar
              </button>
              <button
                className="btn-delete"
                onClick={() => handleDeletar(p.id)}
              >
                Excluir
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Historico;
