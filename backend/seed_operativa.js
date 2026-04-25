const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Seeding base operativa...');

  // 1. Ubicaciones
  const loc1 = await prisma.locations.create({ data: { name: 'Terminal Central Caracas' } });
  const loc2 = await prisma.locations.create({ data: { name: 'Terminal de Maracaibo' } });
  const loc3 = await prisma.locations.create({ data: { name: 'Terminal de Valencia' } });

  // 2. Flotas (Tipos)
  const fleet1 = await prisma.fleets.create({ data: { type: 'Bus Ejecutivo', layout: '2-2', last_seat: '0', total_seat: 40, status: 'active', luggage_service: '1', seat_number: '1-40' } });
  const fleet2 = await prisma.fleets.create({ data: { type: 'Bus VIP', layout: '1-2', last_seat: '0', total_seat: 30, status: 'active', luggage_service: '1', seat_number: '1-30' } });

  // 3. Vehículos
  await prisma.vehicles.create({ data: { reg_no: 'ABC-123', fleet_id: fleet1.id, engine_no: 'ENG123', model_no: 'Marcopolo 2024', chasis_no: 'CHAS123', woner: 'Transporte Central', woner_mobile: '04121234567', company: 'Bus Admin', status: 'active', assign: '1' } });
  await prisma.vehicles.create({ data: { reg_no: 'XYZ-789', fleet_id: fleet2.id, engine_no: 'ENG789', model_no: 'Busscar 2025', chasis_no: 'CHAS789', woner: 'Transporte VIP', woner_mobile: '04147894561', company: 'Bus Admin', status: 'active', assign: '1' } });

  // 4. Horarios
  await prisma.schedules.create({ data: { start_time: '08:00', end_time: '12:00', status: 'active' } });
  await prisma.schedules.create({ data: { start_time: '20:00', end_time: '06:00', status: 'active' } });

  console.log('Base operativa seeded successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
