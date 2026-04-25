"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Ticket, Search, Plus, Trash2, Edit, RefreshCw, BadgePercent, Calendar, X, Check } from 'lucide-react';

interface Coupon {
  id: number;
  code: string;
  discount: number;
  exp_date: string;
}

export default function CouponsPage() {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchCoupons = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/coupons`);
      const data = await response.json();
      setCoupons(Array.isArray(data) ? data : []);
    } catch (error) {
      setCoupons([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchCoupons(); }, []);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-[#800020] to-[#b3002d] bg-clip-text text-transparent">Cupones de Descuento</h2>
          <p className="text-neutral-500 mt-1">Crea códigos promocionales para tus pasajeros.</p>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 px-6 py-2.5 bg-[#800020] text-white font-medium rounded-xl shadow-lg shadow-[#800020]/20 transition-all active:scale-95">
          <Plus className="w-5 h-5" />
          <span>Nuevo Cupón</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <AnimatePresence mode='popLayout'>
          {loading ? (
            Array.from({ length: 3 }).map((_, i) => <div key={i} className="h-32 bg-white rounded-3xl animate-pulse" />)
          ) : coupons.length > 0 ? (
            coupons.map((c, i) => (
              <motion.div key={c.id} initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white p-6 rounded-[2rem] border border-neutral-100 shadow-sm relative overflow-hidden group">
                <div className="absolute -right-4 -top-4 w-20 h-20 bg-[#800020]/5 rounded-full group-hover:scale-150 transition-transform" />
                <div className="relative">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-[#800020]/10 rounded-xl text-[#800020]"><Ticket className="w-5 h-5" /></div>
                        <span className="font-black text-xl tracking-tighter text-neutral-800">{c.code}</span>
                    </div>
                    <div className="flex justify-between items-end">
                        <div>
                            <p className="text-xs text-neutral-400 font-bold uppercase tracking-widest">Descuento</p>
                            <p className="text-2xl font-black text-[#800020]">{c.discount}%</p>
                        </div>
                        <div className="text-right">
                            <p className="text-[10px] text-neutral-400 font-bold uppercase">Expira</p>
                            <p className="text-xs font-bold text-neutral-600">{new Date(c.exp_date).toLocaleDateString()}</p>
                        </div>
                    </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full py-20 text-center">
                <Ticket className="w-16 h-16 text-neutral-100 mx-auto mb-4" />
                <p className="text-neutral-400 font-medium">No hay cupones activos.</p>
            </div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
