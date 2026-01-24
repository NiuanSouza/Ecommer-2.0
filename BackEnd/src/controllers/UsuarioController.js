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

      return res.json({
        user: { id: user.id, nome: user.nome, email: user.email, tipo: user.tipo },
        token
      });
    } catch (err) {
      return res.status(500).json({ error: "Erro no servidor." });
    }
  },

  async index(req, res) {
    const result = await db.query("SELECT id, nome, email, tipo, foto_perfil FROM ecommerce.Usuario");
    return res.json(result.rows);
  }
};