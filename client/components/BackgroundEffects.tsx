import { motion, useScroll, useTransform } from "framer-motion";
import { useMemo } from "react";

export const BackgroundEffects = () => {
  const particles = useMemo(() => {
    const colors = ["#00ffff", "#a855f7", "#ec4899", "#3b82f6", "#ff8a00"];
    return Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      color: colors[Math.floor(Math.random() * colors.length)],
      duration: Math.random() * 25 + 20,
      delay: Math.random() * 5,
    }));
  }, []);

  const { scrollYProgress } = useScroll();
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -150]);

  return (
    <div className="fixed inset-0 -z-50 overflow-hidden pointer-events-none bg-[#05050a]">
      {/* 1. Futuristic Mesh Background */}
      <div className="absolute inset-0 bg-futuristic-mesh opacity-80" />

      {/* 2. Soft Floating Shapes */}
      <GradientBlob x="5%" y="15%" size="600px" color="rgba(0, 198, 255, 0.1)" duration={30} />
      <GradientBlob x="75%" y="10%" size="500px" color="rgba(168, 85, 247, 0.08)" duration={35} />
      <GradientBlob x="40%" y="65%" size="550px" color="rgba(236, 72, 153, 0.08)" duration={40} />
      <GradientBlob x="85%" y="80%" size="450px" color="rgba(255, 138, 0, 0.06)" duration={32} />

      {/* 3. Tech Grid Pattern */}
      <motion.div 
        style={{ y: parallaxY }}
        className="absolute inset-0 tech-grid opacity-[0.05]"
      />

      {/* 4. Layered Lighting (Subtle Aurora) */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ x: ["-50%", "150%"], opacity: [0, 0.1, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute top-[20%] w-[100%] h-[2px] bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent blur-[1px]"
        />
        <motion.div
          animate={{ x: ["150%", "-50%"], opacity: [0, 0.08, 0] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear", delay: 10 }}
          className="absolute top-[60%] w-[100%] h-[2px] bg-gradient-to-r from-transparent via-purple-500/20 to-transparent blur-[1px]"
        />
      </div>

      {/* 5. Slow Moving Light Particles */}
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
            boxShadow: `0 0 ${p.size * 8}px ${p.color}`,
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, Math.random() * 50 - 25, 0],
            opacity: [0.1, 0.4, 0.1],
            scale: [1, 1.4, 1],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Final depth layer */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(5,5,10,0.6)_100%)]" />
    </div>
  );
};

const GradientBlob = ({ x, y, size, color, duration }: {
  x: string; y: string; size: string; color: string; duration: number;
}) => (
  <motion.div
    animate={{
      x: [0, 50, -40, 0],
      y: [0, -40, 50, 0],
      scale: [1, 1.1, 0.9, 1],
    }}
    transition={{ duration, repeat: Infinity, ease: "easeInOut" }}
    className="absolute rounded-full blur-[120px] pointer-events-none will-change-transform"
    style={{
      left: x, top: y, width: size, height: size,
      background: color,
    }}
  />
);
