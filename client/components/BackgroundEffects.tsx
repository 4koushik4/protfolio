import { motion, useScroll, useTransform } from "framer-motion";
import { useMemo } from "react";

export const BackgroundEffects = () => {
  const particles = useMemo(() => {
    const colors = ["#00ffff", "#a855f7", "#3b82f6", "#ec4899", "#06b6d4", "#8b5cf6"];
    return Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      color: colors[Math.floor(Math.random() * colors.length)],
      duration: Math.random() * 15 + 12,
      delay: Math.random() * 3,
    }));
  }, []);

  const { scrollYProgress } = useScroll();
  const gridY = useTransform(scrollYProgress, [0, 1], [0, -80]);

  return (
    <div className="fixed inset-0 -z-50 overflow-hidden pointer-events-none">
      {/* Animated gradient background */}
      <div
        className="absolute inset-0 animate-gradient-bg"
        style={{
          background: "linear-gradient(135deg, #0f0c29 0%, #1a1040 20%, #1e1545 40%, #141430 60%, #0f1528 80%, #0f0c29 100%)",
          backgroundSize: "400% 400%",
        }}
      />

      {/* Floating gradient blobs */}
      <GradientBlob x="5%" y="15%" size="500px" color1="rgba(0,198,255,0.12)" color2="rgba(0,114,255,0.06)" duration={25} />
      <GradientBlob x="65%" y="5%" size="450px" color1="rgba(168,85,247,0.10)" color2="rgba(139,92,246,0.05)" duration={30} />
      <GradientBlob x="40%" y="55%" size="400px" color1="rgba(236,72,153,0.08)" color2="rgba(219,39,119,0.04)" duration={28} />
      <GradientBlob x="-5%" y="70%" size="380px" color1="rgba(6,182,212,0.10)" color2="rgba(0,255,255,0.05)" duration={22} />
      <GradientBlob x="80%" y="75%" size="320px" color1="rgba(99,102,241,0.08)" color2="rgba(79,70,229,0.04)" duration={35} />

      {/* Faint grid with parallax */}
      <motion.div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0,255,255,0.06) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(168,85,247,0.04) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
          maskImage: "radial-gradient(ellipse at 50% 50%, black 30%, transparent 80%)",
          y: gridY as any,
        }}
      />

      {/* Subtle light streaks */}
      <motion.div
        animate={{ x: ["-100%", "300%"], opacity: [0, 0.06, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", repeatDelay: 6 }}
        className="absolute top-[20%] w-[40%] h-[1px] bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent skew-y-[2deg]"
      />
      <motion.div
        animate={{ x: ["300%", "-100%"], opacity: [0, 0.04, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", repeatDelay: 10, delay: 5 }}
        className="absolute top-[60%] w-[30%] h-[1px] bg-gradient-to-r from-transparent via-purple-400/20 to-transparent skew-y-[-1deg]"
      />

      {/* Particles */}
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
            boxShadow: `0 0 ${p.size * 4}px ${p.color}`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 15 - 7, 0],
            opacity: [0.2, 0.6, 0.2],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Soft vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_60%,rgba(15,12,41,0.4)_100%)]" />
    </div>
  );
};

const GradientBlob = ({ x, y, size, color1, color2, duration }: {
  x: string; y: string; size: string; color1: string; color2: string; duration: number;
}) => (
  <motion.div
    animate={{
      x: [0, 30, -20, 0],
      y: [0, -20, 25, 0],
      scale: [1, 1.15, 0.9, 1],
    }}
    transition={{ duration, repeat: Infinity, ease: "easeInOut" }}
    className="absolute rounded-full blur-[100px] pointer-events-none will-change-transform"
    style={{
      left: x, top: y, width: size, height: size,
      background: `radial-gradient(circle, ${color1} 0%, ${color2} 50%, transparent 70%)`,
    }}
  />
);

export const CustomCursor = () => null;
