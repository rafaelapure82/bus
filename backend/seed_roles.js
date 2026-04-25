const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Seeding roles...');
  await prisma.roles.createMany({
    data: [
      { name: 'Administrador Global', status: 'active' },
      { name: 'Operador de Despacho', status: 'active' },
      { name: 'Agente de Ventas', status: 'active' },
      { name: 'Conductor', status: 'active' }
    ],
    skipDuplicates: true
  });
  console.log('Roles seeded successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
