import { motion } from "framer-motion";
import { BackgroundEffects } from "./BackgroundEffects";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="relative min-h-screen overflow-x-hidden selection:bg-[#00ffff]/30 selection:text-white">
      <BackgroundEffects />
      <Navbar />
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative z-10 pt-16 md:pt-24"
      >
        {children}
      </motion.main>
      <Footer />
    </div>
  );
};
