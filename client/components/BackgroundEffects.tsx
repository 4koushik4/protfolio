import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export const BackgroundEffects = () => {
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; size: number; color: string; duration: number }[]>([]);

  useEffect(() => {
    const colors = ["#00ffff", "#a855f7", "#3b82f6", "#ec4899"];
    const newParticles = Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      color: colors[Math.floor(Math.random() * colors.length)],
      duration: Math.random() * 5 + 5,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 -z-50 overflow-hidden pointer-events-none bg-black">
      {/* Dynamic Grid Background */}
      <div 
        className="absolute inset-0 opacity-[0.2]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 255, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          maskImage: "radial-gradient(circle at 50% 50%, black, transparent 90%)"
        }}
      >
        <motion.div 
           animate={{
             y: [0, 60],
           }}
           transition={{
             duration: 4,
             repeat: Infinity,
             ease: "linear",
           }}
           className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-transparent h-[100px]"
        />
      </div>

      {/* Floating Animated Orbs */}
      <Orb x="-10%" y="-10%" color="bg-primary/20" duration={15} />
      <Orb x="60%" y="70%" color="bg-secondary/20" duration={20} />
      <Orb x="80%" y="-10%" color="bg-accent/20" duration={18} />

      {/* Floating Particles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full blur-[1px]"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            boxShadow: `0 0 15px ${p.color}`,
          }}
          animate={{
            y: [0, -60, 0],
            x: [0, Math.random() * 40 - 20, 0],
            opacity: [0.3, 0.7, 0.3],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
      
      {/* Scanline Effect */}
      <div className="absolute inset-0 bg-scanlines pointer-events-none opacity-[0.03]" />
    </div>
  );
};

const Orb = ({ x, y, color, duration }: { x: string; y: string; color: string; duration: number }) => (
  <motion.div
    animate={{
      scale: [1, 1.4, 1],
      opacity: [0.15, 0.3, 0.15],
      x: [0, 50, 0],
      y: [0, 30, 0],
    }}
    transition={{ duration, repeat: Infinity, ease: "easeInOut" }}
    className={`absolute w-[60%] h-[60%] rounded-full blur-[150px] ${color}`}
    style={{ left: x, top: y }}
  />
);

export const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      const target = e.target as HTMLElement;
      setIsPointer(window.getComputedStyle(target).cursor === "pointer");
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return (
    <div className="hidden lg:block">
      <motion.div
        className="fixed top-0 left-0 w-12 h-12 rounded-full border border-primary z-[9999] pointer-events-none mix-blend-difference"
        animate={{
          x: mousePosition.x - 24,
          y: mousePosition.y - 24,
          scale: isClicking ? 0.8 : isPointer ? 1.5 : 1,
          opacity: 0.8,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 30, mass: 0.6 }}
      >
        <motion.div 
           animate={{ rotate: 360 }}
           transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
           className="absolute inset-0 border-t-2 border-primary/40 rounded-full" 
        />
      </motion.div>
      
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 rounded-full bg-primary z-[9999] pointer-events-none shadow-[0_0_15px_#00ffff]"
        animate={{
          x: mousePosition.x - 6,
          y: mousePosition.y - 6,
          scale: isClicking ? 0.5 : 1,
        }}
        transition={{ type: "spring", stiffness: 800, damping: 40, mass: 0.2 }}
      />
      
      {/* Cursor Glow Trail */}
      <motion.div 
        className="fixed top-0 left-0 w-40 h-40 bg-primary/10 rounded-full blur-[60px] z-[9998] pointer-events-none"
        animate={{
          x: mousePosition.x - 80,
          y: mousePosition.y - 80,
        }}
        transition={{ type: "spring", stiffness: 50, damping: 20 }}
      />
    </div>
  );
};
