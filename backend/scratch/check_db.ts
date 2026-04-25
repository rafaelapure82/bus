import prisma from '../src/config/prisma';

async function main() {
  const users = await prisma.users.findMany({ take: 1 });
  const stands = await prisma.stands.findMany({ take: 2 });
  const pickdrops = await prisma.pickdrops.findMany({ take: 2 });
  
  console.log('--- DB CHECK ---');
  console.log('User ID 1 exists:', users.some(u => u.id === 1));
  console.log('Stands found:', stands.length);
  console.log('Pickdrops found:', pickdrops.length);
  if (users.length > 0) console.log('First User ID:', users[0].id);
  if (stands.length > 0) console.log('Stand IDs:', stands.map(s => s.id));
}

main().catch(console.error);
