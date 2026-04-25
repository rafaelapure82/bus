import prisma from '../src/config/prisma';

async function test() {
  try {
    console.log('--- TEST: Creating Passenger ---');
    const passenger = await prisma.passangers.create({
      data: {
        first_name: 'Test',
        last_name: 'User',
        mobile: '123',
        email: 'test@test.com',
        status: 'active'
      }
    });
    console.log('Passenger Created:', passenger.id);

    console.log('--- TEST: Creating Ticket ---');
    const ticket = await prisma.tickets.create({
      data: {
        booking_id: 'TEST-' + Date.now(),
        trip_id: 1,
        subtrip_id: 1,
        passanger_id: passenger.id,
        pick_location_id: 1,
        drop_location_id: 1,
        pick_stand_id: 1,
        drop_stand_id: 1,
        price: '15',
        paidamount: '15',
        seatnumber: '10',
        totalseat: '1',
        bookby_user_id: 1,
        journeydata: new Date(),
        payment_status: 'paid',
        vehicle_id: 1,
        status: 'active'
      }
    });
    console.log('Ticket Created Successfully:', ticket.id);
  } catch (err: any) {
    console.error('TEST FAILED:', err.message);
    if (err.code) console.error('Error Code:', err.code);
  }
}

test();
