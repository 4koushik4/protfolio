import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
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
        "fixed top-0 left-0 right-0 z-[50] transition-all duration-700",
        scrolled ? "bg-black/60 backdrop-blur-[20px] border-b border-white/5 py-4" : "bg-transparent py-10"
      )}
    >
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-primary via-secondary to-accent z-[60] origin-left shadow-[0_0_20px_rgba(0,255,255,0.5)]"
        style={{ scaleX }}
      />
      
      <div className="container flex items-center justify-between px-6">
        <Link 
          to="/" 
          className="text-2xl font-black font-orbitron group relative flex items-center gap-4"
        >
          <div className="w-12 h-12 glass rounded-2xl flex items-center justify-center border border-primary/20 group-hover:neon-border transition-all duration-500 shadow-2xl">
            <Cpu className="w-7 h-7 text-primary animate-pulse" />
          </div>
          <span className="neon-text-gradient tracking-tighter group-hover:scale-105 transition-transform duration-500 text-3xl">
            KOUSHIK.DEV
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center space-x-12">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => scrollToSection(link.href)}
              className="text-[10px] font-black hover:text-primary transition-all uppercase tracking-[0.4em] relative group"
            >
              <span className="relative z-10">{link.name}</span>
              <motion.span 
                className="absolute -bottom-3 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-500 shadow-[0_0_10px_#0ff]"
                layoutId="nav-underline"
              />
            </button>
          ))}
          <div className="flex items-center space-x-8 ml-8 pl-8 border-l border-white/10">
            <NavSocial icon={<Github />} href="https://github.com/4koushik4" />
            <NavSocial icon={<Linkedin />} href="https://linkedin.com/in/4koushik4" />
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile Nav Toggle */}
        <motion.button 
          whileTap={{ scale: 0.9 }}
          className="lg:hidden w-14 h-14 glass rounded-2xl flex items-center justify-center text-white border border-white/10 hover:border-primary/50 transition-colors shadow-2xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
        </motion.button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0, filter: "blur(10px)" }}
            animate={{ opacity: 1, height: "100vh", filter: "blur(0px)" }}
            exit={{ opacity: 0, height: 0, filter: "blur(10px)" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden fixed inset-x-0 top-0 bg-black/95 backdrop-blur-[30px] border-b border-white/10 overflow-hidden z-[45] flex flex-col justify-center items-center px-10"
          >
            <div className="flex flex-col space-y-12 text-center w-full">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.name}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  onClick={() => scrollToSection(link.href)}
                  className="text-4xl font-black font-orbitron hover:text-primary transition-all uppercase tracking-[0.2em] relative group"
                >
                  {link.name}
                  <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-1 bg-primary group-hover:w-20 transition-all duration-500" />
                </motion.button>
              ))}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="flex justify-center items-center space-x-12 pt-12 border-t border-white/10"
              >
                <NavSocial icon={<Github className="w-8 h-8" />} href="https://github.com/4koushik4" />
                <NavSocial icon={<Linkedin className="w-8 h-8" />} href="https://linkedin.com/in/4koushik4" />
                <NavSocial icon={<Mail className="w-8 h-8" />} href="mailto:juluribhavanikoushik@gmail.com" />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const NavSocial = ({ icon, href }: { icon: React.ReactNode; href: string }) => (
  <motion.a 
    href={href} 
    target="_blank" 
    rel="noopener"
    whileHover={{ y: -5, scale: 1.2, color: "#00ffff" }}
    className="text-muted-foreground transition-all duration-300"
  >
    {icon}
  </motion.a>
);
