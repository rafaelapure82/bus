const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Seeding Achaguas (Transporte Campesino) data...');

  // 1. Ubicaciones Específicas de Achaguas
  const achaguas_centro = await prisma.locations.create({ data: { name: 'Achaguas (Terminal)' } });
  const apure_seco = await prisma.locations.create({ data: { name: 'Apure Seco' } });
  const guasimal = await prisma.locations.create({ data: { name: 'Guasimal' } });
  const la_rompida = await prisma.locations.create({ data: { name: 'La Rompida' } });
  const el_yagual = await prisma.locations.create({ data: { name: 'El Yagual' } });
  const saman_apure = await prisma.locations.create({ data: { name: 'Samán de Apure' } });

  // 2. Flotas de Transporte Campesino
  const fleet_rural = await prisma.fleets.create({ 
    data: { 
      type: 'Unidad Rural Campesina', 
      layout: '2-2', 
      last_seat: '0', 
      total_seat: 32, 
      status: 'active', 
      luggage_service: '1', 
      seat_number: '1-32' 
    } 
  });
  
  const fleet_pickup = await prisma.fleets.create({ 
    data: { 
      type: 'Pick-up Comunitaria', 
      layout: '1-1', 
      last_seat: '0', 
      total_seat: 12, 
      status: 'active', 
      luggage_service: '1', 
      seat_number: '1-12' 
    } 
  });

  // 3. Vehículos para Achaguas
  const veh1 = await prisma.vehicles.create({ 
    data: { 
      reg_no: 'ACH-001', 
      fleet_id: fleet_rural.id, 
      engine_no: 'V8-ACH', 
      model_no: 'NPR Rural', 
      chasis_no: 'CH-ACH1', 
      woner: 'Asoc. Achaguas', 
      woner_mobile: '0414-ACH1', 
      company: 'Transporte Campesino Achaguas', 
      status: 'active', 
      assign: '1' 
    } 
  });

  // 4. Horarios de Salida (Madrugada para campesinos)
  const sch1 = await prisma.schedules.create({ data: { start_time: '04:00', end_time: '07:00', status: 'active' } });
  const sch2 = await prisma.schedules.create({ data: { start_time: '15:00', end_time: '18:00', status: 'active' } });

  // 5. Crear un Viaje de Prueba en Achaguas
  await prisma.trips.create({
    data: {
        fleet_id: fleet_rural.id,
        schedule_id: sch1.id,
        pick_location_id: achaguas_centro.id,
        drop_location_id: el_yagual.id,
        vehicle_id: veh1.id,
        startdate: new Date(),
        adult_fair: '15',
        special_seat: '0',
        company_name: 'Transporte Campesino Achaguas',
        status: 'active'
    }
  });

  console.log('Achaguas data seeded successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
