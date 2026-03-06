import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { BackgroundEffects } from "./BackgroundEffects";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { Cpu, ShieldCheck } from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3500); // 3.5s for cinematic effect
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
  const letters = "KOUSHIK.DEV".split("");

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center overflow-hidden"
      exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
      transition={{ duration: 1.2, ease: [0.43, 0.13, 0.23, 0.96] }}
    >
      <div className="absolute inset-0 bg-cyber-grid opacity-10" />
      
      <div className="relative flex flex-col items-center">
        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear",
          }}
          className="w-80 h-80 border border-primary/20 rounded-full flex items-center justify-center opacity-30 blur-sm"
        />
        <motion.div
          animate={{
            rotate: -360,
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute inset-[-40px] border border-secondary/20 rounded-full opacity-20 blur-sm"
        />
        
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="w-28 h-28 glass rounded-[2rem] flex items-center justify-center text-primary border border-primary/40 shadow-[0_0_50px_rgba(0,255,255,0.4)] relative z-10"
          >
            <Cpu className="w-14 h-14 animate-pulse" />
          </motion.div>
        </div>
      </div>

      <div className="mt-24 text-center relative px-4">
        <div className="flex justify-center mb-6 overflow-hidden">
          {letters.map((char, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
              animate={{ 
                opacity: 1, 
                y: 0, 
                filter: "blur(0px)",
                textShadow: ["0 0 0px #0ff", "0 0 20px #0ff", "0 0 0px #0ff"]
              }}
              transition={{ 
                duration: 0.8, 
                delay: 0.8 + i * 0.1,
                textShadow: { duration: 2, repeat: Infinity, delay: 2 + i * 0.1 }
              }}
              className="text-4xl md:text-6xl font-black font-orbitron text-white inline-block tracking-widest"
            >
              {char}
            </motion.span>
          ))}
        </div>
        
        <div className="flex flex-col items-center space-y-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0.5, 1] }}
            transition={{ duration: 1.5, delay: 2, repeat: Infinity, repeatDelay: 3 }}
            className="flex items-center space-x-3 text-primary/60 text-xs font-black uppercase tracking-[0.4em]"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>INITIALIZING PORTFOLIO SYSTEM</span>
            <motion.span
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              _
            </motion.span>
          </motion.div>
          
          <div className="w-72 h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/10 p-[2px] relative">
             <motion.div 
               initial={{ width: 0 }}
               animate={{ width: "100%" }}
               transition={{ duration: 3, ease: [0.65, 0, 0.35, 1] }}
               className="h-full bg-gradient-to-r from-primary via-secondary to-accent rounded-full shadow-[0_0_15px_rgba(0,255,255,0.8)]"
             />
          </div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            transition={{ delay: 2.5 }}
            className="flex items-center gap-8 mt-4"
          >
             <LoadingMetric label="MESH_ENGINE" />
             <LoadingMetric label="GRID_CORE" />
             <LoadingMetric label="GLOW_RENDER" />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

const LoadingMetric = ({ label }: { label: string }) => (
  <div className="flex items-center gap-2">
    <div className="w-1 h-1 bg-primary rounded-full animate-ping" />
    <span className="text-[8px] font-black uppercase tracking-[0.2em]">{label}</span>
  </div>
);
