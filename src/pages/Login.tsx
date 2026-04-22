import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Lock, Mail, ArrowRight, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/admin');
    } catch (err: any) {
      console.error(err);
      setError('Nesprávný e-mail nebo heslo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen brand-gradient flex items-center justify-center p-6 text-white">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-teal/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-red/10 rounded-full blur-[120px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md"
      >
        <div className="flex justify-center mb-12">
          <Link 
            to="/" 
            className="flex items-center gap-2 text-white/50 hover:text-white transition-all font-bold uppercase tracking-[0.2em] text-[11px] px-6 py-3 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 shadow-xl"
          >
            <ArrowLeft size={14} /> 
            Zpět na hlavní web
          </Link>
        </div>

        <div className="glass-card bg-black/40 p-8 md:p-10 border-white/10">
          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <div className="bg-brand-red/20 border border-brand-red/30 p-4 rounded-xl text-brand-red text-sm font-bold text-center">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-white/40 ml-1">E-mail</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="vas@email.cz"
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-5 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-brand-teal/50 transition-colors"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-white/40 ml-1">Heslo</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                <input 
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-5 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-brand-teal/50 transition-colors"
                />
              </div>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-brand-teal text-black font-black uppercase tracking-widest rounded-xl hover:bg-brand-teal-light transition-all flex items-center justify-center gap-2 group"
            >
              {loading ? 'Přihlašování...' : 'Vstoupit'}
              {!loading && <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
