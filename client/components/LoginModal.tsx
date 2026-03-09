import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { X, Lock, Key, ShieldCheck, ShieldAlert } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoginModalProps {
  onLogin: (password: string) => boolean;
  onClose: () => void;
}

export const LoginModal = ({ onLogin, onClose }: LoginModalProps) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onLogin(password)) {
      onClose();
    } else {
      setError(true);
      setTimeout(() => setError(false), 500);
    }
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
      />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="relative w-full max-w-md glass-premium p-10 rounded-[2rem] border-white/10 overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#00ffff] via-[#a855f7] to-[#ff00cc]" />
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 glass rounded-xl hover:text-[#00ffff] transition-colors"
        >
          <X size={20} />
        </button>

        <div className="text-center mb-10">
          <div className="w-20 h-20 glass rounded-3xl flex items-center justify-center text-[#00ffff] mx-auto mb-8 border-white/10 neon-glow-cyan shadow-2xl">
            <ShieldCheck size={40} />
          </div>
          <h2 className="text-3xl font-black font-orbitron text-white mb-2 uppercase tracking-tighter">RESTRICTED_ACCESS</h2>
          <p className="text-muted-foreground text-[10px] font-black tracking-[0.3em] uppercase">Security Clearance Required</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="relative group">
            <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-[#00ffff] transition-colors" />
            <input
              type="password"
              className={cn(
                "w-full bg-white/5 border rounded-2xl pl-14 pr-6 py-5 focus:border-[#00ffff]/50 outline-none transition-all font-bold tracking-widest placeholder:text-white/5",
                error ? "border-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.2)]" : "border-white/10"
              )}
              placeholder="••••••••••••"
              autoFocus
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && (
              <motion.p
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="absolute top-full left-0 mt-3 text-[10px] text-red-400 font-black uppercase tracking-widest flex items-center gap-2"
              >
                <ShieldAlert size={14} /> ERR_INVALID_AUTH_TOKEN
              </motion.p>
            )}
          </div>
          <button
            type="submit"
            className="w-full py-5 btn-primary-gradient text-white font-black uppercase tracking-[0.2em] rounded-2xl transition-all transform active:scale-95"
          >
            Authenticate_Kernel
          </button>
        </form>

        <div className="mt-10 text-center">
          <p className="text-[9px] text-muted-foreground/40 font-black uppercase tracking-widest leading-relaxed">
            All access attempts are logged and analyzed by the system watchdog.
          </p>
        </div>
      </motion.div>
    </div>
  );
};
