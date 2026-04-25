"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Ticket, Search, MapPin, Calendar, User, Check, X, RefreshCw, Armchair, DollarSign, ArrowRight, CreditCard, ShieldCheck, Bus, FileText, Printer, Users, FileSpreadsheet, FileDown } from 'lucide-react';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

interface Trip {
  id: number;
  startdate: string;
  adult_fair: string;
  vehicle_id: number;
  pick_location_id: number;
  drop_location_id: number;
  fleets: { type: string, layout: string, total_seat: number };
  schedules: { start_time: string };
  locations_trips_pick_location_idTolocations: { name: string };
  locations_trips_drop_location_idTolocations: { name: string };
}

interface SoldTicket {
  id: number;
  trip_id: number;
  booking_id: string;
  seatnumber: string;
  paidamount: string;
  created_at: string;
  passangers: { first_name: string, last_name: string, mobile: string };
}

export default function TicketsPage() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [soldTickets, setSoldTickets] = useState<SoldTicket[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isListinModalOpen, setIsListinModalOpen] = useState(false);
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [passengerData, setPassengerData] = useState({ first_name: '', last_name: '', phone: '', email: '' });

  const fetchData = async () => {
    setLoading(true);
    try {
      const [tripsRes, ticketsRes] = await Promise.all([
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/trips`),
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/tickets`)
      ]);
      const tps = await tripsRes.json();
      const tks = await ticketsRes.json();
      setTrips(Array.isArray(tps) ? tps : []);
      setSoldTickets(Array.isArray(tks) ? tks : []);
    } catch (error) { console.error('Error fetching data:', error); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchData(); }, []);

  const handleSeatClick = (seatNum: number) => {
    if (selectedSeats.includes(seatNum)) {
      setSelectedSeats(selectedSeats.filter(s => s !== seatNum));
    } else {
      setSelectedSeats([...selectedSeats, seatNum]);
    }
  };

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedSeats.length === 0) return alert('Selecciona al menos un asiento');
    if (!selectedTrip) return;

    setIsSubmitting(true);
    try {
      const pRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/passangers`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
              first_name: passengerData.first_name,
              last_name: passengerData.last_name,
              mobile: passengerData.phone,
              email: passengerData.email,
              status: 'active'
          })
      });
      const passenger = await pRes.json();
      if (!passenger.id) throw new Error('No se pudo crear el pasajero');

      for (const seat of selectedSeats) {
          const booking_id = `BUS-${Date.now()}-${seat}-${Math.floor(Math.random() * 1000)}`;
          const ticketBody = {
            booking_id,
            trip_id: selectedTrip.id,
            subtrip_id: 1, 
            passanger_id: passenger.id,
            pick_location_id: selectedTrip.pick_location_id || 1,
            drop_location_id: selectedTrip.drop_location_id || 1,
            pick_stand_id: 1,
            drop_stand_id: 1,
            price: selectedTrip.adult_fair,
            paidamount: selectedTrip.adult_fair,
            seatnumber: seat.toString(),
            totalseat: "1",
            bookby_user_id: 1, 
            journeydata: new Date(selectedTrip.startdate).toISOString(),
            payment_status: 'paid',
            vehicle_id: selectedTrip.vehicle_id || 1
          };

          const tRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tickets`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(ticketBody)
          });
          
          if (!tRes.ok) throw new Error('Error al crear el boleto');
      }

      alert('¡Venta completada con éxito!');
      setIsBookingModalOpen(false);
      setSelectedSeats([]);
      setPassengerData({ first_name: '', last_name: '', phone: '', email: '' });
      await fetchData(); 
    } catch (error: any) {
      console.error('Booking error:', error);
      alert(`Error: ${error.message}`);
    } finally { setIsSubmitting(false); }
  };

  const getOccupiedSeatInfo = (seatNum: number) => {
      return soldTickets.find(t => t.trip_id === selectedTrip?.id && t.seatnumber === seatNum.toString());
  };

  const filteredTickets = selectedTrip ? soldTickets.filter(t => t.trip_id === selectedTrip.id).sort((a,b)=>parseInt(a.seatnumber)-parseInt(b.seatnumber)) : [];

  // Export Logic
  const exportToExcel = () => {
    if (!selectedTrip) return;
    const data = filteredTickets.map(t => ({
      'Asiento': t.seatnumber,
      'Pasajero': `${t.passangers.first_name} ${t.passangers.last_name}`,
      'Celular': t.passangers.mobile,
      'ID Reserva': t.booking_id,
      'Monto': `$${t.paidamount}`
    }));
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Listín");
    XLSX.writeFile(wb, `Listin_${selectedTrip.locations_trips_pick_location_idTolocations.name}_${selectedTrip.schedules.start_time}.xlsx`);
  };

  const exportToPDF = () => {
    if (!selectedTrip) return;
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('LISTÍN DE CONTROL - BUS SYSTEM', 14, 22);
    doc.setFontSize(11);
    doc.text(`Ruta: ${selectedTrip.locations_trips_pick_location_idTolocations.name} -> ${selectedTrip.locations_trips_drop_location_idTolocations.name}`, 14, 30);
    doc.text(`Salida: ${selectedTrip.schedules.start_time} | Unidad: ${selectedTrip.fleets.type}`, 14, 37);

    const tableData = filteredTickets.map(t => [
      t.seatnumber,
      `${t.passangers.first_name} ${t.passangers.last_name}`,
      t.passangers.mobile,
      t.booking_id,
      `$${t.paidamount}`
    ]);

    (doc as any).autoTable({
      startY: 45,
      head: [['Asiento', 'Pasajero', 'Celular', 'ID Reserva', 'Monto']],
      body: tableData,
      theme: 'grid',
      headStyles: { fillColor: [128, 0, 32] }
    });

    doc.save(`Listin_${selectedTrip.locations_trips_pick_location_idTolocations.name}.pdf`);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8 p-6 print:p-0">
      <div className="flex justify-between items-center mb-8 print:hidden">
        <div><h2 className="text-4xl font-black text-[#800020] tracking-tight">Control de Pasajeros</h2><p className="text-neutral-500 font-medium">Venta de boletos y listín operativo en tiempo real.</p></div>
        <button onClick={fetchData} className="p-4 bg-white border border-neutral-100 rounded-[1.5rem] shadow-sm hover:bg-neutral-50 transition-all"><RefreshCw className={`w-5 h-5 text-neutral-400 ${loading ? 'animate-spin' : ''}`} /></button>
      </div>

      <div className="grid grid-cols-1 gap-6 print:hidden">
        {loading ? (
            Array.from({length: 3}).map((_, i) => <div key={i} className="h-32 bg-white rounded-[2.5rem] animate-pulse border border-neutral-100" />)
        ) : trips.length > 0 ? trips.map((trip) => (
            <motion.div 
                key={trip.id} whileHover={{ y: -4 }}
                className="bg-white p-8 rounded-[2.5rem] border border-neutral-100 shadow-sm flex items-center justify-between group transition-all hover:shadow-2xl hover:shadow-[#800020]/5"
            >
                <div className="flex items-center gap-8">
                    <div className="w-16 h-16 bg-[#800020]/5 rounded-[2rem] flex flex-col items-center justify-center text-[#800020] border border-[#800020]/10">
                        <span className="text-lg font-black leading-none">{trip.schedules?.start_time.split(':')[0]}</span>
                        <span className="text-[10px] font-bold uppercase opacity-60">AM</span>
                    </div>
                    <div>
                        <div className="flex items-center gap-3 mb-1">
                            <span className="text-xl font-black text-neutral-800">{trip.locations_trips_pick_location_idTolocations?.name}</span>
                            <ArrowRight className="w-4 h-4 text-neutral-300" />
                            <span className="text-xl font-black text-neutral-800">{trip.locations_trips_drop_location_idTolocations?.name}</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="text-xs text-neutral-400 font-black uppercase flex items-center gap-1.5"><Bus className="w-3.5 h-3.5" /> {trip.fleets?.type}</span>
                            <span className="text-xs text-neutral-400 font-black uppercase flex items-center gap-1.5"><Armchair className="w-3.5 h-3.5" /> {trip.fleets?.total_seat} Asientos</span>
                            <button 
                                onClick={() => { setSelectedTrip(trip); setIsListinModalOpen(true); }}
                                className="flex items-center gap-1.5 px-3 py-1 bg-[#800020]/5 text-[#800020] rounded-lg text-[10px] font-black uppercase border border-[#800020]/10 hover:bg-[#800020] hover:text-white transition-all ml-2"
                            >
                                <FileText className="w-3 h-3" />
                                Ver Listín
                            </button>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-10">
                    <div className="text-right">
                        <p className="text-3xl font-black text-[#800020] tracking-tighter">${trip.adult_fair}</p>
                        <p className="text-[10px] font-black text-neutral-300 uppercase tracking-widest">Precio</p>
                    </div>
                    <button onClick={() => { setSelectedTrip(trip); setIsBookingModalOpen(true); }} className="px-10 py-4 bg-[#800020] text-white font-black rounded-2xl shadow-xl shadow-[#800020]/20 hover:bg-[#600018] transition-all">Vender</button>
                </div>
            </motion.div>
        )) : (
            <div className="py-24 text-center bg-white rounded-[3rem] border-2 border-dashed border-neutral-100">
                <Ticket className="w-16 h-16 text-neutral-100 mx-auto mb-4" />
                <p className="text-neutral-400 font-bold">No hay viajes disponibles.</p>
            </div>
        )}
      </div>

      {/* Modal Listín de Pasajeros */}
      <AnimatePresence>
        {isListinModalOpen && selectedTrip && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 print:p-0 print:static print:z-0">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsListinModalOpen(false)} className="absolute inset-0 bg-black/60 backdrop-blur-md print:hidden" />
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9, y: 40 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 40 }} 
                    className="relative w-full max-w-4xl bg-white rounded-[3.5rem] shadow-2xl flex flex-col overflow-hidden max-h-[85vh] print:max-h-none print:shadow-none print:rounded-none print:w-full"
                >
                    <div className="p-10 bg-[#800020] text-white flex justify-between items-center print:bg-white print:text-black print:border-b-2 print:border-black print:p-6">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <FileText className="w-8 h-8 opacity-50 print:hidden" />
                                <h4 className="text-3xl font-black tracking-tight uppercase">Listín de Control</h4>
                            </div>
                            <p className="opacity-70 font-bold text-sm">{selectedTrip.locations_trips_pick_location_idTolocations?.name} ➔ {selectedTrip.locations_trips_drop_location_idTolocations?.name} | Salida: {selectedTrip.schedules?.start_time}</p>
                        </div>
                        <button onClick={() => setIsListinModalOpen(false)} className="p-4 bg-white/10 hover:bg-white/20 rounded-2xl transition-all print:hidden"><X className="w-6 h-6" /></button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-10 custom-scrollbar print:overflow-visible print:p-6">
                        {filteredTickets.length > 0 ? (
                            <table className="w-full text-left border-separate border-spacing-y-4 print:border-collapse print:border-spacing-0">
                                <thead>
                                    <tr className="text-[10px] font-black text-neutral-400 uppercase tracking-widest px-4 print:text-black print:border-b">
                                        <th className="pb-2 pl-4">Asiento</th>
                                        <th className="pb-2">Pasajero</th>
                                        <th className="pb-2">Celular</th>
                                        <th className="pb-2">ID Reserva</th>
                                        <th className="pb-2 text-right pr-4">Monto</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredTickets.map((ticket) => (
                                        <tr key={ticket.id} className="bg-neutral-50 rounded-2xl group hover:bg-[#800020]/5 transition-all print:bg-white print:border-b">
                                            <td className="py-5 pl-6 print:py-2">
                                                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center font-black text-[#800020] border border-neutral-100 shadow-sm print:border-none print:w-auto print:justify-start">
                                                    {ticket.seatnumber}
                                                </div>
                                            </td>
                                            <td className="py-5 print:py-2">
                                                <p className="font-black text-neutral-800">{ticket.passangers?.first_name} {ticket.passangers?.last_name}</p>
                                            </td>
                                            <td className="py-5 text-sm text-neutral-600 print:py-2">{ticket.passangers?.mobile}</td>
                                            <td className="py-5 font-mono text-[10px] text-neutral-400 print:py-2">{ticket.booking_id}</td>
                                            <td className="py-5 text-right pr-6 font-black text-[#800020] text-lg print:py-2 print:text-black">${ticket.paidamount}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <div className="py-20 text-center">
                                <Users className="w-16 h-16 text-neutral-100 mx-auto mb-4" />
                                <p className="text-neutral-400 font-bold">No hay pasajeros registrados.</p>
                            </div>
                        )}
                    </div>

                    <div className="p-8 bg-neutral-50 border-t border-neutral-100 flex justify-between items-center print:bg-white print:p-6 print:border-t-2 print:border-black">
                        <div className="flex gap-4">
                            <div className="text-center bg-white px-6 py-2 rounded-2xl border border-neutral-100 shadow-sm print:border-none"><p className="text-[10px] font-black text-neutral-400 uppercase leading-none">Ventas</p><p className="text-xl font-black text-[#800020] print:text-black">{filteredTickets.length}</p></div>
                            <div className="text-center bg-white px-6 py-2 rounded-2xl border border-neutral-100 shadow-sm print:border-none"><p className="text-[10px] font-black text-neutral-400 uppercase leading-none">Total</p><p className="text-xl font-black text-green-600 print:text-black">${filteredTickets.reduce((sum, t) => sum + parseFloat(t.paidamount), 0)}</p></div>
                        </div>
                        <div className="flex gap-3 print:hidden">
                            <button onClick={exportToExcel} className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white font-black rounded-2xl shadow-lg hover:bg-green-700 transition-all"><FileSpreadsheet className="w-4 h-4" /> Excel</button>
                            <button onClick={exportToPDF} className="flex items-center gap-2 px-6 py-3 bg-red-600 text-white font-black rounded-2xl shadow-lg hover:bg-red-700 transition-all"><FileDown className="w-4 h-4" /> PDF</button>
                            <button onClick={handlePrint} className="flex items-center gap-2 px-6 py-3 bg-neutral-900 text-white font-black rounded-2xl shadow-xl hover:bg-black transition-all"><Printer className="w-4 h-4" /> Imprimir</button>
                        </div>
                    </div>
                </motion.div>
            </div>
        )}
      </AnimatePresence>

      {/* Booking Modal (Asiento Map) */}
      <AnimatePresence>
        {isBookingModalOpen && selectedTrip && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 print:hidden">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsBookingModalOpen(false)} className="absolute inset-0 bg-black/60 backdrop-blur-md" />
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9, y: 40 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 40 }} 
                    className="relative w-full max-w-6xl bg-white rounded-[3.5rem] shadow-2xl flex flex-col md:flex-row overflow-hidden max-h-[92vh]"
                >
                    <div className="flex-1 p-12 bg-neutral-50 overflow-y-auto custom-scrollbar">
                        <div className="flex justify-between items-center mb-10">
                            <h4 className="text-3xl font-black text-neutral-800">Mapa de Asientos</h4>
                            <div className="flex items-center gap-4 text-[10px] font-black text-neutral-400 uppercase"><div className="w-3 h-3 bg-white border border-neutral-200 rounded-sm" /> Libre <div className="w-3 h-3 bg-[#800020] rounded-sm ml-2" /> Select <div className="w-3 h-3 bg-[#800020]/20 rounded-sm ml-2" /> Vendido</div>
                        </div>
                        <div className="max-w-[340px] mx-auto bg-white p-12 rounded-[4rem] border-8 border-neutral-100 shadow-2xl">
                            <div className="grid grid-cols-4 gap-5">
                                {Array.from({ length: selectedTrip.fleets?.total_seat || 40 }).map((_, i) => {
                                    const seatNum = i + 1;
                                    const isSelected = selectedSeats.includes(seatNum);
                                    const tInfo = getOccupiedSeatInfo(seatNum);
                                    const isOccupied = !!tInfo;
                                    return (
                                        <div key={seatNum} className="relative group/seat">
                                            <button disabled={isOccupied} onClick={() => handleSeatClick(seatNum)}
                                                className={`w-full aspect-square rounded-[1rem] flex items-center justify-center text-[11px] font-black transition-all ${isOccupied ? 'bg-[#800020]/20 text-[#800020] border-2 border-[#800020]/10' : isSelected ? 'bg-[#800020] text-white scale-110 shadow-xl' : 'bg-neutral-50 text-neutral-400 hover:bg-neutral-100'}`}
                                            >
                                                {isOccupied ? <Check className="w-5 h-5" /> : <Armchair className="w-5 h-5" />}
                                            </button>
                                            {isOccupied && <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-4 py-2 bg-neutral-900 text-white text-[11px] font-black rounded-xl opacity-0 group-hover/seat:opacity-100 transition-all pointer-events-none z-50 shadow-2xl">{tInfo.passangers?.first_name} {tInfo.passangers?.last_name}</div>}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                    <div className="w-full md:w-[450px] p-12 bg-white flex flex-col">
                        <div className="flex justify-between mb-10"><ShieldCheck className="w-8 h-8 text-green-500" /><button onClick={() => setIsBookingModalOpen(false)}><X className="w-6 h-6 text-neutral-300" /></button></div>
                        <form onSubmit={handleBooking} className="flex-1">
                            <div className="space-y-5 mb-8">
                                <h5 className="text-[10px] font-black text-neutral-300 uppercase tracking-widest">Pasajero</h5>
                                <div className="grid grid-cols-2 gap-4"><input type="text" placeholder="Nombres" required value={passengerData.first_name} onChange={e=>setPassengerData({...passengerData, first_name: e.target.value})} className="form-input-premium" /><input type="text" placeholder="Apellidos" required value={passengerData.last_name} onChange={e=>setPassengerData({...passengerData, last_name: e.target.value})} className="form-input-premium" /></div>
                                <input type="text" placeholder="Celular" required value={passengerData.phone} onChange={e=>setPassengerData({...passengerData, phone: e.target.value})} className="form-input-premium w-full" />
                                <input type="email" placeholder="Correo" required value={passengerData.email} onChange={e=>setPassengerData({...passengerData, email: e.target.value})} className="form-input-premium w-full" />
                            </div>
                            <div className="p-8 bg-[#800020]/5 rounded-[2.5rem] border border-[#800020]/10 mb-8"><div className="flex justify-between mb-4"><span className="text-xs font-black text-neutral-400 uppercase">Asientos</span><span className="text-sm font-black text-[#800020]">{selectedSeats.sort((a,b)=>a-b).join(', ') || '--'}</span></div><div className="flex justify-between items-end"><div><p className="text-[10px] font-black text-neutral-400 uppercase mb-1">Monto Total</p><p className="text-4xl font-black text-[#800020]">${selectedSeats.length * parseFloat(selectedTrip.adult_fair)}</p></div></div></div>
                            <button type="submit" disabled={isSubmitting || selectedSeats.length === 0} className="w-full py-6 bg-[#800020] text-white font-black rounded-2xl shadow-2xl hover:bg-[#600018] transition-all disabled:opacity-50">{isSubmitting ? <RefreshCw className="animate-spin" /> : 'Confirmar Venta'}</button>
                        </form>
                    </div>
                </motion.div>
            </div>
        )}
      </AnimatePresence>

      <style jsx>{` 
        .form-input-premium { @apply px-5 py-4 rounded-2xl border border-neutral-100 bg-neutral-50 focus:bg-white focus:border-[#800020]/30 outline-none text-sm font-bold transition-all; } 
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #E5E7EB; border-radius: 10px; }
        @media print {
            body { background: white !important; }
            .print\\:hidden { display: none !important; }
        }
      `}</style>
    </motion.div>
  );
}
