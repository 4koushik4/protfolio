import { motion, AnimatePresence } from "framer-motion";
import { Layout } from "@/components/Layout";
import { usePortfolio } from "@/hooks/usePortfolio";
import { LoginModal } from "@/components/LoginModal";
import { AdminDashboard } from "@/components/AdminDashboard";
import { IntroAnimation } from "@/components/IntroAnimation";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { SkillsSection } from "@/components/Skills";
import { ProjectsSection } from "@/components/Projects";
import { ExperienceSection } from "@/components/Experience";
import { ContactSection } from "@/components/Contact";
import { cn } from "@/lib/utils";
import { useState } from "react";

const SectionWrapper = ({ children, className, id }: { children: React.ReactNode; className?: string; id?: string }) => {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={cn("py-24 px-6 relative", className)}
    >
      {children}
    </motion.section>
  );
};

export default function Index() {
  const { data, updateData, isAdminOpen, setIsAdminOpen, isLoggedIn, login, logout } = usePortfolio();
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="relative">
      <AnimatePresence>
        {!isLoaded && <IntroAnimation onComplete={() => setIsLoaded(true)} />}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 0.8 }}
      >
        {!isLoggedIn || !isAdminOpen ? (
          <Layout>
            <Hero data={data.profile} />

            <SectionWrapper id="about">
              <About data={data.profile} />
            </SectionWrapper>

            <SectionWrapper id="skills">
              <SkillsSection categories={data.skillCategories} />
            </SectionWrapper>

            <SectionWrapper id="projects">
              <ProjectsSection projects={data.projects} />
            </SectionWrapper>

            <SectionWrapper id="experience">
              <ExperienceSection internships={data.internships} />
            </SectionWrapper>

            <SectionWrapper id="contact">
              <ContactSection profile={data.profile} />
            </SectionWrapper>
          </Layout>
        ) : null}

        <AnimatePresence>
          {isAdminOpen && !isLoggedIn && (
            <LoginModal onLogin={login} onClose={() => setIsAdminOpen(false)} />
          )}
          {isAdminOpen && isLoggedIn && (
            <AdminDashboard data={data} onUpdate={updateData} onLogout={logout} onClose={() => setIsAdminOpen(false)} />
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
