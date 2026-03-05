import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Github, Linkedin, Mail, Twitter } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="py-12 relative overflow-hidden border-t border-white/10 glass mt-24">
      <div className="container px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="text-3xl font-black font-orbitron neon-text mb-6 block">
              ZENIX
            </Link>
            <p className="text-muted-foreground text-lg max-w-md leading-relaxed">
              Crafting futuristic digital experiences through innovative code and neon-infused designs. Let's build the future together.
            </p>
          </div>
          
          <div>
            <h4 className="font-orbitron text-sm font-bold uppercase tracking-widest mb-6">Navigation</h4>
            <ul className="space-y-4 text-muted-foreground">
              <li><a href="#hero" className="hover:text-primary transition-colors">Home</a></li>
              <li><a href="#about" className="hover:text-primary transition-colors">About</a></li>
              <li><a href="#projects" className="hover:text-primary transition-colors">Projects</a></li>
              <li><a href="#contact" className="hover:text-primary transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-orbitron text-sm font-bold uppercase tracking-widest mb-6">Connect</h4>
            <div className="flex space-x-4">
              <a href="https://github.com" className="w-10 h-10 glass rounded-full flex items-center justify-center hover:neon-glow-cyan transition-all duration-300">
                <Github className="w-5 h-5" />
              </a>
              <a href="https://linkedin.com" className="w-10 h-10 glass rounded-full flex items-center justify-center hover:neon-glow-purple transition-all duration-300">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="https://twitter.com" className="w-10 h-10 glass rounded-full flex items-center justify-center hover:neon-glow-blue transition-all duration-300">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="mailto:hello@zenix.com" className="w-10 h-10 glass rounded-full flex items-center justify-center hover:neon-glow-magenta transition-all duration-300">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-white/10 text-center text-sm text-muted-foreground">
          <p className="flex items-center justify-center gap-2">
            © {new Date().getFullYear()} <span className="neon-text font-bold">ZENIX</span>. All rights reserved. 
            <span className="hidden md:inline">|</span> 
            <span className="opacity-70">Designed for the future.</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
