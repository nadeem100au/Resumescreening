import { motion } from "motion/react";
import { Header } from "./Header";
import { Sparkles, ArrowRight } from "lucide-react";

export function IntroSlide() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="flex flex-col h-full w-full bg-[#0B051A] text-white overflow-hidden relative"
    >
      <Header title="EMERSON CASE STUDY" theme="dark" />

      {/* Background Graphic */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <motion.div 
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 30, 
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -top-[20%] -right-[10%] w-[800px] h-[800px] rounded-full border-[1px] border-white/5"
        />
        <motion.div 
          animate={{ 
            rotate: [360, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            duration: 40, 
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -bottom-[30%] -left-[10%] w-[1000px] h-[1000px] rounded-full border-[1px] border-white/5"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0B051A]/80 to-[#0B051A] z-10" />
      </div>

      <main className="flex-1 px-16 flex flex-col items-center justify-center max-w-7xl mx-auto w-full relative z-20 text-center">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-sm"
        >
          <Sparkles className="w-4 h-4 text-[#8B61F6]" />
          <span className="text-xs font-bold tracking-[0.2em] text-gray-300 uppercase">Interactive Presentation</span>
        </motion.div>

        <motion.h1
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-[5rem] md:text-[6rem] font-serif font-thin tracking-tight leading-[1.05] mb-6"
        >
          Emerson <span className="italic text-[#8B61F6]">Use Cases</span>
        </motion.h1>

        <motion.p
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-xl md:text-2xl text-gray-400 font-light max-w-2xl mx-auto leading-relaxed mb-12"
        >
          Next-generation AI for Resume Parsing, HR Screening, and Automated Candidate Evaluation.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="flex items-center gap-4 text-sm text-gray-500 font-medium tracking-widest uppercase"
        >
          <span>Swipe or Use Arrows</span>
          <ArrowRight className="w-4 h-4 animate-bounce-x" />
        </motion.div>
      </main>
    </motion.div>
  );
}