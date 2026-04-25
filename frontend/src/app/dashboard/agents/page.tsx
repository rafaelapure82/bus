"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, DollarSign, MapPin, Edit, Trash2, Plus, Search, RefreshCw, BadgePercent, Globe, X, Check, Upload, Camera } from 'lucide-react';

interface Agent {
  id: number;
  first_name: string;
  last_name: string;
  commission: string;
  discount: number;
  id_number: string;
  profile_picture?: string;
  country: { id: number, name: string };
  locations: { id: number, name: string };
  users: { id: number, login_email: string };
}

export default function AgentsPage() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);

  // For Selects
  const [locations, setLocations] = useState<{id: number, name: string}[]>([]);
  const [countries, setCountries] = useState<{id: number, name: string}[]>([]);
  const [users, setUsers] = useState<{id: number, login_email: string}[]>([]);

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    commission: '10',
    discount: '0',
    id_number: '',
    location_id: '',
    country_id: '',
    user_id: '',
    address: '',
    city: '',
    zip: ''
  });

  const [files, setFiles] = useState<{ profile_picture: File | null, nid_picture: File | null }>({
    profile_picture: null,
    nid_picture: null
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const [agentsRes, locationsRes, countriesRes, usersRes] = await Promise.all([
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/agents`),
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/locations`),
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/users`), // Assuming this exists or using a mock
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/countries`) // Assuming this exists
      ]);

      const agentsData = await agentsRes.json();
      setAgents(Array.isArray(agentsData) ? agentsData : []);
      
      // Fallback for related data if endpoints don't exist yet
      if (locationsRes.ok) setLocations(await locationsRes.json());
      else setLocations([{id: 1, name: 'Principal'}, {id: 2, name: 'Sucursal Norte'}]);

      setCountries([{id: 1, name: 'Venezuela'}, {id: 2, name: 'Colombia'}]);
      setUsers([{id: 1, login_email: 'admin@bus.com'}, {id: 2, login_email: 'agente1@bus.com'}]);

    } catch (error) {
      console.error('Error fetching agents data:', error);
      setAgents([]);
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFiles({ ...files, [e.target.name]: e.target.files[0] });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const data = new FormData();
    Object.keys(formData).forEach(key => data.append(key, formData[key as keyof typeof formData]));
    if (files.profile_picture) data.append('profile_picture', files.profile_picture);
    if (files.nid_picture) data.append('nid_picture', files.nid_picture);

    try {
      const url = selectedAgent 
        ? `${process.env.NEXT_PUBLIC_API_URL}/agents/${selectedAgent.id}`
        : `${process.env.NEXT_PUBLIC_API_URL}/agents`;
      
      const response = await fetch(url, {
        method: selectedAgent ? 'PUT' : 'POST',
        body: data,
      });

      if (response.ok) {
        setIsModalOpen(false);
        setSelectedAgent(null);
        resetForm();
        fetchData();
      }
    } catch (error) {
      console.error('Error saving agent:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      first_name: '', last_name: '', commission: '10', discount: '0',
      id_number: '', location_id: '1', country_id: '1', user_id: '1',
      address: '', city: '', zip: ''
    });
    setFiles({ profile_picture: null, nid_picture: null });
  };

  const openEditModal = (agent: Agent) => {
    setSelectedAgent(agent);
    setFormData({
      first_name: agent.first_name,
      last_name: agent.last_name,
      commission: agent.commission,
      discount: agent.discount.toString(),
      id_number: agent.id_number || '',
      location_id: agent.locations?.id.toString() || '1',
      country_id: agent.country?.id.toString() || '1',
      user_id: agent.users?.id.toString() || '1',
      address: '', city: '', zip: ''
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('¿Estás seguro de eliminar este agente?')) return;
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/agents/${id}`, { method: 'DELETE' });
      fetchData();
    } catch (error) {
      console.error('Error deleting agent:', error);
    }
  };

  const filteredAgents = agents.filter(agent => 
    `${agent.first_name} ${agent.last_name}`.toLowerCase().includes(searchTerm.toLowerCase())
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
          <h2 className="text-3xl font-bold bg-gradient-to-r from-[#800020] to-[#b3002d] bg-clip-text text-transparent">Gestión de Agentes</h2>
          <p className="text-neutral-500 mt-1">Controla las comisiones y puntos de venta externos.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={fetchData}
            className="p-2.5 bg-white border border-neutral-200 rounded-xl shadow-sm hover:bg-neutral-50 transition-all active:scale-95"
          >
            <RefreshCw className={`w-5 h-5 text-neutral-600 ${loading ? 'animate-spin' : ''}`} />
          </button>
          <button 
            onClick={() => { resetForm(); setSelectedAgent(null); setIsModalOpen(true); }}
            className="flex items-center gap-2 px-6 py-2.5 bg-[#800020] hover:bg-[#600018] text-white font-medium rounded-xl shadow-lg shadow-[#800020]/20 transition-all active:scale-95"
          >
            <Plus className="w-5 h-5" />
            <span>Nuevo Agente</span>
          </button>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white dark:bg-neutral-900 rounded-3xl border border-neutral-100 dark:border-neutral-800 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-neutral-100 dark:border-neutral-800 flex items-center gap-4">
           <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input 
              type="text" 
              placeholder="Buscar agente por nombre..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 focus:outline-none focus:ring-2 focus:ring-[#800020]/20 text-sm"
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-neutral-50 dark:bg-neutral-950/50 text-xs font-bold text-neutral-500 uppercase tracking-wider">
                <th className="py-4 px-6">Agente</th>
                <th className="py-4 px-6">Ubicación</th>
                <th className="py-4 px-6 text-center">Comisión</th>
                <th className="py-4 px-6 text-center">Descuento</th>
                <th className="py-4 px-6 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-50 dark:divide-neutral-800">
              <AnimatePresence mode='popLayout'>
                {loading ? (
                  Array.from({ length: 4 }).map((_, idx) => (
                    <tr key={`skeleton-${idx}`} className="animate-pulse">
                      <td className="py-4 px-6"><div className="h-4 bg-neutral-100 dark:bg-neutral-800 rounded w-40"></div></td>
                      <td className="py-4 px-6"><div className="h-4 bg-neutral-100 dark:bg-neutral-800 rounded w-24"></div></td>
                      <td className="py-4 px-6"><div className="h-4 bg-neutral-100 dark:bg-neutral-800 rounded w-12 mx-auto"></div></td>
                      <td className="py-4 px-6"><div className="h-4 bg-neutral-100 dark:bg-neutral-800 rounded w-12 mx-auto"></div></td>
                      <td className="py-4 px-6"><div className="h-4 bg-neutral-100 dark:bg-neutral-800 rounded w-16 ml-auto"></div></td>
                    </tr>
                  ))
                ) : filteredAgents.length > 0 ? (
                  filteredAgents.map((agent, idx) => (
                    <motion.tr 
                      key={agent.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      transition={{ delay: idx * 0.05 }}
                      className="hover:bg-neutral-50/50 dark:hover:bg-neutral-800/20 transition-colors group"
                    >
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-900 rounded-full flex items-center justify-center overflow-hidden border border-white shadow-sm">
                            {agent.profile_picture ? (
                                <img src={`http://localhost:5000/${agent.profile_picture}`} className="w-full h-full object-cover" />
                            ) : (
                                <span className="text-[#800020] font-bold">{agent.first_name.charAt(0)}</span>
                            )}
                          </div>
                          <div>
                            <span className="font-semibold text-neutral-800 dark:text-neutral-200 block">{agent.first_name} {agent.last_name}</span>
                            <span className="text-[10px] text-neutral-400 flex items-center gap-1 uppercase tracking-tighter">
                              <Globe className="w-2.5 h-2.5" />
                              {agent.country?.name}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400">
                          <MapPin className="w-3.5 h-3.5 text-[#800020]" />
                          <span className="text-sm font-medium">{agent.locations?.name || 'Varios'}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <div className="inline-flex items-center gap-1 px-2.5 py-1 bg-green-50 text-green-700 dark:bg-green-500/10 dark:text-green-400 rounded-lg border border-green-100 dark:border-green-500/20">
                          <BadgePercent className="w-3.5 h-3.5" />
                          <span className="text-sm font-bold">{agent.commission}%</span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <span className="text-sm font-medium text-neutral-500">{agent.discount}%</span>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <div className="flex justify-end gap-2">
                          <button 
                            onClick={() => openEditModal(agent)}
                            className="p-2 bg-neutral-50 hover:bg-neutral-100 rounded-lg text-neutral-500 hover:text-[#800020] transition-colors shadow-sm"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleDelete(agent.id)}
                            className="p-2 bg-neutral-50 hover:bg-red-50 rounded-lg text-neutral-500 hover:text-red-600 transition-colors shadow-sm"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="py-16 text-center">
                      <div className="flex flex-col items-center gap-4">
                        <DollarSign className="w-12 h-12 text-neutral-100" />
                        <p className="text-neutral-400 font-medium">No hay agentes comerciales activos.</p>
                      </div>
                    </td>
                  </tr>
                )}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Formulario */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/20 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl bg-white dark:bg-neutral-900 rounded-[2.5rem] shadow-2xl overflow-hidden border border-neutral-100 dark:border-neutral-800"
            >
              <form onSubmit={handleSubmit} className="p-8">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold text-neutral-800 dark:text-neutral-100">
                    {selectedAgent ? 'Editar Agente' : 'Nuevo Agente Comercial'}
                  </h3>
                  <button onClick={() => setIsModalOpen(false)} type="button" className="p-2 hover:bg-neutral-100 rounded-full transition-colors">
                    <X className="w-5 h-5 text-neutral-400" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2 ml-1">Nombres</label>
                    <input type="text" name="first_name" required value={formData.first_name} onChange={handleInputChange} className="form-input-premium w-full" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2 ml-1">Apellidos</label>
                    <input type="text" name="last_name" required value={formData.last_name} onChange={handleInputChange} className="form-input-premium w-full" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2 ml-1">Comisión (%)</label>
                    <input type="number" name="commission" required value={formData.commission} onChange={handleInputChange} className="form-input-premium w-full" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2 ml-1">Descuento Máx (%)</label>
                    <input type="number" name="discount" required value={formData.discount} onChange={handleInputChange} className="form-input-premium w-full" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2 ml-1">Cédula / RIF</label>
                    <input type="text" name="id_number" required value={formData.id_number} onChange={handleInputChange} className="form-input-premium w-full" />
                  </div>
                   <div>
                    <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2 ml-1">Ubicación</label>
                    <select name="location_id" value={formData.location_id} onChange={handleInputChange} className="form-input-premium w-full">
                      {locations.map(loc => <option key={loc.id} value={loc.id}>{loc.name}</option>)}
                    </select>
                  </div>
                </div>

                <div className="mt-8 flex gap-3">
                    <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-3 bg-neutral-100 hover:bg-neutral-200 text-neutral-600 font-bold rounded-2xl transition-all">Cancelar</button>
                    <button type="submit" disabled={isSubmitting} className="flex-1 py-3 bg-[#800020] hover:bg-[#600018] text-white font-bold rounded-2xl shadow-lg shadow-[#800020]/20 transition-all flex items-center justify-center gap-2">
                      {isSubmitting ? <RefreshCw className="w-5 h-5 animate-spin" /> : <><Check className="w-5 h-5" /><span>{selectedAgent ? 'Actualizar' : 'Guardar Agente'}</span></>}
                    </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .form-input-premium {
          @apply px-4 py-3 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 focus:outline-none focus:ring-2 focus:ring-[#800020]/20 text-sm transition-all;
        }
      `}</style>
    </motion.div>
  );
}
