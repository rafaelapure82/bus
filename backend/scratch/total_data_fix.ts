import prisma from '../src/config/prisma';

async function main() {
  console.log('--- TOTAL DATA FIX ---');
  
  const trip = await prisma.trips.findFirst();
  if (!trip) {
    console.error('No trip found. Run ensure_env.ts first.');
    return;
  }

  // 1. Subtrip
  let subtrip = await prisma.subtrips.findFirst({ where: { trip_id: trip.id } });
  if (!subtrip) {
    subtrip = await prisma.subtrips.create({
      data: {
        trip_id: trip.id,
        pick_location_id: trip.pick_location_id,
        drop_location_id: trip.drop_location_id,
        adult_fair: trip.adult_fair,
        type: 'main',
        status: 'active'
      }
    });
    console.log('Created Subtrip ID:', subtrip.id);
  } else {
    console.log('Subtrip already exists ID:', subtrip.id);
  }

  // 2. Pickdrops
  let pickdrop = await prisma.pickdrops.findFirst({ where: { trip_id: trip.id } });
  if (!pickdrop) {
    const stand = await prisma.stands.findFirst();
    if (stand) {
      const newPd = await prisma.pickdrops.create({
        data: {
          trip_id: trip.id,
          stand_id: stand.id,
          time: '04:00',
          type: 1,
          detail: 'Punto de Salida'
        }
      });
      console.log('Created Pickdrop ID:', newPd.id);
    }
  }

  console.log('Final Verification:');
  console.log({
    trip_id: trip.id,
    subtrip_id: subtrip.id,
    pickdrop_id: pickdrop?.id || 1
  });
}

main().catch(console.error);
