"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Search, RefreshCw, Plus, X, Check, Edit, Trash2, Home, Navigation } from 'lucide-react';

interface Location {
  id: number;
  name: string;
}

export default function LocationsPage() {
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [newName, setNewName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchLocations = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/locations`);
      const data = await response.json();
      setLocations(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching locations:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLocations();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    setIsSubmitting(true);
    try {
      const url = selectedLocation 
        ? `${process.env.NEXT_PUBLIC_API_URL}/locations/${selectedLocation.id}`
        : `${process.env.NEXT_PUBLIC_API_URL}/locations`;
      
      const response = await fetch(url, {
        method: selectedLocation ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newName }),
      });

      if (response.ok) {
        setIsModalOpen(false);
        setNewName('');
        setSelectedLocation(null);
        fetchLocations();
      }
    } catch (error) {
      console.error('Error saving location:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const openEditModal = (loc: Location) => {
    setSelectedLocation(loc);
    setNewName(loc.name);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('¿Estás seguro de eliminar esta ubicación?')) return;
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/locations/${id}`, { method: 'DELETE' });
      fetchLocations();
    } catch (error) {
      console.error('Error deleting location:', error);
    }
  };

  const filteredLocations = locations.filter(loc => 
    loc.name.toLowerCase().includes(searchTerm.toLowerCase())
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
          <h2 className="text-3xl font-bold bg-gradient-to-r from-[#800020] to-[#b3002d] bg-clip-text text-transparent">Ubicaciones y Terminales</h2>
          <p className="text-neutral-500 mt-1">Gestiona las paradas y terminales de la red de transporte.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={fetchLocations}
            className="p-2.5 bg-white border border-neutral-200 rounded-xl shadow-sm hover:bg-neutral-50 transition-all active:scale-95"
          >
            <RefreshCw className={`w-5 h-5 text-neutral-600 ${loading ? 'animate-spin' : ''}`} />
          </button>
          <button 
            onClick={() => { setSelectedLocation(null); setNewName(''); setIsModalOpen(true); }}
            className="flex items-center gap-2 px-6 py-2.5 bg-[#800020] hover:bg-[#600018] text-white font-medium rounded-xl shadow-lg shadow-[#800020]/20 transition-all active:scale-95"
          >
            <Plus className="w-5 h-5" />
            <span>Nueva Ubicación</span>
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className="bg-white dark:bg-neutral-900 rounded-[2.5rem] border border-neutral-100 dark:border-neutral-800 shadow-sm p-6">
        <div className="relative mb-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
          <input 
            type="text" 
            placeholder="Buscar ubicación o terminal..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-neutral-100 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 focus:outline-none focus:ring-2 focus:ring-[#800020]/10 text-sm transition-all"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence mode='popLayout'>
            {loading ? (
              Array.from({ length: 6 }).map((_, idx) => (
                <div key={`skeleton-${idx}`} className="h-24 bg-neutral-50 dark:bg-neutral-950 rounded-2xl animate-pulse" />
              ))
            ) : filteredLocations.length > 0 ? (
              filteredLocations.map((loc, idx) => (
                <motion.div 
                  key={loc.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: idx * 0.05 }}
                  className="p-5 bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 rounded-3xl hover:border-[#800020]/20 hover:shadow-xl hover:shadow-[#800020]/5 transition-all group flex items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#800020]/5 rounded-2xl flex items-center justify-center text-[#800020] group-hover:bg-[#800020]/10 transition-colors">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-neutral-800 dark:text-neutral-100">{loc.name}</h4>
                      <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest">Punto de Control</span>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <button 
                      onClick={() => openEditModal(loc)}
                      className="p-2 hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-xl text-neutral-400 hover:text-[#800020] transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleDelete(loc.id)}
                      className="p-2 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-xl text-neutral-400 hover:text-red-600 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full py-16 text-center">
                <Navigation className="w-16 h-16 text-neutral-100 mx-auto mb-4" />
                <p className="text-neutral-400 font-medium">No se encontraron ubicaciones registradas.</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)} className="absolute inset-0 bg-black/20 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} className="relative w-full max-w-md bg-white dark:bg-neutral-900 rounded-[2.5rem] shadow-2xl overflow-hidden border border-neutral-100 dark:border-neutral-800">
              <form onSubmit={handleSubmit} className="p-8">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold text-neutral-800 dark:text-neutral-100">{selectedLocation ? 'Editar Ubicación' : 'Nueva Ubicación'}</h3>
                  <button onClick={() => setIsModalOpen(false)} type="button" className="p-2 hover:bg-neutral-100 rounded-full transition-colors"><X className="w-5 h-5 text-neutral-400" /></button>
                </div>
                <div className="space-y-6">
                  <div>
                    <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2 ml-1">Nombre de la Parada / Terminal</label>
                    <input type="text" required placeholder="Ej: Terminal Central de Caracas" value={newName} onChange={(e) => setNewName(e.target.value)} className="w-full px-4 py-3.5 rounded-2xl border border-neutral-100 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 focus:outline-none focus:ring-2 focus:ring-[#800020]/10 text-sm transition-all" />
                  </div>
                  <div className="flex gap-3">
                    <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-3.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-600 font-bold rounded-2xl transition-all">Cancelar</button>
                    <button type="submit" disabled={isSubmitting} className="flex-1 py-3.5 bg-[#800020] hover:bg-[#600018] text-white font-bold rounded-2xl shadow-lg shadow-[#800020]/20 transition-all flex items-center justify-center gap-2">
                      {isSubmitting ? <RefreshCw className="w-5 h-5 animate-spin" /> : <><Check className="w-5 h-5" /><span>{selectedLocation ? 'Actualizar' : 'Guardar'}</span></>}
                    </button>
                  </div>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
