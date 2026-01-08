function Historico({ usuarios, prepararEdicao, handleDeletar }) {
  return (
    <table border="1" style={{ width: "100%", borderCollapse: "collapse" }}>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nome</th>
          <th>E-mail</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {usuarios.map((user) => (
          <tr key={user.id}>
            <td>{user.id}</td>
            <td>{user.nome}</td>
            <td>{user.email}</td>
            <td>
              <button className="btn-edit" onClick={() => prepararEdicao(user)}>
                Editar
              </button>
              <button
                className="btn-delete"
                onClick={() => handleDeletar(user.id)}
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
