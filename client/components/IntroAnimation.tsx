import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const loadingSteps = [
  "🚀 Initializing Portfolio",
  "⚙ Loading Components",
  "🎨 Rendering Interface",
];

export const IntroAnimation = ({ onComplete }: { onComplete: () => void }) => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setStep((prev) => {
        if (prev >= loadingSteps.length - 1) {
          clearInterval(timer);
          setTimeout(onComplete, 800); // Complete after 0.8s once steps are done
          return prev;
        }
        return prev + 1;
      });
    }, 400); // Step duration

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#05050a]"
    >
      <div className="relative mb-12">
        {/* Glowing Rings */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="absolute -inset-8 rounded-full border-2 border-cyan-500/20 blur-sm"
        />
        <motion.div
          animate={{ scale: [1, 1.3, 1], rotate: -360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="absolute -inset-12 rounded-full border-2 border-purple-500/15 blur-md"
        />
        
        {/* Logo */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative h-24 w-24 overflow-hidden rounded-2xl border-2 border-white/10 glass-premium p-4"
        >
          <img 
            src="https://i.ibb.co/21mHj556/logo.png" 
            alt="Logo" 
            className="h-full w-full object-contain drop-shadow-[0_0_15px_rgba(0,255,255,0.6)]"
          />
        </motion.div>
      </div>

      <div className="h-8 overflow-hidden text-center">
        <AnimatePresence mode="wait">
          <motion.p
            key={step}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="font-orbitron text-sm font-bold tracking-widest text-muted-foreground uppercase"
          >
            {loadingSteps[step]}
          </motion.p>
        </AnimatePresence>
      </div>

      <div className="mt-8 h-1 w-48 rounded-full bg-white/5 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="h-full bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 shadow-[0_0_10px_rgba(0,255,255,0.4)]"
        />
      </div>
    </motion.div>
  );
};
