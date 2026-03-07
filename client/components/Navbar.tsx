import { motion, useScroll, useSpring, AnimatePresence, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Github, Linkedin, Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./ThemeToggle";

const navLinks = [
  { name: "Home", href: "#hero" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Contact", href: "#contact" },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setScrolled(v > 0.02);
  });

  const scrollToSection = (id: string) => {
    const clean = id.replace("#", "");
    const element = document.getElementById(clean);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveSection(clean);
    }
    setIsOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "fixed top-0 left-0 right-0 z-[50] transition-all duration-700",
        scrolled
          ? "bg-white/[0.04] backdrop-blur-[24px] border-b border-white/[0.08] py-3 shadow-[0_4px_30px_rgba(0,0,0,0.3)]"
          : "bg-transparent py-8"
      )}
    >
      {/* Scroll Progress – animated gradient bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] z-[60] origin-left"
        style={{
          scaleX,
          background: "linear-gradient(90deg, #00ffff, #a855f7, #ec4899, #00ffff)",
          backgroundSize: "300% 100%",
          boxShadow: "0 0 8px rgba(0,255,255,0.3)",
        }}
      />
      
      <div className="container flex items-center justify-between px-6">
        <Link 
          to="/" 
          className="text-xl font-bold font-orbitron group relative flex items-center gap-3"
        >
          <img 
            src="https://i.ibb.co/21mHj556/logo.png" 
            alt="Logo" 
            className="h-10 w-auto rounded-xl"
          />
          <span className="neon-text-gradient tracking-tight group-hover:scale-105 transition-transform duration-500 text-2xl">
            KOUSHIK.DEV
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center space-x-8">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.replace("#", "");
            return (
              <button
                key={link.name}
                onClick={() => scrollToSection(link.href)}
                className={cn(
                  "text-[11px] font-bold uppercase tracking-[0.3em] relative group py-2 transition-colors duration-300",
                  isActive ? "text-primary" : "text-muted-foreground hover:text-white"
                )}
              >
                <span className="relative z-10">{link.name}</span>
                {/* Gradient underline – expands from center */}
                <span className={cn(
                  "absolute -bottom-1 left-1/2 -translate-x-1/2 h-[2px] rounded-full transition-all duration-500",
                  "bg-gradient-to-r from-primary via-secondary to-accent",
                  isActive ? "w-full shadow-[0_0_8px_rgba(0,255,255,0.5)]" : "w-0 group-hover:w-full"
                )} />
                {/* Active glow dot */}
                {isActive && (
                  <motion.span
                    layoutId="nav-active-dot"
                    className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary shadow-[0_0_4px_#0ff]"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
          <div className="flex items-center space-x-4 ml-4 pl-4 border-l border-white/10">
            <NavSocial icon={<Github className="w-5 h-5" />} href="https://github.com/4koushik4" />
            <NavSocial icon={<Linkedin className="w-5 h-5" />} href="https://linkedin.com/in/4koushik4" />
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile Nav Toggle */}
        <motion.button 
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.05 }}
          className="lg:hidden w-12 h-12 glass rounded-xl flex items-center justify-center text-white border border-white/10 hover:border-primary/50 transition-colors shadow-lg ripple-click"
          onClick={() => setIsOpen(!isOpen)}
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                <X className="w-7 h-7" />
              </motion.div>
            ) : (
              <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                <Menu className="w-7 h-7" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100vh" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden fixed inset-x-0 top-0 bg-[#0f0c29]/95 backdrop-blur-[30px] border-b border-white/10 overflow-hidden z-[45] flex flex-col justify-center items-center px-8"
          >
            <div className="flex flex-col space-y-8 text-center w-full">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.05, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  onClick={() => scrollToSection(link.href)}
                  className="text-2xl font-bold font-orbitron hover:text-primary transition-all uppercase tracking-wider relative group"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary rounded-full group-hover:w-16 transition-all duration-500 shadow-[0_0_6px_#0ff]" />
                </motion.button>
              ))}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="flex justify-center items-center space-x-8 pt-8 border-t border-white/10"
              >
                <NavSocial icon={<Github className="w-8 h-8" />} href="https://github.com/4koushik4" />
                <NavSocial icon={<Linkedin className="w-8 h-8" />} href="https://linkedin.com/in/4koushik4" />
                <NavSocial icon={<Mail className="w-8 h-8" />} href="mailto:juluribhavanikoushik@gmail.com" />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

const NavSocial = ({ icon, href }: { icon: React.ReactNode; href: string }) => (
  <motion.a 
    href={href} 
    target="_blank" 
    rel="noopener"
    whileHover={{ y: -4, scale: 1.15 }}
    whileTap={{ scale: 0.9 }}
    className="text-muted-foreground hover:text-primary transition-all duration-300 hover:drop-shadow-[0_0_8px_rgba(0,255,255,0.6)]"
  >
    {icon}
  </motion.a>
);
