// prisma/seed.js
const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const pw = await bcrypt.hash('admin123', 10);
  await prisma.user.upsert({
    where: { email: 'admin@processdoc.local' },
    update: {},
    create: {
      name: 'Administrador',
      email: 'admin@processdoc.local',
      cpf: '00000000000',
      passwordHash: pw,
      role: 'ADMIN'
    }
  });
  console.log('Seed completa');
}

main().then(() => prisma.$disconnect());
