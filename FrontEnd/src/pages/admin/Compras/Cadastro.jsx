function Cadastro({
  usuarios,
  produtos,
  editandoId,
  limparFormulario,
  idUsuario,
  idProduto,
  setQuantidade,
  handleSubmit,
  quantidade,
  setIdUsuario,
  setIdProduto,
}) {
  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h3>{editandoId ? "Editar Transação" : "Nova Transação"}</h3>

      <div
        style={{
          display: "flex",
          gap: "10px",
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        <label>Comprador: </label>
        <select
          value={idUsuario}
          onChange={(e) => setIdUsuario(e.target.value)}
          required
          disabled={!!editandoId}
        >
          <option value="">Selecione comprador</option>
          {usuarios.map((u) => (
            <option key={u.id} value={u.id}>
              {u.nome}
            </option>
          ))}
        </select>

        <label> Produto: </label>
        <select
          value={idProduto}
          onChange={(e) => setIdProduto(e.target.value)}
          required
        >
          <option value="">Selecione o produto</option>
          {produtos.map((p) => (
            <option key={p.id} value={p.id}>
              {p.nome} (Estoque: {p.estoque})
            </option>
          ))}
        </select>

        <label> Qtd: </label>
        <input
          type="number"
          min="1"
          value={quantidade}
          onChange={(e) => setQuantidade(e.target.value)}
          style={{ width: "60px" }}
          required
        />

        <button type="submit" className="btn-success">
          {editandoId ? "Salvar Alterações" : "Finalizar Compra"}
        </button>

        {editandoId && (
          <button
            type="button"
            onClick={limparFormulario}
            className="btn-cancel"
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}

export default Cadastro;
