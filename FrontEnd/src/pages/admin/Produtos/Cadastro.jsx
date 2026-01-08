function Cadastro({
  handleSubmit,
  form,
  setForm,
  usuarios,
  editandoId,
  limparFormulario,
}) {
  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <input
        type="text"
        placeholder="Nome"
        value={form.nome}
        onChange={(e) => setForm({ ...form, nome: e.target.value })}
        required
      />
      <input
        type="number"
        step="0.01"
        placeholder="Preço"
        value={form.preco}
        onChange={(e) => setForm({ ...form, preco: e.target.value })}
        required
      />
      <input
        type="number"
        placeholder="Estoque"
        value={form.estoque}
        onChange={(e) => setForm({ ...form, estoque: e.target.value })}
        required
      />

      <select
        value={form.idVendedor}
        onChange={(e) => setForm({ ...form, idVendedor: e.target.value })}
        required
        disabled={!!editandoId}
      >
        <option value="">Selecione o Vendedor</option>
        {usuarios.map((u) => (
          <option key={u.id} value={u.id}>
            {u.nome}
          </option>
        ))}
      </select>

      <button type="submit">
        {editandoId ? "Atualizar Produto" : "Cadastrar Produto"}
      </button>
      {editandoId && (
        <button type="button" onClick={limparFormulario}>
          Cancelar
        </button>
      )}
    </form>
  );
}
export default Cadastro;
