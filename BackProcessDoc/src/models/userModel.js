const prisma = require('../config/db');

async function createUser(data) {
  return prisma.user.create({ data });
}

async function findUserByEmail(email) {
  return prisma.user.findUnique({ where: { email } });
}

async function findUserById(id) {
  return prisma.user.findUnique({ where: { id } });
}

module.exports = { createUser, findUserByEmail, findUserById };
