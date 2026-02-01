const db = require("../database/connection");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = {
  // Cadastro de Usuário
  async store(req, res) {
    const { nome, email, senha, tipo, foto_perfil } = req.body;
    try {
      const hash = await bcrypt.hash(senha, 10);
      const result = await db.query(
        `INSERT INTO ecommerce.Usuario (nome, email, senha, tipo, foto_perfil) 
         VALUES ($1, $2, $3, $4, $5) RETURNING id, nome, email, tipo`,
        [nome, email, hash, tipo || 'cliente', foto_perfil]
      );
      return res.status(201).json(result.rows[0]);
    } catch (err) {
      return res.status(400).json({ error: "Usuário já existe ou dados inválidos." });
    }
  },

  // Login de Usuário
  async login(req, res) {
    const { email, senha } = req.body;
    try {
      const result = await db.query("SELECT * FROM ecommerce.Usuario WHERE email = $1", [email]);
      const user = result.rows[0];

      if (!user || !(await bcrypt.compare(senha, user.senha))) {
        return res.status(401).json({ error: "E-mail ou senha incorretos." });
      }

      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });

      // AGORA RETORNA A FOTO TAMBÉM
      return res.json({
        user: {
          id: user.id,
          nome: user.nome,
          email: user.email,
          tipo: user.tipo,
          foto_perfil: user.foto_perfil // Certifique-se que o nome da coluna no banco é este
        },
        token
      });
    } catch (err) {
      return res.status(500).json({ error: "Erro no servidor." });
    }
  },

  async show(req, res) {
    try {
      const result = await db.query(
        "SELECT id, nome, tipo, foto_perfil FROM ecommerce.Usuario WHERE id = $1",
        [req.userId]
      );

      const user = result.rows[0];

      if (!user) {
        return res.status(404).json({ error: "Usuário não encontrado." });
      }

      return res.json(user);
    } catch (err) {
      return res.status(500).json({ error: "Erro interno ao buscar perfil." });
    }
  }
};