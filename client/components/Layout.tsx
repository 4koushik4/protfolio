import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { BackgroundEffects, CustomCursor } from "./BackgroundEffects";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { Cpu, Terminal, Zap, ShieldCheck } from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // 3 seconds for better effect
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen bg-black overflow-x-hidden selection:bg-primary selection:text-primary-foreground">
      <AnimatePresence mode="wait">
        {isLoading ? (
          <LoadingScreen key="loading" />
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          >
            <CustomCursor />
            <BackgroundEffects />
            <Navbar />
            <main className="relative z-10 pt-20">{children}</main>
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const LoadingScreen = () => {
  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center overflow-hidden"
      exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
      transition={{ duration: 1, ease: [0.43, 0.13, 0.23, 0.96] }}
    >
      <div className="absolute inset-0 bg-cyber-grid opacity-10" />
      
      <div className="relative flex flex-col items-center">
        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
          }}
          className="w-64 h-64 border border-primary/20 rounded-full flex items-center justify-center opacity-30 blur-sm"
        />
        <motion.div
          animate={{
            rotate: -360,
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute inset-[-20px] border border-secondary/20 rounded-full opacity-20 blur-sm"
        />
        
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative">
             <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-24 h-24 glass rounded-3xl flex items-center justify-center text-primary border border-primary/40 shadow-[0_0_30px_rgba(0,255,255,0.4)] relative z-10"
              >
                <Cpu className="w-12 h-12 animate-pulse" />
              </motion.div>
              <div className="absolute inset-[-10px] bg-primary/20 blur-2xl -z-10 animate-pulse rounded-full" />
          </div>
        </div>
      </div>

      <div className="mt-20 text-center relative">
        <motion.h1
          initial={{ opacity: 0, letterSpacing: "1em" }}
          animate={{ opacity: 1, letterSpacing: "0.5em" }}
          className="text-4xl md:text-5xl font-black font-orbitron neon-text-gradient uppercase mb-4"
        >
          KOUSHIK.DEV
        </motion.h1>
        
        <div className="flex flex-col items-center space-y-4">
          <div className="flex items-center space-x-3 text-primary/50 text-xs font-black uppercase tracking-[0.3em]">
            <ShieldCheck className="w-4 h-4" />
            <span>INITIALIZING PORTFOLIO SYSTEM</span>
            <motion.span
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              _
            </motion.span>
          </div>
          
          <div className="w-64 h-1 bg-white/5 rounded-full overflow-hidden border border-white/5 p-[1px]">
             <motion.div 
               initial={{ width: 0 }}
               animate={{ width: "100%" }}
               transition={{ duration: 2.5, ease: "easeInOut" }}
               className="h-full bg-gradient-to-r from-primary to-secondary rounded-full shadow-[0_0_10px_rgba(0,255,255,0.5)]"
             />
          </div>
          
          <div className="flex items-center gap-6 mt-8">
             <LoadingMetric icon={<Terminal />} label="KERNEL" />
             <LoadingMetric icon={<Zap />} label="NEON_UI" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const LoadingMetric = ({ icon, label }: { icon: React.ReactNode; label: string }) => (
  <div className="flex items-center gap-2 opacity-30">
    <div className="text-primary">{icon}</div>
    <span className="text-[8px] font-black uppercase tracking-widest">{label}</span>
  </div>
);
