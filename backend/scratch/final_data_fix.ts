import prisma from '../src/config/prisma';

async function main() {
  console.log('--- FINAL DATA FIX ---');
  
  const trip = await prisma.trips.findFirst();
  const stand = await prisma.stands.findFirst();
  
  if (!trip || !stand) {
    console.error('Missing Trip or Stand. Run ensure_env.ts first.');
    return;
  }

  const pickdrop = await prisma.pickdrops.findFirst();
  if (!pickdrop) {
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
  } else {
    console.log('Pickdrop already exists ID:', pickdrop.id);
  }
}

main().catch(console.error);
