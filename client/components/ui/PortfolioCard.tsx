import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const Card = ({ children, className, delay = 0, hoverGlow = "cyan" }: { children: React.ReactNode; className?: string; delay?: number; hoverGlow?: "cyan" | "purple" | "pink" | "orange" }) => {
  const glowStyles = {
    cyan: "hover:neon-glow-cyan hover:border-cyan-500/50",
    purple: "hover:neon-glow-purple hover:border-purple-500/50",
    pink: "hover:border-pink-500/50 shadow-[0_0_20px_rgba(236,72,153,0.1)] hover:shadow-[0_0_30px_rgba(236,72,153,0.2)]",
    orange: "hover:border-orange-500/50 shadow-[0_0_20px_rgba(255,138,0,0.1)] hover:shadow-[0_0_30px_rgba(255,138,0,0.2)]"
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className={cn(
        "glass-premium rounded-3xl p-8 transition-all duration-500 hover:-translate-y-2",
        glowStyles[hoverGlow],
        className
      )}
    >
      {children}
    </motion.div>
  );
};
