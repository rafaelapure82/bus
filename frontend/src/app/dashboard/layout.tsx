import React from 'react';
import Link from 'next/link';
import { Users, Shield, UserSquare, LayoutDashboard, MapPin, Bus, Calendar, Map, Ticket, Tag, Calculator, CreditCard, Wallet, LineChart, FileText, MessageSquare, Star, MessageCircle } from 'lucide-react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white/70 dark:bg-black/50 backdrop-blur-xl border-r border-neutral-200 dark:border-neutral-800 flex flex-col">
        <div className="p-6 border-b border-neutral-200 dark:border-neutral-800">
          <h1 className="text-2xl font-bold text-primary dark:text-primary-light">Bus Admin</h1>
        </div>
        
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
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="bg-white/60 dark:bg-black/40 backdrop-blur-md rounded-3xl border border-neutral-200/50 dark:border-neutral-800/50 shadow-xl p-8 min-h-[80vh]">
          {children}
        </div>
      </main>
    </div>
  );
}
