const userModel = require('../models/userModel');

async function getMe(req, res) {
  try {
    const user = await userModel.findUserById(req.user.userId);
    if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });
    return res.json({ id: user.id, name: user.name, email: user.email, role: user.role });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Erro interno' });
  }
}

module.exports = { getMe };
