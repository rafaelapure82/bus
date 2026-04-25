"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, Phone, Lock, Save, RefreshCw, ShieldCheck, CheckCircle2, Camera, Image as ImageIcon, Award, Calendar, TrendingUp, Clock } from 'lucide-react';

export default function ProfilePage() {
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    mobile: '',
    role: '',
    joined: '2024',
    profile_image: '',
    profile_banner: ''
  });
  const [passwordData, setPasswordData] = useState({
    newPassword: '',
    confirmPassword: ''
  });

  const avatarInputRef = useRef<HTMLInputElement>(null);
  const bannerInputRef = useRef<HTMLInputElement>(null);

  const fetchProfile = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/profile`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      const data = await res.json();
      setProfile({
        name: data.slug,
        email: data.login_email,
        mobile: data.login_mobile,
        role: data.roles?.name || 'ADMIN',
        joined: new Date(data.created_at).getFullYear().toString(),
        profile_image: data.profile_image,
        profile_banner: data.profile_banner
      });
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProfile(); }, []);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordData.newPassword && passwordData.newPassword !== passwordData.confirmPassword) {
      return alert('Las contraseñas no coinciden');
    }

    setSubmitting(true);
    setSuccess(false);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/profile`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          name: profile.name,
          email: profile.email,
          mobile: profile.mobile,
          password: passwordData.newPassword || undefined
        })
      });

      if (res.ok) {
        setSuccess(true);
        const userData = JSON.parse(localStorage.getItem('user') || '{}');
        userData.name = profile.name;
        localStorage.setItem('user', JSON.stringify(userData));
        setTimeout(() => setSuccess(false), 3000);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: 'image' | 'banner') => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    setSubmitting(true);
    try {
      const endpoint = type === 'image' ? 'profile-image' : 'profile-banner';
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/${endpoint}`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
        body: formData
      });
      const data = await res.json();
      if (res.ok) {
        if (type === 'image') setProfile({ ...profile, profile_image: data.imageUrl });
        else setProfile({ ...profile, profile_banner: data.imageUrl });
        alert(`${type === 'image' ? 'Foto' : 'Banner'} actualizado correctamente`);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center h-[70vh] gap-4">
      <RefreshCw className="w-12 h-12 animate-spin text-[#800020] opacity-30" />
      <p className="text-[#800020] font-black uppercase tracking-widest text-xs">Cargando...</p>
    </div>
  );

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-[1200px] mx-auto pb-20">
      
      {/* Header Banner */}
      <div className="relative h-[350px] rounded-[4rem] overflow-hidden shadow-2xl mb-[-100px] z-0 group/banner">
        <img 
            src={profile.profile_banner ? `${process.env.NEXT_PUBLIC_API_URL}${profile.profile_banner}` : "/profile_banner_abstract_1777150893302.png"} 
            className="w-full h-full object-cover transition-all duration-700"
            alt="Banner del Perfil"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        
        {/* Banner Edit Button */}
        <div className="absolute top-8 right-8 opacity-0 group-hover/banner:opacity-100 transition-all duration-300">
            <input type="file" ref={bannerInputRef} onChange={(e) => handleFileUpload(e, 'banner')} accept="image/*" hidden />
            <button 
                onClick={() => bannerInputRef.current?.click()}
                className="flex items-center gap-2 px-6 py-3 bg-white/20 backdrop-blur-xl text-white rounded-2xl border border-white/20 hover:bg-white/30 transition-all font-black text-[10px] uppercase tracking-widest shadow-2xl"
            >
                <ImageIcon className="w-4 h-4" />
                Cambiar Banner
            </button>
        </div>

        <div className="absolute bottom-32 left-12">
            <h1 className="text-6xl font-black text-white tracking-tighter mb-2">Mi Perfil <span className="text-[#800020] text-7xl">.</span></h1>
            <div className="flex items-center gap-4 text-white/60 font-bold text-sm">
                <span className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
                    <Award className="w-4 h-4 text-[#800020]" /> Operador de Élite
                </span>
                <span className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
                    <Calendar className="w-4 h-4 text-[#800020]" /> Desde {profile.joined}
                </span>
            </div>
        </div>
      </div>

      <div className="relative z-10 px-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN */}
        <div className="lg:col-span-4 space-y-8">
            <div className="bg-white/80 backdrop-blur-2xl p-10 rounded-[3.5rem] border border-white shadow-2xl flex flex-col items-center text-center">
                <div className="relative mb-8 group/avatar">
                    <div className="w-32 h-32 bg-[#800020] rounded-[2.5rem] overflow-hidden flex items-center justify-center text-white text-5xl font-black shadow-2xl transition-all duration-500">
                        {profile.profile_image ? (
                            <img src={`${process.env.NEXT_PUBLIC_API_URL}${profile.profile_image}`} className="w-full h-full object-cover" alt="Avatar" />
                        ) : (
                            profile.name.charAt(0).toUpperCase()
                        )}
                    </div>
                    <input type="file" ref={avatarInputRef} onChange={(e) => handleFileUpload(e, 'image')} accept="image/*" hidden />
                    <button 
                        onClick={() => avatarInputRef.current?.click()}
                        className="absolute -bottom-2 -right-2 p-3 bg-white text-[#800020] rounded-2xl shadow-xl hover:scale-110 active:scale-95 transition-all border border-neutral-100"
                    >
                        {submitting ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Camera className="w-5 h-5" />}
                    </button>
                </div>
                <h3 className="text-2xl font-black text-neutral-800 tracking-tight">{profile.name}</h3>
                <p className="px-4 py-1 bg-[#800020]/10 text-[#800020] rounded-full text-[10px] font-black uppercase tracking-widest mt-2">{profile.role}</p>
                
                <div className="w-full mt-10 space-y-4 text-left">
                    <div className="flex items-center gap-4 p-4 rounded-3xl bg-neutral-50 border border-neutral-100/50">
                        <Mail className="w-5 h-5 text-neutral-400" />
                        <div className="overflow-hidden"><p className="text-[10px] font-black text-neutral-300 uppercase leading-none mb-1">Email</p><p className="font-bold text-neutral-800 text-sm truncate">{profile.email}</p></div>
                    </div>
                    <div className="flex items-center gap-4 p-4 rounded-3xl bg-neutral-50 border border-neutral-100/50">
                        <Phone className="w-5 h-5 text-neutral-400" />
                        <div><p className="text-[10px] font-black text-neutral-300 uppercase leading-none mb-1">Teléfono</p><p className="font-bold text-neutral-800 text-sm">{profile.mobile || 'No registrado'}</p></div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#800020] p-6 rounded-[2.5rem] text-white shadow-xl shadow-[#800020]/20">
                    <TrendingUp className="w-6 h-6 mb-4 opacity-50" />
                    <p className="text-2xl font-black leading-none mb-1">98%</p>
                    <p className="text-[10px] font-bold uppercase opacity-60">Eficiencia</p>
                </div>
                <div className="bg-white p-6 rounded-[2.5rem] border border-neutral-100 shadow-xl shadow-neutral-100/50">
                    <Clock className="w-6 h-6 mb-4 text-[#800020] opacity-30" />
                    <p className="text-2xl font-black text-neutral-800 leading-none mb-1">124</p>
                    <p className="text-[10px] font-bold text-neutral-400 uppercase">Viajes</p>
                </div>
            </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="lg:col-span-8 space-y-8">
            <form onSubmit={handleUpdate} className="bg-white/90 backdrop-blur-2xl p-12 rounded-[4rem] border border-white shadow-2xl space-y-12">
                <section>
                    <div className="flex items-center gap-4 mb-10">
                        <div className="w-12 h-12 bg-[#800020]/5 rounded-2xl flex items-center justify-center text-[#800020]"><User className="w-6 h-6" /></div>
                        <div><h4 className="text-xl font-black text-neutral-800 tracking-tight leading-none">Datos Personales</h4><p className="text-xs text-neutral-400 font-medium mt-1">Información básica de tu cuenta operativa.</p></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-3"><label className="text-[10px] font-black text-neutral-300 uppercase tracking-widest ml-1">Usuario</label><input type="text" value={profile.name} onChange={e=>setProfile({...profile, name: e.target.value})} className="profile-input-premium" /></div>
                        <div className="space-y-3"><label className="text-[10px] font-black text-neutral-300 uppercase tracking-widest ml-1">Email</label><input type="email" value={profile.email} onChange={e=>setProfile({...profile, email: e.target.value})} className="profile-input-premium" /></div>
                        <div className="space-y-3"><label className="text-[10px] font-black text-neutral-300 uppercase tracking-widest ml-1">Móvil</label><input type="text" value={profile.mobile} onChange={e=>setProfile({...profile, mobile: e.target.value})} className="profile-input-premium" /></div>
                    </div>
                </section>

                <section className="pt-12 border-t border-neutral-50">
                    <div className="flex items-center gap-4 mb-10">
                        <div className="w-12 h-12 bg-[#800020]/5 rounded-2xl flex items-center justify-center text-[#800020]"><Lock className="w-6 h-6" /></div>
                        <div><h4 className="text-xl font-black text-neutral-800 tracking-tight leading-none">Seguridad</h4><p className="text-xs text-neutral-400 font-medium mt-1">Cambia tu contraseña regularmente.</p></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <input type="password" placeholder="Nueva Contraseña" value={passwordData.newPassword} onChange={e=>setPasswordData({...passwordData, newPassword: e.target.value})} className="profile-input-premium no-icon" />
                        <input type="password" placeholder="Confirmar Contraseña" value={passwordData.confirmPassword} onChange={e=>setPasswordData({...passwordData, confirmPassword: e.target.value})} className="profile-input-premium no-icon" />
                    </div>
                </section>

                <div className="pt-6 flex items-center justify-between">
                    <AnimatePresence>
                        {success && (
                            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="flex items-center gap-3 bg-green-50 text-green-600 px-6 py-3 rounded-2xl border border-green-100 font-black text-xs uppercase tracking-widest">
                                <CheckCircle2 className="w-5 h-5" /> Perfil Actualizado
                            </motion.div>
                        )}
                    </AnimatePresence>
                    <button type="submit" disabled={submitting} className="ml-auto flex items-center gap-4 px-12 py-5 bg-[#800020] text-white font-black rounded-2xl shadow-2xl hover:bg-[#600018] transition-all disabled:opacity-50">
                        {submitting ? <RefreshCw className="w-6 h-6 animate-spin" /> : <><Save className="w-6 h-6" /> <span className="uppercase tracking-widest text-xs">Guardar Cambios</span></>}
                    </button>
                </div>
            </form>
        </div>
      </div>

      <style jsx>{`
        .profile-input-premium { @apply w-full bg-neutral-50 border border-neutral-100 rounded-3xl py-5 px-6 text-neutral-800 focus:bg-white focus:border-[#800020]/40 outline-none transition-all font-bold text-sm shadow-sm; }
        .profile-input-premium.no-icon { @apply px-6; }
      `}</style>
    </motion.div>
  );
}
