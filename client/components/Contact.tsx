import { motion } from "framer-motion";
import { Mail, Send, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card } from "./ui/PortfolioCard";

export const ContactSection = ({ profile }: { profile: any }) => {
  const contactOptions = [
    { 
      name: "Email", 
      value: profile.email, 
      href: `mailto:${profile.email}`, 
      icon: <Mail size={32} />, 
      color: "cyan", 
      desc: "Reach out via standard mail"
    },
    {
      name: "Telegram",
      value: profile.telegram,
      href: `https://t.me/${profile.telegram.replace(/\s+/g, '').toLowerCase()}`,
      icon: <Send size={32} />,
      color: "purple",
      desc: "Fastest response time"
    },
    { 
      name: "WhatsApp", 
      value: profile.phone, 
      href: `https://wa.me/${profile.phone.replace(/[^0-9]/g, '')}`, 
      icon: <MessageCircle size={32} />, 
      color: "orange", 
      desc: "Available for quick chats"
    }
  ];

  return (
    <div className="container max-w-6xl">
      <div className="text-center mb-24">
        <span className="text-[#00ffff] font-black uppercase tracking-[0.4em] text-xs mb-4 block">// ESTABLISH_SIGNAL</span>
        <h2 className="text-5xl font-black uppercase tracking-tighter text-white">Contact <span className="text-gradient-futuristic">Terminal</span></h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        {contactOptions.map((opt, i) => (
          <motion.a
            key={i}
            href={opt.href}
            target="_blank"
            whileHover={{ y: -10 }}
            className="block h-full"
          >
            <Card hoverGlow={opt.color as any} className="h-full flex flex-col items-center text-center p-10 group cursor-pointer relative overflow-hidden">
               <div className={cn(
                 "h-20 w-20 rounded-2xl flex items-center justify-center mb-8 glass transition-all duration-500 group-hover:scale-110",
                 opt.color === "cyan" ? "text-cyan-400 border-cyan-500/20" : 
                 opt.color === "purple" ? "text-purple-400 border-purple-500/20" : 
                 "text-orange-400 border-orange-500/20"
               )}>
                 {opt.icon}
               </div>
               <h4 className="text-2xl font-black uppercase tracking-widest text-white mb-2">{opt.name}</h4>
               <p className="text-muted-foreground text-sm font-bold tracking-wide mb-6">{opt.desc}</p>
               <div className="mt-auto py-3 px-6 glass rounded-full border border-white/10 group-hover:border-white/30 transition-all">
                  <span className="text-[10px] font-black text-white/60 tracking-widest uppercase">{opt.value}</span>
               </div>
            </Card>
          </motion.a>
        ))}
      </div>

      <Card hoverGlow="cyan" className="max-w-4xl mx-auto p-12">
        <form className="grid grid-cols-1 md:grid-cols-2 gap-8">
           <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-[#00ffff] ml-2">Ident_Name</label>
                <input type="text" placeholder="Access code or Name" className="w-full glass rounded-xl border-white/10 px-6 py-4 outline-none focus:border-[#00ffff]/50 transition-all font-medium placeholder:text-white/10" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-[#00ffff] ml-2">Source_Email</label>
                <input type="email" placeholder="Signal Return Address" className="w-full glass rounded-xl border-white/10 px-6 py-4 outline-none focus:border-[#00ffff]/50 transition-all font-medium placeholder:text-white/10" />
              </div>
           </div>
           <div className="space-y-6">
              <div className="space-y-2 h-full flex flex-col">
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-[#00ffff] ml-2">Transmission_Data</label>
                <textarea placeholder="Enter your message here..." className="w-full glass rounded-xl border-white/10 px-6 py-4 outline-none focus:border-[#00ffff]/50 transition-all font-medium placeholder:text-white/10 flex-grow resize-none" rows={4} />
              </div>
           </div>
           <div className="md:col-span-2">
              <button className="btn-primary-gradient w-full py-5 text-lg uppercase tracking-[0.2em] font-black flex items-center justify-center gap-4 group">
                Establish Signal <Send className="group-hover:translate-x-2 group-hover:-translate-y-1 transition-transform" size={20} />
              </button>
           </div>
        </form>
      </Card>
    </div>
  );
};
