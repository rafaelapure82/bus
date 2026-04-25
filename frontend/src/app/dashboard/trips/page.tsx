"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navigation, Calendar, Clock, Bus, MapPin, Search, RefreshCw, Plus, X, Check, Edit, Trash2, DollarSign } from 'lucide-react';

interface Trip {
  id: number;
  startdate: string;
  adult_fair: string;
  status: string;
  fleets: { type: string };
  schedules: { start_time: string, end_time: string };
  locations_trips_pick_location_idTolocations: { name: string };
  locations_trips_drop_location_idTolocations: { name: string };
  vehicles: { reg_no: string };
}

export default function TripsPage() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // For Selects
  const [locations, setLocations] = useState<{id: number, name: string}[]>([]);
  const [fleets, setFleets] = useState<{id: number, type: string}[]>([]);
  const [vehicles, setVehicles] = useState<{id: number, reg_no: string}[]>([]);
  const [schedules, setSchedules] = useState<{id: number, start_time: string, end_time: string}[]>([]);

  const [formData, setFormData] = useState({
    fleet_id: '',
    schedule_id: '',
    pick_location_id: '',
    drop_location_id: '',
    vehicle_id: '',
    startdate: new Date().toISOString().split('T')[0],
    adult_fair: '50',
    special_seat: '0',
    company_name: 'Bus Admin',
    status: 'active'
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const [tripsRes, locationsRes, fleetsRes, vehiclesRes, schedulesRes] = await Promise.all([
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/trips`),
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/locations`),
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/fleets`),
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/vehicles`), // Assuming this might work or I'll need a fallback
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/schedules`)
      ]);

      const tripsData = await tripsRes.json();
      setTrips(Array.isArray(tripsData) ? tripsData : []);
      
      if (locationsRes.ok) setLocations(await locationsRes.json());
      if (fleetsRes.ok) setFleets(await fleetsRes.json());
      if (schedulesRes.ok) setSchedules(await schedulesRes.json());
      
      // Fallback for vehicles if module doesn't exist
      try {
          const vData = await vehiclesRes.json();
          setVehicles(Array.isArray(vData) ? vData : []);
      } catch {
          setVehicles([]);
      }

    } catch (error) {
      console.error('Error fetching trips data:', error);
      setTrips([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const data = {
        ...formData,
        fleet_id: Number(formData.fleet_id),
        schedule_id: Number(formData.schedule_id),
        pick_location_id: Number(formData.pick_location_id),
        drop_location_id: Number(formData.drop_location_id),
        vehicle_id: Number(formData.vehicle_id),
        startdate: new Date(formData.startdate).toISOString()
    };

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/trips`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setIsModalOpen(false);
        fetchData();
      }
    } catch (error) {
      console.error('Error creating trip:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredTrips = trips.filter(trip => 
    trip.locations_trips_pick_location_idTolocations?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    trip.locations_trips_drop_location_idTolocations?.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-[#800020] to-[#b3002d] bg-clip-text text-transparent">Programación de Viajes</h2>
          <p className="text-neutral-500 mt-1">Crea y gestiona las salidas de las unidades en ruta.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={fetchData}
            className="p-2.5 bg-white border border-neutral-200 rounded-xl shadow-sm hover:bg-neutral-50 transition-all active:scale-95"
          >
            <RefreshCw className={`w-5 h-5 text-neutral-600 ${loading ? 'animate-spin' : ''}`} />
          </button>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-6 py-2.5 bg-[#800020] hover:bg-[#600018] text-white font-medium rounded-xl shadow-lg shadow-[#800020]/20 transition-all active:scale-95"
          >
            <Plus className="w-5 h-5" />
            <span>Nuevo Viaje</span>
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white dark:bg-neutral-900 p-4 rounded-2xl border border-neutral-100 dark:border-neutral-800 shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <input 
            type="text" 
            placeholder="Buscar por origen o destino..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 focus:outline-none focus:ring-2 focus:ring-[#800020]/20 text-sm"
          />
        </div>
      </div>

      {/* Grid View */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AnimatePresence mode='popLayout'>
          {loading ? (
            Array.from({ length: 4 }).map((_, idx) => (
              <div key={`skeleton-${idx}`} className="h-64 bg-neutral-50 dark:bg-neutral-950 rounded-[2.5rem] animate-pulse" />
            ))
          ) : filteredTrips.length > 0 ? (
            filteredTrips.map((trip, idx) => (
              <motion.div 
                key={trip.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.05 }}
                className="bg-white dark:bg-neutral-900 p-8 rounded-[2.5rem] border border-neutral-100 dark:border-neutral-800 shadow-sm hover:shadow-2xl hover:shadow-[#800020]/5 transition-all group"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-[#800020]/5 rounded-2xl flex items-center justify-center text-[#800020]">
                      <Navigation className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-neutral-800 dark:text-neutral-100">{trip.locations_trips_pick_location_idTolocations?.name}</h4>
                      <p className="text-xs text-neutral-400 font-medium">Origen</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-black text-[#800020]">${trip.adult_fair}</span>
                    <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest">Tarifa Base</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 mb-6 py-4 border-y border-neutral-50 dark:border-neutral-800">
                   <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Calendar className="w-3.5 h-3.5 text-neutral-400" />
                        <span className="text-sm font-bold text-neutral-700">{new Date(trip.startdate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5 text-neutral-400" />
                        <span className="text-sm font-medium text-neutral-500">{trip.schedules?.start_time} - {trip.schedules?.end_time}</span>
                      </div>
                   </div>
                   <div className="w-px h-10 bg-neutral-100 dark:bg-neutral-800" />
                   <div className="flex-1 text-right">
                      <div className="flex items-center justify-end gap-2 mb-1">
                        <Bus className="w-3.5 h-3.5 text-[#800020]" />
                        <span className="text-sm font-bold text-neutral-700">{trip.vehicles?.reg_no}</span>
                      </div>
                      <span className="text-xs text-neutral-400">{trip.fleets?.type}</span>
                   </div>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#800020]" />
                    <span className="text-sm font-bold text-neutral-800">{trip.locations_trips_drop_location_idTolocations?.name}</span>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 hover:bg-neutral-50 rounded-xl text-neutral-400 hover:text-[#800020] transition-colors"><Edit className="w-4 h-4" /></button>
                    <button className="p-2 hover:bg-red-50 rounded-xl text-neutral-400 hover:text-red-600 transition-colors"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full py-20 text-center">
              <Navigation className="w-20 h-20 text-neutral-100 mx-auto mb-4" />
              <p className="text-neutral-400 font-medium">No hay viajes programados.</p>
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* Modal Nuevo Viaje */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)} className="absolute inset-0 bg-black/20 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="relative w-full max-w-3xl bg-white dark:bg-neutral-900 rounded-[3rem] shadow-2xl overflow-hidden border border-neutral-100 dark:border-neutral-800">
              <form onSubmit={handleSubmit} className="p-10 space-y-8">
                <div className="flex justify-between items-center">
                  <h3 className="text-2xl font-bold text-neutral-800 dark:text-neutral-100">Programar Nuevo Viaje</h3>
                  <button onClick={() => setIsModalOpen(false)} type="button" className="p-2 hover:bg-neutral-100 rounded-full transition-colors"><X className="w-6 h-6 text-neutral-400" /></button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Ruta */}
                  <div className="space-y-6">
                    <div>
                      <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2 ml-1">Origen</label>
                      <select name="pick_location_id" required value={formData.pick_location_id} onChange={handleInputChange} className="form-input-premium w-full">
                        <option value="">Seleccionar Origen</option>
                        {locations.map(loc => <option key={loc.id} value={loc.id}>{loc.name}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2 ml-1">Destino</label>
                      <select name="drop_location_id" required value={formData.drop_location_id} onChange={handleInputChange} className="form-input-premium w-full">
                        <option value="">Seleccionar Destino</option>
                        {locations.map(loc => <option key={loc.id} value={loc.id}>{loc.name}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2 ml-1">Fecha de Salida</label>
                      <input type="date" name="startdate" required value={formData.startdate} onChange={handleInputChange} className="form-input-premium w-full" />
                    </div>
                  </div>

                  {/* Unidad y Horario */}
                  <div className="space-y-6">
                    <div>
                      <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2 ml-1">Horario</label>
                      <select name="schedule_id" required value={formData.schedule_id} onChange={handleInputChange} className="form-input-premium w-full">
                        <option value="">Seleccionar Horario</option>
                        {schedules.map(sch => <option key={sch.id} value={sch.id}>{sch.start_time} - {sch.end_time}</option>)}
                      </select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2 ml-1">Tipo de Flota</label>
                        <select name="fleet_id" required value={formData.fleet_id} onChange={handleInputChange} className="form-input-premium w-full">
                          <option value="">Seleccionar</option>
                          {fleets.map(f => <option key={f.id} value={f.id}>{f.type}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2 ml-1">Unidad (Placa)</label>
                        <select name="vehicle_id" required value={formData.vehicle_id} onChange={handleInputChange} className="form-input-premium w-full">
                          <option value="">Seleccionar</option>
                          {vehicles.map(v => <option key={v.id} value={v.id}>{v.reg_no}</option>)}
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2 ml-1">Tarifa Adulto ($)</label>
                      <div className="relative">
                        <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                        <input type="number" name="adult_fair" required value={formData.adult_fair} onChange={handleInputChange} className="form-input-premium w-full pl-10" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-4 bg-neutral-100 hover:bg-neutral-200 text-neutral-600 font-bold rounded-2xl transition-all">Cancelar</button>
                  <button type="submit" disabled={isSubmitting} className="flex-1 py-4 bg-[#800020] hover:bg-[#600018] text-white font-bold rounded-2xl shadow-xl shadow-[#800020]/20 transition-all flex items-center justify-center gap-2">
                    {isSubmitting ? <RefreshCw className="w-5 h-5 animate-spin" /> : <><Check className="w-5 h-5" /><span>Programar Viaje</span></>}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .form-input-premium {
          @apply px-4 py-3.5 rounded-2xl border border-neutral-100 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 focus:outline-none focus:ring-2 focus:ring-[#800020]/10 text-sm transition-all;
        }
      `}</style>
    </motion.div>
  );
}
