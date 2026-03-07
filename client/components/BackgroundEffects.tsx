import { motion, useScroll, useTransform } from "framer-motion";
import { useMemo } from "react";

export const BackgroundEffects = () => {
  const particles = useMemo(() => {
    const colors = ["#00ffff", "#a855f7", "#ec4899", "#3b82f6", "#ff8a00"];
    return Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      color: colors[Math.floor(Math.random() * colors.length)],
      duration: Math.random() * 20 + 15,
      delay: Math.random() * 5,
    }));
  }, []);

  const { scrollYProgress } = useScroll();
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <div className="fixed inset-0 -z-50 overflow-hidden pointer-events-none">
      {/* 1. Dynamic Gradient Mesh Background */}
      <div className="absolute inset-0 bg-vibrant-mesh opacity-90" />

      {/* 2. Floating Gradient Blobs (soft glow shapes) */}
      <GradientBlob x="10%" y="10%" size="600px" color="rgba(0, 198, 255, 0.2)" duration={25} />
      <GradientBlob x="70%" y="20%" size="500px" color="rgba(168, 85, 247, 0.15)" duration={30} />
      <GradientBlob x="30%" y="70%" size="550px" color="rgba(236, 72, 153, 0.15)" duration={35} />
      <GradientBlob x="80%" y="80%" size="450px" color="rgba(255, 138, 0, 0.12)" duration={28} />
      <GradientBlob x="-5%" y="40%" size="400px" color="rgba(0, 255, 234, 0.1)" duration={22} />

      {/* 3. Aurora Light Streaks */}
      <div className="aurora-container opacity-40">
        <div className="aurora-streak top-[10%] left-[-20%] bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent" style={{ animationDelay: '0s' }} />
        <div className="aurora-streak top-[40%] left-[-50%] bg-gradient-to-r from-transparent via-purple-400/15 to-transparent" style={{ animationDelay: '-10s' }} />
        <div className="aurora-streak top-[70%] left-[-30%] bg-gradient-to-r from-transparent via-pink-400/15 to-transparent" style={{ animationDelay: '-20s' }} />
      </div>

      {/* 4. Background Textures (Parallax Wave/Grid) */}
      <motion.div 
        style={{ y: parallaxY }}
        className="absolute inset-0 opacity-[0.03] bg-cyber-grid"
      />
      <div className="absolute inset-0 opacity-[0.05] bg-wave-pattern" />

      {/* 5. Colorful Twinkling Particles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full will-change-transform"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            boxShadow: `0 0 ${p.size * 6}px ${p.color}`,
          }}
          animate={{
            y: [0, -40, 0],
            x: [0, Math.random() * 20 - 10, 0],
            opacity: [0.3, 0.8, 0.3],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Subtle vignettes to keep focus on content */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(15,12,41,0.5)_100%)]" />
    </div>
  );
};

const GradientBlob = ({ x, y, size, color, duration }: {
  x: string; y: string; size: string; color: string; duration: number;
}) => (
  <motion.div
    animate={{
      x: [0, 40, -30, 0],
      y: [0, -30, 40, 0],
      scale: [1, 1.2, 0.8, 1],
    }}
    transition={{ duration, repeat: Infinity, ease: "easeInOut" }}
    className="absolute rounded-full blur-[120px] pointer-events-none will-change-transform"
    style={{
      left: x, top: y, width: size, height: size,
      background: color,
    }}
  />
);

export const CustomCursor = () => null;
