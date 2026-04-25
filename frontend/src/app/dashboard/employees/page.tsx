"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, Phone, MapPin, Edit, Trash2, Plus, Search, RefreshCw, Briefcase, Globe, X, Check, Upload, FileText, Camera } from 'lucide-react';

interface Employee {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  profile_picture: string;
  nid: string;
  vehicle_type: string;
  country: { name: string };
  employeetypes: { type: string };
}

export default function EmployeesPage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    blood: 'O+',
    employeetype_id: '1',
    country_id: '1',
    nid: '',
    vehicle_type: '',
    address: '',
    city: '',
    zip: ''
  });

  const [files, setFiles] = useState<{ [key: string]: File | null }>({
    profile_picture: null,
    nid_picture: null,
    license_picture: null,
    circulation_picture: null,
    vehicle_papers_picture: null
  });

  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/employees`);
      const data = await response.json();
      if (Array.isArray(data)) {
        setEmployees(data);
      } else {
        console.error('Expected array from /employees, got:', data);
        setEmployees([]);
      }
    } catch (error) {
      console.error('Error fetching employees:', error);
      setEmployees([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
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
    Object.keys(formData).forEach(key => {
      data.append(key, formData[key as keyof typeof formData]);
    });
    Object.keys(files).forEach(key => {
      if (files[key]) {
        data.append(key, files[key] as File);
      }
    });

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/employees`, {
        method: 'POST',
        body: data,
      });

      if (response.ok) {
        setIsModalOpen(false);
        setFormData({
          first_name: '', last_name: '', email: '', phone: '', blood: 'O+',
          employeetype_id: '1', country_id: '1', nid: '', vehicle_type: '',
          address: '', city: '', zip: ''
        });
        setFiles({
          profile_picture: null, nid_picture: null, license_picture: null,
          circulation_picture: null, vehicle_papers_picture: null
        });
        fetchEmployees();
      }
    } catch (error) {
      console.error('Error creating employee:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredEmployees = employees.filter(emp => 
    `${emp.first_name} ${emp.last_name}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.email.toLowerCase().includes(searchTerm.toLowerCase())
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
          <h2 className="text-3xl font-bold bg-gradient-to-r from-[#800020] to-[#b3002d] bg-clip-text text-transparent">Directorio de Personal</h2>
          <p className="text-neutral-500 mt-1">Gestiona los expedientes y documentación de los empleados.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={fetchEmployees}
            className="p-2.5 bg-white border border-neutral-200 rounded-xl shadow-sm hover:bg-neutral-50 transition-all active:scale-95"
          >
            <RefreshCw className={`w-5 h-5 text-neutral-600 ${loading ? 'animate-spin' : ''}`} />
          </button>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-6 py-2.5 bg-[#800020] hover:bg-[#600018] text-white font-medium rounded-xl shadow-lg shadow-[#800020]/20 transition-all active:scale-95"
          >
            <Plus className="w-5 h-5" />
            <span>Nuevo Empleado</span>
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white dark:bg-neutral-900 p-4 rounded-2xl border border-neutral-100 dark:border-neutral-800 shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <input 
            type="text" 
            placeholder="Buscar por nombre, apellido o email..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 focus:outline-none focus:ring-2 focus:ring-[#800020]/20 text-sm"
          />
        </div>
      </div>

      {/* Grid View */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode='popLayout'>
          {loading ? (
            Array.from({ length: 6 }).map((_, idx) => (
              <div key={`skeleton-${idx}`} className="bg-white dark:bg-neutral-900 p-6 rounded-3xl border border-neutral-100 dark:border-neutral-800 shadow-sm animate-pulse">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-neutral-100 dark:bg-neutral-800 rounded-2xl"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-neutral-100 dark:bg-neutral-800 rounded w-32"></div>
                    <div className="h-3 bg-neutral-100 dark:bg-neutral-800 rounded w-24"></div>
                  </div>
                </div>
              </div>
            ))
          ) : filteredEmployees.length > 0 ? (
            filteredEmployees.map((emp, idx) => (
              <motion.div 
                key={emp.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.05 }}
                className="bg-white dark:bg-neutral-900 p-6 rounded-3xl border border-neutral-100 dark:border-neutral-800 shadow-sm hover:shadow-xl hover:shadow-[#800020]/5 transition-all group relative overflow-hidden"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-900 rounded-2xl overflow-hidden flex items-center justify-center border-2 border-white dark:border-neutral-800 shadow-sm">
                      {emp.profile_picture ? (
                        <img src={`http://localhost:5000/${emp.profile_picture}`} alt={emp.first_name} className="w-full h-full object-cover" />
                      ) : (
                        <User className="w-8 h-8 text-neutral-400" />
                      )}
                    </div>
                    <div>
                      <h4 className="font-bold text-neutral-800 dark:text-neutral-100 leading-tight">{emp.first_name} {emp.last_name}</h4>
                      <div className="flex items-center gap-1.5 mt-1">
                        <Briefcase className="w-3 h-3 text-[#800020]" />
                        <span className="text-xs font-medium text-neutral-500">{emp.employeetypes?.type || 'General'}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 pt-4 border-t border-neutral-50 dark:border-neutral-800">
                  <div className="flex items-center gap-3 text-neutral-500">
                    <FileText className="w-4 h-4 text-[#800020]/50" />
                    <span className="text-xs font-medium truncate">Cédula: {emp.nid || 'N/A'}</span>
                  </div>
                  <div className="flex items-center gap-3 text-neutral-500">
                    <Mail className="w-4 h-4 text-[#800020]/50" />
                    <span className="text-xs font-medium truncate">{emp.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-neutral-500">
                    <Globe className="w-4 h-4 text-[#800020]/50" />
                    <span className="text-xs font-medium">{emp.country?.name || 'N/A'}</span>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full py-20 text-center">
              <div className="flex flex-col items-center gap-4">
                <div className="w-20 h-20 bg-neutral-50 dark:bg-neutral-800 rounded-full flex items-center justify-center">
                  <User className="w-10 h-10 text-neutral-200" />
                </div>
                <p className="text-neutral-400 font-medium">No se encontraron empleados registrados.</p>
              </div>
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* Modal Nuevo Empleado (Expediente Completo) */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-4xl max-h-[90vh] bg-white dark:bg-neutral-900 rounded-[3rem] shadow-2xl overflow-hidden border border-neutral-100 dark:border-neutral-800 flex flex-col"
            >
              <div className="p-8 border-b border-neutral-100 dark:border-neutral-800 flex justify-between items-center bg-white dark:bg-neutral-900 z-10">
                <div>
                  <h3 className="text-2xl font-bold text-neutral-800 dark:text-neutral-100">Expediente de Nuevo Empleado</h3>
                  <p className="text-sm text-neutral-500">Completa la información personal y carga los documentos requeridos.</p>
                </div>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-3 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-full transition-colors"
                >
                  <X className="w-6 h-6 text-neutral-400" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-8 space-y-10 custom-scrollbar">
                
                {/* Section: Información Personal */}
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-[#800020]/10 rounded-2xl flex items-center justify-center">
                      <User className="w-5 h-5 text-[#800020]" />
                    </div>
                    <h4 className="text-lg font-bold text-neutral-800 dark:text-neutral-100">Información Personal</h4>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2 ml-1">Nombres</label>
                      <input type="text" name="first_name" required placeholder="Ej: Juan" onChange={handleInputChange} className="form-input-premium w-full" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2 ml-1">Apellidos</label>
                      <input type="text" name="last_name" required placeholder="Ej: Pérez" onChange={handleInputChange} className="form-input-premium w-full" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2 ml-1">Email</label>
                      <input type="email" name="email" required placeholder="juan@empresa.com" onChange={handleInputChange} className="form-input-premium w-full" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2 ml-1">Teléfono</label>
                      <input type="text" name="phone" required placeholder="+58 412..." onChange={handleInputChange} className="form-input-premium w-full" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2 ml-1">Cédula de Identidad (NID)</label>
                      <input type="text" name="nid" required placeholder="V-12345678" onChange={handleInputChange} className="form-input-premium w-full" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2 ml-1">Tipo de Empleado</label>
                      <select name="employeetype_id" onChange={handleInputChange} className="form-input-premium w-full">
                        <option value="1">Conductor</option>
                        <option value="2">Administrativo</option>
                        <option value="3">Mecánico</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Section: Documentación (Carga de Archivos) */}
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-[#800020]/10 rounded-2xl flex items-center justify-center">
                      <Upload className="w-5 h-5 text-[#800020]" />
                    </div>
                    <h4 className="text-lg font-bold text-neutral-800 dark:text-neutral-100">Documentación y Fotos</h4>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Foto de Perfil */}
                    <div className="space-y-2">
                      <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wider ml-1">Foto de Perfil</label>
                      <div className="relative group cursor-pointer border-2 border-dashed border-neutral-200 dark:border-neutral-800 rounded-3xl p-4 hover:border-[#800020]/30 transition-all flex flex-col items-center justify-center gap-2 bg-neutral-50 dark:bg-neutral-950/50">
                        <Camera className="w-8 h-8 text-neutral-300 group-hover:text-[#800020]/50 transition-colors" />
                        <span className="text-[10px] text-neutral-500 font-medium">{files.profile_picture ? files.profile_picture.name : 'Subir Foto'}</span>
                        <input type="file" name="profile_picture" onChange={handleFileChange} className="absolute inset-0 opacity-0 cursor-pointer" />
                      </div>
                    </div>

                    {/* Foto Cédula */}
                    <div className="space-y-2">
                      <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wider ml-1">Foto Cédula (NID)</label>
                      <div className="relative group cursor-pointer border-2 border-dashed border-neutral-200 dark:border-neutral-800 rounded-3xl p-4 hover:border-[#800020]/30 transition-all flex flex-col items-center justify-center gap-2 bg-neutral-50 dark:bg-neutral-950/50">
                        <FileText className="w-8 h-8 text-neutral-300 group-hover:text-[#800020]/50 transition-colors" />
                        <span className="text-[10px] text-neutral-500 font-medium">{files.nid_picture ? files.nid_picture.name : 'Subir Cédula'}</span>
                        <input type="file" name="nid_picture" onChange={handleFileChange} className="absolute inset-0 opacity-0 cursor-pointer" />
                      </div>
                    </div>

                    {/* Licencia */}
                    <div className="space-y-2">
                      <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wider ml-1">Licencia de Conducir</label>
                      <div className="relative group cursor-pointer border-2 border-dashed border-neutral-200 dark:border-neutral-800 rounded-3xl p-4 hover:border-[#800020]/30 transition-all flex flex-col items-center justify-center gap-2 bg-neutral-50 dark:bg-neutral-950/50">
                        <Upload className="w-8 h-8 text-neutral-300 group-hover:text-[#800020]/50 transition-colors" />
                        <span className="text-[10px] text-neutral-500 font-medium">{files.license_picture ? files.license_picture.name : 'Subir Licencia'}</span>
                        <input type="file" name="license_picture" onChange={handleFileChange} className="absolute inset-0 opacity-0 cursor-pointer" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section: Vehículo Asignado (Si aplica) */}
                <div className="pt-6 border-t border-neutral-100 dark:border-neutral-800">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-[#800020]/10 rounded-2xl flex items-center justify-center">
                      <Briefcase className="w-5 h-5 text-[#800020]" />
                    </div>
                    <h4 className="text-lg font-bold text-neutral-800 dark:text-neutral-100">Información del Vehículo</h4>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div>
                        <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2 ml-1">Tipo de Vehículo</label>
                        <input type="text" name="vehicle_type" placeholder="Ej: Autobús Interurbano, Van, etc." onChange={handleInputChange} className="form-input-premium w-full" />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                       {/* Carnet Circulación */}
                      <div className="space-y-2">
                        <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider ml-1">Carnet de Circulación</label>
                        <div className="relative group cursor-pointer border-2 border-dashed border-neutral-200 dark:border-neutral-800 rounded-2xl p-3 hover:border-[#800020]/30 transition-all flex flex-col items-center justify-center gap-1 bg-neutral-50 dark:bg-neutral-950/50">
                          <Upload className="w-5 h-5 text-neutral-300 group-hover:text-[#800020]/50" />
                          <span className="text-[9px] text-neutral-500 font-medium">{files.circulation_picture ? files.circulation_picture.name : 'Subir Foto'}</span>
                          <input type="file" name="circulation_picture" onChange={handleFileChange} className="absolute inset-0 opacity-0 cursor-pointer" />
                        </div>
                      </div>
                      {/* Papeles Vehículo */}
                      <div className="space-y-2">
                        <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider ml-1">Papeles del Vehículo</label>
                        <div className="relative group cursor-pointer border-2 border-dashed border-neutral-200 dark:border-neutral-800 rounded-2xl p-3 hover:border-[#800020]/30 transition-all flex flex-col items-center justify-center gap-1 bg-neutral-50 dark:bg-neutral-950/50">
                          <Upload className="w-5 h-5 text-neutral-300 group-hover:text-[#800020]/50" />
                          <span className="text-[9px] text-neutral-500 font-medium">{files.vehicle_papers_picture ? files.vehicle_papers_picture.name : 'Subir PDF/Foto'}</span>
                          <input type="file" name="vehicle_papers_picture" onChange={handleFileChange} className="absolute inset-0 opacity-0 cursor-pointer" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </form>

              <div className="p-8 border-t border-neutral-100 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-950/50 flex justify-end gap-4">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-8 py-3 bg-white dark:bg-neutral-800 text-neutral-600 font-bold rounded-2xl border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 transition-all"
                >
                  Cancelar
                </button>
                <button 
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="px-12 py-3 bg-[#800020] hover:bg-[#600018] text-white font-bold rounded-2xl shadow-xl shadow-[#800020]/20 transition-all flex items-center justify-center gap-2 min-w-[180px]"
                >
                  {isSubmitting ? (
                    <RefreshCw className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      <Check className="w-5 h-5" />
                      <span>Guardar Expediente</span>
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .form-input-premium {
          @apply px-4 py-3 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 focus:outline-none focus:ring-2 focus:ring-[#800020]/20 text-sm transition-all;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #E5E7EB;
          border-radius: 10px;
        }
        .dark .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #262626;
        }
      `}</style>
    </motion.div>
  );
}
