const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.listarProcessos = async (req, res) => {
  try {
    const processos = await prisma.process.findMany({
      include: {
        responsible: true,
        documents: true,
        histories: true,
        deadlines: true
      }
    });
    res.json(processos);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

exports.criarProcesso = async (req, res) => {
  const { processNumber, clientName, responsibleId, openingDate, type, description } = req.body;
  try {
    const processo = await prisma.process.create({
      data: {
        processNumber,
        clientName,
        responsibleId,
        openingDate: new Date(openingDate),
        type,
        description
      }
    });
    res.status(201).json(processo);
  } catch (err) {
    console.error(err);
    if (err.code === 'P2002') { 
      return res.status(400).json({ error: 'Número de processo já existe' });
    }
    res.status(500).json({ error: err.message });
  }
};

exports.atualizarProcesso = async (req, res) => {
  const { id } = req.params;
  const { clientName, responsibleId, type, status, description } = req.body;

  try {
    const processo = await prisma.process.update({
      where: { id: parseInt(id) },
      data: { clientName, responsibleId, type, status, description }
    });
    res.json(processo);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

exports.deletarProcesso = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.process.delete({ where: { id: parseInt(id) } });
    res.json({ message: 'Processo deletado com sucesso' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

exports.pegarProcessoPorId = async (req, res) => {
  const { id } = req.params;
  try {
    const processo = await prisma.process.findUnique({
      where: { id: parseInt(id) },
      include: {
        responsible: true,
        documents: true,
        histories: true,
        deadlines: true
      }
    });
    if (!processo) return res.status(404).json({ error: 'Processo não encontrado' });
    res.json(processo);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
