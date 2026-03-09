import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Card } from "./ui/PortfolioCard";

export const SkillsSection = ({ categories }: { categories: any[] }) => {
  return (
    <div className="container max-w-6xl">
      <div className="text-center mb-20">
        <span className="text-[#00ffff] font-black uppercase tracking-[0.4em] text-xs mb-4 block">// TECH_CAPABILITIES</span>
        <h2 className="text-5xl font-black uppercase tracking-tighter text-white">System <span className="text-gradient-futuristic">Arsenal</span></h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {categories.map((cat, i) => (
          <Card key={i} hoverGlow={i % 2 === 0 ? "cyan" : "purple"} className="relative overflow-hidden">
            <h4 className="text-2xl font-black text-white mb-10 flex items-center gap-4 uppercase tracking-wider">
              <div className="h-10 w-2 bg-gradient-to-b from-cyan-500 to-purple-500 rounded-full" />
              {cat.title}
            </h4>
            <div className="grid grid-cols-2 gap-y-10 gap-x-8">
              {cat.skills.map((skill: any, idx: number) => (
                <div key={idx} className="group">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm font-bold uppercase tracking-widest text-muted-foreground group-hover:text-white transition-colors">{skill.name}</span>
                    <span className="text-[10px] font-black text-white/40">{skill.level}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      transition={{ duration: 1.5, ease: "circOut" }}
                      className={cn("h-full rounded-full relative", skill.color)}
                    >
                      <div className="absolute inset-0 bg-white/30 blur-sm" />
                    </motion.div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
