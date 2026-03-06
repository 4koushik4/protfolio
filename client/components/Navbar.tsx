import { motion, useScroll, useSpring } from "framer-motion";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Github, Linkedin, Mail, Cpu } from "lucide-react";
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
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id.replace("#", ""));
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsOpen(false);
  };

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-[50] transition-all duration-500",
        scrolled ? "bg-black/80 backdrop-blur-xl border-b border-white/10 py-3" : "bg-transparent py-8"
      )}
    >
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-primary via-secondary to-accent z-[60] origin-left shadow-[0_0_10px_rgba(0,255,255,0.5)]"
        style={{ scaleX }}
      />
      
      <div className="container flex items-center justify-between">
        <Link 
          to="/" 
          className="text-2xl font-black font-orbitron group relative flex items-center gap-3"
        >
          <div className="w-10 h-10 glass rounded-xl flex items-center justify-center border border-primary/20 group-hover:neon-border transition-all">
            <Cpu className="w-6 h-6 text-primary animate-pulse" />
          </div>
          <span className="neon-text-gradient tracking-tighter group-hover:scale-105 transition-transform duration-300">
            KOUSHIK.DEV
          </span>
          <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-500 shadow-[0_0_10px_rgba(0,255,255,0.8)]" />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center space-x-10">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => scrollToSection(link.href)}
              className="text-[10px] font-black hover:text-primary transition-all hover:neon-text uppercase tracking-[0.3em] relative group"
            >
              {link.name}
              <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-1 bg-primary rounded-full group-hover:w-4 transition-all" />
            </button>
          ))}
          <div className="flex items-center space-x-6 ml-6 pl-6 border-l border-white/10">
            <a href="https://github.com/4koushik4" target="_blank" rel="noopener" className="hover:text-primary transition-all hover:scale-125">
              <Github className="w-5 h-5" />
            </a>
            <a href="https://linkedin.com/in/4koushik4" target="_blank" rel="noopener" className="hover:text-primary transition-all hover:scale-125">
              <Linkedin className="w-5 h-5" />
            </a>
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile Nav Toggle */}
        <button 
          className="lg:hidden w-12 h-12 glass rounded-2xl flex items-center justify-center text-white border border-white/10 hover:border-primary/50 transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden fixed inset-x-0 top-[100%] bg-black/95 backdrop-blur-2xl border-b border-white/10 overflow-hidden z-[45] py-12 px-6"
          >
            <div className="flex flex-col space-y-10 text-center">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => scrollToSection(link.href)}
                  className="text-2xl font-black font-orbitron hover:text-primary transition-all uppercase tracking-widest"
                >
                  {link.name}
                </button>
              ))}
              <div className="flex justify-center items-center space-x-10 py-10 border-t border-white/10">
                <a href="https://github.com/4koushik4" className="text-white hover:text-primary scale-125"><Github className="w-6 h-6" /></a>
                <a href="https://linkedin.com/in/4koushik4" className="text-white hover:text-primary scale-125"><Linkedin className="w-6 h-6" /></a>
                <a href="mailto:juluribhavanikoushik@gmail.com" className="text-white hover:text-primary scale-125"><Mail className="w-6 h-6" /></a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
