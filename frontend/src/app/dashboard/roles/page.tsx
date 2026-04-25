"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Edit, Trash2, Plus, Users, Search, RefreshCw, X, Check } from 'lucide-react';

interface Role {
  id: number;
  name: string;
  status: string;
  _count?: {
    users: number;
  };
}

export default function RolesPage() {
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [newRoleName, setNewRoleName] = useState('');
  const [newRoleStatus, setNewRoleStatus] = useState('active');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchRoles = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/roles`);
      const data = await response.json();
      setRoles(data);
    } catch (error) {
      console.error('Error fetching roles:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  const handleCreateRole = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRoleName.trim()) return;

    setIsSubmitting(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/roles`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newRoleName, status: newRoleStatus }),
      });

      if (response.ok) {
        setNewRoleName('');
        setIsModalOpen(false);
        fetchRoles();
      }
    } catch (error) {
      console.error('Error creating role:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditRole = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRole || !newRoleName.trim()) return;

    setIsSubmitting(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/roles/${selectedRole.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newRoleName, status: newRoleStatus }),
      });

      if (response.ok) {
        setNewRoleName('');
        setIsEditModalOpen(false);
        setSelectedRole(null);
        fetchRoles();
      }
    } catch (error) {
      console.error('Error updating role:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const openEditModal = (role: Role) => {
    setSelectedRole(role);
    setNewRoleName(role.name);
    setNewRoleStatus(role.status === '1' ? 'active' : role.status);
    setIsEditModalOpen(true);
  };

  const handleDeleteRole = async (id: number) => {
    if (!confirm('¿Estás seguro de eliminar este rol?')) return;

    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/roles/${id}`, {
        method: 'DELETE',
      });
      fetchRoles();
    } catch (error) {
      console.error('Error deleting role:', error);
    }
  };

  const filteredRoles = roles.filter(role => 
    role.name.toLowerCase().includes(searchTerm.toLowerCase())
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
          <h2 className="text-3xl font-bold bg-gradient-to-r from-[#800020] to-[#b3002d] bg-clip-text text-transparent">Gestión de Roles</h2>
          <p className="text-neutral-500 mt-1">Administra los permisos y niveles de acceso del sistema.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={fetchRoles}
            className="p-2.5 bg-white border border-neutral-200 rounded-xl shadow-sm hover:bg-neutral-50 transition-all active:scale-95"
          >
            <RefreshCw className={`w-5 h-5 text-neutral-600 ${loading ? 'animate-spin' : ''}`} />
          </button>
          <button 
            onClick={() => {
              setNewRoleName('');
              setNewRoleStatus('active');
              setIsModalOpen(true);
            }}
            className="flex items-center gap-2 px-6 py-2.5 bg-[#800020] hover:bg-[#600018] text-white font-medium rounded-xl shadow-lg shadow-[#800020]/20 transition-all active:scale-95"
          >
            <Plus className="w-5 h-5" />
            <span>Nuevo Rol</span>
          </button>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="bg-white dark:bg-neutral-900 p-4 rounded-2xl border border-neutral-100 dark:border-neutral-800 shadow-sm flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <input 
            type="text" 
            placeholder="Buscar por nombre de rol..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 focus:outline-none focus:ring-2 focus:ring-[#800020]/20 text-sm"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-neutral-900 rounded-3xl border border-neutral-100 dark:border-neutral-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-neutral-50 dark:bg-neutral-950/50 border-b border-neutral-100 dark:border-neutral-800 text-xs font-bold text-neutral-500 uppercase tracking-wider">
                <th className="py-4 px-6">Rol</th>
                <th className="py-4 px-6 text-center">Usuarios</th>
                <th className="py-4 px-6 text-center">Estado</th>
                <th className="py-4 px-6 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-50 dark:divide-neutral-800">
              <AnimatePresence mode='popLayout'>
                {loading ? (
                  Array.from({ length: 4 }).map((_, idx) => (
                    <tr key={`skeleton-${idx}`} className="animate-pulse">
                      <td className="py-4 px-6"><div className="h-4 bg-neutral-100 dark:bg-neutral-800 rounded w-32"></div></td>
                      <td className="py-4 px-6"><div className="h-4 bg-neutral-100 dark:bg-neutral-800 rounded w-8 mx-auto"></div></td>
                      <td className="py-4 px-6"><div className="h-4 bg-neutral-100 dark:bg-neutral-800 rounded w-16 mx-auto"></div></td>
                      <td className="py-4 px-6"><div className="h-4 bg-neutral-100 dark:bg-neutral-800 rounded w-20 ml-auto"></div></td>
                    </tr>
                  ))
                ) : filteredRoles.length > 0 ? (
                  filteredRoles.map((role, idx) => (
                    <motion.tr 
                      key={role.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      transition={{ delay: idx * 0.05 }}
                      className="hover:bg-neutral-50/50 dark:hover:bg-neutral-800/20 transition-colors group"
                    >
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-[#800020]/10 rounded-lg group-hover:bg-[#800020]/20 transition-colors">
                            <Shield className="w-4 h-4 text-[#800020]" />
                          </div>
                          <span className="font-semibold text-neutral-800 dark:text-neutral-200">{role.name}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <div className="flex items-center justify-center gap-1.5 text-neutral-600 dark:text-neutral-400">
                          <Users className="w-4 h-4" />
                          <span className="text-sm font-medium">{role._count?.users || 0}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <span className={`inline-flex px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          role.status === 'active' || role.status === '1'
                            ? 'bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400'
                            : 'bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400'
                        }`}>
                          {role.status === 'active' || role.status === '1' ? 'Activo' : 'Inactivo'}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <div className="flex justify-end gap-2 transition-opacity">
                          <button 
                            onClick={() => openEditModal(role)}
                            className="p-2 bg-neutral-50 hover:bg-neutral-100 dark:bg-neutral-800/50 dark:hover:bg-neutral-800 rounded-lg text-neutral-500 hover:text-[#800020] transition-colors shadow-sm"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleDeleteRole(role.id)}
                            className="p-2 bg-neutral-50 hover:bg-red-50 dark:bg-neutral-800/50 dark:hover:bg-red-500/10 rounded-lg text-neutral-500 hover:text-red-600 transition-colors shadow-sm"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="py-12 text-center">
                      <div className="flex flex-col items-center gap-2">
                        <Shield className="w-12 h-12 text-neutral-200" />
                        <p className="text-neutral-400 font-medium">No se encontraron roles.</p>
                      </div>
                    </td>
                  </tr>
                )}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Nueva Rol / Editar Rol */}
      <AnimatePresence>
        {(isModalOpen || isEditModalOpen) && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setIsModalOpen(false);
                setIsEditModalOpen(false);
              }}
              className="absolute inset-0 bg-black/20 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-md bg-white dark:bg-neutral-900 rounded-[2.5rem] shadow-2xl overflow-hidden border border-neutral-100 dark:border-neutral-800"
            >
              <div className="p-8">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold text-neutral-800 dark:text-neutral-100">
                    {isEditModalOpen ? 'Editar Rol' : 'Nuevo Rol'}
                  </h3>
                  <button 
                    onClick={() => {
                      setIsModalOpen(false);
                      setIsEditModalOpen(false);
                    }}
                    className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-full transition-colors"
                  >
                    <X className="w-5 h-5 text-neutral-400" />
                  </button>
                </div>

                <form onSubmit={isEditModalOpen ? handleEditRole : handleCreateRole} className="space-y-6">
                  <div>
                    <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2 ml-1">Nombre del Rol</label>
                    <input 
                      type="text" 
                      required
                      placeholder="Ej: Supervisor de Ventas" 
                      value={newRoleName}
                      onChange={(e) => setNewRoleName(e.target.value)}
                      className="w-full px-4 py-3 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 focus:outline-none focus:ring-2 focus:ring-[#800020]/20 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2 ml-1">Estado</label>
                    <div className="grid grid-cols-2 gap-3">
                      <button 
                        type="button"
                        onClick={() => setNewRoleStatus('active')}
                        className={`py-3 rounded-2xl border text-sm font-semibold transition-all ${
                          newRoleStatus === 'active' 
                          ? 'bg-green-50 border-green-200 text-green-700' 
                          : 'border-neutral-200 text-neutral-400'
                        }`}
                      >
                        Activo
                      </button>
                      <button 
                        type="button"
                        onClick={() => setNewRoleStatus('inactive')}
                        className={`py-3 rounded-2xl border text-sm font-semibold transition-all ${
                          newRoleStatus === 'inactive' 
                          ? 'bg-red-50 border-red-200 text-red-700' 
                          : 'border-neutral-200 text-neutral-400'
                        }`}
                      >
                        Inactivo
                      </button>
                    </div>
                  </div>

                  <div className="pt-4 flex gap-3">
                    <button 
                      type="button"
                      onClick={() => {
                        setIsModalOpen(false);
                        setIsEditModalOpen(false);
                      }}
                      className="flex-1 py-3 bg-neutral-100 hover:bg-neutral-200 text-neutral-600 font-bold rounded-2xl transition-all"
                    >
                      Cancelar
                    </button>
                    <button 
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 py-3 bg-[#800020] hover:bg-[#600018] text-white font-bold rounded-2xl shadow-lg shadow-[#800020]/20 transition-all flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <RefreshCw className="w-5 h-5 animate-spin" />
                      ) : (
                        <>
                          <Check className="w-5 h-5" />
                          <span>{isEditModalOpen ? 'Actualizar' : 'Guardar'}</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
