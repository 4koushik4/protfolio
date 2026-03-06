import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export const BackgroundEffects = () => {
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; size: number; color: string; duration: number }[]>([]);

  useEffect(() => {
    const colors = ["#00ffff", "#a855f7", "#3b82f6", "#ec4899"];
    const newParticles = Array.from({ length: 60 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 0.5,
      color: colors[Math.floor(Math.random() * colors.length)],
      duration: Math.random() * 10 + 10,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 -z-50 overflow-hidden pointer-events-none bg-black">
      {/* Animated Mesh Gradient */}
      <motion.div 
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute inset-0 bg-mesh-gradient opacity-40 blur-[100px]"
      />

      {/* Dynamic Neon Grid */}
      <div 
        className="absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 255, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
          maskImage: "radial-gradient(circle at 50% 50%, black, transparent 80%)"
        }}
      >
        <motion.div 
           animate={{
             y: [0, 80],
           }}
           transition={{
             duration: 5,
             repeat: Infinity,
             ease: "linear",
           }}
           className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-transparent h-[160px]"
        />
      </div>

      {/* Parallax Layer 1 (Large slow orbs) */}
      <Orb x="-20%" y="-20%" color="rgba(0, 255, 255, 0.1)" duration={25} size="600px" />
      <Orb x="70%" y="60%" color="rgba(168, 85, 247, 0.1)" duration={30} size="500px" />
      <Orb x="40%" y="20%" color="rgba(59, 130, 246, 0.05)" duration={22} size="700px" />

      {/* Floating Particles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            boxShadow: `0 0 10px ${p.color}`,
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, Math.random() * 50 - 25, 0],
            opacity: [0.2, 0.6, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
      
      {/* Light Beams / Glow Waves */}
      <motion.div 
        animate={{
          x: ["-100%", "200%"],
          opacity: [0, 0.2, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent rotate-45 pointer-events-none"
      />
    </div>
  );
};

const Orb = ({ x, y, color, duration, size }: { x: string; y: string; color: string; duration: number; size: string }) => (
  <motion.div
    animate={{
      x: [0, 100, 0],
      y: [0, 50, 0],
      scale: [1, 1.2, 1],
    }}
    transition={{ duration, repeat: Infinity, ease: "easeInOut" }}
    className="absolute rounded-full blur-[120px] pointer-events-none"
    style={{ 
      left: x, 
      top: y, 
      width: size, 
      height: size, 
      backgroundColor: color 
    }}
  />
);

export const CustomCursor = () => null; // Removed as requested
