"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Bus, User, Navigation, Search, RefreshCw, Plus, Home, Map as MapIcon, ArrowRight, ShieldCheck, X, Check, Armchair, Ticket, Edit2 } from 'lucide-react';

interface Trip {
  id: number;
  startdate: string;
  adult_fair: string;
  company_name: string;
  driver_id?: number;
  fleets: { type: string, total_seat: number };
  schedules: { start_time: string, end_time: string };
  locations_trips_pick_location_idTolocations: { name: string };
  locations_trips_drop_location_idTolocations: { name: string };
  vehicles: { id: number, reg_no: string, woner: string, model_no: string };
  employees?: { first_name: string, last_name: string };
}

export default function CampesinoPage() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [assignType, setAssignType] = useState<'vehicle' | 'driver'>('vehicle');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Data for assignment
  const [vehicles, setVehicles] = useState<{id: number, reg_no: string, model_no: string}[]>([]);
  const [employees, setEmployees] = useState<{id: number, first_name: string, last_name: string}[]>([]);

  const fetchCampesinoTrips = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/trips`);
      const data = await response.json();
      const achaguasTrips = Array.isArray(data) ? data.filter((t: any) => 
        t.company_name?.includes('Campesino') || 
        t.locations_trips_pick_location_idTolocations?.name.includes('Achaguas')
      ) : [];
      setTrips(achaguasTrips);
    } catch (error) {
      console.error('Error fetching Achaguas trips:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAssignmentData = async () => {
      try {
          const [vRes, eRes] = await Promise.all([
              fetch(`${process.env.NEXT_PUBLIC_API_URL}/vehicles`),
              fetch(`${process.env.NEXT_PUBLIC_API_URL}/employees`)
          ]);
          setVehicles(await vRes.json());
          setEmployees(await eRes.json());
      } catch (err) {
          console.error('Error fetching assignment data:', err);
      }
  };

  useEffect(() => { 
      fetchCampesinoTrips(); 
      fetchAssignmentData();
  }, []);

  const handleUpdateTrip = async (data: any) => {
    if (!selectedTrip) return;
    setIsSubmitting(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/trips/${selectedTrip.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setIsAssignModalOpen(false);
        fetchCampesinoTrips();
      }
    } catch (error) {
      console.error('Error updating trip:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
      {/* Hero Header */}
      <div className="relative p-10 bg-gradient-to-br from-[#800020] to-[#400010] rounded-[3rem] overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 p-10 opacity-10"><MapIcon className="w-64 h-64 text-white rotate-12" /></div>
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-end gap-6">
            <div>
                <span className="px-4 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-white text-[10px] font-black uppercase tracking-widest border border-white/20">Municipio Achaguas • Apure</span>
                <h2 className="text-5xl font-black text-white mt-6 mb-2">Transporte Campesino</h2>
                <p className="text-white/60 text-lg max-w-xl">Gestión operativa de traslados rurales con vinculación directa a flotas y choferes.</p>
            </div>
            <button className="px-8 py-4 bg-white text-[#800020] font-black rounded-2xl shadow-xl hover:bg-neutral-50 transition-all flex items-center gap-2">
                <Plus className="w-6 h-6" />
                <span>Nuevo Traslado Rural</span>
            </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
            <div className="p-8 bg-white dark:bg-neutral-900 rounded-[2.5rem] border border-neutral-100 shadow-sm">
                <h4 className="text-sm font-black text-neutral-400 uppercase tracking-widest mb-6">Zonas de Cobertura</h4>
                <div className="space-y-4">
                    {['Apure Seco', 'Guasimal', 'La Rompida', 'El Yagual', 'Samán de Apure'].map(zone => (
                        <div key={zone} className="flex items-center gap-3 p-4 hover:bg-[#800020]/5 rounded-2xl transition-all group cursor-pointer border border-transparent hover:border-[#800020]/10">
                            <div className="w-10 h-10 bg-[#800020]/5 rounded-xl flex items-center justify-center text-[#800020] group-hover:bg-[#800020] transition-all shadow-sm"><MapPin className="w-5 h-5" /></div>
                            <span className="text-sm font-bold text-neutral-700">{zone}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
            <div className="flex justify-between items-center px-4">
                <h3 className="text-xl font-bold text-neutral-800">Operaciones en Achaguas</h3>
                <button onClick={fetchCampesinoTrips} className="p-2.5 bg-white border border-neutral-100 rounded-xl hover:bg-neutral-50 shadow-sm transition-all"><RefreshCw className={`w-5 h-5 text-neutral-400 ${loading ? 'animate-spin' : ''}`} /></button>
            </div>

            <AnimatePresence mode='popLayout'>
                {loading ? (
                    Array.from({ length: 3 }).map((_, i) => <div key={i} className="h-40 bg-white rounded-[2.5rem] animate-pulse border border-neutral-100" />)
                ) : trips.length > 0 ? (
                    trips.map((trip, idx) => (
                        <motion.div 
                            key={trip.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-white dark:bg-neutral-900 p-8 rounded-[2.5rem] border border-neutral-100 dark:border-neutral-800 shadow-sm hover:shadow-2xl hover:shadow-[#800020]/5 transition-all flex flex-col md:flex-row items-center gap-8 group"
                        >
                            <div className="flex-1">
                                <div className="flex items-center gap-4 mb-5">
                                    <div className="px-3 py-1 bg-[#800020]/10 text-[#800020] rounded-lg text-[10px] font-black uppercase tracking-widest border border-[#800020]/5">Ruta Campesina</div>
                                    <div className="flex items-center gap-2 text-[10px] text-neutral-400 font-bold uppercase tracking-widest">
                                        <Navigation className="w-3 h-3" /> {trip.schedules?.start_time}
                                    </div>
                                </div>
                                <div className="flex items-center gap-6">
                                    <span className="text-2xl font-black text-neutral-800">{trip.locations_trips_pick_location_idTolocations?.name}</span>
                                    <ArrowRight className="w-5 h-5 text-neutral-200" />
                                    <span className="text-2xl font-black text-neutral-800">{trip.locations_trips_drop_location_idTolocations?.name}</span>
                                </div>
                                
                                {/* Interactive Assignment Section */}
                                <div className="flex items-center gap-6 mt-6 pt-6 border-t border-neutral-50 dark:border-neutral-800">
                                    <div 
                                        onClick={() => { setSelectedTrip(trip); setAssignType('vehicle'); setIsAssignModalOpen(true); }}
                                        className="flex items-center gap-3 cursor-pointer hover:bg-neutral-50 p-2 rounded-xl transition-all border border-transparent hover:border-neutral-100"
                                    >
                                        <div className="w-8 h-8 bg-neutral-50 rounded-lg flex items-center justify-center border border-neutral-100"><Bus className="w-4 h-4 text-[#800020]" /></div>
                                        <div>
                                            <p className="text-[10px] font-black text-neutral-400 uppercase leading-none mb-1">Unidad</p>
                                            <p className="text-xs font-bold text-neutral-700 flex items-center gap-1">{trip.vehicles?.reg_no} <Edit2 className="w-2.5 h-2.5 text-neutral-300" /></p>
                                        </div>
                                    </div>
                                    <div 
                                        onClick={() => { setSelectedTrip(trip); setAssignType('driver'); setIsAssignModalOpen(true); }}
                                        className="flex items-center gap-3 cursor-pointer hover:bg-neutral-50 p-2 rounded-xl transition-all border border-transparent hover:border-neutral-100"
                                    >
                                        <div className="w-8 h-8 bg-neutral-50 rounded-lg flex items-center justify-center border border-neutral-100"><User className="w-4 h-4 text-[#800020]" /></div>
                                        <div>
                                            <p className="text-[10px] font-black text-neutral-400 uppercase leading-none mb-1">Encargado</p>
                                            <p className="text-xs font-bold text-neutral-700 flex items-center gap-1">
                                                {trip.employees ? `${trip.employees.first_name} ${trip.employees.last_name}` : trip.vehicles?.woner} 
                                                <Edit2 className="w-2.5 h-2.5 text-neutral-300" />
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="w-full md:w-auto text-center md:text-right flex flex-col gap-3 min-w-[160px]">
                                <span className="text-4xl font-black text-[#800020]">${trip.adult_fair}</span>
                                <button 
                                    onClick={() => { setSelectedTrip(trip); setIsDetailModalOpen(true); }}
                                    className="px-8 py-4 bg-neutral-900 hover:bg-black text-white text-xs font-black rounded-2xl shadow-xl transition-all active:scale-95"
                                >
                                    Ver Detalles
                                </button>
                            </div>
                        </motion.div>
                    ))
                ) : (
                    <div className="py-20 text-center bg-white rounded-[3rem] border border-dashed border-neutral-200">
                        <MapIcon className="w-16 h-16 text-neutral-100 mx-auto mb-4" />
                        <p className="text-neutral-400 font-medium">No se encontraron rutas rurales activas.</p>
                    </div>
                )}
            </AnimatePresence>
        </div>
      </div>

      {/* Modal de Asignación */}
      <AnimatePresence>
          {isAssignModalOpen && selectedTrip && (
              <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsAssignModalOpen(false)} className="absolute inset-0 bg-black/20 backdrop-blur-sm" />
                  <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="relative w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl p-10 overflow-hidden border border-neutral-100">
                      <div className="mb-8 flex justify-between items-center">
                          <h4 className="text-2xl font-black text-neutral-800">Asignar {assignType === 'vehicle' ? 'Unidad' : 'Chofer'}</h4>
                          <button onClick={() => setIsAssignModalOpen(false)}><X className="w-6 h-6 text-neutral-300" /></button>
                      </div>

                      <div className="space-y-4 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
                          {assignType === 'vehicle' ? (
                              vehicles.map(v => (
                                  <div 
                                    key={v.id} 
                                    onClick={() => handleUpdateTrip({ vehicle_id: v.id })}
                                    className="p-4 bg-neutral-50 hover:bg-[#800020]/5 rounded-2xl border border-transparent hover:border-[#800020]/10 transition-all cursor-pointer flex items-center justify-between group"
                                  >
                                      <div>
                                          <p className="font-bold text-neutral-800">{v.reg_no}</p>
                                          <p className="text-xs text-neutral-500">{v.model_no}</p>
                                      </div>
                                      <div className="opacity-0 group-hover:opacity-100 text-[#800020]"><Check className="w-5 h-5" /></div>
                                  </div>
                              ))
                          ) : (
                              employees.map(e => (
                                  <div 
                                    key={e.id} 
                                    onClick={() => handleUpdateTrip({ driver_id: e.id })}
                                    className="p-4 bg-neutral-50 hover:bg-[#800020]/5 rounded-2xl border border-transparent hover:border-[#800020]/10 transition-all cursor-pointer flex items-center justify-between group"
                                  >
                                      <div>
                                          <p className="font-bold text-neutral-800">{e.first_name} {e.last_name}</p>
                                          <p className="text-xs text-neutral-500">Conductor Verificado</p>
                                      </div>
                                      <div className="opacity-0 group-hover:opacity-100 text-[#800020]"><Check className="w-5 h-5" /></div>
                                  </div>
                              ))
                          )}
                      </div>
                  </motion.div>
              </div>
          )}
      </AnimatePresence>

      {/* Modal de Detalles (Same as before) */}
      <AnimatePresence>
        {isDetailModalOpen && selectedTrip && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsDetailModalOpen(false)} className="absolute inset-0 bg-black/40 backdrop-blur-md" />
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className="relative w-full max-w-4xl bg-white rounded-[3rem] shadow-2xl overflow-hidden flex flex-col md:flex-row"
                >
                    {/* ... (Existing Detail Modal Content) ... */}
                    <div className="flex-1 p-10 bg-neutral-50">
                        <div className="flex justify-between items-start mb-10">
                            <div className="p-4 bg-[#800020] rounded-3xl text-white shadow-xl shadow-[#800020]/20"><Bus className="w-8 h-8" /></div>
                            <span className="px-4 py-2 bg-green-50 text-green-700 rounded-full text-[10px] font-black uppercase tracking-widest border border-green-100">Unidad Operativa</span>
                        </div>
                        <h3 className="text-3xl font-black text-neutral-800 mb-2">Detalles Rurales</h3>
                        <p className="text-neutral-500 font-medium mb-8">{selectedTrip.locations_trips_pick_location_idTolocations?.name} ➔ {selectedTrip.locations_trips_drop_location_idTolocations?.name}</p>
                        
                        <div className="grid grid-cols-2 gap-6">
                            <div className="p-6 bg-white rounded-3xl border border-neutral-100 shadow-sm">
                                <p className="text-[10px] font-black text-neutral-400 uppercase mb-2">Vehículo Asignado</p>
                                <p className="font-bold text-neutral-800">{selectedTrip.vehicles?.reg_no}</p>
                                <p className="text-xs text-neutral-500">{selectedTrip.vehicles?.model_no}</p>
                            </div>
                            <div className="p-6 bg-white rounded-3xl border border-neutral-100 shadow-sm">
                                <p className="text-[10px] font-black text-neutral-400 uppercase mb-2">Encargado de Ruta</p>
                                <p className="font-bold text-neutral-800">{selectedTrip.employees ? `${selectedTrip.employees.first_name} ${selectedTrip.employees.last_name}` : selectedTrip.vehicles?.woner}</p>
                            </div>
                        </div>
                    </div>
                    <div className="w-full md:w-[380px] p-10 flex flex-col justify-between">
                         <div className="flex justify-end"><button onClick={() => setIsDetailModalOpen(false)}><X className="w-6 h-6 text-neutral-300" /></button></div>
                         <div className="text-center">
                                <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest mb-2">Precio del Pasaje</p>
                                <h4 className="text-6xl font-black text-neutral-800">${selectedTrip.adult_fair}</h4>
                         </div>
                         <button className="w-full py-5 bg-[#800020] text-white font-black rounded-2xl shadow-xl active:scale-95 transition-all">Venta Rápida</button>
                    </div>
                </motion.div>
            </div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #F3F4F6; border-radius: 10px; }
      `}</style>
    </motion.div>
  );
}
