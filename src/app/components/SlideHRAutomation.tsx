import { motion } from "motion/react";
import { Header } from "./Header";
import { Clock, UserX, AlertTriangle, Zap, Target, ShieldCheck, ArrowRight } from "lucide-react";

export function SlideHRAutomation() {
  const manualStats = [
    { icon: <Clock className="w-5 h-5 text-gray-400" />, text: "15 mins per resume" },
    { icon: <UserX className="w-5 h-5 text-gray-400" />, text: "Subjective bias" },
    { icon: <AlertTriangle className="w-5 h-5 text-gray-400" />, text: "Inconsistent criteria" },
  ];

  const autoStats = [
    { icon: <Zap className="w-5 h-5 text-[#8B61F6]" />, text: "Seconds per resume" },
    { icon: <Target className="w-5 h-5 text-[#8B61F6]" />, text: "Objective scoring" },
    { icon: <ShieldCheck className="w-5 h-5 text-[#8B61F6]" />, text: "Standardized baseline" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col h-full w-full bg-[#0B051A] text-white overflow-hidden relative"
    >
      <Header title="CASE STUDY" theme="dark" />

      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-full h-full pointer-events-none opacity-20"
           style={{ background: 'radial-gradient(circle at 80% 50%, #3B2875 0%, transparent 50%)' }} />

      <main className="flex-1 flex flex-col items-center justify-center px-16 max-w-7xl mx-auto w-full relative z-10">
        
        {/* Title Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-[#8B61F6] font-bold tracking-[0.2em] text-sm uppercase mb-4">Scaling HR Capabilities</p>
          <h2 className="text-[3.5rem] font-serif font-thin leading-[1.1]">
            Automated <span className="italic text-[#8B61F6]">Precision</span>
          </h2>
        </motion.div>

        {/* Comparison Grid */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-12 items-center w-full">
          
          {/* Manual Process */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="bg-[#1A1033] border border-[#3B2875] rounded-2xl p-8 shadow-xl relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-2 h-full bg-gray-600" />
            <motion.h3 variants={itemVariants} className="text-xl font-medium mb-6 text-gray-300">
              Manual Process
            </motion.h3>
            <div className="space-y-4">
              {manualStats.map((stat, i) => (
                <motion.div 
                  key={i} 
                  variants={itemVariants}
                  className="flex items-center space-x-4 bg-black/20 p-4 rounded-xl"
                >
                  <div className="bg-[#2D1B54] p-2 rounded-lg">{stat.icon}</div>
                  <span className="text-gray-400 font-light">{stat.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Center Image / Separator */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-col items-center justify-center px-4"
          >
            <motion.div
              animate={{ x: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="bg-[#8B61F6] rounded-full p-4 shadow-[0_0_20px_#8B61F6] z-20"
            >
              <ArrowRight className="w-8 h-8 text-white" />
            </motion.div>
          </motion.div>

          {/* Automated Process */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="bg-[#1A1033] border border-[#8B61F6]/50 rounded-2xl p-8 shadow-[0_0_40px_rgba(139,97,246,0.15)] relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-2 h-full bg-[#8B61F6]" />
            <motion.h3 variants={itemVariants} className="text-xl font-medium mb-6 text-white">
              Automated Process
            </motion.h3>
            <div className="space-y-4">
              {autoStats.map((stat, i) => (
                <motion.div 
                  key={i} 
                  variants={itemVariants}
                  className="flex items-center space-x-4 bg-[#8B61F6]/10 p-4 rounded-xl border border-[#8B61F6]/20"
                >
                  <div className="bg-[#8B61F6]/20 p-2 rounded-lg">{stat.icon}</div>
                  <span className="text-gray-200 font-light">{stat.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </main>
    </motion.div>
  );
}
