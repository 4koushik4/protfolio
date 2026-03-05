import { motion, useScroll, useSpring } from "framer-motion";
import { useState, useEffect } from "react";
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
        "fixed top-0 left-0 right-0 z-[50] transition-all duration-300",
        scrolled ? "glass py-3" : "bg-transparent py-6"
      )}
    >
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-primary z-[60] origin-left"
        style={{ scaleX }}
      />
      
      <div className="container flex items-center justify-between">
        <Link 
          to="/" 
          className="text-2xl font-black font-orbitron neon-text hover:scale-110 transition-transform"
        >
          ZENIX
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => scrollToSection(link.href)}
              className="text-sm font-medium hover:text-primary transition-colors hover:neon-text uppercase tracking-widest"
            >
              {link.name}
            </button>
          ))}
          <div className="flex items-center space-x-4 ml-4">
            <ThemeToggle />
            <a href="https://github.com" target="_blank" rel="noopener" className="hover:text-primary transition-colors">
              <Github className="w-5 h-5" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener" className="hover:text-primary transition-colors">
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Mobile Nav Toggle */}
        <button 
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: isOpen ? 1 : 0, height: isOpen ? "auto" : 0 }}
        className="md:hidden glass overflow-hidden"
      >
        <div className="container py-8 flex flex-col space-y-6 text-center">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => scrollToSection(link.href)}
              className="text-xl font-bold font-orbitron hover:text-primary transition-colors uppercase"
            >
              {link.name}
            </button>
          ))}
          <div className="flex justify-center items-center space-x-8 py-4">
            <ThemeToggle />
            <a href="https://github.com" className="text-white hover:text-primary"><Github className="w-6 h-6" /></a>
            <a href="https://linkedin.com" className="text-white hover:text-primary"><Linkedin className="w-6 h-6" /></a>
            <a href="mailto:hello@zenix.com" className="text-white hover:text-primary"><Mail className="w-6 h-6" /></a>
          </div>
        </div>
      </motion.div>
    </nav>
  );
};
