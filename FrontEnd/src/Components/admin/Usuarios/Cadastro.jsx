function Cadastro({
  handleSubmit,
  nome,
  setNome,
  email,
  setEmail,
  editandoId,
  limparFormulario,
}) {
  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <input
        type="text"
        placeholder="Nome"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="E-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button type="submit">{editandoId ? "Atualizar" : "Cadastrar"}</button>
      {editandoId && <button onClick={limparFormulario}>Cancelar</button>}
    </form>
  );
}

export default Cadastro;
