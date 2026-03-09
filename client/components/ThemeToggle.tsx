import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  return (
    <motion.button
      whileHover={{ scale: 1.1, y: -2 }}
      whileTap={{ scale: 0.9 }}
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-3 glass rounded-xl border-white/10 hover:border-[#00ffff]/30 transition-all duration-300 shadow-lg group"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <Sun className="w-5 h-5 text-[#00ffff] drop-shadow-[0_0_8px_rgba(0,255,255,0.4)] transition-all group-hover:rotate-45" />
      ) : (
        <Moon className="w-5 h-5 text-[#a855f7] drop-shadow-[0_0_8px_rgba(168,85,247,0.4)] transition-all group-hover:-rotate-12" />
      )}
    </motion.button>
  );
};
