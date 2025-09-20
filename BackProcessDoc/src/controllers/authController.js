require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

const JWT_SECRET = process.env.JWT_SECRET || 'troque_isso_no_env';

async function register(req, res) {
  try {
    const { name, email, password, cpf } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'name, email e password são obrigatórios' });
    }

    const exists = await userModel.findUserByEmail(email);
    if (exists) return res.status(400).json({ error: 'Email já cadastrado' });

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await userModel.createUser({
      name,
      email,
      cpf,
      passwordHash,
      role: 'ADVOGADO'
    });

    const retorno = { id: user.id, name: user.name, email: user.email, role: user.role };
    return res.status(201).json(retorno);
  } catch (err) {
    console.error(err);
    if (err.code === 'P2002' && err.meta?.target?.includes('email')) {
      return res.status(400).json({ error: 'Email já cadastrado (db)' });
    }
    return res.status(500).json({ error: 'Erro interno' });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'email e password são obrigatórios' });

    const user = await userModel.findUserByEmail(email);
    if (!user) return res.status(401).json({ error: 'Usuário não encontrado' });

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) return res.status(401).json({ error: 'Senha incorreta' });

    const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, { expiresIn: '8h' });

    return res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Erro interno' });
  }
}

module.exports = { register, login };
