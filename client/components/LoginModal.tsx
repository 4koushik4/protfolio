import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { X, Lock, Key, ShieldCheck, ShieldAlert } from "lucide-react";

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
        className="relative w-full max-w-md glass-card p-10 rounded-3xl border-primary/20 overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-accent" />
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 glass rounded-full hover:text-primary transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-10">
          <div className="w-16 h-16 glass rounded-2xl flex items-center justify-center text-primary mx-auto mb-6 border-primary/30 neon-glow-cyan">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h2 className="text-3xl font-black font-orbitron neon-text mb-2 uppercase tracking-tighter">RESTRICTED AREA</h2>
          <p className="text-muted-foreground text-sm tracking-widest uppercase">Portfolio Management Console Access</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative group">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <input 
              type="password" 
              className={`w-full bg-white/5 border ${error ? 'border-accent' : 'border-white/10'} rounded-2xl pl-12 pr-4 py-4 focus:border-primary outline-none transition-all placeholder:text-muted-foreground/30 placeholder:uppercase placeholder:text-xs placeholder:font-bold placeholder:tracking-widest`}
              placeholder="ENTER ACCESS KEY"
              autoFocus
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && (
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute top-full left-0 mt-2 text-[10px] text-accent font-bold uppercase tracking-widest flex items-center gap-1"
              >
                <ShieldAlert className="w-3 h-3" /> Access Denied: Invalid Authentication Token
              </motion.p>
            )}
          </div>
          <button 
            type="submit"
            className="w-full py-4 bg-primary text-primary-foreground font-black uppercase tracking-[0.2em] rounded-2xl hover:neon-glow-cyan transition-all transform active:scale-95"
          >
            INITIALIZE ACCESS
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-[10px] text-muted-foreground uppercase tracking-widest leading-relaxed">
            Warning: Unauthorized access attempts are monitored and logged within the system kernel.
          </p>
        </div>
      </motion.div>
    </div>
  );
};
