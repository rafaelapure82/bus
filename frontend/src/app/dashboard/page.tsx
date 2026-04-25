"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, Navigation, MoreHorizontal, Bell, Send, Maximize2, Map as MapIcon, Calendar, Clock } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';

// Datos de prueba para gráficas
const tripTrendsData = [
  { time: '08:00', trips: 4 },
  { time: '10:00', trips: 7 },
  { time: '12:00', trips: 5 },
  { time: '14:00', trips: 10 },
  { time: '16:00', trips: 15 }, // Pico
  { time: '18:00', trips: 8 },
  { time: '20:00', trips: 3 },
];

const efficiencyData = [
  { day: 'Lun', value: 82 },
  { day: 'Mar', value: 90 },
  { day: 'Mié', value: 85 },
  { day: 'Jue', value: 96 },
  { day: 'Vie', value: 88 },
  { day: 'Sáb', value: 75 },
  { day: 'Dom', value: 92 },
];

const PRIMARY_COLOR = "#800020";

export default function InteractiveDashboard() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  if (!isLoaded) return <div className="min-h-screen flex items-center justify-center bg-[#F8F9FA]"><div className="w-10 h-10 border-4 border-[#800020] border-t-transparent rounded-full animate-spin"></div></div>;

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="p-6 md:p-8 bg-[#F8F9FA] min-h-full rounded-tl-3xl space-y-6 text-neutral-800 font-sans"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-4">
          <h1 className="text-3xl font-semibold tracking-tight text-neutral-900">Seguimiento de Flota</h1>
          <div className="bg-white px-4 py-2 rounded-full border border-neutral-200 shadow-sm text-sm font-medium text-neutral-600 flex items-center gap-2 cursor-pointer hover:border-neutral-300 transition">
            <span>Seleccionar autobús</span>
            <span className="text-xs">▼</span>
          </div>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input 
              type="text" 
              placeholder="Buscar viaje, billete o autobús..." 
              className="w-full pl-10 pr-4 py-2.5 rounded-full border border-neutral-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#800020]/20 text-sm"
            />
          </div>
          <button className="p-2.5 bg-white rounded-full border border-neutral-200 shadow-sm hover:bg-neutral-50 transition">
            <Bell className="w-5 h-5 text-neutral-600" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* Left/Main Column (Map & Details) */}
        <div className="xl:col-span-2 space-y-6">
          
          {/* Map Section */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-[2rem] p-6 shadow-sm border border-neutral-100 relative overflow-hidden"
          >
            {/* Map Header Tags */}
            <div className="flex gap-2 mb-6 relative z-10">
              <span className="bg-[#800020] text-white px-4 py-1.5 rounded-full text-xs font-medium shadow-md">En Ruta</span>
              <span className="bg-white text-neutral-600 border border-neutral-200 px-4 py-1.5 rounded-full text-xs font-medium shadow-sm">Tráfico leve</span>
              <span className="bg-white text-neutral-600 border border-neutral-200 px-4 py-1.5 rounded-full text-xs font-medium shadow-sm">GPS Activo</span>
            </div>

            {/* Map Info Box */}
            <div className="absolute top-24 left-6 bg-white/90 backdrop-blur-md p-5 rounded-2xl shadow-xl border border-white/40 z-10 w-64">
              <p className="text-neutral-500 text-sm font-medium">Distancia a destino</p>
              <div className="flex items-end gap-1 mt-1">
                <span className="text-3xl font-bold text-[#800020]">120<span className="text-lg">KM</span></span>
                <span className="text-neutral-400 text-lg mb-0.5">/ 1<span className="text-sm">h</span> 50<span className="text-sm">min</span></span>
              </div>
              
              <div className="mt-6">
                <div className="flex justify-between text-xs mb-2">
                  <span className="font-medium text-neutral-600">Tráfico y optimización de ruta:</span>
                </div>
                <div className="h-1.5 w-full bg-neutral-100 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: '85%' }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="h-full bg-[#800020] rounded-full"
                  />
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-[#800020] font-bold text-lg">85%</span>
                  <div className="flex gap-2">
                    <button className="bg-[#800020] text-white text-xs font-medium px-3 py-1.5 rounded-full shadow-md hover:bg-[#600018] transition">Optimizar</button>
                    <button className="bg-white text-neutral-600 border border-neutral-200 text-xs font-medium px-3 py-1.5 rounded-full shadow-sm hover:bg-neutral-50 transition">Ver todo</button>
                  </div>
                </div>
              </div>
            </div>

            {/* Abstract Map Graphic */}
            <div className="h-[300px] w-full relative -mx-6 -mb-6 mt-[-40px]">
               <svg viewBox="0 0 800 400" className="w-full h-full object-cover opacity-60">
                  <path d="M-50,250 Q100,200 200,300 T400,150 T600,250 T850,100" fill="none" stroke="#E5E7EB" strokeWidth="12" strokeLinecap="round" />
                  <path d="M-50,250 Q100,200 200,300 T400,150 T600,250 T850,100" fill="none" stroke="#F3F4F6" strokeWidth="8" strokeLinecap="round" />
                  
                  {/* Route Line Animated */}
                  <motion.path 
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                    d="M-50,250 Q100,200 200,300 T400,150 T600,250 T850,100" 
                    fill="none" 
                    stroke="#800020" 
                    strokeWidth="4" 
                    strokeLinecap="round" 
                  />
                  
                  {/* Map Nodes */}
                  <circle cx="200" cy="300" r="10" fill="white" stroke="#800020" strokeWidth="4" />
                  <circle cx="400" cy="150" r="12" fill="#800020" />
                  <circle cx="600" cy="250" r="10" fill="white" stroke="#800020" strokeWidth="4" />
               </svg>
               
               {/* Map Alerts Overlay */}
               <div className="absolute bottom-10 right-10 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-white/40 z-10 w-64 max-w-[calc(100%-2rem)]">
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-neutral-500 text-xs font-medium uppercase tracking-wider">Alertas y Notificaciones</p>
                    <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center">
                      <MapPin className="w-3 h-3 text-[#800020]" />
                    </div>
                  </div>
                  <h4 className="font-bold text-neutral-800 text-sm mb-1">Alerta de geocerca</h4>
                  <p className="text-neutral-500 text-xs leading-tight">El autobús B-104 cruzó la geocerca de la terminal norte. Notificación enviada al personal.</p>
               </div>
            </div>
          </motion.div>

          {/* Details Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Trip Details */}
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-[2rem] p-6 shadow-sm border border-neutral-100"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-lg text-neutral-800">Detalles del Viaje</h3>
                <a href="#" className="text-xs font-medium text-neutral-500 hover:text-[#800020] underline underline-offset-2">Ver más</a>
              </div>
              
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-neutral-200 rounded-full overflow-hidden border-2 border-white shadow-sm flex items-center justify-center">
                    <span className="font-bold text-neutral-500 text-xs">CD</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-neutral-800">Carlos Díaz</h4>
                    <p className="text-xs text-neutral-400">ID: CD-102934 • Conductor Titular</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-neutral-500">Valoración</span>
                  <span className="bg-[#800020] text-white text-xs font-bold px-2 py-0.5 rounded-full shadow-sm">4.8</span>
                  <MoreHorizontal className="w-4 h-4 text-neutral-400 cursor-pointer ml-1" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                <div>
                  <p className="text-xs text-neutral-500 font-medium mb-1">Ruta Actual</p>
                  <p className="text-sm font-semibold text-[#800020]">Caracas <span className="text-neutral-400">→</span> Valencia</p>
                  <p className="text-xs text-green-600 font-medium mt-1">A tiempo</p>
                </div>
                
                <div>
                  <p className="text-xs text-neutral-500 font-medium mb-1">Progreso</p>
                  <div className="flex items-center justify-between text-xs font-medium text-neutral-800 mb-1">
                    <span>Maracay</span>
                    <span>Valencia</span>
                  </div>
                  <div className="h-1.5 w-full bg-neutral-100 rounded-full overflow-hidden">
                    <div className="h-full bg-neutral-800 rounded-full w-[60%]" />
                  </div>
                </div>

                <div>
                  <p className="text-xs text-neutral-500 font-medium mb-1">Ingresos de Ruta</p>
                  <p className="text-2xl font-bold text-[#800020]">$ 520,45</p>
                </div>

                <div className="flex flex-col gap-3">
                  <div className="flex justify-between items-center bg-neutral-50 p-2 rounded-xl border border-neutral-100">
                    <div>
                      <p className="text-[10px] text-neutral-400 font-medium uppercase tracking-wider">Estado</p>
                      <p className="text-xs font-semibold text-[#800020]">En curso</p>
                    </div>
                    <Navigation className="w-4 h-4 text-[#800020]" />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Trends and Efficiency Row Container */}
            <div className="flex flex-col gap-6">
              
              {/* Trip Trends */}
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-[2rem] p-6 shadow-sm border border-neutral-100 flex-1 flex flex-col"
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold text-lg text-neutral-800">Tendencias de Viaje</h3>
                  <button className="w-6 h-6 rounded-full bg-red-50 text-[#800020] flex items-center justify-center hover:bg-red-100 transition">
                    <Maximize2 className="w-3 h-3" />
                  </button>
                </div>
                <div className="flex-1 min-h-[100px] -ml-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={tripTrendsData}>
                      <Bar dataKey="trips" radius={[4, 4, 0, 0]}>
                        {tripTrendsData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.trips === 15 ? PRIMARY_COLOR : '#E5E7EB'} />
                        ))}
                      </Bar>
                      <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#9CA3AF' }} dy={10} />
                      <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ borderRadius: '1rem', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </motion.div>

              {/* Route Efficiency */}
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="bg-[#800020] rounded-[2rem] p-6 shadow-md text-white relative overflow-hidden"
              >
                {/* Background decorative patterns */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-black/20 rounded-full blur-xl -ml-10 -mb-10" />

                <div className="flex justify-between items-start mb-2 relative z-10">
                  <h3 className="font-medium text-white/90">Eficiencia de Ruta</h3>
                  <button className="w-6 h-6 rounded-full bg-white/20 text-white flex items-center justify-center hover:bg-white/30 transition backdrop-blur-sm">
                    <Maximize2 className="w-3 h-3" />
                  </button>
                </div>
                
                <div className="flex items-end justify-between relative z-10">
                  <div className="mb-2">
                    <p className="text-5xl font-bold tracking-tighter">96<span className="text-2xl font-normal ml-1">%</span></p>
                  </div>
                  
                  <div className="h-16 w-32 -mr-2">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={efficiencyData}>
                        <defs>
                          <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="white" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="white" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <Area type="monotone" dataKey="value" stroke="#ffffff" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                
                <p className="text-white/70 text-xs mt-2 relative z-10 border-t border-white/20 pt-3">La mejor ruta ha sido enviada al correo del conductor.</p>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Right Column (Capacity, Chat, etc) */}
        <div className="space-y-6">
          
          {/* Capacity */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-[2rem] p-6 shadow-sm border border-neutral-100"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-lg text-neutral-800">Ocupación Actual</h3>
              <a href="#" className="text-xs font-medium text-neutral-500 hover:text-[#800020] underline underline-offset-2">Ver más</a>
            </div>

            <div className="relative h-28 mb-4 flex items-center justify-center bg-neutral-50 rounded-xl border border-neutral-100 p-4">
              {/* Abstract Bus Graphic */}
              <div className="w-full max-w-[200px] h-14 bg-white border-2 border-neutral-300 rounded-lg relative flex overflow-hidden shadow-sm">
                 {/* Driver cabin */}
                 <div className="w-1/4 h-full border-r-2 border-neutral-300 relative">
                    <div className="absolute top-1 right-1 w-3 h-4 bg-blue-50 rounded-sm"></div>
                 </div>
                 {/* Passenger area */}
                 <div className="w-3/4 h-full p-1.5 flex items-center relative overflow-hidden bg-neutral-100">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: '86%' }}
                      transition={{ duration: 1.5, delay: 0.5 }}
                      className="absolute left-0 top-0 bottom-0 bg-[#800020]/90 flex items-center justify-center overflow-hidden"
                    >
                      {/* Striped pattern for the bar */}
                      <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, #ffffff 10px, #ffffff 20px)' }}></div>
                    </motion.div>
                    <span className="relative z-10 w-full text-center font-bold text-white text-xl drop-shadow-md">86%</span>
                 </div>
                 {/* Wheels */}
                 <div className="absolute -bottom-2 left-4 w-4 h-4 bg-neutral-800 rounded-full"></div>
                 <div className="absolute -bottom-2 right-4 w-4 h-4 bg-neutral-800 rounded-full"></div>
                 <div className="absolute -bottom-2 right-12 w-4 h-4 bg-neutral-800 rounded-full"></div>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <div>
                <p className="font-bold text-sm text-neutral-800">B-104 - Placa A23B4</p>
                <p className="text-xs text-neutral-500 mt-1">Capacidad Max: <span className="font-semibold text-neutral-700">42 Pasajeros</span></p>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-medium border border-green-100">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                En Ruta
              </div>
            </div>
          </motion.div>

          {/* Action Card (Recent trips style) */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-[#800020] rounded-[2rem] p-6 shadow-md text-white relative overflow-hidden"
          >
            {/* Background patterns */}
            <div className="absolute top-[-20%] right-[-10%] w-40 h-40 bg-white/10 rounded-full blur-2xl" />
            
            <div className="flex justify-between items-start mb-6 relative z-10">
              <h3 className="font-semibold text-lg text-white">Viaje Actual</h3>
              <p className="text-white/70 text-xs font-medium">28 OCT</p>
            </div>

            <div className="flex gap-2 mb-8 relative z-10">
              <span className="bg-white text-[#800020] px-4 py-1.5 rounded-full text-xs font-bold shadow-sm">Duración</span>
              <span className="bg-white/20 text-white border border-white/20 px-4 py-1.5 rounded-full text-xs font-medium backdrop-blur-sm">Velocidad</span>
              <span className="bg-white/20 text-white border border-white/20 px-4 py-1.5 rounded-full text-xs font-medium backdrop-blur-sm">Paradas</span>
            </div>

            <div className="flex items-end justify-between relative z-10">
              <div>
                <p className="text-4xl font-bold tracking-tight">1246 <span className="text-lg font-medium">KM</span></p>
                <p className="text-white/70 text-xs mt-1">Aventura sobre ruedas</p>
              </div>
              <div className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center backdrop-blur-sm">
                <MapIcon className="w-4 h-4" />
              </div>
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="grid grid-cols-5 gap-2"
          >
            {[Calendar, MapPin, Clock, Navigation, MoreHorizontal].map((Icon, idx) => (
              <button key={idx} className="bg-white border border-neutral-200 shadow-sm rounded-2xl aspect-square flex items-center justify-center hover:bg-neutral-50 hover:border-[#800020]/30 transition group">
                <Icon className="w-5 h-5 text-neutral-500 group-hover:text-[#800020]" />
              </button>
            ))}
          </motion.div>
          
          <motion.button 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="w-full bg-white border border-neutral-200 border-dashed rounded-[2rem] p-4 flex flex-col items-center justify-center gap-2 hover:bg-neutral-50 transition cursor-pointer"
          >
            <div className="w-10 h-10 bg-red-50 text-[#800020] rounded-full flex items-center justify-center">
              <span className="text-xl font-light">+</span>
            </div>
            <span className="text-sm font-medium text-neutral-700">Crear nueva Solicitud</span>
          </motion.button>

          {/* Chat Widget */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="bg-white rounded-[2rem] p-6 shadow-sm border border-neutral-100 flex flex-col"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-lg text-neutral-800">Chat Central</h3>
              <button className="w-6 h-6 rounded-full bg-red-50 text-[#800020] flex items-center justify-center hover:bg-red-100 transition">
                <Maximize2 className="w-3 h-3" />
              </button>
            </div>
            
            <div className="flex-1 space-y-4 mb-4">
              <div className="flex gap-3">
                <div className="w-8 h-8 bg-neutral-200 rounded-full border border-white shadow-sm flex-shrink-0 flex items-center justify-center text-xs font-bold text-neutral-500">I</div>
                <div>
                  <p className="text-xs text-neutral-500 mb-1">Iván <span className="text-[10px] text-neutral-400 ml-1">10:42 AM</span></p>
                  <div className="bg-neutral-100 px-3 py-2 rounded-2xl rounded-tl-sm text-sm text-neutral-700 w-fit">
                    ¡Hola!
                  </div>
                </div>
              </div>
              <div className="flex gap-3 flex-row-reverse">
                <div className="w-8 h-8 bg-neutral-200 rounded-full border border-white shadow-sm flex-shrink-0 flex items-center justify-center text-xs font-bold text-neutral-500">A</div>
                <div className="flex flex-col items-end">
                  <p className="text-xs text-neutral-500 mb-1">Alex <span className="text-[10px] text-neutral-400 mr-1">10:45 AM</span></p>
                  <div className="bg-[#800020] text-white px-3 py-2 rounded-2xl rounded-tr-sm text-sm w-fit shadow-md">
                    ¡Hola! ¿Cuál es el reporte de la terminal norte?
                  </div>
                </div>
              </div>
            </div>

            <div className="relative mt-auto">
              <input 
                type="text" 
                placeholder="Mensaje..." 
                className="w-full pl-4 pr-12 py-3 rounded-xl border border-neutral-200 bg-neutral-50 text-sm focus:outline-none focus:ring-2 focus:ring-[#800020]/20 focus:bg-white transition"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center text-neutral-400 hover:text-[#800020] transition">
                <Send className="w-4 h-4" />
              </button>
            </div>
          </motion.div>

        </div>
      </div>
    </motion.div>
  );
}
