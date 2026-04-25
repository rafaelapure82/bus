"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Lock, User, Bus, RefreshCw, ChevronRight, ShieldCheck, Sparkles } from 'lucide-react';

const BACKGROUNDS = [
  '/assets/login/bulls.jpg',
  '/assets/login/church.png',
  '/assets/login/flag.png'
];

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('rafaelcorrea');
  const [password, setPassword] = useState('correa123');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [bgIndex, setBgIndex] = useState(0);

  // Background cycling logic
  React.useEffect(() => {
    const timer = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % BACKGROUNDS.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        router.push('/dashboard');
      } else {
        setError(data.error || 'Credenciales inválidas');
      }
    } catch (err) {
      setError('Error al conectar con el servidor');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden font-sans">
      
      {/* Magical Animated Background Slider */}
      <AnimatePresence mode="wait">
        <motion.div
          key={bgIndex}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 2.5, ease: "easeInOut" }}
          className="absolute inset-0 z-0"
        >
          <div className="absolute inset-0 bg-black/40 z-10" />
          <img 
            src={BACKGROUNDS[bgIndex]} 
            alt="Background" 
            className="w-full h-full object-cover animate-ken-burns"
          />
        </motion.div>
      </AnimatePresence>

      {/* Glassmorphism Login Container */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="relative z-20 w-full max-w-md px-4"
      >
        <div className="bg-white/10 backdrop-blur-3xl p-10 rounded-[4rem] border border-white/20 shadow-2xl shadow-black/50 overflow-hidden group">
          
          {/* Top Glow Decor */}
          <div className="absolute -top-24 -left-24 w-48 h-48 bg-[#800020]/30 blur-[100px] group-hover:bg-[#800020]/50 transition-all duration-1000" />
          
          <div className="relative z-10 flex flex-col items-center text-center mb-10">
            <div className="w-20 h-20 bg-[#800020] rounded-[2.5rem] flex items-center justify-center shadow-2xl mb-6 border border-white/20 rotate-3 hover:rotate-0 transition-all duration-500">
              <Bus className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-black text-white tracking-tighter mb-2">Bus System</h1>
            <p className="text-white/60 font-bold uppercase tracking-widest text-[10px]">Achaguas • Control Operativo</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-4">
              <div className="relative group">
                <User className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30 group-focus-within:text-[#800020] transition-colors" />
                <input
                  type="text"
                  placeholder="Usuario / Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="login-input"
                />
              </div>
              <div className="relative group">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30 group-focus-within:text-[#800020] transition-colors" />
                <input
                  type="password"
                  placeholder="Contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="login-input"
                />
              </div>
            </div>

            {error && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[#ff4d4d] text-xs font-black uppercase text-center bg-white/5 py-3 rounded-2xl border border-red-500/20">
                {error}
              </motion.p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-5 bg-white text-[#800020] rounded-3xl font-black text-sm uppercase tracking-widest shadow-2xl shadow-black/20 hover:bg-[#800020] hover:text-white hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {loading ? <RefreshCw className="w-5 h-5 animate-spin" /> : (
                <>
                  Ingresar al Sistema
                  <ChevronRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          <div className="mt-12 pt-8 border-t border-white/10 flex flex-col items-center gap-4 text-center">
            <div className="flex items-center gap-2 text-white/30 font-black text-[9px] uppercase tracking-[0.3em]">
               <ShieldCheck className="w-3 h-3" />
               Protección Blindada 256-bit
            </div>
            <p className="text-white/20 font-bold text-[8px] uppercase">© 2026 Bus System Achaguas</p>
          </div>
        </div>
      </motion.div>

      {/* Floating Elements for "Magical" feel */}
      <div className="absolute bottom-10 left-10 text-white/10 flex flex-col items-start select-none">
        <Sparkles className="w-12 h-12 mb-2" />
        <p className="font-black text-2xl tracking-tighter italic">Achaguas es Tierra Santa</p>
      </div>

      <style jsx>{`
        .login-input { @apply w-full bg-white/5 border border-white/10 rounded-3xl py-5 pl-14 pr-6 text-white focus:bg-white/10 focus:border-white/30 outline-none transition-all font-bold text-sm placeholder:text-white/20; }
        
        @keyframes kenburns {
          0% { transform: scale(1); }
          100% { transform: scale(1.1) translate(10px, -10px); }
        }
        .animate-ken-burns {
          animation: kenburns 15s ease-in-out infinite alternate;
        }
      `}</style>
    </div>
  );
}
