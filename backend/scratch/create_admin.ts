import prisma from '../src/config/prisma';
import bcrypt from 'bcrypt';

async function main() {
  const username = 'rafaelcorrea';
  const password = 'correa123';
  const hashedPassword = await bcrypt.hash(password, 10);

  // Asegurar que existe el rol Admin (ID 1 asumiendo que es el primero)
  let role = await prisma.roles.findFirst({ where: { name: 'Admin' } });
  if (!role) {
    role = await prisma.roles.create({ data: { name: 'Admin', status: 'active' } });
  }

  const user = await prisma.users.upsert({
    where: { login_email: `${username}@bus.com` },
    update: {
      password: hashedPassword,
      role_id: role.id
    },
    create: {
      login_email: `${username}@bus.com`,
      login_mobile: '000000',
      password: hashedPassword,
      slug: username,
      role_id: role.id,
      status: 'active'
    }
  });

  console.log('Admin User Ready:', user.login_email);
}

main().catch(console.error);
