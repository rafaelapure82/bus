import prisma from '../src/config/prisma';

async function main() {
  console.log('--- ENSURING ENVIRONMENT ---');

  // 1. Role
  let role = await prisma.roles.findFirst();
  if (!role) {
    role = await prisma.roles.create({ data: { name: 'Admin', status: 'active' } });
    console.log('Created Role:', role.id);
  }

  // 2. User
  let user = await prisma.users.findFirst();
  if (!user) {
    user = await prisma.users.create({
      data: {
        login_email: 'admin@bus.com',
        login_mobile: '123456',
        password: 'password',
        slug: 'admin',
        role_id: role.id,
        status: 'active'
      }
    });
    console.log('Created User:', user.id);
  }

  // 3. Location
  let loc = await prisma.locations.findFirst();
  if (!loc) {
    loc = await prisma.locations.create({ data: { name: 'Terminal Central' } });
    console.log('Created Location:', loc.id);
  }

  // 4. Stand
  let stand = await prisma.stands.findFirst();
  if (!stand) {
    stand = await prisma.stands.create({ data: { name: 'Andén 1' } });
    console.log('Created Stand:', stand.id);
  }

  // 5. Fleet
  let fleet = await prisma.fleets.findFirst();
  if (!fleet) {
    fleet = await prisma.fleets.create({
        data: {
            type: 'Bus Estándar',
            layout: '2-2',
            last_seat: '40',
            total_seat: 40,
            seat_number: '1-40',
            status: 'active',
            luggage_service: 'yes'
        }
    });
    console.log('Created Fleet:', fleet.id);
  }

  // 6. Vehicle
  let vehicle = await prisma.vehicles.findFirst();
  if (!vehicle) {
      vehicle = await prisma.vehicles.create({
          data: {
              reg_no: 'TEST-001',
              fleet_id: fleet.id,
              engine_no: 'E123',
              model_no: 'M2024',
              chasis_no: 'C123',
              woner: 'Empresa',
              woner_mobile: '123',
              company: 'Bus Co',
              status: 'active',
              assign: 'yes'
          }
      });
      console.log('Created Vehicle:', vehicle.id);
  }

  console.log('Environment Ready!');
  console.log('Use these IDs in frontend:');
  console.log({
      user_id: user.id,
      stand_id: stand.id,
      location_id: loc.id,
      vehicle_id: vehicle.id
  });
}

main().catch(console.error);
