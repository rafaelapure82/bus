import prisma from '../src/config/prisma';
import bcrypt from 'bcrypt';

async function main() {
  const username = 'rafaelcorrea';
  const password = 'correa123';
  const hashedPassword = await bcrypt.hash(password, 10);

  let role = await prisma.roles.findFirst({ where: { name: 'Admin' } });
  if (!role) {
    role = await prisma.roles.create({ data: { name: 'Admin', status: 'active' } });
  }

  // Borrar si existe con el email anterior para evitar conflictos
  await prisma.users.deleteMany({ where: { slug: username } });

  const user = await prisma.users.create({
    data: {
      login_email: username, // Usar el nombre directamente como email si el sistema lo permite
      login_mobile: '000000',
      password: hashedPassword,
      slug: username,
      role_id: role.id,
      status: 'active'
    }
  });

  console.log('Admin User Ready (V2):', user.login_email);
}

main().catch(console.error);
