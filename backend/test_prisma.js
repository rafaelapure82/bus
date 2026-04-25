const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    console.log('Testing Prisma employees.findMany()...');
    const employees = await prisma.employees.findMany({
      include: {
        country: true,
        employeetypes: true
      }
    });
    console.log('Result type:', typeof employees);
    console.log('Is array:', Array.isArray(employees));
    console.log('Result content:', JSON.stringify(employees, null, 2));
  } catch (error) {
    console.error('Prisma Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
