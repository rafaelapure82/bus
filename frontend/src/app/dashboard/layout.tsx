"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { Users, Shield, UserSquare, LayoutDashboard, MapPin, Bus, Calendar, Map, Ticket, Tag, Calculator, CreditCard, Wallet, LineChart, FileText, MessageSquare, Star, MessageCircle, LogOut } from 'lucide-react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<{name: string, role: string} | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (!token || !userData) {
      router.push('/login');
    } else {
      setUser(JSON.parse(userData));
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/login');
  };

  if (!user) return <div className="min-h-screen bg-neutral-50 flex items-center justify-center"><Bus className="w-12 h-12 text-[#800020] animate-bounce" /></div>;

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white/70 dark:bg-black/50 backdrop-blur-xl border-r border-neutral-200 dark:border-neutral-800 flex flex-col">
        <div className="p-8 border-b border-neutral-200 dark:border-neutral-800 flex items-center gap-3">
          <div className="w-10 h-10 bg-[#800020] rounded-xl flex items-center justify-center text-white shadow-lg"><Bus className="w-6 h-6" /></div>
          <h1 className="text-xl font-black text-neutral-800 dark:text-white tracking-tighter">Bus System</h1>
        </div>

        <Link href="/dashboard/profile" className="px-6 py-8 border-b border-neutral-100 bg-neutral-50/50 hover:bg-neutral-100 transition-all block group">
          <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest mb-3">Sesión Activa</p>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white border border-neutral-200 flex items-center justify-center font-black text-[#800020] shadow-sm group-hover:scale-110 transition-all">{user.name.charAt(0).toUpperCase()}</div>
            <div>
              <p className="text-sm font-black text-neutral-800 tracking-tight group-hover:text-[#800020] transition-all">{user.name}</p>
              <p className="text-[10px] font-bold text-[#800020] uppercase">{user.role}</p>
            </div>
          </div>
        </Link>

        
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-primary/10 text-neutral-700 dark:text-neutral-300 hover:text-primary transition-all">
            <LayoutDashboard className="w-5 h-5" />
            <span className="font-medium">Dashboard</span>
          </Link>
          
          <div className="pt-4 pb-2">
            <p className="px-4 text-xs font-semibold text-neutral-400 uppercase tracking-wider">Personal</p>
          </div>
          
          <Link href="/dashboard/roles" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-primary/10 text-neutral-700 dark:text-neutral-300 hover:text-primary transition-all">
            <Shield className="w-5 h-5" />
            <span className="font-medium">Roles</span>
          </Link>
          
          <Link href="/dashboard/employees" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-primary/10 text-neutral-700 dark:text-neutral-300 hover:text-primary transition-all">
            <Users className="w-5 h-5" />
            <span className="font-medium">Empleados</span>
          </Link>

          <Link href="/dashboard/agents" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-primary/10 text-neutral-700 dark:text-neutral-300 hover:text-primary transition-all">
            <UserSquare className="w-5 h-5" />
            <span className="font-medium">Agentes</span>
          </Link>

          <div className="pt-4 pb-2">
            <p className="px-4 text-xs font-semibold text-neutral-400 uppercase tracking-wider">Base Operativa</p>
          </div>
          
          <Link href="/dashboard/locations" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-primary/10 text-neutral-700 dark:text-neutral-300 hover:text-primary transition-all">
            <MapPin className="w-5 h-5" />
            <span className="font-medium">Ubicaciones</span>
          </Link>
          
          <Link href="/dashboard/fleets" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-primary/10 text-neutral-700 dark:text-neutral-300 hover:text-primary transition-all">
            <Bus className="w-5 h-5" />
            <span className="font-medium">Flotas</span>
          </Link>

          <Link href="/dashboard/schedules" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-primary/10 text-neutral-700 dark:text-neutral-300 hover:text-primary transition-all">
            <Calendar className="w-5 h-5" />
            <span className="font-medium">Horarios</span>
          </Link>

          <div className="pt-4 pb-2">
            <p className="px-4 text-xs font-semibold text-neutral-400 uppercase tracking-wider">Core de Negocio</p>
          </div>

          <Link href="/dashboard/trips" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-primary/10 text-neutral-700 dark:text-neutral-300 hover:text-primary transition-all">
            <Map className="w-5 h-5" />
            <span className="font-medium">Viajes</span>
          </Link>

          <Link href="/dashboard/campesino" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#800020]/5 border border-[#800020]/10 text-[#800020] hover:bg-[#800020]/10 transition-all">
            <Map className="w-5 h-5" />
            <span className="font-medium font-bold">Transporte Campesino</span>
          </Link>

          <Link href="/dashboard/tickets" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-primary/10 text-neutral-700 dark:text-neutral-300 hover:text-primary transition-all">
            <Ticket className="w-5 h-5" />
            <span className="font-medium">Venta de Boletos</span>
          </Link>

          <Link href="/dashboard/coupons" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-primary/10 text-neutral-700 dark:text-neutral-300 hover:text-primary transition-all">
            <Tag className="w-5 h-5" />
            <span className="font-medium">Cupones</span>
          </Link>

          <Link href="/dashboard/taxes" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-primary/10 text-neutral-700 dark:text-neutral-300 hover:text-primary transition-all">
            <Calculator className="w-5 h-5" />
            <span className="font-medium">Impuestos</span>
          </Link>

          <Link href="/dashboard/paymethods" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-primary/10 text-neutral-700 dark:text-neutral-300 hover:text-primary transition-all">
            <CreditCard className="w-5 h-5" />
            <span className="font-medium">Métodos de Pago</span>
          </Link>

          <div className="pt-4 pb-2">
            <p className="px-4 text-xs font-semibold text-neutral-400 uppercase tracking-wider">Contabilidad y Reportes</p>
          </div>

          <Link href="/dashboard/accounts" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-primary/10 text-neutral-700 dark:text-neutral-300 hover:text-primary transition-all">
            <Wallet className="w-5 h-5" />
            <span className="font-medium">Cuentas</span>
          </Link>

          <Link href="/dashboard/reports" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-primary/10 text-neutral-700 dark:text-neutral-300 hover:text-primary transition-all">
            <LineChart className="w-5 h-5" />
            <span className="font-medium">Reportes</span>
          </Link>

          <div className="pt-4 pb-2">
            <p className="px-4 text-xs font-semibold text-neutral-400 uppercase tracking-wider">CMS y Portal</p>
          </div>

          <Link href="/dashboard/pages" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-primary/10 text-neutral-700 dark:text-neutral-300 hover:text-primary transition-all">
            <FileText className="w-5 h-5" />
            <span className="font-medium">Páginas Web</span>
          </Link>

          <Link href="/dashboard/blogs" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-primary/10 text-neutral-700 dark:text-neutral-300 hover:text-primary transition-all">
            <MessageSquare className="w-5 h-5" />
            <span className="font-medium">Blog</span>
          </Link>

          <Link href="/dashboard/ratings" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-primary/10 text-neutral-700 dark:text-neutral-300 hover:text-primary transition-all">
            <Star className="w-5 h-5" />
            <span className="font-medium">Calificaciones</span>
          </Link>

          <Link href="/dashboard/inquiries" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-primary/10 text-neutral-700 dark:text-neutral-300 hover:text-primary transition-all">
            <MessageCircle className="w-5 h-5" />
            <span className="font-medium">Consultas</span>
          </Link>

          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all font-bold mt-8 border border-transparent hover:border-red-100"
          >
            <LogOut className="w-5 h-5" />
            <span>Cerrar Sesión</span>
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 h-screen overflow-y-auto bg-[#F8F9FA] dark:bg-neutral-950 p-8">
        <div className="max-w-[1600px] mx-auto min-h-full">
          {children}
        </div>
      </main>
    </div>
  );
}

