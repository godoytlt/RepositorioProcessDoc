import prisma from "../config/db.js";
import bcrypt from "bcrypt";

// Rota: GET /me
export async function getMe(req, res) {
  try {
    console.log("➡️ [GET /me] UserId recebido do token:", req.user?.userId);

    const user = await prisma.user.findUnique({
      where: { id: req.user.userId },
      select: { id: true, name: true, email: true, role: true },
    });

    if (!user) {
      console.warn("⚠️ [GET /me] Usuário não encontrado:", req.user?.userId);
      return res.status(404).json({ error: "Usuário não encontrado." });
    }

    console.log("✅ [GET /me] Usuário encontrado:", user);
    res.json(user);
  } catch (err) {
    console.error("❌ [GET /me] Erro inesperado:", err);
    res.status(500).json({ error: err.message });
  }
}

// Rota: POST /users/register
export async function registerUser(req, res) {
  try {
    console.log("➡️ [POST /users/register] Body recebido:", req.body);

    const { name, email, cpf, cep, dateOfBirth, password, role } = req.body;

    // validações básicas
    if (!name || !email || !cpf || !password) {
      console.warn("⚠️ [POST /users/register] Campos obrigatórios ausentes.");
      return res.status(400).json({ error: "Preencha os campos obrigatórios." });
    }

    // verifica se já existe email
    const existingEmail = await prisma.user.findUnique({ where: { email } });
    if (existingEmail) {
      console.warn("⚠️ [POST /users/register] Email já cadastrado:", email);
      return res.status(400).json({ error: "Email já cadastrado." });
    }

    // verifica se já existe CPF
    const existingCpf = await prisma.user.findUnique({ where: { cpf } });
    if (existingCpf) {
      console.warn("⚠️ [POST /users/register] CPF já cadastrado:", cpf);
      return res.status(400).json({ error: "CPF já cadastrado." });
    }

    // gera hash da senha
    const passwordHash = await bcrypt.hash(password, 10);
    console.log("🔑 [POST /users/register] Hash gerado com sucesso.");

    // cria usuário
    const user = await prisma.user.create({
      data: {
        name,
        email,
        cpf,
        cep,
        dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null,
        passwordHash,
        role: role || "ADVOGADO",
      },
    });

    console.log("✅ [POST /users/register] Usuário criado:", {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    });

    res.status(201).json({
      message: "Usuário cadastrado com sucesso!",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("❌ [POST /users/register] Erro inesperado:", err);
    res.status(500).json({
      error: "Erro ao cadastrar usuário",
      details: err.message,
    });
  }
}
