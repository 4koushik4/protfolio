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
      transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "fixed top-0 left-0 right-0 z-[100] transition-all duration-500",
        scrolled
          ? "bg-white/[0.03] backdrop-blur-[20px] border-b border-white/[0.08] py-4 shadow-[0_4px_30px_rgba(0,0,0,0.4)]"
          : "bg-transparent py-8"
      )}
    >
      {/* Scroll Progress Bar */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[1.5px] z-[110] origin-left"
        style={{
          scaleX,
          background: "linear-gradient(90deg, #00ffff, #a855f7, #ec4899)",
          boxShadow: "0 0 8px rgba(0,255,255,0.4)",
        }}
      />
      
      <div className="container flex items-center justify-between px-6">
        <Link 
          to="/" 
          className="group relative flex items-center gap-4"
        >
          <div className="relative h-12 w-12 overflow-hidden rounded-xl border border-white/10 glass p-2 transition-all duration-500 group-hover:scale-110 group-hover:neon-glow-cyan">
             <img 
               src="https://i.ibb.co/21mHj556/logo.png" 
               alt="Logo" 
               className="h-full w-full object-contain"
             />
          </div>
          <span className="font-orbitron text-xl font-black tracking-tighter text-gradient-futuristic uppercase transition-all duration-500 group-hover:tracking-widest">
            KOUSHIK.JS
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden lg:flex items-center space-x-10">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.replace("#", "");
            return (
              <button
                key={link.name}
                onClick={() => scrollToSection(link.href)}
                className={cn(
                  "link-underline text-[11px] font-bold uppercase tracking-[0.2em] transition-colors duration-300",
                  isActive ? "text-[#00ffff] drop-shadow-[0_0_8px_rgba(0,255,255,0.4)]" : "text-muted-foreground hover:text-white"
                )}
              >
                {link.name}
              </button>
            );
          })}
          <div className="flex items-center space-x-5 ml-6 pl-6 border-l border-white/10">
            <NavSocial icon={<Github size={20} />} href="https://github.com/4koushik4" />
            <NavSocial icon={<Linkedin size={20} />} href="https://linkedin.com/in/4koushik4" />
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile Navbar Toggle */}
        <motion.button 
          whileTap={{ scale: 0.95 }}
          className="lg:hidden w-12 h-12 glass rounded-xl flex items-center justify-center text-white border border-white/10"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </motion.button>
      </div>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="lg:hidden fixed inset-0 bg-[#05050a]/98 backdrop-blur-3xl z-[90] flex flex-col justify-center items-center px-8"
          >
            <div className="flex flex-col space-y-10 text-center w-full">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.name}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => scrollToSection(link.href)}
                  className="text-3xl font-black font-orbitron hover:text-[#00ffff] transition-all uppercase tracking-widest text-white"
                >
                  {link.name}
                </motion.button>
              ))}
              <div className="flex justify-center space-x-10 pt-10 border-t border-white/10">
                <NavSocial icon={<Github size={32} />} href="https://github.com/4koushik4" />
                <NavSocial icon={<Linkedin size={32} />} href="https://linkedin.com/in/4koushik4" />
                <NavSocial icon={<Mail size={32} />} href="mailto:juluribhavanikoushik@gmail.com" />
              </div>
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
    whileHover={{ y: -3, scale: 1.2 }}
    className="text-muted-foreground hover:text-[#00ffff] transition-all duration-300"
  >
    {icon}
  </motion.a>
);
