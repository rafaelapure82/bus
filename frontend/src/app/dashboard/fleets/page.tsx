"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bus, Settings, Search, RefreshCw, Plus, X, Check, Edit, Trash2, Layout, UserCheck } from 'lucide-react';

interface Fleet {
  id: number;
  type: string;
  layout: string;
  total_seat: number;
  status: string;
}

export default function FleetsPage() {
  const [fleets, setFleets] = useState<Fleet[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFleet, setSelectedFleet] = useState<Fleet | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    type: '',
    layout: '2-2',
    total_seat: '40',
    seat_number: '',
    status: 'active',
    luggage_service: '1',
    last_seat: '0'
  });

  const fetchFleets = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/fleets`);
      const data = await response.json();
      setFleets(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching fleets:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFleets();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const url = selectedFleet 
        ? `${process.env.NEXT_PUBLIC_API_URL}/fleets/${selectedFleet.id}`
        : `${process.env.NEXT_PUBLIC_API_URL}/fleets`;
      
      const response = await fetch(url, {
        method: selectedFleet ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          total_seat: Number(formData.total_seat)
        }),
      });

      if (response.ok) {
        setIsModalOpen(false);
        setSelectedFleet(null);
        fetchFleets();
      }
    } catch (error) {
      console.error('Error saving fleet:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const openEditModal = (fleet: Fleet) => {
    setSelectedFleet(fleet);
    setFormData({
      type: fleet.type,
      layout: fleet.layout,
      total_seat: fleet.total_seat.toString(),
      seat_number: '',
      status: fleet.status,
      luggage_service: '1',
      last_seat: '0'
    });
    setIsModalOpen(true);
  };

  const filteredFleets = fleets.filter(fleet => 
    fleet.type.toLowerCase().includes(searchTerm.toLowerCase())
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
          <h2 className="text-3xl font-bold bg-gradient-to-r from-[#800020] to-[#b3002d] bg-clip-text text-transparent">Gestión de Flotas</h2>
          <p className="text-neutral-500 mt-1">Configura los tipos de autobuses, asientos y comodidades.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={fetchFleets}
            className="p-2.5 bg-white border border-neutral-200 rounded-xl shadow-sm hover:bg-neutral-50 transition-all active:scale-95"
          >
            <RefreshCw className={`w-5 h-5 text-neutral-600 ${loading ? 'animate-spin' : ''}`} />
          </button>
          <button 
            onClick={() => { setSelectedFleet(null); setIsModalOpen(true); }}
            className="flex items-center gap-2 px-6 py-2.5 bg-[#800020] hover:bg-[#600018] text-white font-medium rounded-xl shadow-lg shadow-[#800020]/20 transition-all active:scale-95"
          >
            <Plus className="w-5 h-5" />
            <span>Nueva Flota</span>
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode='popLayout'>
          {loading ? (
            Array.from({ length: 3 }).map((_, idx) => (
              <div key={`skeleton-${idx}`} className="h-48 bg-neutral-50 dark:bg-neutral-900 rounded-[2.5rem] animate-pulse" />
            ))
          ) : filteredFleets.length > 0 ? (
            filteredFleets.map((fleet, idx) => (
              <motion.div 
                key={fleet.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.05 }}
                className="bg-white dark:bg-neutral-900 p-8 rounded-[2.5rem] border border-neutral-100 dark:border-neutral-800 shadow-sm hover:shadow-2xl hover:shadow-[#800020]/5 transition-all group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-8">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    fleet.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {fleet.status}
                  </span>
                </div>

                <div className="flex items-center gap-4 mb-8">
                  <div className="w-14 h-14 bg-[#800020]/10 rounded-2xl flex items-center justify-center text-[#800020]">
                    <Bus className="w-7 h-7" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-neutral-800 dark:text-neutral-100">{fleet.type}</h4>
                    <p className="text-sm text-neutral-400">Layout: {fleet.layout}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-neutral-50 dark:border-neutral-800">
                  <div className="flex items-center gap-2">
                    <UserCheck className="w-4 h-4 text-[#800020]" />
                    <span className="text-sm font-bold text-neutral-600">{fleet.total_seat} Asientos</span>
                  </div>
                  <div className="flex justify-end gap-2">
                    <button onClick={() => openEditModal(fleet)} className="p-2 hover:bg-neutral-50 rounded-xl text-neutral-400 hover:text-[#800020] transition-colors">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="p-2 hover:bg-red-50 rounded-xl text-neutral-400 hover:text-red-600 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full py-20 text-center">
              <Bus className="w-20 h-20 text-neutral-100 mx-auto mb-4" />
              <p className="text-neutral-400 font-medium">No se encontraron flotas configuradas.</p>
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)} className="absolute inset-0 bg-black/20 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="relative w-full max-w-2xl bg-white dark:bg-neutral-900 rounded-[3rem] shadow-2xl overflow-hidden border border-neutral-100 dark:border-neutral-800">
              <form onSubmit={handleSubmit} className="p-10 space-y-8">
                <div className="flex justify-between items-center">
                  <h3 className="text-2xl font-bold text-neutral-800 dark:text-neutral-100">{selectedFleet ? 'Editar Flota' : 'Nueva Flota de Autobuses'}</h3>
                  <button onClick={() => setIsModalOpen(false)} type="button" className="p-2 hover:bg-neutral-100 rounded-full transition-colors"><X className="w-6 h-6 text-neutral-400" /></button>
                </div>

                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div>
                      <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2 ml-1">Tipo de Vehículo</label>
                      <input type="text" name="type" required placeholder="Ej: Ejecutivo de Lujo" value={formData.type} onChange={handleInputChange} className="form-input-premium w-full" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2 ml-1">Capacidad (Asientos)</label>
                      <input type="number" name="total_seat" required value={formData.total_seat} onChange={handleInputChange} className="form-input-premium w-full" />
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2 ml-1">Layout de Asientos</label>
                      <select name="layout" value={formData.layout} onChange={handleInputChange} className="form-input-premium w-full">
                        <option value="2-2">2-2 (Estándar)</option>
                        <option value="1-2">1-2 (VIP)</option>
                        <option value="2-1">2-1 (Cama)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2 ml-1">Estado</label>
                      <select name="status" value={formData.status} onChange={handleInputChange} className="form-input-premium w-full">
                        <option value="active">Activo</option>
                        <option value="inactive">Inactivo</option>
                        <option value="maintenance">En Mantenimiento</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-4 bg-neutral-100 hover:bg-neutral-200 text-neutral-600 font-bold rounded-2xl transition-all">Cancelar</button>
                  <button type="submit" disabled={isSubmitting} className="flex-1 py-4 bg-[#800020] hover:bg-[#600018] text-white font-bold rounded-2xl shadow-xl shadow-[#800020]/20 transition-all flex items-center justify-center gap-2">
                    {isSubmitting ? <RefreshCw className="w-5 h-5 animate-spin" /> : <><Check className="w-5 h-5" /><span>{selectedFleet ? 'Actualizar Flota' : 'Guardar Flota'}</span></>}
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
