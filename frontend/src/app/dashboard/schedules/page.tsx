"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Calendar, Search, RefreshCw, Plus, X, Check, Edit, Trash2, ArrowRight } from 'lucide-react';

interface Schedule {
  id: number;
  start_time: string;
  end_time: string;
  status: string;
}

export default function SchedulesPage() {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState<Schedule | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    start_time: '08:00',
    end_time: '12:00',
    status: 'active'
  });

  const fetchSchedules = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/schedules`);
      const data = await response.json();
      setSchedules(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching schedules:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSchedules();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const url = selectedSchedule 
        ? `${process.env.NEXT_PUBLIC_API_URL}/schedules/${selectedSchedule.id}`
        : `${process.env.NEXT_PUBLIC_API_URL}/schedules`;
      
      const response = await fetch(url, {
        method: selectedSchedule ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsModalOpen(false);
        setSelectedSchedule(null);
        fetchSchedules();
      }
    } catch (error) {
      console.error('Error saving schedule:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const openEditModal = (sch: Schedule) => {
    setSelectedSchedule(sch);
    setFormData({
      start_time: sch.start_time,
      end_time: sch.end_time,
      status: sch.status
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('¿Estás seguro de eliminar este horario?')) return;
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/schedules/${id}`, { method: 'DELETE' });
      fetchSchedules();
    } catch (error) {
      console.error('Error deleting schedule:', error);
    }
  };

  const filteredSchedules = schedules.filter(sch => 
    sch.start_time.includes(searchTerm) || sch.end_time.includes(searchTerm)
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
          <h2 className="text-3xl font-bold bg-gradient-to-r from-[#800020] to-[#b3002d] bg-clip-text text-transparent">Horarios de Operación</h2>
          <p className="text-neutral-500 mt-1">Define las franjas horarias para las salidas y llegadas de los viajes.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={fetchSchedules}
            className="p-2.5 bg-white border border-neutral-200 rounded-xl shadow-sm hover:bg-neutral-50 transition-all active:scale-95"
          >
            <RefreshCw className={`w-5 h-5 text-neutral-600 ${loading ? 'animate-spin' : ''}`} />
          </button>
          <button 
            onClick={() => { setSelectedSchedule(null); setIsModalOpen(true); }}
            className="flex items-center gap-2 px-6 py-2.5 bg-[#800020] hover:bg-[#600018] text-white font-medium rounded-xl shadow-lg shadow-[#800020]/20 transition-all active:scale-95"
          >
            <Plus className="w-5 h-5" />
            <span>Nuevo Horario</span>
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode='popLayout'>
          {loading ? (
            Array.from({ length: 3 }).map((_, idx) => (
              <div key={`skeleton-${idx}`} className="h-40 bg-neutral-50 dark:bg-neutral-900 rounded-[2.5rem] animate-pulse" />
            ))
          ) : filteredSchedules.length > 0 ? (
            filteredSchedules.map((sch, idx) => (
              <motion.div 
                key={sch.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ delay: idx * 0.05 }}
                className="bg-white dark:bg-neutral-900 p-6 rounded-3xl border border-neutral-100 dark:border-neutral-800 shadow-sm hover:border-[#800020]/20 transition-all group"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#800020]/5 rounded-xl flex items-center justify-center text-[#800020]">
                      <Clock className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Itinerario</span>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${sch.status === 'active' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                    {sch.status}
                  </div>
                </div>

                <div className="flex items-center justify-between px-2 mb-6">
                  <div className="text-center">
                    <p className="text-[10px] text-neutral-400 font-bold uppercase mb-1">Salida</p>
                    <p className="text-2xl font-black text-neutral-800 dark:text-neutral-100">{sch.start_time}</p>
                  </div>
                  <ArrowRight className="w-6 h-6 text-neutral-200" />
                  <div className="text-center">
                    <p className="text-[10px] text-neutral-400 font-bold uppercase mb-1">Llegada</p>
                    <p className="text-2xl font-black text-neutral-800 dark:text-neutral-100">{sch.end_time}</p>
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-4 border-t border-neutral-50 dark:border-neutral-800">
                  <button onClick={() => openEditModal(sch)} className="p-2 hover:bg-neutral-50 rounded-xl text-neutral-400 hover:text-[#800020] transition-colors">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleDelete(sch.id)} className="p-2 hover:bg-red-50 rounded-xl text-neutral-400 hover:text-red-600 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full py-20 text-center">
              <Calendar className="w-16 h-16 text-neutral-100 mx-auto mb-4" />
              <p className="text-neutral-400 font-medium">No se han definido horarios aún.</p>
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)} className="absolute inset-0 bg-black/20 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="relative w-full max-w-md bg-white dark:bg-neutral-900 rounded-[2.5rem] shadow-2xl overflow-hidden border border-neutral-100 dark:border-neutral-800">
              <form onSubmit={handleSubmit} className="p-8 space-y-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold text-neutral-800 dark:text-neutral-100">{selectedSchedule ? 'Editar Horario' : 'Nuevo Horario'}</h3>
                  <button onClick={() => setIsModalOpen(false)} type="button" className="p-2 hover:bg-neutral-100 rounded-full transition-colors"><X className="w-5 h-5 text-neutral-400" /></button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2 ml-1">Hora de Salida</label>
                    <input type="time" name="start_time" required value={formData.start_time} onChange={handleInputChange} className="form-input-premium w-full" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2 ml-1">Hora de Llegada</label>
                    <input type="time" name="end_time" required value={formData.end_time} onChange={handleInputChange} className="form-input-premium w-full" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2 ml-1">Estado</label>
                  <select name="status" value={formData.status} onChange={handleInputChange} className="form-input-premium w-full">
                    <option value="active">Activo</option>
                    <option value="inactive">Inactivo</option>
                  </select>
                </div>

                <div className="flex gap-3 pt-4">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-3.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-600 font-bold rounded-2xl transition-all">Cancelar</button>
                  <button type="submit" disabled={isSubmitting} className="flex-1 py-3.5 bg-[#800020] hover:bg-[#600018] text-white font-bold rounded-2xl shadow-lg shadow-[#800020]/20 transition-all flex items-center justify-center gap-2">
                    {isSubmitting ? <RefreshCw className="w-5 h-5 animate-spin" /> : <><Check className="w-5 h-5" /><span>{selectedSchedule ? 'Actualizar' : 'Guardar'}</span></>}
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
