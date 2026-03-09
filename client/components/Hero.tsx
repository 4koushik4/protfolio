import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";

export const Hero = ({ data }: { data: any }) => {
  const letters = data.name.toUpperCase().split("");
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  
  return (
    <section ref={heroRef} id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden px-6">
      {/* Subtle Hero Light Effects */}
      <motion.div
        animate={{ opacity: [0.3, 0.5, 0.3], scale: [1, 1.1, 1] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-[radial-gradient(circle,rgba(168,85,247,0.1)_0%,transparent_70%)] blur-[100px] -z-10"
      />

      <motion.div style={{ y: heroY }} className="container max-w-6xl text-center relative z-10">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative mb-12 mx-auto w-44 h-44"
        >
          {/* Pulsing Avatar Glow */}
          <div className="absolute inset-0 bg-gradient-to-tr from-[#00ffff] via-[#a855f7] to-[#ff00cc] rounded-[2.5rem] blur-2xl opacity-30 animate-pulse" />
          <div className="relative h-full w-full rounded-[2.5rem] overflow-hidden border border-white/20 glass shadow-2xl p-2 group transition-all duration-700 hover:rounded-[1.5rem]">
             <img 
               src="https://i.ibb.co/ym7TLL0z/profile.jpg" 
               alt="Profile" 
               className="h-full w-full object-cover transition-all duration-700 group-hover:scale-110" 
             />
          </div>
        </motion.div>

        <div className="mb-10">
           <motion.span 
             initial={{ opacity: 0, letterSpacing: "1em" }}
             animate={{ opacity: 0.6, letterSpacing: "0.5em" }}
             transition={{ duration: 1, delay: 0.5 }}
             className="text-[10px] font-black uppercase text-white tracking-[0.5em] mb-6 block"
           >
             Full-Stack Developer & AI Enthusiast
           </motion.span>
           
           <h1 style={{ fontSize: 'clamp(1.8rem, 7vw, 6rem)' }} className="font-black mb-6 tracking-tighter leading-none whitespace-nowrap overflow-visible">
             {letters.map((char: string, i: number) => (
               <motion.span
                 key={i}
                 initial={{ opacity: 0, y: 50 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ duration: 0.6, delay: 0.8 + i * 0.03, ease: [0.22, 1, 0.36, 1] }}
                 className="inline-block text-gradient-futuristic"
               >
                 {char === " " ? "\u00A0" : char}
               </motion.span>
             ))}
           </h1>

           <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.6, delay: 1.5 }}
             className="flex flex-col items-center gap-4"
           >
             <p className="text-muted-foreground text-lg max-w-2xl font-medium leading-relaxed">
               Crafting <span className="text-white">high-performance</span> digital experiences with modern tech and <span className="text-gradient-futuristic font-bold">intelligent code</span>.
             </p>
             <div className="flex flex-wrap gap-6 mt-10 justify-center">
                <button 
                  onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                  className="btn-primary-gradient flex items-center gap-3 group"
                >
                  View My Work <ArrowRight className="group-hover:translate-x-2 transition-transform" size={20} />
                </button>
                <button 
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="btn-secondary-gradient"
                >
                  Hire Me
                </button>
             </div>
           </motion.div>
        </div>
      </motion.div>
    </section>
  );
};
