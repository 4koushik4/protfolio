import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Layout } from "@/components/Layout";
import { motion } from "framer-motion";
import { Home, ShieldAlert } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <Layout>
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <div className="text-center max-w-lg">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            className="w-32 h-32 glass rounded-3xl flex items-center justify-center text-accent mx-auto mb-12 border-accent/30 neon-glow-magenta"
          >
            <ShieldAlert className="w-16 h-16" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-8xl font-black font-orbitron neon-text mb-4 drop-shadow-[0_0_20px_rgba(0,255,255,0.5)]"
          >
            404
          </motion.h1>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl font-bold font-orbitron uppercase tracking-widest mb-8"
          >
            System Breach: <span className="text-accent">Page Not Found</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground text-lg mb-12 leading-relaxed"
          >
            The route <code className="px-2 py-1 glass rounded-md text-primary">{location.pathname}</code> has been compromised or does not exist in our neural network.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Link
              to="/"
              className="px-12 py-5 glass-card rounded-full font-black uppercase tracking-[0.2em] flex items-center gap-3 mx-auto w-fit hover:neon-glow-cyan hover:scale-105 transition-all group"
            >
              <Home className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
              Recall to Base
            </Link>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
