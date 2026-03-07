import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Github, Linkedin, Mail, Twitter, Code } from "lucide-react";
import { cn } from "@/lib/utils";

export const Footer = () => {
  return (
    <footer className="py-16 relative overflow-hidden border-t border-white/[0.06] bg-[#0f0c29]/80 backdrop-blur-xl mt-16">
      <div className="absolute inset-0 bg-cyber-grid opacity-[0.02] -z-10" />
      
      {/* Animated top border */}
      <motion.div
        animate={{ backgroundPosition: ["0% 50%", "200% 50%"] }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        className="absolute top-0 left-0 right-0 h-[1px]"
        style={{
          background: "linear-gradient(90deg, transparent, #00ffff, #a855f7, #ec4899, transparent)",
          backgroundSize: "200% 100%",
          boxShadow: "0 0 8px rgba(0,255,255,0.15)",
        }}
      />

      <div className="container px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12 items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="col-span-1 md:col-span-2"
          >
            <Link to="/" className="text-2xl font-bold font-orbitron neon-text-gradient mb-6 flex items-center gap-4 group">
              <img 
                src="https://i.ibb.co/21mHj556/logo.png" 
                alt="Logo" 
                className="h-10 w-auto rounded-xl"
              />
              KOUSHIK.DEV
            </Link>
            <p className="text-muted-foreground text-base max-w-md leading-relaxed mb-8">
              Building innovative digital experiences through modern technologies and futuristic designs.
            </p>
            <div className="flex flex-wrap gap-3">
              <TechBadge name="React" delay={0} />
              <TechBadge name="Tailwind" delay={0.1} />
              <TechBadge name="Framer Motion" delay={0.2} />
              <TechBadge name="Supabase" delay={0.3} />
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="font-orbitron text-xs font-bold uppercase tracking-[0.4em] mb-6 text-primary flex items-center gap-3">
              <Code className="w-4 h-4 opacity-50" /> Navigation
            </h4>
            <ul className="space-y-4 text-muted-foreground font-bold tracking-wider uppercase text-xs">
              <li><FooterLink href="#hero" label="Home" /></li>
              <li><FooterLink href="#about" label="About" /></li>
              <li><FooterLink href="#projects" label="Projects" /></li>
              <li><FooterLink href="#contact" label="Contact" /></li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="font-orbitron text-xs font-bold uppercase tracking-[0.4em] mb-6 text-primary">
              Connect
            </h4>
            <div className="grid grid-cols-2 gap-3">
              <SocialIcon href="https://github.com/4koushik4" icon={<Github />} label="GitHub" color="cyan" />
              <SocialIcon href="https://linkedin.com/in/4koushik4" icon={<Linkedin />} label="LinkedIn" color="purple" />
              <SocialIcon href="mailto:juluribhavanikoushik@gmail.com" icon={<Mail />} label="Email" color="magenta" />
              <SocialIcon href="#" icon={<Twitter />} label="Twitter" color="blue" />
            </div>
          </motion.div>
        </div>

        <div className="pt-8 border-t border-white/[0.06] flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-muted-foreground text-center md:text-left">
            © {new Date().getFullYear()} <span className="neon-text">KOUSHIK.DEV</span> | Designed & Developed with passion.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-[10px] font-bold uppercase tracking-wider text-primary/30">Active</span>
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_6px_#0ff]" />
          </div>
        </div>
      </div>
    </footer>
  );
};

const FooterLink = ({ href, label }: { href: string; label: string }) => (
  <a href={href} className="hover:text-primary transition-all duration-300 flex items-center gap-3 group">
    <div className="w-1 h-1 rounded-full bg-white/10 group-hover:bg-primary group-hover:scale-150 transition-all duration-300 group-hover:shadow-[0_0_4px_#0ff]" />
    {label}
  </a>
);

const TechBadge = ({ name, delay = 0 }: { name: string; delay?: number }) => (
  <motion.span
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.4, delay }}
    viewport={{ once: true }}
    whileHover={{ scale: 1.05, y: -2 }}
    className="px-4 py-2 glass rounded-lg text-[10px] font-bold uppercase tracking-wider text-muted-foreground border border-white/5 transition-all hover:border-primary/20 hover:text-primary"
  >
    {name}
  </motion.span>
);

const SocialIcon = ({ href, icon, label, color }: any) => (
  <motion.a 
    href={href} 
    target="_blank"
    rel="noopener"
    whileHover={{ y: -4, scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className={cn(
      "glass p-4 rounded-xl flex flex-col items-center gap-2 transition-all duration-500 border border-white/5 group shadow-lg",
      color === "cyan" ? "hover:neon-glow-cyan" : color === "purple" ? "hover:neon-glow-purple" : color === "magenta" ? "hover:neon-glow-magenta" : "hover:neon-glow-blue"
    )}
  >
    <div className="text-muted-foreground group-hover:text-white transition-colors">
      {icon}
    </div>
    <span className="text-[8px] font-bold uppercase tracking-wider opacity-30 group-hover:opacity-100 transition-opacity duration-300">
      {label}
    </span>
  </motion.a>
);
