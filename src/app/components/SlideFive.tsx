import { motion } from "motion/react";
import { Header } from "./Header";
import { Sparkles, X, Check } from "lucide-react";

export function SlideFive() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col h-full w-full bg-[#0B051A] text-white"
    >
      <Header title="EMERSON CASE STUDY" theme="dark" />

      <main className="flex-1 flex items-center justify-center px-16 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-2 gap-16 items-center w-full">
          
          {/* Text Content */}
          <div className="space-y-8">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <p className="text-[#8B61F6] font-bold tracking-[0.2em] text-sm uppercase mb-4">Explainable Decisions</p>
              <h2 className="text-[3.5rem] font-serif font-thin leading-[1.1] mb-6">
                Removing the <br /> <span className="italic text-[#8B61F6]">Black Box</span>
              </h2>
              <p className="text-xl text-gray-400 font-light leading-relaxed">
                IIIP provides total auditability. Every profile parsed is scored against the job requirements, generating a clear, justifiable reason for every shortlist or rejection.
              </p>
            </motion.div>
          </div>

          {/* AI Scanning Animation (Recreated from old Slide 8) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="relative h-[400px] flex items-center justify-center"
          >
            {/* The "AI Scanner" line */}
            <motion.div
              animate={{
                y: [-120, 120, -120],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute w-[80%] h-1 bg-[#8B61F6] shadow-[0_0_20px_#8B61F6] z-50 rounded-full"
            />

            {/* Resume Cards stack */}
            <div className="relative w-full max-w-[320px] h-[360px] flex items-center justify-center perspective-[1000px]">
              
              {/* Bottom Card (Rejected) */}
              <motion.div
                animate={{
                  x: [0, 0, -200],
                  y: [20, 0, 100],
                  scale: [0.9, 1, 0.8],
                  rotateZ: [0, 0, -15],
                  opacity: [0, 1, 0],
                }}
                transition={{ duration: 4, repeat: Infinity, delay: 0 }}
                className="absolute w-full bg-[#1A1033] border border-[#3B2875] rounded-2xl p-6 shadow-2xl"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="h-10 w-10 rounded-full bg-red-500/20 flex items-center justify-center">
                    <X className="w-5 h-5 text-red-400" />
                  </div>
                  <span className="text-red-400 text-xs font-bold uppercase tracking-wider">Lacks Cert</span>
                </div>
                <div className="space-y-3">
                  <div className="h-4 w-3/4 bg-white/10 rounded" />
                  <div className="h-4 w-1/2 bg-white/10 rounded" />
                  <div className="h-20 w-full bg-white/5 rounded mt-4" />
                </div>
              </motion.div>

              {/* Middle Card (Shortlisted) */}
              <motion.div
                animate={{
                  x: [0, 0, 200],
                  y: [10, -10, 100],
                  scale: [0.95, 1, 0.8],
                  rotateZ: [0, 0, 15],
                  opacity: [0, 1, 0],
                }}
                transition={{ duration: 4, repeat: Infinity, delay: 2 }}
                className="absolute w-full bg-[#1A1033] border border-emerald-500/30 rounded-2xl p-6 shadow-2xl"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="h-10 w-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
                    <Check className="w-5 h-5 text-emerald-400" />
                  </div>
                  <span className="text-emerald-400 text-xs font-bold uppercase tracking-wider">Strong Match</span>
                </div>
                <div className="space-y-3">
                  <div className="h-4 w-3/4 bg-white/10 rounded" />
                  <div className="h-4 w-full bg-white/10 rounded" />
                  <div className="h-20 w-full bg-white/5 rounded mt-4" />
                </div>
              </motion.div>

              {/* Top Card (Scanning) */}
              <motion.div
                animate={{ scale: [1, 1.05, 1], zIndex: 10 }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute w-full bg-[#1A1033] border border-[#8B61F6] rounded-2xl p-6 shadow-2xl"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="h-10 w-10 rounded-full bg-[#8B61F6]/20 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-[#8B61F6]" />
                  </div>
                  <span className="text-[#8B61F6] text-xs font-bold uppercase tracking-wider">Parsing...</span>
                </div>
                <div className="space-y-3">
                  <div className="h-4 w-2/3 bg-white/20 rounded animate-pulse" />
                  <div className="h-4 w-4/5 bg-white/20 rounded animate-pulse" />
                  <div className="h-20 w-full bg-white/10 rounded mt-4 animate-pulse" />
                </div>
              </motion.div>

            </div>
          </motion.div>

        </div>
      </main>
    </motion.div>
  );
}
